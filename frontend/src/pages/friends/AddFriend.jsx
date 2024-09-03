import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {  getUsersWithoutSentRequest, sendRequest } from './getUsers.js'; // Adjust the path as needed
import toast, { Toaster } from 'react-hot-toast';

export const UsersList = () => {
  async function handleSendRequest(id) {
    
    try{
      console.log(" sent you a samosa")
      const response = await sendRequest(id)
      console.log(response)
      toast.success("Request Sent!!")
    }catch(e){
      console.log("failes here")
      console.log(e)
    }

  } 
  

  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsersWithoutSentRequest,
  });

  if (isLoading) return <span className="loading loading-spinner loading-sm"></span>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='flex justify-center w-screen'>

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
            {data.map((user) => (
              <tr key={user.uid}>
                <td>{user.name}</td>
                <td>
                  <button onClick={()=>handleSendRequest(user.uid)}
                    className="btn">Send request</button>
                    < Toaster/>
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
