import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Navbaar from '../Navbaar/Navbaar'
import Button from '@mui/material/Button';
import { Accordion, AccordionSummary, Paper,  Grid } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import image1 from '../../assets/images/IMG-20231211-WA0019.jpg';
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
  
   

export default function Dashboard({CURRENT_USER,USER_TYPES}) {
  console.log("dashboard",CURRENT_USER,USER_TYPES)
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));




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

            <Navbaar CURRENT_USER={CURRENT_USER}  USER_TYPES={USER_TYPES}/> 

           <img src={image1} style={{margin: "2%", marginLeft: "42%"}}/>

           <p>The woman in this story finds a pot of treasure on her walk home. As she carries it home, the treasure keeps changing, becoming things of lesser value.

However, the woman’s enthusiasm makes her see only the positive after each change, which would have upset anyone else. Her positive personality tries to make every negative situation seem like a gift!

This story shows how important it is to look at things from a positive point of view. Instead of being disappointed in what we don’t have, this story reminds us to view what we do have as blessings.
This modern story is about a young woman named Penny who is anxious about going to her family’s annual reunion barbecue. But despite screaming children and arguing cousins, Penny ends up happy that she came to the reunion when she starts a conversation with a handsome man.

The story is written in simple English, using only the present tense, so it’s perfect for beginners.
However, the woman’s enthusiasm makes her see only the positive after each change, which would have upset anyone else. Her positive personality tries to make every negative situation seem like a gift!





</p>

            <Footer />
        </>
    )
} 



function AuthorizedElement({ CURRENT_USER,children, allowedUserTypes }) {
  const isUserAuthorized = allowedUserTypes.includes(CURRENT_USER);

  if (isUserAuthorized) {
    return <>{children}</>;
  } 
}