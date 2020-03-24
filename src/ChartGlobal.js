import React, { useState, useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

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
  const chartFetch = useStats("https://covid19.mathdro.id/api/daily");

  if (!chartFetch) return <p>Loading....</p>;

  var active = [];
  for (var key in chartFetch) {
    active[key] = {
      name: chartFetch[key].objectid,
      cases: chartFetch[key].totalConfirmed
    };
  }

  return (
    <div className="chart-global">
      <ResponsiveContainer width="100%" height={130}>
        <AreaChart data={active}>
          <Area
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            type="monotone"
            dataKey="cases"
            stroke="#4b636b"
            fill="#313946"
            strokeWidth={3}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
