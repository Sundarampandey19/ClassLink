import { useQuery } from "@tanstack/react-query";
import { listFriend } from "./listFriends";


export default function SideBar({onSelectChat}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['listFriend'],
    queryFn: listFriend,
  });

  let isEmpty = false
  if (isLoading) return <span className="loading loading-spinner loading-sm"></span>;
  if (error) return <div>Error: {error.message}</div>;
  // console.log("THe data of the friends", data)
  if (data.length === 0) { isEmpty = true }

  return (<>
    {/* Sidebar */}
    <div className="w-1/4 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700">

      <div className="p-4 border-b dark:border-gray-700">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div className="overflow-y-auto">

        <div className="overflow-y-auto">
          {isEmpty ?
            <div>No friends</div> : <div>{data.map((user) => (
              <div key={user.user_id} 
              className="p-4 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onSelectChat(user)}
              >{user.name}</div>
            ))}</div>}
        </div>

        {/* <p className="text-gray-600 dark:text-gray-400 text-sm">Hey! How are you?</p> */}

      </div>
    </div>
  </>)

}