import { useState, useEffect } from "react";
import { SignInContext } from "./SignInContext";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export function SignInProvider ({children}){
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setSignedIn(true)
            }
        })
    }, [])

    return(
        <SignInContext.Provider value ={{signedIn, setSignedIn}}>
            {children}
        </SignInContext.Provider>
    )
}

