import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../Components/Input";

function Metrics() {
  const [metrics, setMetrics] = useState([]);
  const [name, setName] = useState("");
  const [hashKey, setHashKey] = useState("");



  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/Metrics.json")
        .then((res) => {
          const data = res.data;
          setHashKey(data.HashKey);
          setMetrics(data.Rows);
        })
        .catch((error) => console.error("Error fetching metrics:", error));
    };

    fetchData();

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axios
        .post("/Metrics.json" , {
          HashKey: hashKey
        }) 
        .then((res) => {
          const data = res.data;
          if (data.HashKey !== hashKey) {
            setHashKey(data.HashKey);
            setMetrics(data.Rows);
          }
        })
        .catch((error) => console.error("Error fetching metrics:", error));
    };

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [hashKey]); 

  const filter = metrics.filter((item) => item.hostname.includes(name));

  return (
    <div className="metrics container">
      <Input name={name} setName={setName} />
      <div className="table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>hostname</th>
              <th>id_endpoint</th>
              <th>platform</th>
              <th>status</th>
              <th>cpu_pct</th>
              <th>memory_used_pct</th>
              <th>system_uptime</th>
              <th>memory_rss_bytes</th>
            </tr>
          </thead>
          <tbody>
            {filter.map((item, index) => (
              <tr key={index}>
                <td>{item.hostname}</td>
                <td>{item.endpoint_id === null ? "null" : item.endpoint_id}</td>
                <td>{item.platform}</td>
                <td>{item.status}</td>
                <td>{item.cpu_pct}</td>
                <td>{item.memory_used_pct}</td>
                <td>{item.system_uptime}</td>
                <td>{item.memory_rss_bytes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Metrics;
