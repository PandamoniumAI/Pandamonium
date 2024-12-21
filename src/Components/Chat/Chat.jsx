import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaImage, FaSmile, FaHome, FaCog  } from 'react-icons/fa';
import './ExtraCss.css';
import { GetCharacterId, GetCharacterdata, Api } from '../../Utils/dataSource';
import errorimage from '../../assets/error.jpg';
import Sidebar from '../Chat/Sidebar/Sidebar';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-modal';
Modal.setAppElement('#root');
export default function Chat() {
  const [messageList, setMessageList] = useState([
    { role: 'system', content: '' }
  ]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [character, setCharacter] = useState(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchCharacterDataFromAPI = () => {
    const pathSegments = window.location.pathname.split('/');
    const characterId = pathSegments[pathSegments.length - 1];
    if (!characterId || isNaN(parseInt(characterId, 10))) {
      console.error('Invalid or undefined character ID in URL');
      return null;
    }
    return characterId;
  };
  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const id = await fetchCharacterDataFromAPI();
        if (!id) return;
  
        const data = await GetCharacterdata(id);
        if (!data?.data) return;
  
        let decodedData;
        try {
          decodedData = JSON.parse(atob(data.data));
        } catch {
          return;
        }
  
        const imageUrl = decodedData.photo || errorimage;
  
        let imageObjectURL;
        try {
          const imageResponse = await fetch(imageUrl);
          if (!imageResponse.ok) throw new Error('Image fetch failed');
          const imageBlob = await imageResponse.blob();
          imageObjectURL = URL.createObjectURL(imageBlob);
        } catch {
          imageObjectURL = errorimage;
        }
  
        const parsedCharacter = {
          id: decodedData.id,
          name: decodedData.name || 'Unknown Character',
          description: decodedData.description || 'No description available.',
          firstMessage: decodedData.first_message || 'Hello! How can I assist you today?',
          image: imageObjectURL,
          system: decodedData.system || '',
          modelInstructions: decodedData.model_instructions || '',
          persona: decodedData.persona || '',
        };
  
        setCharacter(parsedCharacter);
        setMessageList(prevMessages => [
          ...prevMessages,
          { role: 'system', content: parsedCharacter.firstMessage },
        ]);
      } catch {
        console.error('Error fetching character data ERROR: 558');
      }
    };
  
    fetchCharacterData();
  
    return () => {
      if (character?.image && character.image !== errorimage) {
        URL.revokeObjectURL(character.image);
      }
    };
  }, []);
  
  
  

const characterImage = character?.image || errorimage;
const characterName = character?.name || 'Unknown Character';

const handleInputChange = (e) => {
  setInput(e.target.value);
};

