import PrevCalcs from "./PrevCalcs";
import CalcForm from "./CalcForm";
import { useContext } from "react";
import { SignInContext } from "../SignInContext";
import { Forbiddenpage } from "../Forbiddenbage";

function Calculator(){
    const {signedIn} = useContext(SignInContext)
    return(
        signedIn ? (<>
            <div id="calc-page">
            <CalcForm/>
                <div>
                    <h2>Previos calculations</h2>
                    <PrevCalcs/>
                </div>
            </div>
            </>) : (<Forbiddenpage/>) 
    )
}

export default Calculator