import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Editor = () => {
  const [data, setData] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [activeButtons, setActiveButtons] = useState([]);

  const [fontNameOptions, setFontNameOptions] = useState([]);
  const [fontSizeOptions, setFontSizeOptions] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const title = useSelector((state) => state.newdata);
  useEffect(() => {
    const fontList = [
      "Arial",
      "Verdana",
      "Times New Roman",
      "Garamond",
      "Georgia",
      "Courier New",
      "cursive",
    ];
    const fontNameOptions = fontList.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ));

    const sizeOptions = [];

    for (let i = 1; i <= 7; i++) {
      sizeOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    setFontSizeOptions(sizeOptions);
    setFontNameOptions(fontNameOptions);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const formattedContent = document.getElementById("text-input").innerHTML;

    const len = title.length;
    const blog = {
      title: title[len - 1],

      content: formattedContent,
    };

    setIsPending(true);
    fetch("http://127.0.0.1:8000/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save data");
        }

        return response.json();
        navigate("/");
      })
      .then(() => {
        setIsPending(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        setIsPending(false);
      });
  };

  const handleButtonClick = (command, needsRemoval) => {
    document.execCommand(command, false, null);
    // if (needsRemoval) {
    //   const alreadyActive = activeButtons.includes(command);
    //   setActiveButtons(alreadyActive ? [] : [command]);
    // } else {
    //   setActiveButtons((prevButtons) =>
    //     prevButtons.includes(command)
    //       ? prevButtons.filter((button) => button !== command)
    //       : [...prevButtons, command]
    //   );
    // }
  };

  const handlesetItem = (e) => {
    setData(e.target.value);
  };
  const handleAdvancedOptionChange = (command, value) => {
    // if (command === "fontName") {
    //   document.execCommand(command, false, value);
    // } else if (command === "fontSize") {
    //   document.execCommand("fontSize", false, value);
    // } else {
    //   document.execCommand(command, false, value);
    // }
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="options">
            <button
              id="save"
              className="option-button format"
              onClick={handleSave}
            >
              <i class="fa-solid fa-floppy-disk"></i>
            </button>
            <button
              id="bold"
              className="option-button format"
              onClick={() => handleButtonClick("bold")}
            >
              <i className="fa-solid fa-bold"></i>
            </button>
            <button
              id="italic"
              className="option-button format"
              onClick={() => handleButtonClick("italic")}
            >
              <i className="fa-solid fa-italic"></i>
            </button>
            <button
              id="underline"
              className="option-button format"
              onClick={() => handleButtonClick("underline")}
            >
              <i className="fa-solid fa-underline"></i>
            </button>
            <button
              id="strikeout"
              className="option-button format"
              onClick={() => handleButtonClick("strikeout")}
            >
              <i className="fa-solid fa-strikethrough"></i>
            </button>
            <button
              id="superscript"
              className="option-button format"
              onClick={() => handleButtonClick("superscript")}
            >
              <i className="fa-solid fa-superscript"></i>
            </button>
            <button
              id="subscript"
              className="option-button format"
              onClick={() => handleButtonClick("subscript")}
            >
              <i className="fa-solid fa-subscript"></i>
            </button>
            <button
              id="insertOrderedList"
              className="option-button"
              onClick={() => handleButtonClick("insertOrderedList")}
            >
              <i className="fa-solid fa-list-ol"></i>
            </button>
            <button
              id="insertUnorderedList"
              className="option-button"
              onClick={() => handleButtonClick("insertUnorderedList")}
            >
              <i className="fa-solid fa-list"></i>
            </button>
            <button
              id="undo"
              className="option-button"
              onClick={() => handleButtonClick("undo")}
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <button
              id="redo"
              className="option-button"
              onClick={() => handleButtonClick("redo")}
            >
              <i className="fa-solid fa-rotate-right"></i>
            </button>
            <button
              id="createLink"
              className="option-button"
              onClick={() => handleButtonClick("createLink")}
            >
              <i className="fa fa-link"></i>
            </button>
            <button
              id="unlink"
              className="option-button"
              onClick={() => handleButtonClick("unlink")}
            >
              <i className="fa fa-unlink"></i>
            </button>

            <button
              id="justifyLeft"
              className="option-button align"
              onClick={() => handleButtonClick("justifyLeft")}
            >
              <i className="fa-solid fa-align-left"></i>
            </button>

            <button
              id="justifyCenter"
              className="option-button align"
              onClick={() => handleButtonClick("justifyCenter")}
            >
              <i className="fa-solid fa-align-center"></i>
            </button>
            <button
              id="justifyRight"
              className="option-button align"
              onClick={() => handleButtonClick("justifyRight")}
            >
              <i className="fa-solid fa-align-right"></i>
            </button>
            <button
              id="justifyFull"
              className="option-button align"
              onClick={() => handleButtonClick("justifyFull")}
            >
              <i className="fa-solid fa-align-justify"></i>
            </button>
            <button
              id="indent"
              className="option-button spacing"
              onClick={() => handleButtonClick("indent")}
            >
              <i className="fa-solid fa-indent"></i>
            </button>
            <button
              id="outdent"
              className="option-button spacing"
              onClick={() => handleButtonClick("outdent")}
            >
              <i className="fa-solid fa-outdent"></i>
            </button>

            <select
              id="formatBlock"
              className="adv-option-button"
              onChange={(e) =>
                handleAdvancedOptionChange("formatBlock", e.target.value)
              }
            >
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="H4">H4</option>
              <option value="H5">H5</option>
              <option value="H6">H6</option>
            </select>

            <select
              id="fontName"
              className="adv-option-button"
              onChange={(e) =>
                handleAdvancedOptionChange("fontName", e.target.value)
              }
            >
              {fontNameOptions}
            </select>
            <select
              id="fontSize"
              className="adv-option-button"
              defaultValue="3"
              onChange={(e) =>
                handleAdvancedOptionChange("fontSize", e.target.value)
              }
            >
              {fontSizeOptions}
            </select>

            <div className="input-wrapper">
              <input
                type="color"
                id="foreColor"
                className="adv-option-button"
                onChange={(e) =>
                  handleAdvancedOptionChange("foreColor", e.target.value)
                }
              />
              <label htmlFor="foreColor">Font Color</label>
            </div>

            <div className="input-wrapper">
              <input
                type="color"
                id="backColor"
                className="adv-option-button"
                onChange={(e) =>
                  handleAdvancedOptionChange("backColor", e.target.value)
                }
              />
              <label htmlFor="backColor">Highlight Color</label>
            </div>
          </div>
          <div
            id="text-input"
            contentEditable="true"
            onInput={(e) => setData(e.target.textContent)}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Editor;
