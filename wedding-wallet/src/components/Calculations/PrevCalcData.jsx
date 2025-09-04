const BASE_URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/'

export function PrevCalcData({object, setCalcs}){
    function handleX(){
        setCalcs('')
    }

    function bookVendor(id){
        fetch(`${BASE_URL}vendors/${id}.json`, 
          { 
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({booked: true})
           })
      }
    return(
        <>
        <div id="prevcalcmodal">
            <div id="buttondiv">
                <button id="xbutton" type="button" onClick={handleX}>X</button>
            </div>
            <h2>Your calculation</h2>
            <h5>{object.date}</h5>
            <table id="prevcalctable">
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
                            <input type="checkbox" onChange={() => bookVendor(object.venue.id)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Catering</td>
                        <td>{object.catering.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.catering.price)} Ft</td>
                        <td>{object.catering.contact}</td>
                        <td>
                            <input type="checkbox" onChange={() => bookVendor(object.catering.id)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Music</td>
                        <td>{object.music.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.music.price)} Ft</td>
                        <td>{object.music.contact}</td>
                        <td>
                            <input type="checkbox" onChange={() => bookVendor(object.music.id)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Decoration</td>
                        <td>{object.decoration.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.decoration.price)} Ft</td>
                        <td>{object.decoration.contact}</td>
                        <td>
                            <input type="checkbox" onChange={() => bookVendor(object.decoration.id)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Makeup</td>
                        <td>{object.makeup.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.makeup.price)} Ft</td>
                        <td>{object.makeup.contact}</td>
                        <td>
                            <input type="checkbox" onChange={() => bookVendor(object.makeup.id)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Photography</td>
                        <td>{object.photo.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.photo.price)} Ft</td>
                        <td>{object.photo.contact}</td>
                        <td>
                            <input type="checkbox" onChange={() => bookVendor(object.photo.id)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Other</td>
                        <td>{object.other.name}</td>
                        <td>{new Intl.NumberFormat("hu-HU").format(object.other.price)} Ft</td>
                        <td>{object.other.contact}</td>
                        <td>
                            <input type="checkbox" onChange={() => bookVendor(object.other.id)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}