import { useEffect, useMemo, useState } from "react";
import "../styles/vendorpage.css";

function Vendorpage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);


  const [name, setName] = useState("");
  const [type, setType] = useState("venue");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");

  //uj filter state
  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");

  const vendorTypes = [
    "venue",
    "catering",
    "decoration",
    "music",
    "photography",
    "makeup",
    "other",
  ];


  useEffect(() => {
    async function fetchData() {
      const url =
        "https://wedding-wallet-codecool-default-rtdb.europe-west1.firebasedatabase.app/vendors.json";
      const res = await fetch(url);
      const data = await res.json();
      const loaded = data
        ? Object.keys(data).map((id) => ({ id, ...data[id] }))
        : [];
      setVendors(loaded);
      setLoading(false);
    }
    fetchData();
  }, []);

  
  function addVendor(e) {
    e.preventDefault();
    const newVendor = {
      id: Date.now().toString(),
      name: name.trim(),
      type,
      price: Number(price),
      contact: contact.trim(),
    };
    setVendors((prev) => [...prev, newVendor]);

    setName("");
    setType("venue");
    setPrice("");
    setContact("");
  }

  function deleteVendor(id) {
    setVendors((prev) => prev.filter((v) => v.id !== id));
  }

  
  const filteredVendors = useMemo(() => {
    const text = searchText.trim().toLowerCase();
    return vendors.filter((v) => {
      const okType = filterType === "all" || v.type === filterType;
      const okText =
        text === "" || (v.name ?? "").toLowerCase().includes(text);
      return okType && okText;
    });
  }, [vendors, filterType, searchText]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="vendors">
      <div className="vendors-content">
        <h2>Vendors</h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Show:
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">all</option>
              {vendorTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <input
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        
        <form onSubmit={addVendor} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <input
            placeholder="Vendor name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            {vendorTypes.map((t) => (
              <option key={t} value={t}>
                {t[0].toUpperCase() + t.slice(1)}
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
            {filteredVendors.map((v) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>{v.type}</td>
                <td>{new Intl.NumberFormat("hu-HU").format(v.price)} Ft</td>
                <td>{v.contact}</td>
                <td>
                  <button onClick={() => deleteVendor(v.id)}>Delete</button>
                </td>
              </tr>
            ))}

            {filteredVendors.length === 0 && (
              <tr>
                <td colSpan="5" style={{ opacity: 0.7 }}>
                  No vendors match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vendorpage;