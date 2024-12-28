import Animal from "../assets/animal.png";
import './Preview.css'
import 'tailwindcss/tailwind.css';

export default function Preview() {
  return (
    <div className="preview-container">
      <img className="preview-image" src={Animal} alt="Animal" />
      <h1 className="preview-title">PandAI</h1>

      <div className="preview-text mt-[50px] top-[50px]">
        <h1 className="text-4xl font-bold mb-4 text-white">Where Your Stories Find Their Voice and Characters Come Alive</h1>
        <p className="text-xl text-gray-300">Redefine AI roleplay with advanced tools, endless creativity, and a panda-powered experience that sets a new standard.</p>
      </div>
    </div>
  );
}
