import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((response) => response.json())
      .then((data) => setData(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>React + Express Test</h1>
      <p>{data ? data : "Loading..."}</p>
    </div>
  );
}

export default App;
