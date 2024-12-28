import Animal from "../assets/animal.png";
import './Preview.css';
import 'tailwindcss/tailwind.css';

export default function Preview() {
  return (
    <div className="preview-container">
      <img className="preview-image" src={Animal} alt="Animal" />
      <h1 className="preview-title">PandAI</h1>

      {/* <div className="preview-text mt-[50px] top-10">
        <h1 className="text-4xl font-bold mb-4 text-white tracking-[0.5px] w-[500px]" style={{ lineHeight: '59.4px' }}>Where Your Stories Find Their Voice and Characters Come Alive</h1>
        <p className="text-xl text-gray-300" style={{ lineHeight: '27px' }}>Redefine AI roleplay with advanced tools, endless creativity, and a panda-powered experience that sets a new standard.</p>
      </div> */}
      <div className="Preview-text mt-[50px] absolute top-[200px]">
        <p className="text-4xl text-gray-300  font-bold mb-4 tracking-[0.5px] w-[500px]">Where Your Stories Find Their Voice and Characters Come Alive</p>
        <p className="text-[18px] text-gray-300 leading-[27px] tracking-[0.5px]">Redefine AI roleplay with advanced tools, endless creativity, and a panda-powered experience that sets a new standard.</p>
      </div>

      <div className="Buttons absolute top-[470px]">
        <button className="text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl bg-gradient-to-r from-[#FFCBBB] to-[#B22801] transform hover:scale-105 transition-transform duration-300 ease-in-out">
          Explore
        </button>

        <button className="create bg-black text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl ml-4 outline outline-1 outline-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors duration-300 ease-in-out transform hover:scale-105 transition-transform duration-300 ease-in-out">
          Create
        </button>
      </div>
    </div>
  );
}
