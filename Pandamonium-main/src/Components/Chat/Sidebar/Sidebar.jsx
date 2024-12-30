import { useState, useEffect } from "react";
import "./styles.css";

export default function Buttons() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    if (isMobile) {
        return null;
    }

    return (
        <>
            <button
                onClick={handleClick}
                id="pandaBtn"
                className={`floating-btn ${isSidebarOpen ? 'open' : 'closed'}`}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: isSidebarOpen ? "calc(240px + 20px)" : "calc(20px)",
                    cursor: "pointer",
                    zIndex: 999,
                    transition: "left 0.6s ease, transform 0.3s ease",
                    boxShadow: "none",
                }}
            >
                <img
                    src="/src/assets/animal.png"
                    alt="Red Panda"
                    className="panda-image"
                    style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                    }}
                />
            </button>

            <div
                id="sidebar"
                className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
                style={{
                    transition: "width 0.5s ease-in-out, background-color 0.3s ease",
                    width: isSidebarOpen ? "240px" : "0px",
                    backgroundColor: "#1a2d4d",
                    height: "100vh",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    zIndex: 998,
                    overflow: "hidden",
                    boxShadow: "4px 0px 20px rgba(0, 0, 0, 0.4)",
                    borderRadius: "0 20px 20px 0",
                }}
            />
        </>
    );
}
