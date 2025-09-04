import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function SignUppage(){
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    async function handleSubmit(e){
        e.preventDefault()
        setMessage(null);
        setError(null);
        const email = document.getElementById('newemail').value;
        const password = document.getElementById('newpassword').value;
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage("You're successfully signed up!");
        } catch (error){
            setError(error.message)
        }}
    return(
        <>
        <div className="signindiv">
            <h2>Sign up</h2>
            <form className="signinform" onSubmit={handleSubmit}>
                <section>
                    <label>Your email address:</label>
                    <input id="newemail" type="text"/>
                </section>
                <section>
                    <label>Your password:</label>
                    <input id="newpassword" type="password"/>
                </section>
                <button id="signup">Sign up</button>
            </form>
            { error && <div style={{color: 'red'}}>{error}</div> }
            { message && <div style={{color: 'green'}}>{message}</div>}
        </div>
        </>
    )
}

export default SignUppage