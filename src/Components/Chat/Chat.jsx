import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaImage, FaSmile, FaHome } from 'react-icons/fa';
import './ExtraCss.css';
import { GetCharacterId, GetCharacterdata, Api } from '../../Utils/dataSource';
import errorimage from '../../assets/error.jpg';
import Sidebar from '../Chat/Sidebar/Sidebar';

export default function Chat() {
  const [messageList, setMessageList] = useState([
    { role: 'system', content: '' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [character, setCharacter] = useState(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchCharacterDataFromAPI = async () => {
    try {
      const id = await GetCharacterId();
      if (!id || isNaN(parseInt(id, 10))) {
        throw new Error("Invalid or undefined character ID");
      }
      return id;
    } catch (error) {
      console.error('Error fetching character ID:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const id = await fetchCharacterDataFromAPI();
        if (!id) return;
  
        const data = await GetCharacterdata(id);
        const decodedData = JSON.parse(atob(data.data));
  
        const imageUrl = decodedData.photo || errorimage;
  
        let imageObjectURL;
        try {
          const imageResponse = await fetch(imageUrl);
          if (!imageResponse.ok) throw new Error('Image fetch failed');
          const imageBlob = await imageResponse.blob();
          imageObjectURL = URL.createObjectURL(imageBlob);
        } catch (imageError) {
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
      } catch (error) {
        console.error('Error fetching character data:', error);
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  if (!character) return <div>Loading...</div>;

  return (
<div className="d-flex h-100 bg-dark text-white overflow-hidden" style={{ height: '100vh' }}>
    <Sidebar/>
  <div
    className="d-flex flex-column h-100 flex-grow-1"
    style={{
      transition: 'margin-left 0.3s ease',
      marginLeft: '240px',
    }}
    id="chatContainer"
  >
    <div
      className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center bg-gradient"
      style={{
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#1a2d4d',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <img
          src={characterImage}
          alt={characterName}
          className="rounded-circle"
          onClick={() => alert('Character Info Coming Soon!')}
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            border: '2px solid #4e73df',
            padding: '2px',
          }}
        />
        <span className="fs-5 fw-bold text-white">{characterName}</span>
      </div>
    </div>

    <div
      className="flex-grow-1 p-3 overflow-auto"
      style={{
        height: 'calc(100vh - 160px)',
        width: '100%',
        borderRadius: '10px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.2) transparent',
      }}
    >
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`d-flex flex-column ${message.role === 'user' ? 'align-items-end' : 'align-items-start'} mb-3`}
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
            {message.content}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="d-flex justify-content-start mb-4">
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
              <span className="animate-pulse">...</span> Red Llama 1.0 is typing...
            </span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>

    <form
      onSubmit={handleSubmitWrapper}
      className="p-3 border-top border-secondary d-flex align-items-center"
      style={{ backgroundColor: '#222', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}
    >
      <button type="button" className="btn btn-light h-10 w-10 me-2 rounded-circle shadow-sm">
        <FaImage className="h-6 w-6" />
        <span className="visually-hidden">Upload Image</span>
      </button>
      <button type="button" className="btn btn-light h-10 w-10 me-2 rounded-circle shadow-sm">
        <FaSmile className="h-6 w-6" />
        <span className="visually-hidden">Emoji</span>
      </button>
      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Type your message..."
        className="flex-grow-1 bg-dark text-white border-0 p-3 rounded-pill shadow-sm"
        style={{
          fontSize: '16px',
          paddingLeft: '20px',
          paddingRight: '20px',
          transition: 'box-shadow 0.2s ease-in-out',
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
      >
        <FaPaperPlane className="h-6 w-6" />
        <span className="visually-hidden">Send</span>
      </button>
    </form>
  </div>
</div>
  );
}
