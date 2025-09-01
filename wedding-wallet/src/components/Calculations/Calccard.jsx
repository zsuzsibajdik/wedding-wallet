export function CalcCard({ calculation, setCalcs }){
    function handleClick(){
        setCalcs(calculation)
    }
    return(
        <div className="calccard">
            <h3>{calculation.date}</h3>
            <p>{new Intl.NumberFormat("hu-HU").format(calculation.sum)} Ft</p>
            <button type="button" onClick={handleClick}>Show details</button>
        </div>
    )
}