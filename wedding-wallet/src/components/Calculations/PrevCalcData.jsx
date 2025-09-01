export function PrevCalcData({object, setCalcs}){
    function handleX(){
        setCalcs('')
    }
    return(
        <>
        <div>
            <button type="button" onClick={handleX}>X</button>
            <h2>Your calculation</h2>
            <h5>{object.date}</h5>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Contact</th>
                        <th>Booked</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Venue</td>
                        <td>{object.venue.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.venue.price)} Ft</td>
                        <td>{object.venue.contact}</td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Catering</td>
                        <td>{object.catering.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.catering.price)} Ft</td>
                        <td>{object.catering.contact}</td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Music</td>
                        <td>{object.music.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.music.price)} Ft</td>
                        <td>{object.music.contact}</td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Decoration</td>
                        <td>{object.decoration.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.decoration.price)} Ft</td>
                        <td>{object.decoration.contact}</td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Makeup</td>
                        <td>{object.makeup.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.makeup.price)} Ft</td>
                        <td>{object.makeup.contact}</td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Photography</td>
                        <td>{object.photo.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.photo.price)} Ft</td>
                        <td>{object.photo.contact}</td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Other</td>
                        <td>{object.other.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.other.price)} Ft</td>
                        <td>{object.other.contact}</td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}