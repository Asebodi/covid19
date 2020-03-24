import React, { useState, useEffect } from "react";
import ChartGlobal from "./ChartGlobal";

function useStats(url) {
  const [stats, setStats] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url).then(res => res.json());
      setStats(data);
    }
    fetchData();
  }, [url]);
  return stats;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function Global() {
  const statsGlobal = useStats("https://covid19.mathdro.id/api/");
  // const chart = useStats("https://covid19.mathdro.id/api/daily");

  if (!statsGlobal) return <p className="loading">Loading....</p>;
  // if (!chart) return <p className="loading">Loading....</p>;

  // let chartData = chart.map(data => data.totalConfirmed);
  // console.log(countries[1]);

  return (
    <div>
      <h4 className="title">WORLDWIDE</h4>

      <div className="global-wrapper">
        <ChartGlobal></ChartGlobal>
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
            Today confirmed: Unavailable
            {/* {chart[chart.length - 1].deltaConfirmed} */}
          </small>
          <br />
          <small>
            Today recovered: Unavailable
            {/* {chart[chart.length - 1].deltaRecovered} */}
          </small>
        </div>
      </div>

      {/* <CountriesTop3></CountriesTop3> */}
    </div>
  );
}
