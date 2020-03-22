import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

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

export default function Chart() {
  const [chartOpt, setChartOpt] = useState("active");

  const ref = useRef(null);
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    console.log("width", width);
  }, [ref.current]);

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
      deaths: chartFetch.data[key].jumlahPasienMeninggal
    };
  }
  console.log(active);

  var percentage = [];
  for (var key in chartFetch.data) {
    percentage[key] = {
      name: chartFetch.data[key].fid,
      line: chartFetch.data[key].persentasePasiendalamPerawatan
    };
  }
  console.log(percentage);

  if (chartOpt === "active") {
    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={active}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#64818b" />
            <Line type="monotone" dataKey="recovered" stroke="#7ba346" />
            <Line type="monotone" dataKey="deaths" stroke="#c51221" />
          </LineChart>
        </ResponsiveContainer>
        {/* <p onClick={() => setChartOpt("percentage")}>change</p> */}
      </div>
    );
  } else if (chartOpt === "percentage") {
    return (
      <div className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={percentage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="line"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        {/* <p onClick={() => setChartOpt("active")}>change</p> */}
      </div>
    );
  }
}
