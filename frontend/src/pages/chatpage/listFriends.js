









export async function listFriend() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/friend/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e)
        throw e;
    }
}