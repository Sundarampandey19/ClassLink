import sendMessage from "./sendMessage.js";

const temp = {
    "sender_id": "b4e18d69-6b7c-11ef-b157-06ab2642ab69",
    "receiver_id": "da667b2b-6af4-11ef-b157-06ab2642ab69",
    "message_type": "text",
    "content": "hey there",
    "roomId": "029a531f-6ba1-11ef-b157-06ab2642ab69"
}

const {sender_id , receiver_id , message_type , content , roomId} = temp

const response = sendMessage(sender_id , receiver_id , message_type , content , roomId)