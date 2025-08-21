export function CalcCard({ calculation }){
    return(
        <div className="calccard">
            <h3>{calculation.date}</h3>
            <p>{calculation.sub}</p>
            <button type="button">Show details</button>
        </div>
    )
}