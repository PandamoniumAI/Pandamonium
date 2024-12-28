import Animal from "../assets/animal.png";
import './Preview.css';
import 'tailwindcss/tailwind.css';
import Card from "../Preview/Card/Card";

export default function Preview() {
  return (
    <div className="preview-container relative p-6 min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <img className="preview-image w-6 h-6" src={Animal} alt="Animal" />
      <h1 className="preview-title text-3xl font-bold absolute top-6 left-8 text-white font-baloo">
        PandAI
      </h1>

      <div className="Preview-text mt-[50px] absolute top-[200px] left-8 w-full md:w-[500px]">
        <p className="text-4xl text-gray-300 font-bold mb-6 tracking-wide leading-tight">
          Where Your Stories Find Their Voice and Characters Come Alive
        </p>
        <p className="text-lg text-gray-300 leading-[27px] tracking-wide mb-8">
          Redefine AI roleplay with advanced tools, endless creativity, and a panda-powered experience that sets a new standard.
        </p>
      </div>

      <div className="Buttons absolute top-[470px] left-8 md:left-[50px] flex space-x-4 mb-8">
        <button className="text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl bg-gradient-to-r from-[#FFCBBB] to-[#B22801] transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-orange-500/50 hover:shadow-lg">
          <span className="relative z-10">Explore</span>
        </button>

        <button className="create bg-black text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl outline outline-1 outline-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-yellow-500/50 hover:shadow-lg relative overflow-hidden group">
          <span className="relative z-10">Create</span>
          <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
      </div>

      {/* Positioned card at the edge */}
      <div className="absolute right-0 top-[200px] md:right-8 lg:right-16">
        <Card />
      </div>
    </div>
  );
}
