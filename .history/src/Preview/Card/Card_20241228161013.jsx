import React from "react";
import "./Card.css";
export default function Card({ showPopup, closePopup, selectedCharacter }) {
    return (
        showPopup && (
            <div className="popup-overlay" onClick={closePopup}>
                <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                    <div className="popup-content">
                        <div className="popup-character-image">
                            <img
                                src={selectedCharacter.image}
                                alt={selectedCharacter.info.name}
                                className="popup-image"
                            />
                        </div>
                        <div className="popup-text">
                            <h2>{selectedCharacter.info.name}</h2>
                            <p>{selectedCharacter.info.preview}</p>
                        </div>
                        <div className="popup-meta">
                            <span>{selectedCharacter.meta.creator}</span>
                            <span>{selectedCharacter.meta.chats} chats</span>
                        </div>
                        <button className="popup-btn">Chat</button>
                    </div>
                </div>
            </div>
        )
    );
}