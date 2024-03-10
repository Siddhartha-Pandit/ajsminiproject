// AppRoutes.js
import React from "react";
import "./style.css";
import { Routes, Route, useLocation } from "react-router-dom";
import NoteList from "./components/NoteList";
import Editor from "./components/Editor";
import EditorNew from "./components/EditorNew";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";

function AppRoutes() {
  const { pathname } = useLocation();
  const excludedRoutes = ["/notfound"];
  const shouldShowNavbar = !excludedRoutes.includes(pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route element={<NoteList />} path="/" />
        <Route element={<Editor />} path="/editor" />
        <Route element={<EditorNew />} path="/editor/:id" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
