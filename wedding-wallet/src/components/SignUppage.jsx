function SignUppage(){
    return(
        <form>
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
    )
}

export default SignUppage