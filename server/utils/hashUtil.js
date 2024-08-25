import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function getHashedPassword(plaintextPassword) {
    try {
        const hash = await bcrypt.hash(plaintextPassword, saltRounds);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

export function verifyPassword(plaintextPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, hashedPassword, (err, result) => {
            if (err) {
                console.error('Error verifying password:', err);
                return reject(err);
            }
            resolve(result);
        });
    });
}