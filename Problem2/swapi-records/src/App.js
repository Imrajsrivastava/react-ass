// import React, { useState } from "react";
// import "./App.css";
// import axios from "axios";
// function App() {
//   const [records, setRecords] = useState([]);

//   const addRecord = async () => {
//     const randomId = Math.floor(Math.random() * 83) + 1;
//     try {
//       const resp = await axios.get(`https://swapi.dev/api/people/${randomId}`, {
//         headers: {
//           Accept: "application/json",
//         },
//       });
//       console.log("response---", resp);
//       setRecords((prev) => [...prev, { id: randomId, name: resp.data.name }]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   return (
//     <div className="App">
//       <button onClick={addRecord}>Add Record</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.map((record) => (
//             <tr key={record.id}>
//               <td>{record.name}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     setRecords((prev) =>
//                       prev.filter((rec) => rec.id !== record.id)
//                     )
//                   }
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const addRecord = async () => {
    const randomId = Math.floor(Math.random() * 83) + 1;
    setLoading(true);
    try {
      const resp = await axios.get(`https://swapi.dev/api/people/${randomId}`, {
        headers: {
          Accept: "application/json",
        },
      });
      setRecords((prev) => [...prev, { id: randomId, name: resp.data.name }]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = (id) => {
    setRecords((prev) => prev.filter((rec) => rec.id !== id));
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.heading}>Star Wars Characters</h1>
      <button style={styles.button} onClick={addRecord} disabled={loading}>
        {loading ? "Loading..." : "Add Record"}
      </button>

      {records.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td style={styles.td}>{record.name}</td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => deleteRecord(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noRecords}>No records added yet.</p>
      )}
    </div>
  );
}

const styles = {
  app: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "8px 12px",
    fontSize: "14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    margin: "20px auto",
    borderCollapse: "collapse",
    width: "70%",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "12px",
  },
  noRecords: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#888",
  },
};

export default App;
