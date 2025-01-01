import React from "react";
import Animal from "../assets/animal.png";
import "./Preview.css";
import "tailwindcss/tailwind.css";
import {FaHome, FaCompass, FaComments, FaDiscord} from "react-icons/fa";
import image from "../assets/image.png";
import Chatcard from "../assets/Chat Card.png";
import Book from "../assets/Magical Book World Illustration 1.png";
import Roleplay from "../assets/Chat Card (1).png";

export default function Preview() {
  const handleCardHover = (event, element) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5; // Normalize between -0.5 to 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg) scale(1.05)`;
  };

  return (
    <div className="main">
      <div className="fixed top-0 left-0 w-full bg-black bg-opacity-40 p-4 z-50 animate__animated animate__fadeInDown animate__faster">
  <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto px-4">
    <div
      className="flex items-center space-x-4 cursor-pointer animate__animated animate__fadeIn animate__delay-1s animate__zoomIn hover:animate__pulse"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <img className="w-8 h-8 animate__animated animate__bounceIn hover:animate__shakeX transition-all duration-300" src={Animal} alt="Logo" />
      <h1 className="text-2xl font-bold font-baloo text-white animate__animated animate__fadeInUp animate__delay-1s hover:text-[#E03201] transition-colors duration-300">
        Pand<span className="text-[#E03201]">AI</span>
      </h1>
    </div>

    <div className="flex items-center space-x-6 animate__animated animate__fadeIn animate__delay-2s">
      <button className="flex items-center text-white font-baloo hover:text-[#E03201] transition-all transform hover:scale-110 duration-300 hover:rotate-3">
        <FaHome className="mr-2 text-xl" />
        Home
      </button>
      <button className="flex items-center text-white font-baloo hover:text-[#E03201] transition-all transform hover:scale-110 duration-300 hover:rotate-3">
        <FaCompass className="mr-2 text-xl" />
        Explore
      </button>
      <button className="flex items-center text-white font-baloo hover:text-[#E03201] transition-all transform hover:scale-110 duration-300 hover:rotate-3">
        <FaComments className="mr-2 text-xl" />
        Chats
      </button>
      <button className="flex items-center text-white font-baloo hover:text-[#E03201] transition-all transform hover:scale-110 duration-300 hover:rotate-3">
        <FaDiscord className="mr-2 text-xl" />
        Discord
      </button>
      <button className="text-white hover:text-[#E03201] transition-all transform hover:scale-110 duration-300 hover:rotate-3">
        Login
      </button>
      <button className="bg-[#E03201] text-white px-4 py-1 rounded-md hover:bg-[#b02501] transition-all transform hover:scale-110 duration-300 hover:rotate-3">
        Sign Up
      </button>
    </div>
  </div>
</div>


      <div className="preview-container relative p-6 animate__animated animate__fadeInUp">
  <div className="Preview-text mt-[50px] absolute top-[200px] animate__animated animate__fadeInUp">
    <p className="text-4xl text-gray-300 font-bold mb-6 tracking-[0.5px] w-[500px] animate__animated animate__fadeIn animate__delay-1s">
      Where Your Stories Find Their Voice and Characters Come Alive
    </p>
    <p className="text-[18px] text-gray-300 leading-[27px] tracking-[0.5px] w-[500px] mb-8">
      Redefine AI roleplay with advanced tools, endless creativity, and a
      panda-powered experience that sets a new standard.
    </p>
  </div>

  <div className="Buttons absolute top-[500px] flex space-x-4 mb-8 animate__animated animate__fadeInUp animate__delay-2s">
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

  <div className="absolute right-[30px] top-[200px] animate__animated animate__fadeInUp animate__delay-3s">
    <img src={image} alt="" />
  </div>
</div>

      

          
        </div>
      </div>
    </div>
  );
}
