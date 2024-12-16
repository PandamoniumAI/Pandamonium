import { useState } from "react";
import "./Create.css";
import Guideline from "../assets/Guidelines.png";

function Create() {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  const handleMouseOver = () => {
    setScale(1.2);
    setOpacity(0.8);
  };

  const handleMouseOut = () => {
    setScale(1);
    setOpacity(1);
  };

  const addTag = (tag) => {
    console.log(tag);
  };

  
  const CharacterForm = async (e) => {
    e.preventDefault();
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const characterData = {
        name: document.getElementById('name').value,
        photo: document.getElementById('photo').value,
        description: document.getElementById('description').value,
        modelInstructions: document.getElementById('modelInstructions').value,
        firstMessage: document.getElementById('firstMessage').value,
        system: document.getElementById('system').value,
        tag: document.getElementById('tag').value,
        persona: document.getElementById('persona').value
    };

    localStorage.setItem('characterData', JSON.stringify(characterData));

    try {
        const response = await fetch('https://server-hhcx.onrender.com/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(characterData)
        });

        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Error saving character');
        }
    } catch (error) {
        alert('Error saving character');
    } finally {
        submitButton.disabled = false;
    }
};

const customTag = () => {
    const customTag = document.getElementById('customTag').value.trim();
    if (customTag) {
        const tagSelect = document.getElementById('tag');
        const newOption = document.createElement('option');
        newOption.value = customTag;
        newOption.textContent = customTag;
        tagSelect.appendChild(newOption);
        document.getElementById('customTag').value = '';
    } else {
        alert("Please enter a custom tag");
    }
};

const CharacterForm = () => {
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('characterData'));
    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        const element = document.getElementById(key);
        if (element) {
          element.value = savedData[key];
        }
      });
    }
  }, []);
  
  return (
    <>
      <div>
        <h1 className="text-center mb-5">Character Creation Studio</h1>
        <div className="text-center mb-4">
          <a href="guideline.html">
            <img
              src={Guideline}
              alt="Guidelines"
              className="img-fluid"
              style={{
                maxWidth: "200px",
                cursor: "pointer",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: `scale(${scale})`,
                opacity: opacity,
              }}
              id="guideline"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          </a>
        </div>
      </div>

      <div className="creation-form">
        <form id="characterForm">
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Import Character from File
            </label>
            <input
              type="file"
              className="form-control"
              id="fileInput"
              accept=".json, .txt"
            />
            <label htmlFor="urlInput" className="form-label mt-2">
              Import Character from URL
            </label>
            <textarea
              className="form-control"
              id="urlInput"
              placeholder="Enter character URL"
            ></textarea>
            <button
              type="button"
              id="importButton"
              className="btn btn-primary mt-2"
            >
              Import
            </button>
          </div>
        </form>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Character Name
          </label>
          <button
            type="button"
            className="btn btn-sm info-btn"
            data-info="Enter the name of your character."
            style={{
              background: "none",
              border: "none",
              transition: "transform 0.1s",
            }}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            maxLength="1500"
            pattern="^[^🔥😊\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]*$"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Character Photo URL
          </label>
          <button
            type="button"
            className="btn btn-sm info-btn"
            data-info="Provide a URL link to your character's photo."
            style={{
              background: "none",
              border: "none",
              transition: "transform 0.1s",
            }}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <input type="url" className="form-control" id="photo" required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Character Description
          </label>
          <button
            type="button"
            className="btn btn-sm info-btn"
            data-info="Describe your character's traits and background."
            style={{
              background: "none",
              border: "none",
              transition: "transform 0.1s",
            }}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="description"
            required
            maxLength="12000"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="persona" className="form-label">
            Persona
          </label>
          <button
            type="button"
            className="btn btn-sm info-btn"
            data-info="Define your character's persona and personality traits."
            style={{
              background: "none",
              border: "none",
              transition: "transform 0.1s",
            }}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="persona"
            required
            maxLength="12000"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="modelInstructions" className="form-label">
            Character Model Instructions
          </label>
          <button
            type="button"
            className="btn btn-sm info-btn"
            data-info="Provide instructions for the character model."
            style={{
              background: "none",
              border: "none",
              transition: "transform 0.1s",
            }}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="modelInstructions"
            required
            maxLength="12000"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="firstMessage" className="form-label">
            First Message
          </label>
          <button
            type="button"
            className="btn btn-sm info-btn"
            data-info="Enter the first message your character will say."
            style={{
              background: "none",
              border: "none",
              transition: "transform 0.1s",
            }}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="firstMessage"
            required
            maxLength="12000"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="system" className="form-label">
            Character System
          </label>
          <button
            type="button"
            className="btn btn-sm info-btn"
            data-info="Specify the Important Model Instructions Your Character Must Always Follow Whenever generating an output."
            style={{
              background: "none",
              border: "none",
              transition: "transform 0.1s",
            }}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="system"
            required
            maxLength="12000"
          >
            Act Like A Neko Girl
          </textarea>
        </div>

        <div className="selected-tags mb-4">
          <h6>Selected Tags</h6>
          <div
            className="tag-pills selected-tag-pills"
            id="selectedTagsList"
          ></div>
        </div>
        <div className="mb-3">
          <button
            type="button"
            id="openTagsModal"
            className="btn btn-primary w-100"
          >
            <i className="bi bi-tags-fill me-2"></i>Add Tags
          </button>
        </div>

        <div className="tags-modal" id="tagsModal">
          <div className="tags-modal-content">
            <div className="tags-modal-header">
              <h5>Add Tags</h5>
              <button
                type="button"
                className="btn-close"
                id="closeTagsModal"
              ></button>
            </div>
            <div className="tags-modal-body">
              <div className="search-container mb-4">
                <input
                  type="text"
                  className="form-control"
                  id="tagSearch"
                  placeholder="Search tags..."
                />
              </div>

              <div className="selected-tags mb-4">
                <h6>Selected Tags</h6>
                <div
                  className="tag-pills selected-tag-pills"
                  id="selectedTagsList"
                ></div>
              </div>

              <div className="trending-tags mb-4">
                <h6>Trending Tags</h6>
                <div className="tag-pills">
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Female"
                  >
                    Female
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Male"
                  >
                    Male
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Fantasy"
                  >
                    Fantasy
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Sci-Fi"
                  >
                    Sci-Fi
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Adventure"
                  >
                    Adventure
                  </span>
                </div>
              </div>

              <div className="all-tags">
                <h6>All Tags</h6>
                <div className="tag-pills" id="allTagsList">
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Hero"
                  >
                    Hero
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Villain"
                  >
                    Villain
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Romance"
                  >
                    Romance
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Horror"
                  >
                    Horror
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Mystery"
                  >
                    Mystery
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Historical"
                  >
                    Historical
                  </span>
                  <span
                    className="tag-pill"
                    onClick={addTag(this)}
                    data-tag="Comedy"
                  >
                    Comedy
                  </span>
                </div>
              </div>

              <div className="create-tag-container mt-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="newTagInput"
                    placeholder="Create new tag..."
                  />
                  <button
                    className="btn btn-primary"
                    id="createNewTag"
                    type="button"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" id="tag" name="tag" required/>
        <button type="submit" class="btn w-100">Save Character</button>
      </div>
    </>
  );
}

export default Create;
