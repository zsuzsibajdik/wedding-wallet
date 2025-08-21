import { useState } from "react";
import PrevCalcs from "./PrevCalcs";
import CalcForm from "./CalcForm";
function Calculator(){
    const [calculations, setCalculations] = useState('');
    const [newCalc, setNewCalc] = useState('');
    async function handleSubmit(e, calcObj){
        e.preventDefault();
        const res = await fetch('https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/calculations.json', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(calcObj),
        });
        const { name } = await res.json();
        setCalculations((current) => [...current, { ...calcObj, id: name }]);

        if (!res.ok) {
            throw new Error("Create todo failed");
        }
    }
    return(
        <>
            <CalcForm/>
            {/* <div>
                <h2>Previos calculations</h2>
                <PrevCalcs calculations={calculations}/>
            </div> */}
        </>
        
    )
}

export default Calculator