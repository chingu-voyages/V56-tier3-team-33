import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const FETCH_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

function App() {
  const [count, setCount] = useState(0);
  const [serverResponse, setServerResponse] = useState("");

  useEffect(() => {
    fetch(FETCH_URL)
      .then((res) => res.text())
      .then((data) => {
        setServerResponse(data);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {serverResponse && <h2>Server says: {serverResponse}</h2>}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
