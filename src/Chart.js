import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

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

export default function Chart() {
  const [chartOpt, setChartOpt] = useState("linear");

  const chartFetch = useStats(
    "https://indonesia-covid-19.mathdro.id/api/harian"
  );

  if (!chartFetch) return <p className="loading">Loading....</p>;

  var active = [];
  for (var key in chartFetch.data) {
    active[key] = {
      name: chartFetch.data[key].fid,
      cases: chartFetch.data[key].jumlahKasusKumulatif,
      recovered: chartFetch.data[key].jumlahPasienSembuh,
      deaths: chartFetch.data[key].jumlahPasienMeninggal,
      active: chartFetch.data[key].jumlahpasiendalamperawatan,
    };
  }

  var daily = [];
  for (var day in chartFetch.data) {
    daily[day] = {
      name: chartFetch.data[day].fid,
      dailyCases: chartFetch.data[day].jumlahKasusBaruperHari,
      dailyRecovered: chartFetch.data[day].jumlahKasusSembuhperHari,
      dailyDeaths: chartFetch.data[day].jumlahKasusMeninggalperHari,
    };
  }

  function setLog() {
    setChartOpt("log");
  }

  function setLinear() {
    setChartOpt("linear");
  }

  function setDaily() {
    setChartOpt("daily");
  }

  switch (chartOpt) {
    case "linear":
      return (
        <div className="chart">
          <div className="chart-toggle">
            <h4>Linear</h4>
            <small onClick={() => setLog()}>Logarithmic</small>
            <small onClick={() => setDaily()}>Daily</small>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={active}>
              <XAxis dataKey="name" />
              <YAxis width={45} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                strokeWidth={2}
                dot={false}
                dataKey="cases"
                stroke="#64818b"
                name="Cases"
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dot={false}
                dataKey="recovered"
                stroke="#7ba346"
                name="Recovered"
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dot={false}
                dataKey="deaths"
                stroke="#c51221"
                name="Deaths"
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dot={false}
                dataKey="active"
                stroke="#866358"
                name="Active"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case "log":
      return (
        <div className="chart">
          <div className="chart-toggle">
            <small onClick={() => setLinear()}>Linear</small>
            <h4>Logarithmic</h4>
            <small onClick={() => setDaily()}>Daily</small>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={active}>
              <XAxis dataKey="name" />
              <YAxis
                width={45}
                scale="log"
                domain={["auto", "auto"]}
                allowDataOverflow
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                strokeWidth={2}
                dot={false}
                dataKey="cases"
                stroke="#64818b"
                name="Cases"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );

    case "daily":
      return (
        <div className="chart">
          <div className="chart-toggle">
            <small onClick={() => setLinear()}>Linear</small>
            <small onClick={() => setLog()}>Logarithmic</small>
            <h4>Daily</h4>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={daily}>
              <XAxis dataKey="fid" />
              <YAxis width={35} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                strokeWidth={2}
                dot={false}
                dataKey="dailyCases"
                stroke="#64818b"
                name="Cases"
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dot={false}
                dataKey="dailyRecovered"
                stroke="#7ba346"
                name="Recovered"
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dot={false}
                dataKey="dailyDeaths"
                stroke="#c51221"
                name="Deaths"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
  }
}
