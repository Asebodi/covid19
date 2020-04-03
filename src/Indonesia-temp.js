import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Sector, Cell } from "recharts";

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

const COLORS = ["#0088FE", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Indonesia() {
  const stats = useStats("https://indonesia-covid-19.mathdro.id/api/kasus");
  if (!stats) return <div>Loading....</div>;

  let data = [];
  let female = 0;
  let male = 0;

  for (let key in stats.data) {
    if ((stats.data[key].wn = 0)) {
      female += 1;
    } else {
      male += 1;
    }
    data[0] = {
      name: "Female",
      value: female
    };
    data[1] = {
      name: "Male",
      value: male
    };
  }

  console.log(female, male);
  console.log(stats.data);

  return (
    <div>
      <p className="loading">
        This page hasn't even been announced yet.
        <br />
        <br />
        How the fuck did you get here?
      </p>
      {/* <header>
        <h3>Indonesia</h3>
      </header>

      <main>
        <h4>Sex Demography</h4>

        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </main> */}
    </div>
  );
}
