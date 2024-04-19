import axios from "axios";
import { useEffect, useState } from "react";


function Events() {
  const [event, setEvent] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchData = () => {
      axios.get("/Events.json" ,{
        headers: {
          "HashKey": "6a039494938389f3d8323b6c93ad2ae2",
        },
      })
        .then((res) => setEvent(res.data.Rows))
        .catch((error) => console.error("Error fetching  Event:", error));
    };
    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []); 

  const filter = event.filter((item) => {
    return item.HostName.includes(name);
  });
  return (
    <div className="  events container">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>
      <div className="table-container">
        <table className=" content-table">
          <thead>
            <tr>
              <th>EventId</th>
              <th>HostName</th>
              <th>EventCode</th>
              <th>EventKind</th>
              <th>EventProvider</th>
              <th>EventSeverity</th>
              <th>Type</th>
              <th>Platform</th>
              <th>Raw</th>
            </tr>
          </thead>
          <tbody>
            {filter.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.EventId}</td>
                  <td>{item.HostName}</td>
                  <td>{item.EventCode}</td>
                  <td>{item.EventKind}</td>
                  <td> {item.EventProvider}</td>
                  <td>{item.EventSeverity}</td>
                  <td>{item.Type}</td>
                  <td>{item.Platform}</td>
                  <td>{item.Raw}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Events
