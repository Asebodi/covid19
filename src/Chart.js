import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
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
  // const [chartOpt, setChartOpt] = useState("active");

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
      active: chartFetch.data[key].jumlahpasiendalamperawatan
    };
  }
  console.log(active);

  // var percentage = [];
  // for (var key in chartFetch.data) {
  //   percentage[key] = {
  //     name: chartFetch.data[key].fid,
  //     line: chartFetch.data[key].persentasePasiendalamPerawatan
  //   };
  // }
  // console.log(percentage);

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={active}>
          <XAxis dataKey="name" />
          <YAxis width={35} />
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

  // if (chartOpt === "active") {
  //   return (
  //     <div className="chart">
  //       <ResponsiveContainer width="100%" height={300}>
  //         <LineChart data={active}>
  //           <XAxis dataKey="name" />
  //           <YAxis width={35} />
  //           <Tooltip />
  //           <Legend />
  //           <Line
  //             type="monotone"
  //             strokeWidth={2}
  //             dot={false}
  //             dataKey="cases"
  //             stroke="#64818b"
  //             name="Cases"
  //           />
  //           <Line
  //             type="monotone"
  //             strokeWidth={2}
  //             dot={false}
  //             dataKey="recovered"
  //             stroke="#7ba346"
  //             name="Recovered"
  //           />
  //           <Line
  //             type="monotone"
  //             strokeWidth={2}
  //             dot={false}
  //             dataKey="deaths"
  //             stroke="#c51221"
  //             name="Deaths"
  //           />
  //           <Line
  //             type="monotone"
  //             strokeWidth={2}
  //             dot={false}
  //             dataKey="active"
  //             stroke="#866358"
  //             name="Active"
  //           />
  //         </LineChart>
  //       </ResponsiveContainer>
  //       {/* <p onClick={() => setChartOpt("percentage")}>change</p> */}
  //     </div>
  //   );
  // } else if (chartOpt === "percentage") {
  //   return (
  //     <div className="chart">
  //       <ResponsiveContainer width="100%" height={300}>
  //         <LineChart data={percentage}>
  //           <CartesianGrid strokeDasharray="3 3" />
  //           <XAxis dataKey="name" />
  //           <YAxis />
  //           <Tooltip />
  //           <Legend />
  //           <Line
  //             type="monotone"
  //             dataKey="line"
  //             stroke="#8884d8"
  //             activeDot={{ r: 8 }}
  //           />
  //           <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
  //         </LineChart>
  //       </ResponsiveContainer>
  //       {/* <p onClick={() => setChartOpt("active")}>change</p> */}
  //     </div>
  //   );
  // }
}
