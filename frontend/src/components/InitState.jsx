import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { authState, loadingState } from "@/store/authState";
import { useNavigate } from "react-router-dom";

export default function InitState() {
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();
    const setLoading = useSetRecoilState(loadingState);
    // const auth = useRecoilValue(authState);
  
    const init = async () => {
        setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:3000/me', {
          method: 'POST',
          headers: { authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.username) {
        //   console.log(data)
        //   console.log("init")
          setAuth({ token: token, username: data.username });
          navigate("/chats");
  
        } else {
          navigate("/login");
        }
      } catch (e) {
        navigate("/login");
      }finally {
        setLoading(false);  // Updates the loading stated for getting the token verified
    }
    }
    useEffect(() => {
      init();
    }, [])
  
    return <></>
  }