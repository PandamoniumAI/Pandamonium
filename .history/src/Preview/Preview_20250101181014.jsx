import Animal from "../assets/animal.png";
import "./Preview.css";
import "tailwindcss/tailwind.css";
import { FaHome, FaCompass, FaComments, FaDiscord } from "react-icons/fa";
import image from "../assets/image.png";

export default function Preview() {
  const handleCardHover = (event, element) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
  };

  const resetCardHover = (element) => {
    element.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="main">
      <div className="fixed top-0 left-0 w-full bg-black bg-opacity-40 p-4 z-50">
        <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto px-4">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img className="w-8 h-8" src={Animal} alt="Logo" />
            <h1 className="text-2xl font-bold font-baloo text-white">
              Pand<span className="text-[#E03201]">AI</span>
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <button className="flex items-center text-white font-baloo hover:text-[#E03201] transition">
              <FaHome className="mr-2 text-xl" />
              Home
            </button>
            <button className="flex items-center text-white font-baloo hover:text-[#E03201] transition">
              <FaCompass className="mr-2 text-xl" />
              Explore
            </button>
            <button className="flex items-center text-white font-baloo hover:text-[#E03201] transition">
              <FaComments className="mr-2 text-xl" />
              Chats
            </button>
            <button className="flex items-center text-white font-baloo hover:text-[#E03201] transition">
              <FaDiscord className="mr-2 text-xl" />
              Discord
            </button>
            <button className="text-white hover:text-[#E03201] transition">Login</button>
            <button className="bg-[#E03201] text-white px-4 py-1 rounded-md hover:bg-[#b02501] transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="preview-container relative p-6">
        <div className="Preview-text mt-[50px] absolute top-[200px]">
          <p className="text-4xl text-gray-300 font-bold mb-6 tracking-[0.5px] w-[500px]">
            Where Your Stories Find Their Voice and Characters Come Alive
          </p>
          <p className="text-[18px] text-gray-300 leading-[27px] tracking-[0.5px] w-[500px] mb-8">
            Redefine AI roleplay with advanced tools, endless creativity, and a
            panda-powered experience that sets a new standard.
          </p>
        </div>

        
    </div>
  );
}
