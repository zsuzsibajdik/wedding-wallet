import { useState } from "react";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase";

function SignInpage(){
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    async function handleSubmit(e){
        e.preventDefault()
        setMessage(null);
        setError(null);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try{
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
            setMessage("You're successfully signed in!");
        } catch (error){
            setError(error.message)
        }}
    return(
        <>
        <form onSubmit={handleSubmit}> 
            <section>
                <label>Your email address:</label>
                <input id="email" type="text"/>
            </section>
            <section>
                <label>Your password:</label>
                <input id="password" type="password"/>
            </section>
            <button id="signin">Sign in</button>
        </form>
        { error && <div style={{color: 'red'}}>{error}</div> }
        { message && <div style={{color: 'green'}}>{message}</div>}
        </>
    )
}

export default SignInpage
