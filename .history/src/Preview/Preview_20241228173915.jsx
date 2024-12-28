import Animal from "../assets/animal.png";
import './Preview.css';
import 'tailwindcss/tailwind.css';
import Card from "../Preview/Card/Card";

export default function Preview() {
  return (
    <div className="preview-container relative p-6">
      {/* Animal Image */}
      <img className="preview-image w-24 h-24" src={Animal} alt="Animal" />

      {/* Title */}
      <h1 className="preview-title text-2xl font-bold absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-baloo">
        PandAI
      </h1>

      {/* Text Content */}
      <div className="Preview-text mt-12 absolute top-[25%] left-1/2 transform -translate-x-1/2">
        <p className="text-4xl text-gray-300 font-bold mb-6 tracking-[0.5px] w-[90%] sm:w-[500px] text-center sm:text-left">
          Where Your Stories Find Their Voice and Characters Come Alive
        </p>
        <p className="text-[18px] text-gray-300 leading-[27px] tracking-[0.5px] w-[90%] sm:w-[500px] mb-8 text-center sm:text-left">
          Redefine AI roleplay with advanced tools, endless creativity, and a panda-powered experience that sets a new standard.
        </p>
      </div>

      {/* Buttons */}
      <div className="Buttons absolute top-[50%] left-1/2 transform -translate-x-1/2 flex space-x-4 mb-8">
        <button className="text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl bg-gradient-to-r from-[#FFCBBB] to-[#B22801] transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-orange-500/50 hover:shadow-lg">
          <span className="relative z-10">Explore</span>
        </button>

        <button className="create bg-black text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl outline outline-1 outline-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-yellow-500/50 hover:shadow-lg relative overflow-hidden group">
          <span className="relative z-10">Create</span>
          <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
      </div>

      {/* Card Component */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
        <Card />
      </div>
    </div>
  );
}
