export function CalcCard({ title, sum }){
    return(
        <div className="calccard">
            <h3>{title}</h3>
            <p>{new Intl.NumberFormat("hu-HU").format(sum)} Ft</p>
            <button type="button">Show details</button>
        </div>
    )
}