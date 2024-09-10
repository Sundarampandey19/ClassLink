import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsersWithoutSentRequest, sendRequest } from './getUsers.js'; // Adjust the path as needed
import toast, { Toaster } from 'react-hot-toast';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { usersState } from '@/store/authState.js';
import { useSearchParams } from 'react-router-dom';

export const UsersList = () => {
          const [users, setUsers] = useRecoilState(usersState);
          const [loadingId, setLoadingId] = useState(null);


          const { data, error, isLoading } = useQuery({
            queryKey: ['users'],
            queryFn: getUsersWithoutSentRequest,
            onSuccess: (data) => {
              console.log("Query ran")
              },
            });
            useEffect(() => {
              if (data) {
                setUsers(data); // Update Recoil state with new data
              }
            }, [data])
            
          console.log(users)

  async function handleSendRequest(id) {
    try {
      console.log(" sent you a samosa")
      const response = await sendRequest(id)
      console.log(response)

      setUsers(prevUsers => prevUsers.filter(user => user.uid !== id));
      toast.success("Request Sent!!")
    } catch (e) {
      console.log("Send request failed")
      console.log(e)
    }

  }


  if (isLoading) return <span className="loading loading-spinner loading-sm"></span>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='flex h-screen justify-center w-screen'>

      <div className="overflow-x-auto max-w-5xl w-fit">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.name}</td>
                <td>
                  <button onClick={() => handleSendRequest(user.uid)}
                    disabled={loadingId === user.uid}
                    className="btn">
                      {loadingId === user.uid ? (
                      <span className="loading-spinner"></span> // Display spinner when loading
                    ) : (
                      'Send request'
                    )}
                      </button>
                  < Toaster />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
