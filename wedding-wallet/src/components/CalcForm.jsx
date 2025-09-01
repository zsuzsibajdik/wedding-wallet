import { Option } from "./Option"
import { useState, useEffect } from "react"
function CalcForm (){
    const [vendors, setVendors] = useState('');
    const [venues, setVenues] = useState('');
    const [catering, setCatering] = useState('');
    const [music, setMusic] = useState('');
    const [makeup, setMakeup] = useState('');
    const [decoration, setDecoration] = useState('');
    const [photo, setPhoto] = useState('');
    const [other, setOther] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [venuePrice, setVenuePrice] = useState(0);
    const [cateringPrice, setCateringPrice] = useState(0);
    const [musicPrice, setMusicPrice] = useState(0);
    const [makeupPrice, setMakeupPrice] = useState(0);
    const [decoPrice, setDecoPrice] = useState(0);
    const [photoPrice, setPhotoPrice] = useState(0);
    const [otherPrice, setOtherPrice] = useState(0);
    const [price, setPrice] = useState(0);
    useEffect(() => {
        async function fetchData(){
            const URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json';
            const response = await fetch(URL);
            const data = await response.json();
            setVendors(() =>
                Object.keys(data).map((id) => {
                    return {
                  id,
                  ...data[id],
                }})
              );

        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchData(){
            const URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json?orderBy="type"&equalTo="venue"&print=pretty';
            const response = await fetch(URL);
            const data = await response.json();
            setVenues(() =>
                Object.keys(data).map((id) => {
                    return {
                  id,
                  ...data[id],
                }})
              );

        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchData(){
            const URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json?orderBy="type"&equalTo="catering"&print=pretty';
            const response = await fetch(URL);
            const data = await response.json();
            setCatering(() =>
                Object.keys(data).map((id) => ({
                  id,
                  ...data[id],
                }))
              );
        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchData(){
            const URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json?orderBy="type"&equalTo="music"&print=pretty';
            const response = await fetch(URL);
            const data = await response.json();
            setMusic(() =>
                Object.keys(data).map((id) => ({
                  id,
                  ...data[id],
                }))
              );
        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchData(){
            const URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json?orderBy="type"&equalTo="makeup"&print=pretty';
            const response = await fetch(URL);
            const data = await response.json();
            setMakeup(() =>
                Object.keys(data).map((id) => ({
                  id,
                  ...data[id],
                }))
              );
        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchData(){
            const URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json?orderBy="type"&equalTo="photography"&print=pretty';
            const response = await fetch(URL);
            const data = await response.json();
            setPhoto(() =>
                Object.keys(data).map((id) => ({
                  id,
                  ...data[id],
                }))
              );
        }
        fetchData();
    }, [])
    useEffect(() => {
        async function fetchData(){
            const URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json?orderBy="type"&equalTo="other"&print=pretty';
            const response = await fetch(URL);
            const data = await response.json();
            setOther(() =>
                Object.keys(data).map((id) => ({
                  id,
                  ...data[id],
                }))
              );
        }
        fetchData();
    }, [])
    useEffect(() =>{
        async function fetchData(){
            const URL = 'https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json?orderBy="type"&equalTo="decoration"&print=pretty';
            const response = await fetch(URL);
            const data = await response.json();
            setDecoration(() =>
                Object.keys(data).map((id) => ({
                  id,
                  ...data[id],
                }))
              );
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (
          venues && venues.length > 0 &&
          catering && catering.length > 0 &&
          photo && photo.length > 0 &&
          music && music.length > 0 &&
          makeup && makeup.length > 0 &&
          decoration && decoration.length > 0 &&
          other && other.length > 0
        ) {
          setLoaded(true);
        }
      }, [venues, catering, photo, music, makeup, decoration, other]);

    async function handleSave(e){
        e.preventDefault();
        const calcObject = {
            venue: {},
            decoration: {},
            photo: {},
            music: {},
            catering:{},
            makeup:{},
            other:[],
            date:'',
            sum: price
        }
        const venuesel = document.getElementById('venuesel')
        calcObject.venue = vendors.find((vendor) => vendor.name === venuesel.options[venuesel.selectedIndex].value)
        const cateringsel = document.getElementById('cateringsel')
        calcObject.catering = vendors.find((vendor) => vendor.name === cateringsel.options[cateringsel.selectedIndex].value)
        const musicsel = document.getElementById('musicsel')
        calcObject.music = vendors.find((vendor) => vendor.name === musicsel.options[musicsel.selectedIndex].value)
        const decsel = document.getElementById('decsel')
        calcObject.decoration = vendors.find((vendor) => vendor.name === decsel.options[decsel.selectedIndex].value)
        const makeupsel = document.getElementById('makeupsel')
        calcObject.makeup = vendors.find((vendor) => vendor.name === makeupsel.options[makeupsel.selectedIndex].value)
        const photosel = document.getElementById('photosel')
        calcObject.photo = vendors.find((vendor) => vendor.name === photosel.options[photosel.selectedIndex].value)
        const othersel = document.getElementById('othersel')
        calcObject.other = vendors.find((vendor) => vendor.name === othersel.options[othersel.selectedIndex].value)
        calcObject.date = new Date().toLocaleString();
        calcObject.sum = price

        const res = await fetch('https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/calculations.json', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(calcObject),
        });

        if (!res.ok) {
            throw new Error("Create todo failed");
        }
      }

    function handleVenueChange(e){
        const venue = (vendors.find((vendor) => vendor.name === e.target.value));
        setVenuePrice(venue.price);
        }
    function handleCateringChange(e){
        const venue = (vendors.find((vendor) => vendor.name === e.target.value));
        setCateringPrice(venue.price);
        }
    function handlePhotoChange(e){
        const venue = (vendors.find((vendor) => vendor.name === e.target.value));
        setPhotoPrice(venue.price);
        }
    function handleMusicChange(e){
        const venue = (vendors.find((vendor) => vendor.name === e.target.value));
        setMusicPrice(venue.price);
        }
    function handleMakeupChange(e){
        const venue = (vendors.find((vendor) => vendor.name === e.target.value));
        setMakeupPrice(venue.price);
        }
    function handleDecoChange(e){
        const venue = (vendors.find((vendor) => vendor.name === e.target.value));
        setDecoPrice(venue.price);
        }
    function handleOtherChange(e){
        const venue = (vendors.find((vendor) => vendor.name === e.target.value));
        setOtherPrice(venue.price);
        }

    useEffect(()=>{
        setPrice(venuePrice + cateringPrice + decoPrice + photoPrice + musicPrice + makeupPrice + otherPrice)
    }, [venuePrice, cateringPrice, decoPrice, photoPrice, musicPrice, makeupPrice, otherPrice])

    return(
        <>
       
            {loaded ? ( <div id="calc-div"><form id="calc-form" onSubmit={handleSave}>
                <h2>Let's calculate!</h2>
            <section>
                <label>Venue:</label>
                <select id="venuesel" onChange={handleVenueChange}>
                    <option key="noselect" disabled selected value> -- select an option -- </option>
                    {venues.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
                </select>
            </section>
            <section>
                <label>Catering:</label>
                <select id="cateringsel" onChange={handleCateringChange}>
                    <option key="noselect" disabled selected value> -- select an option -- </option>
                    {catering.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)} 
                </select>
            </section>
            <section>
                <label>Music:</label>
                <select id="musicsel" onChange={handleMusicChange}>
                    <option key="noselect" disabled selected value> -- select an option -- </option>
                    {music.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
                </select>
            </section>
            <section>
                <label>Decoration:</label>
                <select id="decsel" onChange={handleDecoChange}>
                    <option key="noselect" disabled selected value> -- select an option -- </option>
                    {decoration.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
                </select>
            </section>
            <section>
                <label>Makeup:</label>
                <select id="makeupsel" onChange={handleMakeupChange}>
                    <option key="noselect" disabled selected value> -- select an option -- </option>
                    {makeup.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
                </select>
            </section>
            <section>
                <label>Photography:</label>
                <select id="photosel" onChange={handlePhotoChange}>
                    <option key="noselect" disabled selected value> -- select an option -- </option>
                    {photo.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
                </select>
            </section>
            <section>
                <label>Others:</label>
                <select id="othersel" onChange={handleOtherChange}>
                    <option key="noselect" disabled selected value> -- select an option -- </option>
                    {other.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
                </select>
            </section>
            <button type="submit">Save it for later!</button>
        </form>
        <div id="totalprice">
                <h2>The total price currently is:</h2>
                <h2 id="sum">{new Intl.NumberFormat("hu-HU").format(price)} Ft</h2>
            </div>
            </div>) : (<p>Loading</p>)}
        
        </>
    
    )
}

export default CalcForm