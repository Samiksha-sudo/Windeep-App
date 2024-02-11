import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Navbaar from '../Navbaar/Navbaar'
import Button from '@mui/material/Button';
import { Accordion, AccordionSummary, Paper,  Grid } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
//   import faker from 'faker';
  
   

export default function Home({CURRENT_USER,USER_TYPES}) {
   console.log("user typs",USER_TYPES)
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      
       const options = {
        responsive: true,
        interaction: {
          mode: 'index' ,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis',
          },
        },
        scales: {
          y: {
            type: 'linear' ,
            display: true,
            position: 'left' ,
          },
          y1: {
            type: 'linear' ,
            display: true,
            position: 'right' ,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            // borderColor: 'rgb(255, 99, 132)',
            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
            // yAxisID: 'y',
          },
          {
            label: 'Dataset 2',
            // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            // borderColor: 'rgb(53, 162, 235)',
            // backgroundColor: 'rgba(53, 162, 235, 0.5)',
            // yAxisID: 'y1',
          },
        ],
      };




    return (
        <>

            <br/>
        <br/>
        <br/>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Item>Account Balance</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>Total monthly EMI</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>Membership Fee</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>Pro fee</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>Bank INT</Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>FInal AMT available </Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>Loan</Item>
                </Grid>
                </Grid>

                     <Line options={options} data={data} />;
                    <br/>

        </>
    )
} 



