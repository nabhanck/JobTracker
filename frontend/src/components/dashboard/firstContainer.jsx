import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  useApplicationStatsHook,
  useMonthlyAnalyticsHook,
} from "../../api/hooks/statsHook";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Aug",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Sep",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Oct",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Nov",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
  },
];

const data02 = [
  {
    name: "Success Rate",
    value: 10,
    color: "#00C49F",
  },
  {
    name: "Failure Rate",
    value: 60,
    color: "#FF4128",
  },
  {
    name: "Stagnant Rate",
    value: 30,
    color: "#FFBB28",
  },
];

const barData = [
  { name: "Applied", value: 65, max: 100, color: "#0068FF" },
  { name: "Interviewing", value: 19, max: 100, color: "#FF7714" },
  { name: "Offered", value: 30, max: 100, color: "#05FFBE" },
  { name: "Rejected", value: 90, max: 100, color: "#FF0509" },
];

export const FirstContainer = () => {
  const { data: monthlyAnalytics } = useMonthlyAnalyticsHook();
  const { data: applicationStatsData } = useApplicationStatsHook();
  // console.log("1212", applicationStatsData?.data?.pieData);
  return (
    <div className="h-[300px] flex gap-4">
      <div className="bg-white h-full w-[40%] flex flex-col p-2 gap-2 rounded-2xl">
        <h1 className="text-[18px] font-medium">Monthly Analytics</h1>
        <ResponsiveContainer>
          <BarChart width={530} height={250} data={monthlyAnalytics?.data}>
            <defs>
              <linearGradient
                id="uvGradient"
                x1={"0"}
                y1={"0"}
                x2={"0"}
                y2={"1"}
              >
                <stop offset={"25%"} stopColor="#1096FC" stopOpacity={1} />
                <stop offset={"95%"} stopColor="#F8F9FB" stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis dataKey={"month"} />
            {/* <YAxis /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Bar
              dataKey={"applications"}
              fill="url(#uvGradient)"
              radius={[20, 20, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white h-full w-[30%] flex flex-col gap-10 py-2 px-5 rounded-2xl">
        <h1 className="md:text-[18px] font-medium">Application Stats</h1>
        <div className="flex justify-between">
          <ResponsiveContainer className={"!w-[35%]"}>
            <div className="flex flex-col pt-2 gap-[1vw]">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-[#00C49F] rounded-full mt-1"></div>
                <div>
                  <h2 className="text-xs md:md:text-[15px] font-medium">
                    Success Rate
                  </h2>
                  <h1 className="text-sm md:text-[18px] font-semibold">
                    {applicationStatsData?.data?.success_rate}%
                  </h1>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-3 h-3 bg-[#FF4128] rounded-full mt-1"></div>
                <div>
                  <h2 className="text-xs md:text-[15px] font-medium">
                    Failure Rate
                  </h2>
                  <h1 className="text-sm md:text-[18px] font-semibold">
                    {applicationStatsData?.data?.failure_rate}%
                  </h1>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-3 h-3 bg-[#FFBB28] rounded-full mt-1"></div>
                <div>
                  <h2 className="text-xs md:text-[15px] font-medium">
                    Stagnant Rate
                  </h2>
                  <h1 className="text-sm md:text-[18px] font-semibold">
                    {applicationStatsData?.data?.stagnant_rate}%
                  </h1>
                </div>
              </div>
            </div>
          </ResponsiveContainer>
          <PieChart width={200} height={200}>
            <Tooltip />
            <Pie
              data={applicationStatsData?.data?.pieData}
              dataKey={"value"}
              nameKey={"name"}
              cx={"50%"}
              cy={"50%"}
              innerRadius={50}
              outerRadius={100}
              // fill="#82ca9d"
              //   label
              stroke="none"
            >
              {data02.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      <div className="bg-white h-full w-[30%] flex flex-col justify-between p-2 rounded-2xl">
        <h1 className="md:text-[18px] font-medium">Applications by Status</h1>
        <ResponsiveContainer width={"100%"} height={250}>
          <BarChart data={applicationStatsData?.data?.barData}>
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip />
            <CartesianGrid vertical={false} strokeDasharray="0" />
            <Bar
              dataKey="value"
              stackId="a"
              //   fill="#4f46e5"
              radius={[20, 20, 0, 0]}
              barSize={30}
              background={{ fill: "#E7F1FF", radius: [20, 20, 0, 0] }}
            >
              {barData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
