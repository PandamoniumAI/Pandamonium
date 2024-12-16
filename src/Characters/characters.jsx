import "./characters.css";

async function FetchCharacters() {
  const startTime = performance.now();
  try {
    const response = await fetch("https://server-hhcx.onrender.com/characters");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    const base64String = data.data.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64String = base64String.padEnd(
      base64String.length + ((4 - (base64String.length % 4)) % 4),
      "=",
    );
    const decodedData = JSON.parse(atob(paddedBase64String));

    console.log("Decoded Data:", decodedData);

    decodedData.forEach((character, index) => {
      console.log(`Character ${index + 1}:`, character);
    });

    const charactersContainer = document.getElementById("characters");
    if (charactersContainer) {
      charactersContainer.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
        padding: 25px;
        max-width: 1400px;
        margin: 0 auto;
      `;
      charactersContainer.innerHTML = decodedData
        .map((character) => {
          const truncatedDesc =
            character.description.length > 100
              ? character.description.substring(0, 100) + "..."
              : character.description;

          return `
             <div class="character-card animate__animated animate__fadeInUp" 
                                     onclick="showExpandedCard(${JSON.stringify(character).replace(/"/g, "&quot;")})"
                                     style="background: rgba(0,0,0,0.85); 
                                            border-radius: 20px;
                                            padding: 25px;
                                            width: 100%;
                                            height: 100%;
                                            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                                            transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                                            cursor: pointer;
                                            display: flex;
                                            flex-direction: column;
                                            backdrop-filter: blur(10px);
                                            position: relative;
                                            overflow: hidden;
                                            transform: scale(1);">
                                    <div class="lighting-effect" style="position: absolute;
                                                                      width: 100%;
                                                                      height: 100%;
                                                                      top: 0;
                                                                      left: 0;
                                                                      background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15), transparent 50%);
                                                                      opacity: 0;
                                                                      transition: opacity 0.3s ease;
                                                                      pointer-events: none;">
                                    </div>
                                    <div style="position: relative;
                                                width: 100%;
                                                padding-top: 66.67%;
                                                margin-bottom: 20px;
                                                border-radius: 15px;
                                                overflow: hidden;">
                                        <div class="image-container" style="position: absolute;
                                                                          top: 0;
                                                                          left: 0;
                                                                          width: 100%;
                                                                          height: 100%;
                                                                          border: 3px solid transparent;
                                                                          border-radius: 15px;
                                                                          transition: all 0.4s ease;
                                                                          overflow: hidden;">
                                            <img src="${character.photo}" 
                                                 alt="${character.name}"
                                                 style="width: 100%;
                                                        height: 100%;
                                                        object-fit: cover;
                                                        transition: transform 0.5s ease;">
                                            <div class="chat-count" style="position: absolute;
                                                                         top: 15px;
                                                                         right: 15px;
                                                                         background: rgba(0,0,0,0.8);
                                                                         padding: 8px 15px;
                                                                         border-radius: 20px;
                                                                         color: white;
                                                                         font-size: 1rem;
                                                                         display: flex;
                                                                         align-items: center;
                                                                         gap: 8px;
                                                                         backdrop-filter: blur(5px);
                                                                         box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                                                <i class="fas fa-comment"></i>
                                                <span class="count">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 style="color: #fff;
                                             font-size: 1.6rem;
                                             margin-bottom: 12px;
                                             font-weight: bold;
                                             overflow: hidden;
                                             text-overflow: ellipsis;
                                             white-space: nowrap;
                                             text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${character.name}</h3>
                                    <p style="color: #e0e0e0;
                                             font-size: 1rem;
                                             line-height: 1.6;
                                             margin-bottom: 20px;
                                             flex-grow: 1;
                                             overflow: hidden;
                                             display: -webkit-box;
                                             -webkit-line-clamp: 3;
                                             -webkit-box-orient: vertical;">${truncatedDesc}</p>
                                    <span class="badge bg-primary" 
                                          style="padding: 8px 15px;
                                                 font-size: 0.9rem;
                                                 align-self: flex-start;
                                                 border-radius: 12px;
                                                 background: linear-gradient(135deg, #4a90e2, #357abd);
                                                 box-shadow: 0 4px 12px rgba(74,144,226,0.3);">${character.tag}</span>
                                </div>
          `;
        })
        .join("");

      const cards = document.querySelectorAll(".character-card");
      cards.forEach((card) => {
        const imageContainer = card.querySelector(".image-container");
        const img = imageContainer.querySelector("img");
        const lightingEffect = card.querySelector(".lighting-effect");

        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          lightingEffect.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 50%)`;
          lightingEffect.style.opacity = "1";

          imageContainer.style.borderColor = "#4a90e2";
          imageContainer.style.boxShadow = "0 0 30px rgba(74,144,226,0.6)";
          img.style.transform = "scale(1.1)";
          card.style.transform = "scale(1.05)";
          card.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
        });

        card.addEventListener("mouseleave", () => {
          lightingEffect.style.opacity = "0";
          imageContainer.style.borderColor = "transparent";
          imageContainer.style.boxShadow = "none";
          img.style.transform = "scale(1)";
          card.style.transform = "scale(1)";
          card.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
        });
      });

      const showExpandedCard = (character) => {
        const expandedDesc =
          character.description.length > 500
            ? character.description.substring(0, 500) + "..."
            : character.description;

        document.body.style.overflow = "hidden";

        const modal = document.createElement("div");
        modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(0,0,0,0.98), rgba(20,20,20,0.95));
        padding: 25px;
        border-radius: 20px;
        z-index: 1000;
        width: 70%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 0 30px rgba(0,0,0,0.7);
        animation: modalFadeIn 0.3s ease;
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.5) rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    `;

        modal.innerHTML = `
        <style>
            @keyframes modalFadeIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -45%) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }

            .character-image {
                transition: transform 0.3s ease;
            }

            .character-image:hover {
                transform: scale(1.02);
            }

            .modal-btn {
                background: linear-gradient(135deg, #007bff, #0056b3);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 12px;
                cursor: pointer;
                font-size: 1.1rem;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .modal-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,123,255,0.4);
            }
        </style>
        <div class="modal-content">
            <img src="${character.photo}" 
                 alt="${character.name}"
                 class="character-image"
                 style="width: 100%;
                        height: 300px;
                        object-fit: cover;
                        border-radius: 15px;
                        margin-bottom: 20px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
            <h2 style="color: #fff;
                      font-size: 2rem;
                      margin-bottom: 15px;
                      font-weight: 600;">${character.name}</h2>
            <p style="color: #f0f0f0;
                     font-size: 1.1rem;
                     line-height: 1.6;
                     margin-bottom: 20px;
                     padding: 15px;
                     background: rgba(255,255,255,0.05);
                     border-radius: 12px;">${expandedDesc}</p>
            <button onclick="window.location.href='chatting.html?id=${character.id}'" class="modal-btn">
                Start Conversation
            </button>
        </div>
    `;

        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        `;

        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) {
            overlay.remove();
            modal.remove();
            document.body.style.overflow = "auto";
          }
        });

        document.body.appendChild(overlay);
        document.body.appendChild(modal);

        fetch("https://server-hhcx.onrender.com/api/id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            characterId: character.id,
          }),
        });
      };
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      console.log(
        `Execution time: ${executionTime.toFixed(2)} milliseconds and current decoded data: ${decodedData}`,
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export default FetchCharacters;
