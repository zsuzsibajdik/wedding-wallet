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
            other:[]
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

    return(
        <>
        {loaded ? (<form onSubmit={handleSave}>
        <section>
            <label>Venue:</label>
            <select id="venuesel">
                {venues.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
            </select>
        </section>
        <section>
            <label>Catering:</label>
            <select id="cateringsel">
                {catering.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)} 
            </select>
        </section>
        <section>
            <label>Music:</label>
            <select id="musicsel">
                {music.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
            </select>
        </section>
        <section>
            <label>Decoration:</label>
            <select id="decsel">
                {decoration.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
            </select>
        </section>
        <section>
            <label>Makeup:</label>
            <select id="makeupsel">
                {makeup.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
            </select>
        </section>
        <section>
            <label>Photography:</label>
            <select id="photosel">
                {photo.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
            </select>
        </section>
        <section>
            <label>Others:</label>
            <select id="othersel">
                {other.map((vendor) => <Option key={vendor.id} name={vendor.name}/>)}
            </select>
        </section>  
        <button type="submit">Save it for later!</button>
    </form>) : (<p>Loading</p>)}
        </>
    
    )
}

export default CalcForm