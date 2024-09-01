import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { authState } from '@/store/authState';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from "react";


export default function UserDetails() {
    const auth = useRecoilValue(authState);
    const setAuth = useSetRecoilState(authState);
    // console.log("Current authState from navbar:", auth);
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        console.log(auth.token); // Log the current token for debugging
        if (auth.token !== null) {
            localStorage.removeItem('token');
            setAuth({ token: null, username: null });
            toast.success('Logged out successfully!');
            console.log("User logged out");
            navigate("/"); // Navigate to the home or login page
        }
    };

    return (
        <>
            <button
                className="font-medium text-gray-900 dark:text-white focus:outline-none"
                onClick={handleDropdownToggle}
            >
                {auth.username}
            </button>
            {dropdownOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1"
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <button
                        // href="#logout"
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                        Log out
                    </button>
                </div>
            )}
        </>
    )
}