import { useQuery } from "@tanstack/react-query";
import { acceptRequest, listRequest } from "./listReq";
import toast, { Toaster } from "react-hot-toast";



export default function Requests() {

  async function handleAccept(uid) {
    try{
      const response = await acceptRequest(uid)
      console.log(response)
      toast.success("Friend Added")
    }catch(e){
      toast.error("Something went wrong")
      console.log(e)
    }

  }





  const { data, error, isLoading } = useQuery({
    queryKey: ['listReq'],
    queryFn: listRequest,
  });  
  let isEmpty = true
  if (isLoading) return <span className="loading loading-spinner loading-sm"></span>;
  if (error) return <div>Error: {error.message}</div>;
  if(data.length!==0){isEmpty=false}

  return (
    <div className='flex h-screen justify-center w-screen'>

    <div className="overflow-x-auto max-w-5xl w-fit">
      {isEmpty ? <div>No new Request</div> :<table className="table">
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
              <td>{user.senderName}</td>
              <td>
                <button onClick={()=>handleAccept(user.uid)}
                  className="btn">Accept Request</button>
                  < Toaster/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  </div>
  );
}
