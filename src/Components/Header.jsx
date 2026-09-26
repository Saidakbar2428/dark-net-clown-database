
import { useState } from "react";
import "./Header.css";
import AboutForm from "./AboutForm";

function Header() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="header">

        <div className="logo">
          <span className="logo-dot"></span>
          DARK<span>NET</span>
        </div>

        <nav className="nav">
          <a href="#home">Bosh sahifa</a>
          <a href="#explore">Tadqiq qilish</a>
          <a href="#security">Xavfsizlik</a>

          <button
            className="about-link"
            onClick={() => setShowAbout(true)}
          >
            Yangi
          </button>
        </nav>

        <button className="enter-btn">
          DARK.NET
        </button>

      </header>

      {showAbout && (
        <AboutForm onClose={() => setShowAbout(false)} />
      )}
    </>
  );
}

export default Header;
