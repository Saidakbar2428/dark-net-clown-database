
import { useState } from "react";
import "./AboutForm.css";

function AboutForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    realName: "",
    description: "",
    status: "",
    lastSeen: "",
    location: "",
    threatLevel: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // DN-583-KPX kabi raqam yaratadi
  const generateCaseNumber = () => {
    const numbers = Math.floor(100 + Math.random() * 900);

    const letters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("");

    return `DN-${numbers}-${letters}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mavjud barcha masxarabozlarni olish
      const response = await fetch("http://localhost:5001/clowns");
      const clowns = await response.json();

      let newCaseNumber;

      // Ish raqami noyob bo‘lguncha yangi raqam yaratish
      do {
        newCaseNumber = generateCaseNumber();
      } while (
        clowns.some(
          (clown) => clown.caseNumber === newCaseNumber
        )
      );

      // Yangi masxarabozni qo‘shish
      const addResponse = await fetch(
        "http://localhost:5001/clowns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            threatLevel: Number(formData.threatLevel),
            caseNumber: newCaseNumber
          })
        }
      );

      const data = await addResponse.json();

      console.log("Yangi masxaraboz qo‘shildi:", data);

      onClose();
    } catch (error) {
      console.error("Xato:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="about-popup">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h2>YANGI MASXARABOZ QO‘SHISH</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Ismi"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="alias"
            placeholder="Laqabi"
            value={formData.alias}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="realName"
            placeholder="Haqiqiy ismi"
            value={formData.realName}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Tavsifi"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="status"
            placeholder="Holati"
            value={formData.status}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastSeen"
            placeholder="Oxirgi ko‘rilgan vaqti"
            value={formData.lastSeen}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Joylashuvi"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="threatLevel"
            placeholder="Tahdid darajasi (1-10)"
            min="1"
            max="10"
            value={formData.threatLevel}
            onChange={handleChange}
            required
          />

          <button type="submit">
            MASXARABOZ QO‘SHISH
          </button>

        </form>
      </div>
    </div>
  );
}

export default AboutForm;
