import React from "react";
import "../CSS/Create.css";
import { Link } from "react-router-dom";
import { CharacterImport } from "./Import/CharacterImport.jsx";

export default function Create() {
  return (
    <>
      <div className="container">
        <h1 className="text-center mb-5">Character Creation Studio</h1>
        <div className="text-center mb-4">
          <a href="guideline.html">
            <img
              src="IMAGES/Guidelines.png"
              alt="Guidelines"
              className="img-fluid"
              style={{
                maxWidth: "200px",
                cursor: "pointer",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                animation: "float 3s ease-in-out infinite",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.2)";
                e.target.style.opacity = "0.8";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.opacity = "1";
              }}
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
            onClick={(e) => alert(e.target.getAttribute("data-info"))}
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
            onClick={(e) => alert(e.target.getAttribute("data-info"))}
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
            onClick={(e) => alert(e.target.getAttribute("data-info"))}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="description"
            required
            maxLength="12000"
          />
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
            onClick={(e) => alert(e.target.getAttribute("data-info"))}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="persona"
            required
            maxLength="12000"
          />
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
            onClick={(e) => alert(e.target.getAttribute("data-info"))}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="modelInstructions"
            required
            maxLength="12000"
          />
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
            onClick={(e) => alert(e.target.getAttribute("data-info"))}
          >
            <i className="bi bi-info-circle"></i>
          </button>
          <textarea
            className="form-control"
            id="firstMessage"
            required
            maxLength="12000"
          />
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
            onClick={(e) => alert(e.target.getAttribute("data-info"))}
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
                  onClick={() => addTag("Female")}
                  data-tag="Female"
                >
                  Female
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Male")}
                  data-tag="Male"
                >
                  Male
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Fantasy")}
                  data-tag="Fantasy"
                >
                  Fantasy
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Sci-Fi")}
                  data-tag="Sci-Fi"
                >
                  Sci-Fi
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Adventure")}
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
                  onClick={() => addTag("Hero")}
                  data-tag="Hero"
                >
                  Hero
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Villain")}
                  data-tag="Villain"
                >
                  Villain
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Romance")}
                  data-tag="Romance"
                >
                  Romance
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Horror")}
                  data-tag="Horror"
                >
                  Horror
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Mystery")}
                  data-tag="Mystery"
                >
                  Mystery
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Historical")}
                  data-tag="Historical"
                >
                  Historical
                </span>
                <span
                  className="tag-pill"
                  onClick={() => addTag("Comedy")}
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
    </>
  );
}
