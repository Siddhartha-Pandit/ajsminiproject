import React, { useState, useEffect } from "react";
import useFetch from "../useFetch";
import { addNotes, setNote } from "../features/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function Navbar() {
  const [content, setContent] = useState(false);
  const [title, setTitle] = useState("Notepad");
  const { data, isPending, error } = useFetch(`http://127.0.0.1:8000/notes/`);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const sirshak = useSelector((state) => state.notes);
  useEffect(() => {
    if (data && data.length > 0) {
      const newData = data.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
      }));

      newData.forEach((item) => {
        dispatch(addNotes(item));
      });
    }
  }, [data, isPending, error]);

  const changeName = () => {
    setContent(true);
  };
  const changeDone = () => {
    if (pathname === "/editor") {
      dispatch(setNote(title));
      setContent(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    if (pathname === "/") {
      setTitle("Notepad");
    } else if (pathname === `/editor/${id}`) {
      console.log("Yo title ho mero", sirshak);
      const len = sirshak.length;
      console.log("This is the len", len);
      setTitle(sirshak);
    }

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
              src="./favicon.png"
              alt=""
              srcset=""
              height="52px"
              onClick={changeDone}
            />
          </div>
          <div>
            {pathname == "/editor" && (
              <div onClick={changeName} className="titles">
                {content ? (
                  <div>
                    <input
                      className="text-box"
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      autoFocus
                    />
                  </div>
                ) : (
                  title
                )}
              </div>
            )}
            {pathname == "/" && !content && (
              <div className="titles">Notepad</div> // Move this outside the inner div
            )}
            {pathname !== `/editor` && pathname !== "/" && !content && (
              <div className="titles">{title}</div>
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
