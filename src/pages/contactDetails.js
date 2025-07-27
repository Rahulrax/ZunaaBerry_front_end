import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    axios
      .get("https://zunnaberry-server.onrender.com/api/contact", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch contacts", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: No token found");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?",
    );
    if (!confirmDelete) return;

    axios
      .delete(`https://zunnaberry-server.onrender.com/api/contact/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(() => {
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
      })
      .catch((err) => {
        console.error("Failed to delete contact", err);
        alert("Error deleting contact.");
      });
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact,
  );
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return <p style={{ padding: "1rem" }}>Loading contact details...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Submitted Contact Forms</h2>
      {currentContacts.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div>
          {currentContacts.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#f9f9f9",
                position: "relative",
              }}
            >
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              {item.phone && (
                <p>
                  <strong>Phone:</strong> {item.phone}
                </p>
              )}
              <p>
                <strong>Message:</strong> {item.message}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#555" }}>
                Submitted at: {new Date(item.submittedAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(item._id)}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  backgroundColor: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      margin: "0 5px",
                      padding: "0.5rem 1rem",
                      backgroundColor: page === currentPage ? "#333" : "#eee",
                      color: page === currentPage ? "#fff" : "#000",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
