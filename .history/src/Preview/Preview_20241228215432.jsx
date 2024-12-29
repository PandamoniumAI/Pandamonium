import Animal from "../assets/animal.png";
import "./Preview.css";
import "tailwindcss/tailwind.css";
import Card from "../Preview/Card/Card";
import { FaHome, FaCompass, FaComments } from "react-icons/fa";
import image from "../assets/Castle.jpg";
export default function Preview() {
  return (
    <div className="preview-container relative p-6 flex-row-reverse">
      <div className="absolute top-0 right-0 p-4">
        <div className="button-container relative">
          <button className="absolute right-12 bg-[#E03201] w-[67px] h-[30px] rounded-[8px] gap-[8px] bottom-[-22px]">
            Sign up
          </button>
          <button className="absolute right-[130px] bottom-[-22px]">
            Login
          </button>
          <button className="chats absolute text-white h-[14px] w-[60px] right-[190px] flex items-center">
            <FaComments className="mr-2 size-[24px]" /> Chats
          </button>
          <button className="chats absolute text-white h-[14px] w-[70px] right-[290px] flex items-center">
            <FaCompass className="mr-2 size-[24px]" /> Explore
          </button>
          <button className="chats absolute text-white h-[14px] w-[60px] right-[390px] flex items-center">
            <FaHome className="mr-2 size-[24px]" /> Home
          </button>
        </div>
      </div>
      <img
        className="preview-image w-6 h-6 absolute bottom-[5px]"
        src={Animal}
        alt="Animal"
      />
      <h1 className="preview-title text-2xl font-bold absolute top-4 left-[50px] text-white font-baloo">
        PandAI
      </h1>
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
      <div className="Card absolute left-1px rounded-2xl top-1">
        <img src={image} alt="" />
      </div>
    </div>
  );
}
