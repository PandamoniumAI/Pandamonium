import Animal from "../assets/animal.png";
import './Preview.css';
import 'tailwindcss/tailwind.css';
import Card from "../Preview/Card/Card"
export default function Preview() {
  return (
    <div className="preview-container">
      <img className="preview-image w-6 h-6" src={Animal} alt="Animal" />
      <h1 className="preview-title text-2xl font-bold absolute top-4 left-[50px] text-white font-baloo">PandAI</h1>

      <div className="Preview-text mt-[50px] absolute top-[200px]">
        <p className="text-4xl text-gray-300  font-bold mb-4 tracking-[0.5px] w-[500px]">Where Your Stories Find Their Voice and Characters Come Alive</p>
        <p className="text-[18px] text-gray-300 leading-[27px] tracking-[0.5px] w-[500px]">Redefine AI roleplay with advanced tools, endless creativity, and a panda-powered experience that sets a new standard.</p>
      </div>

      <div className="Buttons absolute top-[470px] flex space-x-4">
        <button className="text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl bg-gradient-to-r from-[#FFCBBB] to-[#B22801] transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-orange-500/50 hover:shadow-lg">
          <span className="relative z-10">Explore</span>
        </button>

        <button className="create bg-black text-white text-xl h-[47px] w-[200px] rounded-lg shadow-2xl outline outline-1 outline-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-yellow-500/50 hover:shadow-lg relative overflow-hidden group">
          <span className="relative z-10">Create</span>
          <span className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
      </div>

      <div className="absolute right-0 ">
  <Card />
</div>



    </div>
  );
}
