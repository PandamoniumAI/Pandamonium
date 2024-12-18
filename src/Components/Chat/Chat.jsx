import { useState, useRef, useEffect } from 'react';
import '../CSS/Chat.css';

export default function Chat() {
  const [userInput, setUserInput] = useState('');
  const chatBoxRef = useRef(null);
  const userInputRef = useRef(null);
  const chatHeaderRef = useRef(null);

  // Send message handler
  const sendMessage = () => {
    const userMessage = userInput.trim();
    const chatBox = chatBoxRef.current;
    const chatHeader = chatHeaderRef.current;

    // Check if the user input is not empty
    if (userMessage) {
      // Create a new div element for the user's message and append it to the chat box
      const userMessageElement = document.createElement('div');
      userMessageElement.classList.add('message', 'user-message');
      userMessageElement.textContent = userMessage;
      chatBox.appendChild(userMessageElement);

      // Hide the chat header while the AI is typing
      chatHeader.style.display = 'none';

      // Create and display a typing indicator for the AI
      const typingIndicator = document.createElement('div');
      typingIndicator.classList.add('message', 'ai-message', 'typing-indicator');
      typingIndicator.textContent = 'Character is typing...';
      chatBox.appendChild(typingIndicator);
      chatBox.scrollTop = chatBox.scrollHeight;

      // Simulate a delay before AI responds
      setTimeout(() => {
        // Remove the typing indicator after the delay
        chatBox.removeChild(typingIndicator);

        // Fetch a response from a mock API (replace with your actual API endpoint)
        fetch('https://hahaha.com/api/chat', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(response => response.json())
          .then(data => {
            const aiMessage = data.message; // Extract AI message from the response

            // Create a new div element for the AI's response and append it to the chat box
            const aiMessageElement = document.createElement('div');
            aiMessageElement.classList.add('message', 'ai-message');
            aiMessageElement.innerHTML = `
              <img src="https://via.placeholder.com/40" alt="Profile Picture" class="profile-img">
              ${aiMessage}
            `;
            chatBox.appendChild(aiMessageElement);
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat box
          })
          .catch(error => {
            console.error('Error fetching AI response:', error);
          });

        // Show the chat header again after the message is sent
        chatHeader.style.display = 'flex';

        // Clear the user input field
        setUserInput('');
      }, 2000); // Delay for 2 seconds before AI responds
    }
  };

  // Add event listener for Enter key press
  useEffect(() => {
    const inputField = userInputRef.current;
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };

    if (inputField) {
      inputField.addEventListener('keypress', handleKeyPress);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (inputField) {
        inputField.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, []);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className="chat-container col-12 col-md-6">
          <div className="chat-header" ref={chatHeaderRef}>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile Picture"
              className="profile-img"
              id="profileImg"
            />
            <span className="character-name" id="characterName">
              Character Name
            </span>
          </div>

          <div className="chat-box" ref={chatBoxRef}>
            {/* AI Messages will be appended here dynamically */}
          </div>

          <div className="input-container">
            <input
              type="text"
              id="userInput"
              className="form-control"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              ref={userInputRef}
            />
            <button onClick={sendMessage} className="btn btn-primary">
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
