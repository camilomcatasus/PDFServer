
import './App.css';
import { useEffect, useState } from 'react';
import Portal from './Portal/Portal';
const url = "";
const files = ["","","","","","","","","","","","","","","","","","","","","","","","",""];
function App() {

  const [auth, setAuth] = useState(true);
  function loginHandler(loginInfo)
  {
    fetch (url + "/login",
    {
      method: "PUT",
      headers: { "Content-Type" : "application/json" },
      body: loginInfo
    })
  }

  useEffect(()=>{
    let authCookie = GetCookie("JWT");
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
        !auth && <Display files={files}/>
      }
      {
        auth && <Portal authLogin={loginHandler}/>
      }
    </div>
  );
}


function Display(props) {
  const [file, setFile] = useState("");
  const [fileIndex, setFileIndex] = useState(-1);
  function FileCard(props) {
    return (
      <div className='pdf-img-container'>
        <img src={""}>
        </img>
      </div>
    );
  }
  function HandleSelect(index) {
    setFile()
  }

  return (
    <>
      <div className='display-container'>
      <iframe
        src={file}
        className="pdf-viewer" 
        height={"100%"}
        width={"100%"}/>
      </div>
      <div className='file-selector-container'>
        <div className='file-selector-scroll'
          style={{width: (props.files.length * 65)  }}>
          {
            props.files.map((file,index)=> 
              <FileCard 
                url={file.url}
                id={index}/>
            )
          }
        </div>
      </div>
    </>);
  
}


function GetCookie(cookie)
{
  let name = cookie + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export default App;
