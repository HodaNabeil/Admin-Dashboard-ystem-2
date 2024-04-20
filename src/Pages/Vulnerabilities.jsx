import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Components/Input";

function Vulnerabilities() {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [name, setName] = useState("");
  const [hashKey, setHashKey] = useState("");


  useEffect(() => {
    const fetchData = () => {
      axios
        .get("/Vulnerabilities.json")
        .then((res) => {
          const data = res.data;
          setHashKey(data.HashKey);
          setVulnerabilities(data.Rows);
        })
        .catch((error) => console.error("Error fetching Vulnerabilities:", error));
    };

    fetchData();

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axios
        .post("/Vulnerabilities.json" , {
          HashKey: hashKey
        }) 
        .then((res) => {
          const data = res.data;
          if (data.HashKey !== hashKey) {
            setHashKey(data.HashKey);
            setVulnerabilities(data.Rows);
          }
        })
        .catch((error) => console.error("Error fetching Vulnerabilities:", error));
    };

    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [hashKey]); 

  const filter = vulnerabilities.filter((item) => {
    return (
      (item.hostname && item.hostname.includes(name)) ||
      (item.srcIp && item.srcIp.includes(name))
    );
  });
  
  return (
    <div className=" vulnerabilities container">
    <div className=" vulnerabilities-top">
    <div className="container-btn">
        <Link to="/" className="btn"><span>Internal Vulnerabilities</span></Link>
        <Link to="/" className="btn"> <span>External Vulnerabilities</span></Link>
      </div>

      <Input name={name} setName={setName} />
    </div>
      <div className="table-container">
        <table className=" content-table">
          <thead>
            <tr>
              <th>hostname</th>
              <th>srcIp </th>
              <th>srcPort</th>
              <th>cve_id</th>
              <th>cve_score</th>
              <th>cve_vector</th>
              <th>platform</th>
              <th>vulnerability_details_isdownloaded</th>
              <th>vulnerability_details_isinstalled</th>
              <th>vulnerability_details_ismandatory</th>
              <th>vulnerability_details_rebootrequired</th>
              <th>vulnerability_details_severity</th>
              <th>vulnerability_severity</th>
              <th>vulnerability_title</th>
              <th>vulnerability_description</th>
              <th>vulnerability_details_details_infourls</th>
            </tr>
          </thead>

          <tbody>
            {filter.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.hostname}</td>
                  <td>{item.srcIp}</td>
                  <td>{item.srcPort}</td>
                  <td>{item.cve_id === null ? "null" : item.cve_id}</td>
                  <td>{item.cve_score === null ? "null" : item.cve_score}</td>
                  <td>{item.cve_vector === null ? "null" : item.cve_vector}</td>
                  <td>{item.platform}</td>

                  <td>
                    {item.vulnerability_details_isdownloaded ===false  ? "False"  : "true"}
                  </td>
                  <td>
                    {item.vulnerability_details_isinstalled ===false  ? "False"  : "true"}
                  </td>
                  <td>
                    {item.vulnerability_details_ismandatory === false  ? "False"  : "true" }
                    
                    
                  </td>
                  <td>
                    {item.vulnerability_details_rebootrequired === false  ? "False"  : "true"}
                  </td>
                  <td>{item.vulnerability_details_severity}</td>
                  <td>{item.vulnerability_severity}</td>
                  <td>{item.vulnerability_title}</td>
                  <td>{item.vulnerability_description}</td>
                  <td>{item.vulnerability_details_details_infourls}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vulnerabilities;
