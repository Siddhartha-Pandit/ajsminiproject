import React, { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeNote, addNotes } from "../features/noteSlice";

export default function NoteList() {
  const dispatch = useDispatch();
  //   const data = notes;
  const navigate = useNavigate();
  const { data, isPending, error } = useFetch(`http://127.0.0.1:8000/notes/`);
  useEffect(() => {
    if (data && data.length > 0) {
      const newData = data.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
      }));

      newData.forEach((item) => {});
    }
  }, [data, isPending, error]);

  useEffect(() => {
    // const handleDarkLightToggle = () => {
    //   document.body.classList.add("toggle");
    //   setTimeout(() => {
    //     document.body.classList.toggle("light");
    //     setTimeout(() => document.body.classList.remove("toggle"), 10);
    //   }, 5);
    // };

    const handleDarkLightToggle = () => {
      document.body.classList.add("toggle");
      setTimeout(() => {
        document.body.classList.toggle("light");
        setTimeout(() => document.body.classList.remove("toggle"), 10);
      }, 5);
    };

    const inputElement = document.querySelector(".day-night input");
    if (inputElement) {
      inputElement.addEventListener("change", handleDarkLightToggle);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("change", handleDarkLightToggle);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    //   data.map((note) => (
    //     <div className="card" key={note.id}>
    //       <h4>{note.title}</h4>
    //       <p>
    //         {note.content.substring(0, 200)}{" "}
    //         {note.content.length > 200 && "..."}{" "}
  }, [data]);
  const handleDeleteNote = (id) => {
    // Dispatch action to remove the note

    // Send a request to the backend server to delete the note
    fetch(`http://127.0.0.1:8000/notes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete note");
        }
        // Note deleted successfully
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };
  return (
    <div>
      <div className="grid">
        <Link to={`/editor`} style={{ textDecoration: "none" }}>
          <div className="card addDiv">
            <i class="fa-solid fa-plus"></i>
          </div>
        </Link>

        {data &&
          data.map((note) => (
            <Link
              key={note.id}
              to={`/editor/${note.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <h4>{note.title.substring(0, 20)}</h4>
                <h4> {note.title.length > 20 && "..."} </h4>
                <br />
                <div>
                  {note.content.substring(0, 100)}
                  {note.content.length > 100 && "..."}{" "}
                </div>
                <div className="deleteContainer">
                  <div
                    className="delete"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
