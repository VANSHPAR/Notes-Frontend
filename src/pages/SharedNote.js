import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://notes-backend-latest.onrender.com/app/note";

export default function SharedNote() {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${API_BASE}/share/${shareId}`);
        setNote(res.data);
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Note not found");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [shareId]);

  if (loading) return <p className="text-light">Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="card bg-dark text-light shadow">
        <div className="card-body">
          <h3 className="card-title">{note.title}</h3>
          <p className="card-text">{note.content}</p>
        </div>
      </div>
    </div>
  );
}
