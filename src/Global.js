import React, { useState, useEffect } from "react";

function useStats(url) {
  const [stats, setStats] = useState();
  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data");
      const data = await fetch(url).then(res => res.json());
      setStats(data);
    }
    fetchData();
  }, []);
  return stats;
}

export default function Global() {
  const statsGlobal = useStats("https://covid19.mathdro.id/api/");
  const chart = useStats("https://covid19.mathdro.id/api/daily");

  if (!statsGlobal) return <p className="loading">Loading....</p>;
  if (!chart) return <p className="loading">Loading....</p>;

  let chartData = chart.map(data => data.totalConfirmed);
  console.log(chart[chart.length - 1].deltaConfirmed);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div>
      <h4 className="title">WORLDWIDE</h4>

      <div className="global-wrapper">
        <div className="global-grid">
          <div className="global-stats">
            <p>Confirmed</p>
            <h4 className="infected-val">
              {numberWithCommas(statsGlobal.confirmed.value)}
            </h4>
          </div>

          <div className="global-stats">
            <p>Recovered</p>
            <h4 className="recovered-val">
              {numberWithCommas(statsGlobal.recovered.value)}
            </h4>
          </div>

          <div className="global-stats">
            <p>Deaths</p>
            <h4 className="deaths-val">
              {numberWithCommas(statsGlobal.deaths.value)}
            </h4>
          </div>
        </div>

        <div className="global-daily">
          <small>
            Today confirmed: {chart[chart.length - 1].deltaConfirmed}
          </small>
          <br />
          <small>
            Today recovered: {chart[chart.length - 1].deltaRecovered}
          </small>
        </div>
      </div>
    </div>
  );
}
