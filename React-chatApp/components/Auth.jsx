import React from 'react'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Auth(props) {

    const {setIsAuth} = props

    const googleSignIn = async () => {
        try{
           const result = await signInWithPopup(auth, googleProvider);
           console.log(result);
           cookies.set("auth-token", result.user.refreshToken);
           setIsAuth(true);
        }catch(err){
            console.error(err);
        }
    }
    return (
        <div className='signIn'>
            <h2>Sign In with Google to continue</h2>
            <button onClick={googleSignIn}>Sign In with google</button>
        </div>
    )

}

export default Auth
