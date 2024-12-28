import Animal from "../assets/animal.png";
import './Preview.css'

export default function Preview() {
  return (
    <div className="preview-container">
      <img className="preview-image" src={Animal} alt="Animal" />
      <h1 className="preview-title">PandAI</h1>

      <div classname="preview-text">
        <h1>Where Your Stories Find Their Voice and Characters Come Alive</h1>
      </div>
    </div>
  );
}
