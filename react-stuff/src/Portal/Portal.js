import { useEffect, useState } from 'react';
import "./Portal.css";
function Portal(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    function handleSubmit(event) {
        event.preventDefault();
        props.authLogin({
            username: username,
            password: password
        })
    }

    return (
      <div className='portal-background'>
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <br/>
            <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <br/>
            <label>Password:</label>
            <br/>
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}>
            </input><br/>
            <button className='submit-button'>
                Log In
            </button>
            </form>
        </div>
      </div>);
}

export default Portal;