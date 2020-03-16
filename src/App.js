import React, { useState, useEffect } from "react";
import "./css/style.css";

function useStats() {
  const [stats, setStats] = useState();
  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data");
      const data = await fetch(
        "https://covid19.mathdro.id/api/countries/ID"
      ).then(res => res.json());
      setStats(data);
    }
    fetchData();
  }, []);
  return stats;
}

function Stats() {
  const stats = useStats();
  if (!stats) return <p className="loading">Loading....</p>;
  console.log(stats);
  const dateString = new Date(stats.lastUpdate);

  return (
    <div>
      <main>
        <div className="stats-wrapper infected">
          <p>Confirmed:</p>
          <h4 className="infected-val">{stats.confirmed.value}</h4>
        </div>

        <div className="stats-wrapper recovered">
          <p>Recovered:</p>
          <h4 className="recovered-val">{stats.recovered.value}</h4>
        </div>

        <div className="stats-wrapper deaths">
          <p>Deaths:</p>
          <h4 className="deaths-val">{stats.deaths.value}</h4>
        </div>
      </main>

      <footer>
        <p>Last updated: {dateString.toString()}</p>
        <small>raharditya.com</small>
      </footer>
    </div>
  );
}

function App() {
  return (
    <body>
      <div className="page-wrapper">
        <header>
          <h3>COVID-19 Monitor</h3>
          <h4>Region: Indonesia</h4>
        </header>

        <Stats></Stats>
      </div>
    </body>
  );
}

export default App;
