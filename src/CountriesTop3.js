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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function CountriesTop3() {
  const countries = useStats(
    "https://coronavirus-19-api.herokuapp.com/countries"
  );

  if (!countries) return <p className="loading">Loading....</p>;

  return (
    <div className="countries-wrapper">
      <div className="country">
        <h3>{countries[0].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(countries[0].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(countries[0].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(countries[0].deaths)}</p>
        </div>
      </div>

      <div className="country">
        <h3>{countries[1].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(countries[1].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(countries[1].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(countries[1].deaths)}</p>
        </div>
      </div>

      <div className="country">
        <h3>{countries[2].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(countries[2].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(countries[2].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(countries[2].deaths)}</p>
        </div>
      </div>
    </div>
  );
}
