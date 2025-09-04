import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8080/app/note";

export default function NoteDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);



    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE}/${id}`);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`${API_BASE}/${id}`);
                setNote(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNote();
    }, [id]);

    if (!note) return <p>Loading...</p>;

    return (
        <div className="card shadow-sm p-4">
            <h3 className="fw-bold">{note.title}</h3>
            <p className="mt-2">{note.content}</p>
            <div className="mt-3">
                <button
                    className="btn btn-warning me-2"
                    onClick={() => navigate(`/new?id=${note.id}`)}
                >
                    Update
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
                <button
                    className="btn btn-info ms-2"
                    onClick={() => {
                        const shareUrl = `${window.location.origin}/share/${note.shareId}`;
                        navigator.clipboard.writeText(shareUrl);
                        alert("Share link copied: " + shareUrl);
                    }}
                >
                    Share
                </button>
            </div>
        </div>
    );
}

