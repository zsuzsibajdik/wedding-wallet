import { CalcCard } from "./Calccard"
function PrevCalcs({calculations}){
    return(
        <div id="prev-calcs">
            {calculations.map(calculation => <CalcCard calculation={calculation}/>)}
        </div>
    )
}

export default PrevCalcs