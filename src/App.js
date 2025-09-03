import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // import our styles

const API_BASE = "http://localhost:8080/app/note";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(false);

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/add`, null, {
        params: { title: form.title, content: form.content },
      });
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/${selectedNote.id}`, null, {
        params: { title: form.title, content: form.content },
      });
      setEditing(false);
      setSelectedNote(null);
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setSelectedNote(null);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">📝 Notes App</h1>

      <div className="layout">
        {/* Sidebar with notes list */}
        <div className="sidebar">
          <h2>All Notes</h2>
          <ul>
            {notes.map((n) => (
              <li
                key={n.id}
                className={`note-item ${
                  selectedNote && selectedNote.id === n.id ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedNote(n);
                  setForm({ title: n.title, content: n.content });
                  setEditing(false);
                }}
              >
                {n.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Main panel */}
        <div className="main">
          {selectedNote && !editing && (
            <div className="note-details">
              <h3>{selectedNote.title}</h3>
              <p>{selectedNote.content}</p>
              <button onClick={() => setEditing(true)}>✏️ Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(selectedNote.id)}>
                🗑 Delete
              </button>
            </div>
          )}

          <div className="note-form">
            <h2>{editing ? "Edit Note" : "Create Note"}</h2>
            <form onSubmit={editing ? handleUpdate : handleCreate}>
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                rows="5"
              />
              <button type="submit">{editing ? "Update" : "Create"}</button>
              {editing && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setEditing(false);
                    setSelectedNote(null);
                    setForm({ title: "", content: "" });
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

