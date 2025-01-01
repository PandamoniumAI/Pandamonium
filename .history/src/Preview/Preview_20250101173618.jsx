import Animal from "../assets/animal.png";
import "./Preview.css";
import "tailwindcss/tailwind.css";
import Card from "../Preview/Card/Card";
import { FaHome, FaCompass, FaComments, FaDiscord } from "react-icons/fa";
import image from "../assets/image.png";

export default function Preview() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main">
      <div className="fixed top-0 left-0 w-full bg-black bg-opacity-40 p-4 z-50">
        <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto px-4">
          <div className="flex items-center space-x-4 cursor-pointer user-select-none" onClick={handleLogoClick}>
            <img className="w-8 h-8" src={Animal} alt="Logo" />
            <h1 className="text-2xl font-bold font-baloo text-white">
              Pand<span className="text-[#E03201]">AI</span>
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <button className="flex items-center text-white font-baloo select-none  hover:text-[#E03201] transition">
              <FaHome className="mr-2 text-xl" />
              Home
            </button>
            <button className="flex items-center text-white font-baloo select-none  hover:text-[#E03201] transition">
              <FaCompass className="mr-2 text-xl" />
              Explore
            </button>
            <button className="flex items-center text-white font-baloo  hover:text-[#E03201] transition">
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

        <div className="Buttons absolute top-[500px] flex space-x-4 mb-8">
          <button className="text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl bg-gradient-to-r from-[#E03201] to-[#611600] transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-orange-500/50 hover:shadow-lg">
            <span className="relative z-10">Explore</span>
          </button>
          <button
            className="create bg-black text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl outline outline-1 hover:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[#B22801]/50 hover:shadow-lg relative overflow-hidden group"
            style={{
              outlineImage:
                "linear-gradient(to right, #FFCBBB, #D07A5A, #A8382D, #611600)",
              outlineImageSlice: 1,
            }}
          >
            <span className="relative z-10">Create</span>
            <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>

        <div className="absolute right-[30px] top-[200px]">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
}
