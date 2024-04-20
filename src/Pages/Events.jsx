import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../Components/Input";


function Events() {
  const [event, setEvent] = useState([]);
  const [name, setName] = useState("");
  const [hashKey, setHashKey] = useState("");
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/Events.json")
        .then((res) => {
          const data = res.data;
          setHashKey(data.HashKey);
          setEvent(data.Rows);
        })
        .catch((error) => console.error("Error fetching Events:", error));
    };

    fetchData();

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axios
        .post("/Events.json" , {
          HashKey: hashKey
        }) 
        .then((res) => {
          const data = res.data;
          if (data.HashKey !== hashKey) {
            setHashKey(data.HashKey);
            setEvent(data.Rows);
          }
        })
        .catch((error) => console.error("Error fetching Events:", error));
    };

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [hashKey]); 

  const filter = event.filter((item) => {
    return item.HostName.includes(name);
  });
  return (
    <div className="  events container">

    <Input name={name} setName={setName} />
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
