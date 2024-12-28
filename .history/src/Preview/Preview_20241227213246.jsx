import Animal from "../assets/animal.png";
import './Preview.css'
import 'tailwindcss/tailwind.css';

export default function Preview() {
  return (
    <div className="preview-container">
      <img className="preview-image" src={Animal} alt="Animal" />
      <h1 className="preview-title">PandAI</h1>

      <div className="preview-text mt-5">
        <h1>Where Your Stories Find Their Voice and Characters Come Alive</h1>
        <p>Redefine AI roleplay with advanced tools, endless creativity, and a panda-powered experience that sets a new standard.</p>
      </div>
    </div>
  );
}
