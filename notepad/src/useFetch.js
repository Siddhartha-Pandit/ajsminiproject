import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Could no fetch data");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setdata(data);

          setIsPending(false);
        })
        .catch((err) => {
          console.log(err.message);
          console.log("json server not started");
          console.log("please start server by typing");
          console.log("cd dojo-blog");
          console.log(" npx json-server --watch data/db.json --port 8000");
          if (err.name === "AbortError") {
            console.log("we ablorted the fetch");
          } else {
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 500);

    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
