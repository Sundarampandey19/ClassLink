export async function getUsers() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/friend/users', {
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

export async function sendRequest(receiverId) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/friend/sendRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ receiverId })

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


export async function sentRequest() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:3000/friend/sentRequest', {
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

// Function to get the list of users you haven't sent a request to
export async function   getUsersWithoutSentRequest() {
    try {
        // Fetch all users
        const allUsers = await getUsers(); // Assume you have a function that fetches all users
        console.log("All the users",allUsers)
        // Fetch the list of users you have sent a request to
        const sentRequests = await sentRequest();
        // Extract the receiverIds from sent requests
        console.log("All the sent out request",sentRequests)
        const sentRequestReceiverIds = sentRequests.map((request) => request.receiverid);
        console.log("ALl the requests ", sentRequestReceiverIds)

        // Filter users to get those who haven't received a request from you
        const usersWithoutSentRequest = allUsers.filter(user => 
            !sentRequestReceiverIds.includes(user.uid)
        );

        return usersWithoutSentRequest;

    } catch (error) {
        console.error("Error fetching users or sent requests:", error);
        throw error;
    }
}

// // Example usage
//  getUsersWithoutSentRequest().then(users => {
//     console.log("Users you haven't sent a request to:", users);
// });


//so there are two things
//first all the users are withdrawn
//then we find out which request is been sent already
// then we create a final list of people who can be added as friends
// then the sent requests are shown separately
// the friends are shown on the front page






