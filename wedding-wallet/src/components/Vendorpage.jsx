import { useState } from "react";

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

    // reset form
    setName("");
    setType("venue");
    setPrice("");
    setContact("");
  }

  function deleteVendor(id) {
    setVendors(vendors.filter((v) => v.id !== id));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Vendors</h2>

      <form onSubmit={addVendor} style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <input
          placeholder="Vendor name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          {vendorTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
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

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
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
              <td colSpan="5" style={{ opacity: 0.7 }}>No vendors yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Vendorpage;