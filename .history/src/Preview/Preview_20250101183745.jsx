import React from "react";
import Animal from "../assets/animal.png";
import "./Preview.css";
import "tailwindcss/tailwind.css";
import { FaHome, FaCompass, FaComments, FaDiscord } from "react-icons/fa";
import image from "../assets/image.png";
import Chatcard from "../assets/Chat Card.png"
import Book from "../assets/Magical Book World Illustration 1.png"
import Roleplay from "../assets/Chat Card (1).png"

export default function Preview() {
  const handleCardHover = (event, element) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5; // Normalize between -0.5 to 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg) scale(1.05)`;
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

      <div className="info px-6 relative" style={{ top: "700px" }}>
        <div className="infotext mb-8 text-white">
          <h1 className="text-3xl font-bold">Why Choose PandAI?</h1>

          <div className="cards grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Multiple Character Roleplays", "Tools for Creators", "Community-Driven No Filter"].map(
              (title, index) => (
                <div
                  key={index}
                  className="card relative flex flex-col justify-between w-[284px] h-[477px] rounded-[25px] overflow-hidden"
                  onMouseMove={(e) => handleCardHover(e, e.currentTarget)}
                >
                  <div
                    className="absolute inset-0 -z-10 rounded-[25px]"
                    style={{
                      background: 'linear-gradient(135deg, #BF18C2, #6B1C8F, #1D0375)',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '25px',
                      padding: '2px',
                    }}
                  />
                  <div className="content p-6 bg-[#1A1A1A] flex flex-col justify-between h-full rounded-[25px]">
                    <h2 className="text-2xl font-semibold mb-4 text-white">{title}</h2>
                    <p className="text-lg text-white">
                      {index === 0
                        ? "Immerse yourself in dynamic roleplays with multiple characters, pre-designed genre templates, and tools like a scene builder for crafting vivid storytelling experiences."
                        : index === 1
                        ? "Unleash your creativity with tools to build unique characters, organize content with advanced tags, upload world details into a Lorebook, and share your creations effortlessly."
                        : "Experience unfiltered chats tailored to your preferences, refine AI responses with feedback, shape platform features with community input, and customize personas to your liking."}
                    </p>
                  </div>
                  <div className="image-container mt-4">
                    {index === 0 ? (
                      <img src="../assets/Chat Card (1).png" alt="Roleplay" className="w-full rounded-[25px]" />
                    ) : index === 1 ? (
                      <img src="../assets/Magical Book World Illustration 1.png" alt="Creator Tools" className="w-full rounded-[25px]" />
                    ) : (
                      <img src="../assets/Chat Card.png" alt="Community" className="w-full rounded-[25px]" />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
