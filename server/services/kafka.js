import { Kafka } from 'kafkajs';
import fs from 'fs';
import path from 'path';
import sendMessage from '../controllers/sendMessage.js';

const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER],
    ssl: {
        ca: [fs.readFileSync(path.resolve('./kafka.ca.pem'), 'utf-8')],
    },
    sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: 'plain',
    },
});

let producer = null;

export async function createProducer() {
    if (producer) {
        return producer;  // Return the existing producer if it has already been created
    }
    const _producer = kafka.producer();
    await _producer.connect();
    producer = _producer;
    return producer;
}

export async function produceMessage(message) {
    const producer = await createProducer();
    await producer.send({
        messages: [{ key: `message-${Date.now()}`, value: message }],
        topic: 'MESSAGES',
    });
    return true;
}


export async function startConsumer() {
    console.log("Started consumer")
    const consumer = kafka.consumer({ groupId: 'default' })
    await consumer.connect()
    await consumer.subscribe({ topic: "MESSAGES" , fromBeginning:true })

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            if (!message.value) return
            console.log("New message received")
            try {
                console.log(JSON.parse(message.value.toString()))
                const messageCon = JSON.parse(message.value.toString())
                const {chatMessage} = messageCon
                const {sender_id , receiver_id , message_type , content , roomId} = chatMessage
                console.log({sender_id , receiver_id , message_type , content , roomId})
                let response
                try{
                    response = await sendMessage(sender_id , receiver_id , message_type , content , roomId)

                }catch(e){
                    console.log(e)
                }
                console.log(response)

            } catch (err) {
                console.log("Error while inserting message into db")
                // pause()
                // setTimeout(() => { consumer.resume([{ topic: "MESSAGES" }]) }, 6 * 1000)
            }
        }
    })

}


export default kafka;
