import React, { useState } from "react";

function Navbar() {
  const [content, setContent] = useState(false);
  const [title, setTitle] = useState("Untitled");

  const changeName = () => {
    console.log("this is clicked");
    setContent(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="navbar">
        <div className="hamburger" onClick={toggleSidebar}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>
        <div className="title-container">
          <div>
            <img
              src="favicon.png"
              alt=""
              srcset=""
              height="52px"
              onClick={() => setContent(false)}
            />
          </div>
          <div>
            {content ? (
              <div>
                <input
                  className="text-box"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
            ) : (
              <div onClick={changeName} className="titles">
                {title}
              </div>
            )}
          </div>
        </div>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    );
  };

  return <Sidebar />;
}

export default Navbar;
