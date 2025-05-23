import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("invoice", file);
    formData.append("user_email", email);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Upload failed");
        return;
      }

      const data = await res.json();
      setResponse(data);
      fetchInvoices(); // refresh list after upload
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  const fetchInvoices = () => {
    fetch("http://localhost:5000/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

const handleDelete = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this invoice?");
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      alert("Invoice deleted");
      fetchInvoices(); // Refresh the list after deletion
    } else {
      alert("Delete failed: " + data.error);
    }
  } catch (err) {
    console.error("Error deleting invoice:", err);
  }
};


  const filterInvoicesByDate = (date) => {
    const dateString = date.toLocaleDateString('en-GB'); // dd/mm/yyyy
    return invoices.filter(inv => inv.due_date === dateString);
  };

  return (
    <div className="container">
      <h2>📤 Upload Invoice</h2>
<input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
/>
      <input type="file" onChange={handleFileChange} accept="image/*,.pdf" 
/>
      <br />
      <button onClick={handleUpload}>Upload Invoice</button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ Extracted Data:</h3>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}

      <h3>📋 Uploaded Invoices</h3>
      <ul className="invoice-list">
        {invoices.map((inv) => (
  <li key={inv._id} style={{ marginBottom: "10px" }}>
    <strong>{inv.vendor}</strong> — 💵 {inv.amount} — 📅 {inv.due_date}
    <button
      onClick={() => handleDelete(inv._id)}
      style={{
        marginLeft: "10px",
        color: "white",
        background: "red",
        border: "none",
        borderRadius: "5px",
        padding: "4px 8px",
        cursor: "pointer"
      }}
    >
      🗑️ Delete
    </button>
          </li>
        ))}
      </ul>

      <h3>📅 Invoice Due Date Calendar</h3>
      <Calendar onClickDay={setSelectedDate} />

      {selectedDate && (
        <div style={{ marginTop: "20px" }}>
          <h4>Invoices due on: 
{selectedDate.toLocaleDateString('en-GB')}</h4>
          <ul className="invoice-list">
            {filterInvoicesByDate(selectedDate).map((inv) => (
              <li key={inv._id}>
                <strong>{inv.vendor}</strong> — 💵 {inv.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

