import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Container, Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import moment from "moment";
import { throttle } from "lodash";
import { fetchHistoricalData, updateData } from "../services/apiService";

const REFRESH_INTERVAL = 300000; // 5 minutes in milliseconds

const DarkChartContainer = styled(Paper)`
  background-color: #1e1e1e !important;
  padding: 16px;
  margin-top: 32px;
  color: #ffffff;
`;

const ChartTitle = styled(Typography)`
  margin-bottom: 16px;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
`;

const DarkBackground = styled.div`
  background-color: #1e1e1e;
  padding: 16px;
  min-height: 100vh;
`;

const formatXAxis = (tickItem) => {
  return moment(tickItem).format("MM/DD/YY");
};

const fetchData = throttle(async (setData) => {
  try {
    const response = await fetchHistoricalData();
    setData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}, REFRESH_INTERVAL);

const refreshData = throttle(async (setData) => {
  await updateData();
  console.log("Prices Updated!");
  fetchData(setData);
}, REFRESH_INTERVAL);

const Chart = () => {
  const [data, setData] = useState([]);
  const fetchInterval = useRef(null);
  const refreshInterval = useRef(null);

  useEffect(() => {
    fetchData(setData);
    fetchInterval.current = setInterval(
      () => fetchData(setData),
      REFRESH_INTERVAL
    );
    refreshInterval.current = setInterval(
      () => refreshData(setData),
      REFRESH_INTERVAL
    );

    return () => {
      clearInterval(fetchInterval.current);
      clearInterval(refreshInterval.current);
    };
  }, []);

  return (
    <DarkBackground>
      <Container maxWidth='lg'>
        <DarkChartContainer elevation={3}>
          <ChartTitle variant='h4'>Bitcoin Prices</ChartTitle>
          <ResponsiveContainer width='100%' height={400}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#444' />
              <XAxis
                dataKey='time'
                tickFormatter={formatXAxis}
                stroke='#ffffff'
              />
              <YAxis yAxisId='left' stroke='#ffffff' />
              <YAxis yAxisId='right' orientation='right' stroke='#ffffff' />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", borderColor: "#444" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Line
                yAxisId='left'
                type='monotone'
                dataKey='usd'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId='right'
                type='monotone'
                dataKey='gbp'
                stroke='#82ca9d'
              />
              <Line
                yAxisId='right'
                type='monotone'
                dataKey='eur'
                stroke='#ff9f40'
              />
            </LineChart>
          </ResponsiveContainer>
        </DarkChartContainer>
      </Container>
    </DarkBackground>
  );
};

export default Chart;
