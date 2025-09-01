import PrevCalcs from "./PrevCalcs";
import CalcForm from "./CalcForm";
function Calculator(){
    return(
        <>
        <div id="calc-page">
        <CalcForm/>
            <div>
                <h2>Previos calculations</h2>
                <PrevCalcs/>
            </div>
        </div>
        </>
        
    )
}

export default Calculator