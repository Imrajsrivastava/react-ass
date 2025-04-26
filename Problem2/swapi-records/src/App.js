import React, { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [records, setRecords] = useState([]);

  const addRecord = async () => {
    const randomId = Math.floor(Math.random() * 83) + 1;
    try {
      const resp = await axios.get(`https://swapi.dev/api/people/${randomId}`, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("response---", resp);
      setRecords((prev) => [...prev, { id: randomId, name: resp.data.name }]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="App">
      <button onClick={addRecord}>Add Record</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>
                <button
                  onClick={() =>
                    setRecords((prev) =>
                      prev.filter((rec) => rec.id !== record.id)
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
