import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeNote, addNotes } from "../features/noteSlice";
const EditorNew = () => {
  const [data, setData] = useState("");

  const [Loading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/notes/${id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch note");
        }
        const data = await response.json();
        setData(data);
        setContent(data.content);
        dispatch(addNotes(data.title));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);
  const title = useSelector((state) => state.newdata);

  return (
    <>
      <div className="show">
        {/* <h1 dangerouslySetInnerHTML={{ __html: content.title }}></h1> */}
        <h1 lassName="show">{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </>
  );
};

export default EditorNew;
