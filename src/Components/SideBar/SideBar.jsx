import { useState } from "react";
import "../CSS/SideBar.css";
import { useEffect } from "react";

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const settingsBtn = document.querySelector(".settings-btn");
    const overlay = document.getElementById("settingsOverlay");

    if (settingsBtn && overlay) {
      const handleSettingsClick = (e) => {
        e.stopPropagation();
        showOverlay();
      };

      const handleOverlayClick = (e) => {
        if (e.target === overlay) {
          hideOverlay();
        }
      };

      settingsBtn.addEventListener("click", handleSettingsClick);
      overlay.addEventListener("click", handleOverlayClick);

      return () => {
        settingsBtn.removeEventListener("click", handleSettingsClick);
        overlay.removeEventListener("click", handleOverlayClick);
      };
    }
  }, []);

  const togglePersonaMenu = () => {
    const menu = document.getElementById("personaMenu");
    const elements = menu.querySelectorAll(
      "h4, input, textarea, .image-upload-container, button"
    );

    if (menu.style.display === "none") {
      menu.style.display = "block";
      setTimeout(() => {
        menu.style.transform = "translateX(0) scale(1)";
        menu.style.opacity = "1";
        elements.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      }, 10);
    } else {
      elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(-10px)";
      });
      menu.style.transform = "translateX(-20px) scale(0.95)";
      menu.style.opacity = "0";
      setTimeout(() => {
        menu.style.display = "none";
      }, 400);
    }
  };

  const submitPersona = () => {
    const nameInput = document.querySelector('input[placeholder="Name"]');
    const descInput = document.querySelector('textarea[placeholder="Description"]');

    if (!nameInput.value.trim() || !descInput.value.trim()) {
      alert("Please enter both name and description");
      return;
    }

    const personaData = {
      Name: nameInput.value.trim(),
      Description: descInput.value.trim(),
    };

    localStorage.setItem("savedPersona", JSON.stringify(personaData));

    fetch("https://server-hhcx.onrender.com/persona", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personaData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        togglePersonaMenu();
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        console.error("Error:", error);
      });
  };

  const loadSavedPersona = () => {
    const savedPersona = localStorage.getItem("savedPersona");
    if (savedPersona) {
      const { Name, Description } = JSON.parse(savedPersona);
      document.querySelector('input[placeholder="Name"]').value = Name;
      document.querySelector('textarea[placeholder="Description"]').value = Description;
    }
  };

  const showOverlay = () => {
    const overlay = document.getElementById("settingsOverlay");
    overlay.style.display = "block";
    requestAnimationFrame(() => {
      overlay.classList.add("active");
    });

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    document.getElementById("loggedInButtons").style.display = isLoggedIn
      ? "block"
      : "none";
    document.getElementById("loggedOutButtons").style.display = isLoggedIn
      ? "none"
      : "block";
  };

  const hideOverlay = () => {
    const overlay = document.getElementById("settingsOverlay");
    overlay.classList.remove("active");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 300);
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    hideOverlay();
    window.location.href = "index.html";
  };

  const toggleHiddenTags = () => {
    const section = document.getElementById("hiddenTagsSection");
    section.classList.toggle("active");
    if (section.classList.contains("active")) {
      const hiddenTags = JSON.parse(localStorage.getItem("hiddenTags") || "[]");
      const container = document.getElementById("hiddenTagsList");
      container.innerHTML = "";
      hiddenTags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.className = "hidden-tag";
        tagElement.textContent = tag;
        tagElement.onclick = () => unhideTag(tag);
        container.appendChild(tagElement);
      });
    }
  };

  const unhideTag = (tag) => {
    const hiddenTags = JSON.parse(localStorage.getItem("hiddenTags") || "[]");
    const updatedTags = hiddenTags.filter((t) => t !== tag);
    localStorage.setItem("hiddenTags", JSON.stringify(updatedTags));
    toggleHiddenTags();
  };

  const addNewTag = () => {
    const input = document.getElementById("newTagInput");
    const tag = input.value.trim();
    if (tag) {
      const hiddenTags = JSON.parse(localStorage.getItem("hiddenTags") || "[]");
      if (!hiddenTags.includes(tag)) {
        hiddenTags.push(tag);
        localStorage.setItem("hiddenTags", JSON.stringify(hiddenTags));
        toggleHiddenTags();
      }
      input.value = "";
    }
  };

  const toggleSettingsOverlayOff  = () => {
    hideOverlay();
  };

  return (
    <>
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <div className="toggle-area" onClick={toggleSidebar}>
        <i className={`bi ${isExpanded ? "bi-x-lg" : "bi-list"}`}></i>
      </div>
      <button className="btn sidebar-btn" data-tooltip="Persona" onClick={togglePersonaMenu}>
        <i className="bi bi-person-circle"></i>
        {isExpanded && <span>Persona</span>}
      </button>
      <button className="btn sidebar-btn" data-tooltip="Settings" onClick={() => setIsSettingsOpen(true)}>
        <i className="bi bi-gear"></i>
        {isExpanded && <span>Settings</span>}
      </button>
      <button className="btn sidebar-btn" onClick={() => (window.location.href = "guideline.html")} data-tooltip="Help">
        <i className="bi bi-question-circle"></i>
        {isExpanded && <span>Help</span>}
      </button>
      <button className="btn sidebar-btn" onClick={() => (window.location.href = "/Chats")} data-tooltip="Chats">
        <i className="bi bi-chat"></i>
        {isExpanded && <span>Chats</span>}
      </button>
      <button className="btn sidebar-btn create-btn" onClick={() => (window.location.href = "create.html")} data-tooltip="Create">
        <i className="bi bi-plus-circle"></i>
        {isExpanded && <span>Create</span>}
      </button>
    </div>
    <div
          id="personaMenu"
          style={{
            display: "none",
            position: "absolute",
            left: "70px",
            top: "0",
            background: "#000",
            color: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            width: "300px",
            transform: "translateX(-20px) scale(0.95)",
            opacity: "0",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <h4
            style={{
              marginBottom: "20px",
              fontWeight: "600",
              opacity: "0",
              transform: "translateY(-10px)",
              transition: "all 0.3s ease 0.2s",
            }}
          >
            Persona
          </h4>
          <input
            type="text"
            placeholder="Name"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #333",
              borderRadius: "8px",
              background: "#111",
              color: "#fff",
              transition: "all 0.3s ease",
              opacity: "0",
              transform: "translateY(-10px)",
              transitionDelay: "0.3s",
            }}
          />
          <textarea
            placeholder="Description"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #333",
              borderRadius: "8px",
              minHeight: "120px",
              background: "#111",
              color: "#fff",
              transition: "all 0.3s ease",
              opacity: "0",
              transform: "translateY(-10px)",
              transitionDelay: "0.4s",
            }}
          ></textarea>
          <button
            onClick={submitPersona}
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: "#4a90e2",
              color: "#fff",
              border: "none",
              transition: "all 0.2s ease",
              opacity: "0",
              transform: "translateY(-10px)",
              transitionDelay: "0.6s",
            }}
          >
            Submit
          </button>
        </div>
        
    </>
  );
}
