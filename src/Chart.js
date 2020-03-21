import React, { useState, useEffect } from "react";
import {
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
  const chartFetch = useStats(
    "https://indonesia-covid-19.mathdro.id/api/harian"
  );

  if (!chartFetch) return <p className="loading">Loading....</p>;
  let chartData = {};

  //   for (i = 0; i < chartFetch.data.length; i++) {
  //     chartData.name = chartFetch.data.fid;
  //     chartData.active = chartFetch.data.jumlahpasiendalamperawatan;
  //   }

  const chartKey = chartFetch.data.map(value => [value.fid]);
  const chartVal = chartFetch.data.map(value => [
    value.jumlahpasiendalamperawatan
  ]);

  var final = [];
  for (var key in chartFetch.data) {
    final[key] = {
      name: chartFetch.data[key].fid,
      line: chartFetch.data[key].jumlahpasiendalamperawatan
    };
  }
  console.log(final);

  //   function chartObj() {
  //     for (let x = 0; x < chartKey.length; x++) {
  //       console.log(x);
  //       //   return { name: chartKey[x], line: chartVal[x] };
  //     }
  //   }

  //   //   const chartParse = JSON.parse(chartFetch);
  //   console.log(chartKey.length);
  //   console.log(chartObj());

  const data = final;

  return (
    <div>
      <LineChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
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
    </div>
  );
}
