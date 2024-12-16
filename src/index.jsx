
import FetchCharacters from "./Characters/characters";
import "./index.css";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "./assets/footer.png";

// function Homepage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const filterCharactersBySearch = (searchTerm) => {
//     const cards = document.querySelectorAll(".character-card");
//     searchTerm = searchTerm.toLowerCase();
//
//     cards.forEach((card) => {
//       const name = card.querySelector("h3").textContent.toLowerCase();
//       const description = card.querySelector("p").textContent.toLowerCase();
//       const matches = name.includes(searchTerm) || description.includes(searchTerm);
//       card.style.display = matches ? "block" : "none";
//     });
//   };
//   useEffect(() => {
//     FetchCharacters();
//     initializeDropdown();
//   }, []);
//
//   const initializeDropdown = () => {
//     const dropdownButton = document.getElementById("tagsDropdown");
//     const dropdownMenu = document.querySelector(".dropdown-menu");
//
//     if (dropdownButton) {
//       dropdownButton.addEventListener("click", (e) => {
//         e.preventDefault();
//         if (dropdownMenu) {
//           dropdownMenu.classList.toggle("show");
//         }
//       });
//     }
//   };
//
//   fetch("https://server-hhcx.onrender.com/tags")
//     .then((response) => response.json())
//     .then((tags) => {
//       const tagsList = document.getElementById("tagsList");
//       tags.forEach((tag) => {
//         if (!tagsList.innerHTML.includes(tag)) {
//           const li = document.createElement("li");
//           li.innerHTML = `<a class="dropdown-item" style="color: white;" href="#" onclick="handleTagClick('${tag}')">${tag}</a>`;
//           tagsList.appendChild(li);
//         }
//       });
//     })
//     .catch((error) => console.error("Error loading tags:", error));
//
//   const selectedTags = new Set();
//
//   const handleTagClick = (tag) => {
//     if (tag === "None") {
//       selectedTags.clear();
//     } else {
//       selectedTags.add(tag);
//     }
//     updateSelectedTagsDisplay();
//     filterCharacters();
//     updateTagsVisibility();
//   };
//
//   const removeTag = (tag) => {
//     selectedTags.delete(tag);
//     updateSelectedTagsDisplay();
//     filterCharacters();
//     updateTagsVisibility();
//   };
//
//   const updateSelectedTagsDisplay = () => {
//     const container = document.getElementById("selectedTags");
//     container.innerHTML = "";
//     selectedTags.forEach((tag) => {
//       const tagElement = document.createElement("span");
//       tagElement.className =
//         "badge bg-primary me-1 mb-1 animate__animated animate__fadeIn";
//       tagElement.style.padding = "5px 10px";
//       tagElement.style.borderRadius = "15px";
//       tagElement.style.transition = "all 0.3s ease";
//       tagElement.innerHTML = `${tag} <span style="cursor: pointer; margin-left: 5px" onclick="removeTag('${tag}')">&times;</span>`;
//       container.appendChild(tagElement);
//     });
//   };
//
//   const updateTagsVisibility = () => {
//     const tagsList = document.getElementById("tagsList");
//     const tagItems = tagsList.querySelectorAll(".dropdown-item");
//     tagItems.forEach((item) => {
//       const tagText = item.textContent;
//       if (selectedTags.has(tagText)) {
//         item.style.display = "none";
//       } else {
//         item.style.display = "block";
//       }
//     });
//   };
//
//   const filterCharacters = () => {
//     const cards = document.querySelectorAll(".character-card");
//
//     if (selectedTags.size === 0) {
//       cards.forEach((card) => {
//         card.style.display = "block";
//       });
//       return;
//     }
//
//     cards.forEach((card) => {
//       const tag = card.querySelector(".badge").textContent;
//       const shouldShow = selectedTags.has(tag);
//       card.style.display = shouldShow ? "block" : "none";
//     });
//   };
//
//   document.addEventListener("DOMContentLoaded", () => {
//     const searchInput = document.querySelector(".search-input");
//     const tagsDropdownContainer = document.getElementById("tagsDropdownContainer");
//
//     if (!searchInput || !tagsDropdownContainer) {
//       console.error("searchInput or tagsDropdownContainer not found in the DOM.");
//       return;
//     }
//
//     const updateTagsDropdownPosition = () => {
//       const searchInputRect = searchInput.getBoundingClientRect();
//       tagsDropdownContainer.style.position = "absolute";
//       tagsDropdownContainer.style.top = `${
//         window.innerWidth <= 768 ? searchInputRect.bottom + 10 : 300
//       }px`;
//       tagsDropdownContainer.style.left = `${searchInputRect.left}px`;
//       tagsDropdownContainer.style.width = `${searchInputRect.width}px`;
//     };
//
//     updateTagsDropdownPosition();
//     window.addEventListener("resize", updateTagsDropdownPosition);
//     window.addEventListener("orientationchange", updateTagsDropdownPosition);
//   });
//
//   const togglePersonaMenu = () => {
//     const menu = document.getElementById("personaMenu");
//     const elements = menu.querySelectorAll(
//       "h4, input, textarea, .image-upload-container, button",
//     );
//
//     if (menu.style.display === "none") {
//       menu.style.display = "block";
//       setTimeout(() => {
//         menu.style.transform = "translateX(0) scale(1)";
//         menu.style.opacity = "1";
//         elements.forEach((el) => {
//           el.style.opacity = "1";
//           el.style.transform = "translateY(0)";
//         });
//       }, 10);
//     } else {
//       elements.forEach((el) => {
//         el.style.opacity = "0";
//         el.style.transform = "translateY(-10px)";
//       });
//       menu.style.transform = "translateX(-20px) scale(0.95)";
//       menu.style.opacity = "0";
//       setTimeout(() => {
//         menu.style.display = "none";
//       }, 400);
//     }
//   };
//
//   const submitPersona = () => {
//     const nameInput = document.querySelector('input[placeholder="Name"]');
//     const descInput = document.querySelector('textarea[placeholder="Description"]');
//
//     if (!nameInput.value.trim()) {
//       alert("Please enter a name");
//       return;
//     }
//
//     if (!descInput.value.trim()) {
//       alert("Please enter a description");
//       return;
//     }
//     const personaData = {
//       Name: nameInput.value.trim(),
//       Description: descInput.value.trim(),
//     };
//
//     localStorage.setItem("savedPersona", JSON.stringify(personaData));
//
//     fetch("https://server-hhcx.onrender.com/persona", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(personaData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           alert(data.error);
//           return;
//         }
//         togglePersonaMenu();
//       })
//       .catch((error) => {
//         alert("Error: Server error");
//         console.error("Error:", error);
//       });
//   };
//
//   window.addEventListener("load", () => {
//     const savedPersona = localStorage.getItem("savedPersona");
//     if (savedPersona) {
//       const data = JSON.parse(savedPersona);
//       const nameInput = document.querySelector('input[placeholder="Name"]');
//       const descInput = document.querySelector('textarea[placeholder="Description"]');
//       nameInput.value = data.Name;
//       descInput.value = data.Description;
//     }
//   });
//
//   const toggleSidebar = () => {
//     const sidebar = document.getElementById("sidebar");
//     const toggleIcon = document.getElementById("toggleIcon");
//     const toggleBtn = document.getElementById("toggleSidebar");
//     const isHidden = sidebar.classList.toggle("hidden");
//
//     toggleIcon.classList.toggle("bi-arrow-left");
//     toggleIcon.classList.toggle("bi-arrow-right");
//
//     const startPosition = isHidden ? 65 : 0;
//     const endPosition = isHidden ? 0 : 65;
//     const duration = 800;
//     const startTime = performance.now();
//
//     if (isHidden) {
//       toggleBtn.style.opacity = 0.5;
//     } else {
//       toggleBtn.style.opacity = 1;
//     }
//
//     const animate = (currentTime) => {
//       const elapsed = currentTime - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//
//       const easeProgress = 1 - Math.pow(1 - progress, 4);
//
//       const currentPosition =
//         startPosition + (endPosition - startPosition) * easeProgress;
//       toggleBtn.style.left = `${currentPosition}px`;
//
//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };
//
//     requestAnimationFrame(animate);
//   };
//
//   const toggleHiddenTags = () => {
//     const section = document.getElementById("hiddenTagsSection");
//     section.classList.toggle("active");
//     if (section.classList.contains("active")) {
//       const hiddenTags = JSON.parse(localStorage.getItem("hiddenTags") || "[]");
//       const container = document.getElementById("hiddenTagsList");
//       container.innerHTML = "";
//       hiddenTags.forEach((tag) => {
//         const tagElement = document.createElement("span");
//         tagElement.className = "hidden-tag";
//         tagElement.textContent = tag;
//         tagElement.onclick = () => unhideTag(tag);
//         container.appendChild(tagElement);
//       });
//     }
//   };
//
//   const unhideTag = (tag) => {
//     const hiddenTags = JSON.parse(localStorage.getItem("hiddenTags") || "[]");
//     const updatedTags = hiddenTags.filter((t) => t !== tag);
//     localStorage.setItem("hiddenTags", JSON.stringify(updatedTags));
//     toggleHiddenTags();
//   };
//
//   const addNewTag = () => {
//     const input = document.getElementById("newTagInput");
//     const tag = input.value.trim();
//     if (tag) {
//       const hiddenTags = JSON.parse(localStorage.getItem("hiddenTags") || "[]");
//       if (!hiddenTags.includes(tag)) {
//         hiddenTags.push(tag);
//         localStorage.setItem("hiddenTags", JSON.stringify(hiddenTags));
//         toggleHiddenTags();
//       }
//       input.value = "";
//     }
//   };
//
//   const showOverlay = () => {
//     const overlay = document.getElementById("settingsOverlay");
//     overlay.style.display = "block";
//     requestAnimationFrame(() => {
//       overlay.classList.add("active");
//     });
//
//     const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//     document.getElementById("loggedInButtons").style.display = isLoggedIn
//       ? "block"
//       : "none";
//     document.getElementById("loggedOutButtons").style.display = isLoggedIn
//       ? "none"
//       : "block";
//   };
//
//   const hideOverlay = () => {
//     const overlay = document.getElementById("settingsOverlay");
//     overlay.classList.remove("active");
//     setTimeout(() => {
//       overlay.style.display = "none";
//     }, 300);
//   };
//
//   const toggleSettingsOverlayOff = () => {
//     hideOverlay();
//   };
//
//   const handleLogout = () => {
//     localStorage.setItem("isLoggedIn", "false");
//     hideOverlay();
//     window.location.href = "index.html";
//   };
//
//   return (
//     <>
//       <div
//         id="loadingPopup"
//         style={{
//           display: "none",
//           position: "fixed",
//           top: "0",
//           left: "0",
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.9)",
//           zIndex: "9999",
//           justifyContent: "center",
//           alignItems: "center",
//           animation: "fadeIn 0.5s",
//         }}
//       >
//         <div
//           style={{
//             textAlign: "center",
//             color: "white",
//             animation: "slideIn 0.5s",
//           }}
//         >
//           <div
//             style={{
//               marginBottom: "20px",
//               fontSize: "1.5em",
//               fontWeight: "bold",
//             }}
//           >
//             Loading...
//           </div>
//           <div
//             style={{
//               width: "100%",
//               backgroundColor: "#555",
//               borderRadius: "5px",
//               overflow: "hidden",
//             }}
//           >
//             <div
//               id="loadingBar"
//               style={{
//                 width: "0%",
//                 height: "20px",
//                 backgroundColor: "#007bff",
//                 borderRadius: "5px",
//                 animation: "loading 2s infinite",
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//
//       <div className="text-center mt-3">
//         <a
//           href="http://agaga.com"
//           className="d-inline-block rounded overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
//           style={{
//             fontWeight: "bold",
//             userSelect: "none",
//             WebkitUserSelect: "none",
//             MozUserSelect: "none",
//             msUserSelect: "none",
//           }}
//         >
//           <img
//             src={Footer}
//             alt="Footer Image"
//             className="rounded"
//             style={{
//               maxWidth: "40%",
//               height: "auto",
//               borderRadius: "20px",
//               filter: "brightness(1.1)",
//               padding: "8px",
//               userSelect: "none",
//               WebkitUserSelect: "none",
//               MozUserSelect: "none",
//               msUserSelect: "none",
//             }}
//           />
//         </a>
//       </div>
//
//       <h1
//         style={{
//           position: "absolute",
//           top: "10px",
//           left: "10px",
//           fontSize: "1.5rem",
//           color: "#ffffff",
//           userSelect: "none",
//           WebkitUserSelect: "none",
//           MozUserSelect: "none",
//           msUserSelect: "none",
//         }}
//       >
//         Pandamonium
//       </h1>
//       <div
//         className="search-section d-flex justify-content-center align-items-center mb-4"
//         style={{ fontSize: "1.2rem" }}
//       >
//         <input
//           type="text"
//           className="search-input form-control me-2"
//           placeholder="Search characters..."
//           aria-label="Search characters"
//           style={{ padding: "8px", width: "80%" }}
//           onInput={(e) => filterCharactersBySearch(e.target.value)}
//         />
//         <button
//           className="search-button btn btn-primary"
//           style={{ padding: "8px 16px", fontSize: "1rem" }}
//           onClick={() =>
//             filterCharactersBySearch(document.querySelector(".search-input").value)
//           }
//         >
//           Search
//         </button>
//       </div>
//
//       <div className="dropdown mb-3" id="tagsDropdownContainer">
//         <div className="d-flex align-items-center">
//           <button
//             className="btn btn-dark dropdown-toggle"
//             type="button"
//             id="tagsDropdown"
//             aria-expanded="false"
//           >
//             Tags
//           </button>
//           <div id="selectedTags" className="d-flex flex-wrap ms-2"></div>
//         </div>
//         <p id="time"></p>
//
//         <ul
//           className="dropdown-menu animate__animated animate__fadeIn"
//           aria-labelledby="tagsDropdown"
//           style={{
//             backgroundColor: "black",
//             zIndex: 999,
//             pointerEvents: "auto",
//           }}
//           id="tagsList"
//         >
//           <li>
//             <a
//               className="dropdown-item"
//               style={{ color: "white" }}
//               href="#"
//               onClick={() => handleTagClick("Villain")}
//             >
//               Villain
//             </a>
//           </li>
//           <li>
//             <a
//               className="dropdown-item"
//               style={{ color: "white" }}
//               href="#"
//               onClick={() => handleTagClick("Hero")}
//             >
//               Hero
//             </a>
//           </li>
//           <li>
//             <a
//               className="dropdown-item"
//               style={{ color: "white" }}
//               href="#"
//               onClick={() => handleTagClick("Sci-Fi")}
//             >
//               Sci-Fi
//             </a>
//           </li>
//           <li>
//             <a
//               className="dropdown-item"
//               style={{ color: "white" }}
//               href="#"
//               onClick={() => handleTagClick("Fantasy")}
//             >
//               Fantasy
//             </a>
//           </li>
//           <li>
//             <a
//               className="dropdown-item"
//               style={{ color: "white" }}
//               href="#"
//               onClick={() => handleTagClick("Male")}
//             >
//               Male
//             </a>
//           </li>
//           <li>
//             <a
//               className="dropdown-item"
//               style={{ color: "white" }}
//               href="#"
//               onClick={() => handleTagClick("Female")}
//             >
//               Female
//             </a>
//           </li>
//           <li>
//             <a
//               className="dropdown-item"
//               style={{ color: "white" }}
//               href="#"
//               onClick={() => handleTagClick("None")}
//             >
//               None
//             </a>
//           </li>
//         </ul>
//       </div>
//
//       <div className="container text-center mt-5">
//         <div id="characters" className="row"></div>
//       </div>
//
//       <div className="sidebar" id="sidebar">
//         <button
//           className="btn btn-light sidebar-btn"
//           onClick={togglePersonaMenu}
//           data-tooltip="Persona"
//         >
//           <i className="bi bi-person-circle"></i>
//         </button>
//         <div
//           id="personaMenu"
//           style={{
//             display: "none",
//             position: "absolute",
//             left: "70px",
//             top: "0",
//             background: "#000",
//             color: "#fff",
//             padding: "20px",
//             borderRadius: "12px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//             width: "300px",
//             transform: "translateX(-20px) scale(0.95)",
//             opacity: "0",
//             transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//           }}
//         >
//           <h4
//             style={{
//               marginBottom: "20px",
//               fontWeight: "600",
//               opacity: "0",
//               transform: "translateY(-10px)",
//               transition: "all 0.3s ease 0.2s",
//             }}
//           >
//             Persona
//           </h4>
//           <input
//             type="text"
//             placeholder="Name"
//             style={{
//               width: "100%",
//               padding: "12px",
//               marginBottom: "15px",
//               border: "1px solid #333",
//               borderRadius: "8px",
//               background: "#111",
//               color: "#fff",
//               transition: "all 0.3s ease",
//               opacity: "0",
//               transform: "translateY(-10px)",
//               transitionDelay: "0.3s",
//             }}
//           />
//           <textarea
//             placeholder="Description"
//             style={{
//               width: "100%",
//               padding: "12px",
//               marginBottom: "15px",
//               border: "1px solid #333",
//               borderRadius: "8px",
//               minHeight: "120px",
//               background: "#111",
//               color: "#fff",
//               transition: "all 0.3s ease",
//               opacity: "0",
//               transform: "translateY(-10px)",
//               transitionDelay: "0.4s",
//             }}
//           ></textarea>
//           <button
//             onClick={submitPersona}
//             className="btn btn-primary"
//             style={{
//               width: "100%",
//               padding: "12px",
//               borderRadius: "8px",
//               background: "#4a90e2",
//               color: "#fff",
//               border: "none",
//               transition: "all 0.2s ease",
//               opacity: "0",
//               transform: "translateY(-10px)",
//               transitionDelay: "0.6s",
//             }}
//           >
//             Submit
//           </button>
//         </div>
//         <button
//           className="btn btn-light sidebar-btn settings-btn"
//           data-tooltip="Settings"
//           onClick={showOverlay}
//         >
//           <i className="bi bi-gear"></i>
//         </button>
//         <button
//           className="btn btn-light sidebar-btn"
//           onClick={() => (window.location.href = "guideline.html")}
//           data-tooltip="Help/Guidelines"
//         >
//           <i className="bi bi-question-circle"></i>
//         </button>
//
//         <button
//           className="btn btn-primary sidebar-btn"
//           onClick={() => (window.location.href = "/Chats")}
//           data-tooltip="Chats"
//         >
//           <i className="bi bi-chat"></i>
//         </button>
//
//         <button
//           className="btn btn-light sidebar-btn"
//           id="createBtnFooter"
//           onClick={() => (window.location.href = "create.html")}
//           data-tooltip="Create"
//         >
//           <i className="bi bi-plus-circle"></i>
//         </button>
//       </div>
//
//       <div id="settingsOverlay" className="settings-overlay">
//         <div className="settings-content settings-animate">
//           <button
//             className="close-btn"
//             style={{ color: "#fff" }}
//             onClick={toggleSettingsOverlayOff}
//           >
//             &times;
//           </button>
//           <div id="loggedInButtons" className="settings-buttons">
//             <button className="btn btn-danger settings-btn" onClick={handleLogout}>
//               <i className="bi bi-box-arrow-right"></i>
//               Logout
//             </button>
//             <button className="btn btn-primary settings-btn" onClick={toggleHiddenTags}>
//               <i className="bi bi-tags"></i>
//               Hidden Tags
//             </button>
//           </div>
//           <div id="loggedOutButtons" className="settings-buttons">
//             <button
//               className="btn btn-primary settings-btn"
//               onClick={() => (window.location.href = "/Login")}
//             >
//               <i className="bi bi-box-arrow-in-right"></i>
//               Login
//             </button>
//             <button
//               className="btn btn-success settings-btn"
//               onClick={() => (window.location.href = "/Register")}
//             >
//               <i className="bi bi-person-plus"></i>
//               Register
//             </button>
//           </div>
//           <div id="hiddenTagsSection" className="hidden-tags-section">
//             <input
//               type="text"
//               id="newTagInput"
//               placeholder="Add new tag"
//               className="tag-input"
//             />
//             <button onClick={addNewTag} className="btn btn-primary add-tag-btn">
//               Add Tag
//             </button>
//             <div className="tags-container" id="hiddenTagsList"></div>
//           </div>
//         </div>
//       </div>
//       <button
//         id="toggleSidebar"
//         className="btn btn-primary toggle-btn"
//       >
//         <i className="bi bi-arrow-left" id="toggleIcon"></i>
//       </button>
//     </>
//   );
// }

export default Homepage;

