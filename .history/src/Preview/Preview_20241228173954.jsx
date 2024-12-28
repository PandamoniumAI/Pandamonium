import Animal from "../assets/animal.png";
import './Preview.css';
import 'tailwindcss/tailwind.css';
import Card from "../Preview/Card/Card";

export default function Preview() {
  return (
    <div className="preview-container relative p-6 min-h-screen flex items-center justify-center bg-gradient-to-r from-[#B22801] to-[#FFCBBB]">
      <img className="preview-image w-6 h-6 absolute top-6 left-6" src={Animal} alt="Animal" />
      <h1 className="preview-title text-3xl font-bold absolute top-6 left-[50px] text-white font-baloo">PandAI</h1>

      <div className="Preview-text absolute top-[150px] left-10 space-y-6">
        <p className="text-4xl text-gray-300 font-bold tracking-wide max-w-lg">Where Your Stories Find Their Voice and Characters Come Alive</p>
        <p className="text-xl text-gray-300 leading-[27px] tracking-wide max-w-lg">Redefine AI roleplay with advanced tools, endless creativity, and a panda-powered experience that sets a new standard.</p>
      </div>

      <div className="Buttons absolute top-[350px] left-10 space-x-4 mb-8">
        <button className="text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl bg-gradient-to-r from-[#FFCBBB] to-[#B22801] transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-orange-500/50 hover:shadow-lg">
          <span className="relative z-10">Explore</span>
        </button>

        <button className="create bg-black text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl outline outline-1 outline-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-yellow-500/50 hover:shadow-lg relative overflow-hidden group">
          <span className="relative z-10">Create</span>
          <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
      </div>

      {/* Card positioned at the right edge */}
      <div className="absolute right-0 top-[200px] mr-10">
        <Card />
      </div>
    </div>
  );
}
