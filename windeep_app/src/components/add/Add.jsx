import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import BasicInfo from './BasicInfo';  

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




export default function Add() {
  const navigate = useNavigate();


  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Windeep Society
          </Typography>
          <BasicInfo />
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
