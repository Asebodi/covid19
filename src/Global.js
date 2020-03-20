import React, { useState, useEffect } from "react";

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

export default function Global() {
  const statsGlobal = useStats("https://covid19.mathdro.id/api/");
  const chart = useStats("https://covid19.mathdro.id/api/daily");
  const countries = useStats(
    "https://coronavirus-19-api.herokuapp.com/countries"
  );

  if (!statsGlobal) return <p className="loading">Loading....</p>;
  if (!chart) return <p className="loading">Loading....</p>;
  if (!countries) return <p className="loading">Loading....</p>;

  // let chartData = chart.map(data => data.totalConfirmed);
  // console.log(countries[1]);

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

      <div className="countries-wrapper">
        <div className="country">
          <h3>{countries[0].country}</h3>
          <div className="country-stats">
            <p className="infected-val">
              {numberWithCommas(countries[0].cases)}
            </p>
            <p className="recovered-val">
              {numberWithCommas(countries[0].recovered)}
            </p>
            <p className="deaths-val">
              {numberWithCommas(countries[0].deaths)}
            </p>
          </div>
        </div>

        <div className="country">
          <h3>{countries[1].country}</h3>
          <div className="country-stats">
            <p className="infected-val">
              {numberWithCommas(countries[1].cases)}
            </p>
            <p className="recovered-val">
              {numberWithCommas(countries[1].recovered)}
            </p>
            <p className="deaths-val">
              {numberWithCommas(countries[1].deaths)}
            </p>
          </div>
        </div>

        <div className="country">
          <h3>{countries[2].country}</h3>
          <div className="country-stats">
            <p className="infected-val">
              {numberWithCommas(countries[2].cases)}
            </p>
            <p className="recovered-val">
              {numberWithCommas(countries[2].recovered)}
            </p>
            <p className="deaths-val">
              {numberWithCommas(countries[2].deaths)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
