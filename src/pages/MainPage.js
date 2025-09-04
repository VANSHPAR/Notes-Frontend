import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8080/app/note";

export default function MainPage() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/getall`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2 className="mb-4 fw-bold">All Notes</h2>
      <div className="row">
        {notes.map((n) => (
          <div className="col-md-4 mb-3" key={n.id}>
            <Link to={`/note/${n.id}`} className="text-decoration-none text-dark">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title">{n.title}</h5>
                  <p className="card-text text-muted text-truncate">{n.content}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {notes.length === 0 && (
        <p className="text-muted">No notes available. Create a new one!</p>
      )}
    </div>
  );
}
