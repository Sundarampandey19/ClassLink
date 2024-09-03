
export async function listRequest() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/friend/listRequest', {
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

export async function acceptRequest(uid) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/friend/acceptRequest', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body:JSON.stringify({uid})
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