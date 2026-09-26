import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [clowns, setClowns] = useState([]);
const [search, setSearch] = useState("");
const [secretMode, setSecretMode] = useState(false);
const [secretLoading, setSecretLoading] = useState(false);
const [unknownCase, setUnknownCase] = useState(false);
const [threeThirtyThree, setThreeThirtyThree] = useState(false);
const [selectedClown, setSelectedClown] = useState(null);
const [phoneNumber, setPhoneNumber] = useState("");
const [orderedClown, setOrderedClown] = useState(null);
const [titleClicks, setTitleClicks] = useState(0);
const [titleSecret, setTitleSecret] = useState(null);
const [missingClown, setMissingClown] = useState(false);

  useEffect(() => {
    fetch("/api/clowns")
      .then((response) => response.json())
      .then((data) => setClowns(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      if (hours === 3 && minutes === 33) {
        setThreeThirtyThree(true);
      }
    };

    checkTime();

    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMissingClown(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleOrder = (clown) => {
    setSelectedClown(clown);
    setPhoneNumber("");
    setOrderedClown(null);
  };

  const submitOrder = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clownName: selectedClown.name,
        phoneNumber: phoneNumber,
        caseNumber: selectedClown.caseNumber,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Buyurtmada xato");
    }

    setOrderedClown(selectedClown);
    setSelectedClown(null);
    setPhoneNumber("");
  } catch (error) {
    console.error("Buyurtma xatosi:", error);
    alert("Buyurtmani yuborishda xatolik yuz berdi.");
  }
};

  const closePopup = () => {
    setSelectedClown(null);
    setOrderedClown(null);
    setPhoneNumber("");
  };

  // QIDIRUV
  const filteredClowns = clowns.filter((clown) => {
    const searchText = search.toLowerCase();

    return (
      clown.name.toLowerCase().includes(searchText) ||
      clown.alias.toLowerCase().includes(searchText) ||
      clown.location.toLowerCase().includes(searchText) ||
      clown.caseNumber.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="home">

      <h1
        className="home-title"
        onClick={() => {
          const newCount = titleClicks + 1;

          setTitleClicks(newCount);

          if (newCount === 5) {
            setTitleSecret("stop");
          }

          if (newCount === 10) {
            setTitleSecret("again");
          }

          if (newCount === 15) {
            setTitleSecret("scary");
          }

          if (newCount === 20) {
            setTitleSecret("error");
          }
        }}
      >
        Dark-Net Masxarabozlar Bazasi
      </h1>

      {/* QIDIRUV SATRI */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="BAZANI QIDIRISH..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            if (value.toLowerCase() === "redroom") {
              setSecretLoading(true);

              setTimeout(() => {
                setSecretLoading(false);
                setSecretMode(true);
              }, 1500);
            }

            if (value.toLowerCase() === "dn-000-???") {
              setUnknownCase(true);
            } else {
              setUnknownCase(false);
            }
          }}
        />
      </div>

      {secretLoading && (
  <div className="secret-loading">
    <p>MAXFIY BAZAGA ULANILMOQDA...</p>
    <p>████████████████</p>
    <p>RUXSAT TEKSHIRILMOQDA...</p>
  </div>
)}

      {secretMode && (
        <div className="secret-file">

          <div className="secret-warning">
            ⚠ MAXFIY BAZAGA KIRISH ⚠
          </div>

          <h2>ISH DN-000-???</h2>

          <div className="secret-line">
            HOLATI: <span>NOMA'LUM</span>
          </div>

          <div className="secret-line">
            SUBYEKT: <span>████████</span>
          </div>

          <div className="secret-line">
            JOYLASHUVI: <span>████████████</span>
          </div>

          <div className="secret-line">
            TAHDID DARAJASI: <span className="secret-danger">???/10</span>
          </div>

          <div className="secret-description">
            Bu subyekt hech qachon bazaga qo'shilmagan.
            <br />
            <br />
            U allaqachon shu yerda edi.
          </div>

          <div className="secret-warning bottom-warning">
            ⚠ ULANISHNI TO'XTATISH KERAK ⚠
          </div>

          <button
            className="secret-close"
            onClick={() => {
              setSecretMode(false);
              setSearch("");
            }}
          >
            BAZAGA QAYTISH
          </button>

        </div>
      )}

      {search === "404" && (
        <div className="error-404">
          <div className="error-glitch">BAZA XATOSI 404</div>

          <p>HECH QANDAY MASXARABOZ TOPILMADI.</p>

          <p className="error-small">
            ...
          </p>

          <p className="error-red">
            BOSHQA NARSA TOPILDI.
          </p>
        </div>
      )}

      {search.toLowerCase() === "blood" && (
        <div className="blood-easter-egg">
          <div className="blood-warning">
            ⚠ RUXSATSIZ SO'ROV ⚠
          </div>

          <p>QIDIRUV SO'ZI NAZORATGA OLINDI.</p>

          <p className="blood-reason">
            SABAB: ████████████████
          </p>

          <p className="blood-final">
            SO'ROV TO'XTATILDI.
          </p>
        </div>
      )}

      {search.toLowerCase() === "who" && (
        <div className="who-easter-egg">
          <div className="who-title">
            BAZA SO'ROVI
          </div>

          <p>KIMNI QIDIRYAPSIZ?</p>

          <p className="who-warning">
            YAXSHIROQ SAVOL:
          </p>

          <p className="who-final">
            SIZNI KIM QIDIRYAPTI?
          </p>
        </div>
      )}

      {unknownCase && (
        <div className="unknown-case">

          <div className="unknown-header">
            ⚠ MAXFIY ISH FAYLI ⚠
          </div>

          <h2>ISH DN-000-???</h2>

          <div className="unknown-line">
            HOLATI: <span>FAOL</span>
          </div>

          <div className="unknown-line">
            SUBYEKT: <span>████████</span>
          </div>

          <div className="unknown-line">
            BAZAGA OXIRGI KIRISH: <span>HOZIRGINA</span>
          </div>

          <div className="unknown-line">
            KIRGAN SHAXS: <span>SIZ</span>
          </div>

          <div className="unknown-warning">
            ⚠ BU ISHGA KIRISH MUMKIN BO'LMASLIGI KERAK EDI
          </div>

        </div>
      )}

      {search === "000" && (
        <div className="zero-easter-egg">

          <div className="zero-title">
            NOMAQBUL ISH RAQAMI
          </div>

          <p>000-ISH MAVJUD EMAS.</p>

          <p className="zero-small">
            001–999 raqamli ishlar mavjud.
          </p>

          <p className="zero-final">
            000-ISH MAVJUD EMAS.
          </p>

        </div>
      )}

      {threeThirtyThree && (
        <div className="three-three-three">
          <div className="three-title">
            TIZIM HOLATI: ███████
          </div>

          <p>BAZA BILAN ULANISH: FAOL</p>
          <p>VAQT: 03:33</p>

          <div className="three-warning">
            NIMADIR NOTO'G'RI.
          </div>

          <div className="three-final">
            BU OYNANI YOPMANG.
          </div>
        </div>
      )}

      {titleSecret === "stop" && (
        <div className="title-secret">
          <div className="title-secret-main">
            BOSISHNI TO'XTATING!
          </div>
        </div>
      )}

      {titleSecret === "again" && (
        <div className="title-secret">
          <div className="title-secret-main">
            TO'XTATING DEDIM!
          </div>
        </div>
      )}

      {titleSecret === "scary" && (
        <div className="title-secret scary-secret">
          <div className="title-secret-main">
            NEGA HALI HAM BOSYAPSIZ?
          </div>

          <p>SIZ BUNI TOPISHINGIZ KERAK EMAS EDI.</p>

          <p className="scary-final">
            U SIZ BU YERDALIGINGIZNI BILADI.
          </p>
        </div>
      )}

      {titleSecret === "error" && (
        <div className="title-secret database-error">
          <div className="error-title">
            BAZA XATOSI
          </div>

          <p>TIZIMDA KRITIK NOSOZLIK</p>

          <p>BOSISH CHEGARASI OSHIRIB YUBORILDI</p>

          <p>ULANISH UZILDI</p>

          <div className="error-code">
            XATO KODI: DN-20-CLICK
          </div>

          <p className="error-final">
            SAHIFANI YANGILAMANG.
          </p>
        </div>
      )}

      {search.toLowerCase() === "saidakbar" && (
        <div className="user-easter-egg">

          <div className="user-title">
            FOYDALANUVCHI MA'LUMOTLARI OCHILMOQDA...
          </div>

          <div className="user-line">
            ISM: <span>█████████</span>
          </div>

          <div className="user-line">
            HOLATI: <span>HOZIRDA ONLAYN</span>
          </div>

          <div className="user-line">
            KIRISH DARAJASI: <span>NOMA'LUM</span>
          </div>

          <div className="user-warning">
            ⚠ NEGA O'ZINGIZNI QIDIRYAPSIZ?
          </div>

        </div>
      )}

      <div className="clown-grid">

        {filteredClowns.map((clown) => (
          <div className="clown-card" key={clown.id}>
            <img src={clown.image} alt={clown.name} />

            <h2 className="clown-name">
              {clown.name}
            </h2>

            <p className="clown-description">
              {clown.description}
            </p>

            <div className="clown-info">

              <p>
                Holati: <span>{clown.status}</span>
              </p>

              <p>
                Oxirgi ko'rilgan: <span>{clown.lastSeen}</span>
              </p>

              <p>
                Joylashuvi: <span>{clown.location}</span>
              </p>

              <p>
                Xavf darajasi:{" "}
                <span className={`threat-level threat-${clown.threatLevel}`}>
                  {clown.threatLevel}/10
                </span>
              </p>

            </div>

            <button
              className="order-btn"
              onClick={() => handleOrder(clown)}
            >
              BUYURTMA BERISH
            </button>

          </div>
        ))}

      </div>

      {/* TELEFON RAQAMI OYNASI */}
      {selectedClown && (
        <div className="order-overlay">

          <div className="order-popup">

            <button
              className="order-close"
              onClick={closePopup}
            >
              ×
            </button>

            <h2>MASXARABOZGA BUYURTMA</h2>

            <p className="order-text">
              Siz buyurtma beryapsiz:
            </p>

            <h3>
              {selectedClown.name}
            </h3>

            <form onSubmit={submitOrder}>

              <input
                type="tel"
                placeholder="Telefon raqamingiz"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <button type="submit">
                BUYURTMA BERISH
              </button>

            </form>

          </div>

        </div>
      )}

      {/* MUVAFFAQIYAT OYNASI */}
      {orderedClown && (
        <div className="order-overlay">

          <div className="order-popup success-popup">

            <button
              className="order-close"
              onClick={closePopup}
            >
              ×
            </button>

            <h2>BUYURTMA MUVAFFAQIYATLI</h2>

            <p>
              Buyurtma muvaffaqiyatli berildi:
            </p>

            <h3>
              {orderedClown.name}
            </h3>

            <p className="success-text">
              Masxaraboz yuborildi.
            </p>

            <button
              className="success-btn"
              onClick={closePopup}
            >
              YOPISH
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Home;