const handleSubmitWrapper = async (e) => {
  e.preventDefault();

  if (!firstMessageSent) {
    setFirstMessageSent(true);
  } else {
    setIsTyping(true);

    const newMessage = {
      role: 'user',
      content: input,
    };

    setMessageList((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    try {
      const response = await Api.generate({
        prompt: input,
        system_message: character.system || '',
        model_instructions: character.modelInstructions || '',
        persona: character.persona || '',
        name: character.name || '',
        description: character.description || '',
        first_message: character.firstMessage || '',
      });
      
      if (response && response.result && response.result.response) {
        const botResponse = response.result.response.trim();
        
        if (botResponse) {
          const parsedContent = botResponse.replace(/\{message\.content\}/g, input);
          
          const responseMessage = {
            role: 'system',
            content: parsedContent,
          };

          setMessageList((prevMessages) => [...prevMessages, responseMessage]);
        } else {
          throw new Error('Empty response from the server');
        }
      } else {
        throw new Error('Invalid response format');
      }

      setIsTyping(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setIsTyping(false);
      setMessageList((prevMessages) => [
        ...prevMessages,
        { role: 'system', content: `An error occurred while processing your request. Please try again.` }
      ]);
    }
  }
};

const [isSettingsOpen, setIsSettingsOpen] = useState(false);

const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const toggleCharacterInfo = () => {
    if (isSettingsOpen) {
      console.log('Settings are open');
    }
  };
  
  if (!character) return <div>Loading...</div>;

const generateId = () => `chat_${character?.id || 'unknown'}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const storedId = localStorage.getItem('persistentChatId');
if (!storedId) {
  const newId = generateId();
  localStorage.setItem('persistentChatId', newId);
}
const id = storedId || localStorage.getItem('persistentChatId');

  return (
<div className="d-flex h-100 bg-dark text-white overflow-hidden" style={{ height: '100vh' }}>
  <Sidebar />
  <div
    className="d-flex flex-column h-100 flex-grow-1"
    id="chatContainer"
    ref={chatContainerRef}
    style={{
      transition: 'margin-left 0.3s ease, box-shadow 0.3s ease',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
    }}
  >
    <div
      className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center bg-gradient animate__animated animate__fadeIn"
      style={{
        backgroundColor: '#1a2d4d',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <img
          src={characterImage}
          alt={characterName}
          className="rounded-circle"
          onClick={toggleCharacterInfo}
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            border: '2px solid #4e73df',
            padding: '2px',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
            e.currentTarget.style.borderColor = '#f39c12';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = '#4e73df';
          }}
        />
        <span className="fs-5 fw-bold text-white">{characterName}</span>
      </div>

      <button
        className="btn p-0 text-white"
        onClick={toggleSettings}
        style={{
          fontSize: '1.5rem',
          transition: 'transform 0.3s ease, color 0.3s ease',
          border: 'none',
          background: 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <FaCog />
      </button>

      <Modal
        isOpen={isSettingsOpen}
        onRequestClose={toggleSettings}
        contentLabel="Settings Sidebar"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10,
          },
          content: {
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            width: '300px',
            background: '#2a2a2a',
            color: '#fff',
            border: 'none',
            borderRadius: '0',
            padding: '20px',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          },
        }}
        shouldCloseOnOverlayClick={true}
      >
        <div className="d-flex flex-column h-100">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-white">Settings</h4>
            <button
              onClick={toggleSettings}
              className="btn btn-link text-white p-0"
              style={{ fontSize: '1.5rem' }}
            >
              ✖
            </button>
          </div>
          <div className="mt-4">
            <p>Settings options will be available soon.</p>
          </div>
        </div>
      </Modal>
    </div>

    <div
      className="flex-grow-1 p-3 overflow-auto animate__animated animate__fadeIn"
      style={{
        height: 'calc(100vh - 160px)',
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#1b2a3d',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.2) transparent',
        boxShadow: 'inset 0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {messageList.map((message, index) => {
        if (message.role !== 'user') {
          localStorage.setItem('botMessage', JSON.stringify(message));
        }
        return (
          <div
            key={index}
            className={`d-flex flex-column ${message.role === 'user' ? 'align-items-end' : 'align-items-start'} mb-3 animate__animated animate__fadeIn`}
          >
            {message.role !== 'user' && (
              <div className="d-flex align-items-center mb-2">
                <img
                  src={characterImage}
                  alt={characterName}
                  className="rounded-circle"
                  style={{ width: '36px', height: '36px' }}
                />
                <span className="fw-semibold text-white ms-2">{characterName}</span>
              </div>
            )}
            <div
              className={`d-flex flex-column p-3 rounded-lg shadow-sm ${message.role === 'user' ? 'bg-primary text-white align-self-end' : 'bg-secondary text-white align-self-start'}`}
              style={{
                maxWidth: '70%',
                minWidth: '160px',
                borderRadius: '20px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className="d-flex justify-content-start mb-4 animate__animated animate__fadeIn">
          <div
            className="bg-secondary text-white p-3 rounded-lg shadow-sm"
            style={{
              maxWidth: '50%',
              minWidth: '200px',
              borderRadius: '20px',
              animation: 'pulseTyping 1.5s infinite',
            }}
          >
            <span className="text-muted" style={{ fontSize: '14px' }}>
              <span className="animate-pulse">...</span> {characterName} is typing...
            </span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>

    <form
      onSubmit={handleSubmitWrapper}
      className="p-3 border-top border-secondary d-flex align-items-center bg-dark rounded-bottom"
      style={{
        backgroundColor: '#222',
        position: 'relative',
        zIndex: 2,
        paddingBottom: '20px',
      }}
    >
      <button
        type="button"
        className="btn btn-light h-10 w-10 me-2 rounded-circle shadow-sm"
        style={{
          transition: 'transform 0.3s ease',
          marginRight: '8px',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <FaImage className="h-6 w-6" />
        <span className="visually-hidden">Upload Image</span>
      </button>
      <button
        type="button"
        className="btn btn-light h-10 w-10 me-2 rounded-circle shadow-sm"
        style={{
          transition: 'transform 0.3s ease',
          marginRight: '8px',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <FaSmile className="h-6 w-6" />
        <span className="visually-hidden">Emoji</span>
      </button>
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="flex-grow-1 bg-dark text-white border-0 p-3 rounded-pill shadow-sm animate__animated animate__fadeIn"
        style={{
          fontSize: '16px',
          paddingLeft: '20px',
          paddingRight: '20px',
          borderRadius: '30px',
          transition: 'box-shadow 0.2s ease-in-out',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      />
<button
  type="submit"
  className="btn btn-primary h-10 w-10 d-flex justify-content-center align-items-center shadow-sm rounded-circle"
  disabled={isTyping || !input}
  style={{
    fontSize: '18px',
    transition: 'transform 0.2s ease',
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
  onClick={() => {
    const userMessage = input.trim();
    if (userMessage !== "") {
      const checkAndSaveMessage = () => {
        const botMessage = JSON.parse(localStorage.getItem('botMessage'));
        if (botMessage && botMessage.content) {
          import('./Saving/Saving').then(module => {
            const data = { id: id, characterMessage: botMessage.content, userMessage };
            module.saveMessage(data);
          });
        } else {
          setTimeout(checkAndSaveMessage, 100);
        }
      };
      checkAndSaveMessage();
    }
  }}>
        <FaPaperPlane className="h-6 w-6" />
        <span className="visually-hidden">Send</span>
      </button>
    </form>
  </div>
</div>


  );
}