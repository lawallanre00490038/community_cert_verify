"use client"

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, LabelList } from "recharts";
import { getCertificateAnalytics } from "@/utils/queries/students/manipulateStudentCertificateTable";
import { TooltipProps } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  certification: {
    label: "Certification",
    color: "hsl(var(--chart-1))",
  },
};

interface CertificateAnalyticsItem {
  certificationName: string;
  issuedDate: string;
  count: number;
}

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const { certificationName, count, issuedDate } = payload[0].payload;
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded">
        <p className="label"><strong>{`Certification: ${certificationName}`}</strong></p>
        <p className="intro">{`Count: ${count}`}</p>
        <p className="date">{`Date: ${issuedDate}`}</p>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [chartData, setChartData] = useState<CertificateAnalyticsItem[]>([]);
  const [filteredData, setFilteredData] = useState<CertificateAnalyticsItem[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const fetchData = async () => {
    const rawData = await getCertificateAnalytics();
    const formattedData = rawData.map((item) => ({
      certificationName: item.certificationName,
      issuedDate: parseDate(item?.issuedDate ?? '').toISOString().split('T')[0],  // format as YYYY-MM-DD
      count: item._count.certificationName,
    }));
    setChartData(formattedData);
    setFilteredData(formattedData);

    console.log(formattedData);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setSelectedMonth(month);
    filterData(month, selectedYear);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year);
    filterData(selectedMonth, year);
  };

  const filterData = (month: string, year: string) => {
    const filtered = chartData.filter((item) => {
      const itemDate = new Date(item.issuedDate);
      const monthMatches = month ? itemDate.toLocaleString('default', { month: 'long' }) === month : true;
      const yearMatches = year ? itemDate.getFullYear().toString() === year : true;
      return monthMatches && yearMatches;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full border bg-white pr-4 text-sm md:text-lg flex flex-col md:flex-row">
      <Card className="md:w-1/2">
        <CardHeader>
          <CardTitle>Certificate Analytics</CardTitle>
          <CardDescription>Monthly Statistics of Certificates Given</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <select value={selectedMonth} onChange={handleMonthChange}>
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'long' })).map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select value={selectedYear} onChange={handleYearChange}>
              <option value="">All Years</option>
              {Array.from(new Set(chartData.map(item => new Date(item.issuedDate).getFullYear().toString()))).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <ChartContainer config={chartConfig}>
            <BarChart width={600} height={300} data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="issuedDate" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="count" fill="var(--color-certification)" radius={2} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          {/* <div className="flex gap-2 font-medium leading-none">
            Rising up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div> */}
        </CardFooter>
      </Card>

      {/* Trend Line Chart */}
      <Card className="md:w-1/2">
        <CardHeader>
          <CardTitle>Trend of Certificates Issued</CardTitle>
          <CardDescription>Annual Trend of Certificates Issued</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart width={600} height={300} data={chartData}>
              <XAxis dataKey="issuedDate" tickFormatter={(value) => new Date(value).getFullYear().toString()} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="step" dataKey="count" stroke="var(--color-certification)" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
