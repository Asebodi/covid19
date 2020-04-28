import React, { useState, useEffect } from "react";

function useStats(url) {
  const [stats, setStats] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url).then((res) => res.json());
      setStats(data);
    }
    fetchData();
  }, [url]);
  return stats;
}

function numberWithCommas(x) {
  if (x != null) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return "Unavailable";
  }
}

function Countries() {
  const countries = useStats(
    "https://coronavirus-19-api.herokuapp.com/countries"
  );

  if (!countries) return <p className="loading">Loading....</p>;

  const country = countries.slice(1, 7);

  return (
    <div>
      <div className="country">
        <h3>{country[0].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(country[0].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(country[0].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(country[0].deaths)}</p>
        </div>
      </div>

      <div className="country">
        <h3>{country[1].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(country[1].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(country[1].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(country[1].deaths)}</p>
        </div>
      </div>

      <div className="country">
        <h3>{country[2].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(country[2].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(country[2].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(country[2].deaths)}</p>
        </div>
      </div>

      <div className="country">
        <h3>{country[3].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(country[3].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(country[3].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(country[3].deaths)}</p>
        </div>
      </div>

      <div className="country">
        <h3>{country[4].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(country[4].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(country[4].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(country[4].deaths)}</p>
        </div>
      </div>

      <div className="country">
        <h3>{country[5].country}</h3>
        <div className="country-stats">
          <p className="infected-val">{numberWithCommas(country[5].cases)}</p>
          <p className="recovered-val">
            {numberWithCommas(country[5].recovered)}
          </p>
          <p className="deaths-val">{numberWithCommas(country[5].deaths)}</p>
        </div>
      </div>
    </div>
  );
}

export default function CountriesTop3() {
  const [countriesMore, setCountriesMore] = useState(false);

  function dropCountries() {
    setCountriesMore(!countriesMore);
  }

  return (
    <div className="countries-wrapper">
      <div className={countriesMore + "-countries"}>
        <Countries></Countries>
      </div>

      <small onClick={() => dropCountries()} className="countries-more">
        {countriesMore ? "View less" : "View more"}
      </small>
    </div>
  );
}
