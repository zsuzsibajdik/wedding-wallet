import { useState, useEffect } from "react";
import "../styles/vendorpage.css";

function Vendorpage() {
  const [vendors, setVendors] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("venue");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");

  const vendorTypes = [
    "Venue",
    "Catering",
    "Decoration",
    "Music/DJ",
    "Photography",
    "Makeup",
    "Other",
  ];

  function addVendor(e) {
    e.preventDefault();

    const newVendor = {
      id: Date.now(),
      name: name.trim(),
      type,
      price: Number(price),
      contact: contact.trim(),
    };

    setVendors([...vendors, newVendor]);

    setName("");
    setType("venue");
    setPrice("");
    setContact("");
  }

  function deleteVendor(id) {
    setVendors(vendors.filter((v) => v.id !== id));
  }

  useEffect(() => {
    async function fetchData(){
      const response = await fetch ('https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json');
      const data = await response.json();

      setVendors(() =>
        Object.keys(data).map((id) =>({
          id,
          ...data[id]
        }))
      )
    }
    fetchData();
  })

  return (
    <>
    {vendors ? (<div className="vendors">
      <div className="vendors-content">
        <h2>Vendors</h2>

        <form onSubmit={addVendor}>
          <input
            placeholder="Vendor name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {vendorTypes.map((t) => (
              <option key={t} value={t.toLowerCase()}>{t}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            placeholder="Contact info"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <button type="submit">Add Vendor</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.type}</td>
                <td>{v.price}</td>
                <td>{v.contact}</td>
                <td>
                  <button onClick={() => deleteVendor(v.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {vendors.length === 0 && (
              <tr>
                <td colSpan="5">No vendors yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>) : (<p>Loading</p>)}
    </>
  );
}

export default Vendorpage;