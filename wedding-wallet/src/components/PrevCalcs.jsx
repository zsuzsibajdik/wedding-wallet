import { CalcCard } from "./Calccard"
import { useState, useEffect } from "react"
function PrevCalcs(){
    const [calculations, setCalculations] = useState('');
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
            {calculations.map(calculation => <CalcCard key={calculation.date} title={calculation.date}sum={calculation.sum} />)}
        </div>) : (<p>Loading</p>)}
        </>

    )
}

export default PrevCalcs