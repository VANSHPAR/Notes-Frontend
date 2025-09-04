import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NewNote from "./pages/NewNote";
import NoteDetail from "./pages/NoteDetail";
import SharedNote from "./pages/SharedNote";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">NotesApp</Link>
          <div className="d-flex align-items-center">
            <Link className="nav-link text-white me-3" to="/">Home</Link>
            <Link className="btn btn-light text-primary fw-semibold" to="/new">
              + New
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/note/:id" element={<NoteDetail />} />
          <Route path="/share/:shareId" element={<SharedNote />} />
        </Routes>
      </div>
    </Router>
  );
}

