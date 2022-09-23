
import './App.css';
import { useEffect, useState } from 'react';
import Portal from './Portal/Portal';
import UserPortal from './UserPortal/UserPortal';
const url = "";
function App() {
  const [auth, setAuth] = useState(false);
  //setFailed used for incorrect login info
  const [failed, setFailed] = useState(false);
  function loginHandler(loginInfo)
  {
    fetch (url + "/login",
    {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(loginInfo)
    }).then((res)=>{
      if(res.status === 202)
      {
        setAuth(true);
      }
      else
      {
        setFailed(true);
      }
    })
  }

  useEffect(()=>{
    let authCookie = GetCookie("sessionId");
    if(authCookie)
    {
      setAuth(true);
    }
    else
    {
      setAuth(false);
    }
  }, []);
  return (
    <div className='app'>
      {
        auth && <UserPortal setAuth={setAuth}/>
      }
      {
        !auth && <Portal authLogin={loginHandler} failed={failed}/>
      }
    </div>
  );
}

function GetCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
export default App;
