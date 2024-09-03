import ThemeToggle from './ToogleTheme';
import { Link, useNavigate } from 'react-router-dom';
import UserDetails from './UserDetails';
import { useRecoilValue } from 'recoil';
import { authState, loadingState } from '@/store/authState';


export default function Navbar() {
  const auth = useRecoilValue(authState);
  const loading = useRecoilValue(loadingState);
  const navigate = useNavigate()

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 border-b p-4 flex justify-between items-center">
      
      <Link to={"/"}>
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Class Link
        </div>
      </Link>
      {/* <Link to={"/users"}>Users</Link> */}
      <button onClick={()=>navigate("/users")}>Users</button>
      <button onClick={()=>navigate("/request")}>Request</button>
      <button onClick={()=>navigate("/chats")}>Chats</button>
      
      <div className="relative flex gap-4">
        <ThemeToggle />
        {loading ? (
          <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
        ) : auth.token ? (
          <UserDetails/>
        ) : (
          <>
             <Link to={"/login"} className='pt-2'>Login</Link >
             <Link to={"/signup"} className='pt-2'>Signup</Link >
           </>
         )
        }

        
      </div>
        
    </nav>
  );
}
