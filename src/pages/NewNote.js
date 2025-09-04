import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_BASE = "http://localhost:8080/app/note";

export default function NewNote() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id"); // check if we are editing

  // 🔹 Fetch old note if editing
  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          const res = await axios.get(`${API_BASE}/${id}`);
          setForm({ title: res.data.title, content: res.data.content });
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // 🔹 Update existing note
        await axios.put(`${API_BASE}/${id}`, null, {
          params: { title: form.title, content: form.content },
        });
      } else {
        // 🔹 Create new note
        await axios.post(`${API_BASE}/add`, null, {
          params: { title: form.title, content: form.content },
        });
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="fw-bold mb-3">{id ? "Edit Note" : "Create New Note"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="5"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}


