import React from "react";
import Female from "../../../assets/Female.jpg";
import Female2 from "../../../assets/Female2.jpg";
import Male from "../../assets/Male.";
import "./Card.css";

export default function Card({ showPopup, closePopup, selectedCharacter }) {
    const CharacterCards = {
        "1": {
            info: {
                name: "Bella",
                preview: "Bella's story with {{user}} began in the vibrant setting of their shared sales department.",
            },
            meta: {
                creator: "@d4rth",
                chats: "5.8m",
            },
            image: Female
        },
        "2": {
            info: {
                name: "Ethan",
                preview: "Ethan James Hartley, a 24-year-old recent graduate.",
            },
            meta: {
                creator: "@Arkadien",
                chats: "12.7m",
            },
            image: Male
        },
        "3": {
            info: {
                name: "Ellie",
                preview: "Ellie Forster, a 21 year old office worker, has a deep crush on {{user}}.",
            },
            meta: {
                creator: "@Whitzscott",
                chats: "12.8m",
            },
            image: Female2
        }
    };
    
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
