import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/main.scss"
import API from "../utils/API";


function Main() {

  const [clients, setClients] = useState([])

  useEffect(() => {
    loadClients()
  }, [])
  
  const loadClients = () => {
    API.getClients()
      .then(res =>
        setClients(res.data),
        console.log(clients)
        )
        .catch((err) => {
          console.log(err)
        })
  }
  
    return (
      <div>
        <div className="container">
          
          <h2>Add New Bid</h2>
          <div className="ph3">
            <Link to="/newbids"><span className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-green"> Add Bid </span></Link>
          </div>
          
          <h3>Search existing Bids</h3>
          <div className="myUl">
            {clients.length ? (
            <ul >
                {clients.map(client => (
                <li key={client.id}>{client.fullName}</li>
                ))}              
            </ul>

            ) : (
              <h3>No Results</h3>
            )}
          </div>
        </div>
      </div>
    );
  }

export default Main;
