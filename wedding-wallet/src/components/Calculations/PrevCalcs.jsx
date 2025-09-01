import { CalcCard } from "./Calccard"
import { PrevCalcData } from "./PrevCalcData";
import { useState, useEffect } from "react"
function PrevCalcs(){
    const [calculations, setCalculations] = useState('');
    const [calc, setCalc] = useState('');
    useEffect(() => {
        async function fetchData(){
            const response = await fetch('https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/calculations.json');
            const data = await response.json();
            setCalculations(() =>
                Object.keys(data).map((id) => ({
                    id,
                    ...data[id]
                })))
        }
        fetchData();
    }, []);
    
    return(
        <>
        {calculations ? (
            <div id="prev-calcs">
            {calculations.map(calculation => <CalcCard key={calculation.date} calculation={calculation} setCalcs={setCalc}/>)}
        </div>) : (<p>Loading</p>)}
        {calc && (<PrevCalcData object={calc} setCalcs={setCalc}/>)}
        </>

    )
}

export default PrevCalcs