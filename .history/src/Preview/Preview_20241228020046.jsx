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
      <div className="Preview-text mt-[50px] absolute top-[50px]">
        <p>
          Hello
        </p>
      </div>
    </div>
  );
}
