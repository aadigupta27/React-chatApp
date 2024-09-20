import Auth from '../components/auth'
import { useState, useRef } from 'react';
import './App.css'
import Cookies from 'universal-cookie'
import Chat from '../components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const cookies = new Cookies();

function App() {
 
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signingOut = async() => {
    try{
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(null);
      setRoom(null);
    }
    catch (err){
      console.error(err);
    }
  }

 
  if(!isAuth){
    return (
      <div>
        <Auth setIsAuth = {setIsAuth}/>
      </div>
    )
   }
   return (
    <>
        {
            room ? (
               <div> <Chat room = {room}/> </div>
            ): (
                <div className='roomContainer'>
                    <label>Enter Room name</label>
                   <div className='roomContainerDiv'>
                    <input type='text' ref={roomInputRef}/>
                    <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
                   </div>
                </div>
            )
        }
        <div className='sign-out'>
          <button onClick={signingOut}>Sign Out</button>
        </div>
    </>
   )
}

export default App
