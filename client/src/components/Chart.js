import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { Container, Typography, Paper } from "@mui/material";
import styled from "@emotion/styled";
import moment from "moment";

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
  return moment(tickItem).format("YYYY-MM-DD HH:mm:ss");
};

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/historical"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
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
