
import { useState } from "react";
import "./Navbar.css";
import AboutForm from "./AboutForm";

function NavBar() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-links">

          <a href="#home">BOSH SAHIFA</a>
          <a href="#explore">TADQIQ QILISH</a>
          <a href="#archives">ARXIVLAR</a>
          <a href="#security">XAVFSIZLIK</a>

          <button
            className="about-link"
            onClick={() => setShowAbout(true)}
          >
            YANGI
          </button>

        </div>
      </nav>

      {showAbout && (
        <AboutForm onClose={() => setShowAbout(false)} />
      )}
    </>
  );
}

export default NavBar;
