import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Navbaar from '../Navbaar/Navbaar'
import {  Grid,Paper,Table,TableCell,TableContainer,TableHead,TableRow ,Box,Drawer,List,ListItem,ListItemButton,ListItemText,Card,CardActions,CardContent,Button,Typography} from '@mui/material'
import { useParams,useLocation } from 'react-router-dom';
import image1 from "../../assets/images/photoImage.jpg";
import { useNavigate } from "react-router-dom";

export default function GuranteeRequests({CURRENT_USER,USER_TYPES}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log(id)
   
    const columns = [
        { id: 'availed_on', label: 'Financial Support Availed on Date', minWidth: 170 },
        { id: 'availed_value', label: 'Financial Support Availed', minWidth: 100 },
        { id: 'processing_charge', label: 'Financial Support Processing Charges', minWidth: 100 },
        { id: 'interest_loan_id', label: 'Interest Applicable	loan id', minWidth: 100 },
        { id: 'loan_id', label: 'Loan Id', minWidth: 100 },
        { id: 'installment', label: 'Installment', minWidth: 100 },
        { id: 'comapansation_amount', label: 'Financial Support + Compansation Amount', minWidth: 100 },
        { id: 'repaid_support', label: 'Financial Support Repaid Principal', minWidth: 100 },
        { id: 'compansation_paid', label: 'Financial Support Compansation Paid', minWidth: 100 },
        { id: 'receivable_principle', label: 'Financial Support Receivable Principal', minWidth: 100 },
        { id: 'receivable_compansation', label: ' Financial Support Receivable Compansation', minWidth: 100 },
        { id: 'fine', label: 'Applied', minWidth: 100 },
        { id: 'remarks', label: 'Remarks', minWidth: 100 }
      ];


      const profileData = [
        {     
          image: image1,
          Name   :  "Ganesh Khenat",
          Mobile :   9518354701,
          Email  :   "ganeshkhenat@gmail.com",
          "Date of Birth": "12-06-2023",
          "Aadhar Card" :"202592951240",
          "Pan card":"ABCD00002",
          "IFSC code": "HDFC12345"
         }
      ];

      const isActiveButton = (buttonLink) => {
        return location.pathname.endsWith(buttonLink);
      };

      const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const handleRowClick = (id,memberLink) => {
        navigate(`/member/${id}/${memberLink}`);
      };

      const handleTransaction = ()=>{
        navigate(`/member/${id}/gurantorForm`);       
      }


      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' :350 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
            {Object.entries(profileData[0]).map(([key, value], index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            {key === 'image' ? (
              <img src={value} alt="Profile" className="profile_img" />
            ) : (
              <ListItemText primary={`${key} : ${value}`} />
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
         
        </Box>
      );




    return (
        <>

            


        <div className="main_table">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableCell align="center" colSpan={4}>
                    <Button variant={isActiveButton('shares') ? 'contained' : 'outlined'} onClick={() => handleRowClick(id, "shares")}>Shares</Button>
                  </TableCell>

                  <TableCell align="center" colSpan={4}>
                    <Button variant={isActiveButton('loan') ? 'contained' : 'outlined'} onClick={() => handleRowClick(id, "loan")}>Loan</Button>
                  </TableCell>

                  <TableCell align="center" colSpan={4}>
                    <Button variant={isActiveButton('loanCalculator') ? 'contained' : 'outlined'} onClick={() => handleRowClick(id, "loanCalculator")}>Loan Calculator</Button>
                  </TableCell>
                  <TableCell align="center" colSpan={4}>
                    <Button variant={isActiveButton('loanRequest') ? 'contained' : 'outlined'} onClick={() => handleRowClick(id, "loanRequest")}>Request Loan</Button>
                  </TableCell>

                  <TableCell align="center" colSpan={4}>
                    <Button variant={isActiveButton('loanForm') ? 'contained' : 'outlined'} onClick={() => handleRowClick(id, "loanForm")}>Loan Form</Button>
                  </TableCell>

                  <TableCell align="center" colSpan={4}>
                    <Button variant={isActiveButton('gurantorForm') ? 'contained' : 'outlined'} onClick={() => handleRowClick(id, "gurantorForm")}>Gurantor Form</Button>
                  </TableCell>


                  <TableCell align="center" colSpan={4}>
                    <Button variant= 'contained'  color="success" >Finance Payment</Button>
                  </TableCell>


                </TableRow>
                
                <TableRow></TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
        <br />
       
    <Grid container spacing={2} padding={2}>
      <Grid item xs={6} md={4}>
        <Paper>

      <Card >
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 15 }} >
        <strong>MEMB00009WD</strong>
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Housing Loan
        </Typography>
        <Typography variant="body2">
          Monthly EMI : ₹ 9000
          <br />
          Loan Start Date: 12/12/2024
          <br />
          Loan End Date: 12/12/2025
        </Typography>
      </CardContent>
      <CardActions>
        <Button  variant='contained' onClick={()=>handleTransaction()}>View Requests</Button>
      </CardActions>
    </Card>
        </Paper>
      </Grid>

      <Grid item xs={6} md={4}>
        <Paper>

      <Card >
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 15 }} >
        <strong>MEMB00009WD</strong>
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Housing Loan
        </Typography>
        <Typography variant="body2">
          Monthly EMI : ₹ 9000
          <br />
          Loan Start Date: 12/12/2024
          <br />
          Loan End Date: 12/12/2025
        </Typography>
      </CardContent>
      <CardActions>
        <Button  variant='contained' onClick={()=>handleTransaction()}>View Requests</Button>
      </CardActions>
    </Card>
        </Paper>
      </Grid>

      <Grid item xs={6} md={4}>
        <Paper>
      <Card >
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 15 }} >
        <strong>MEMB00009WD</strong>
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Housing Loan
        </Typography>
        <Typography variant="body2">
          Monthly EMI : ₹ 9000
          <br />
          Loan Start Date: 12/12/2024
          <br />
          Loan End Date: 12/12/2025
        </Typography>
      </CardContent>
      <CardActions>
        <Button  variant='contained' onClick={()=>handleTransaction()}>View Requests</Button>
      </CardActions>
    </Card>
        </Paper>
      </Grid>
    </Grid>
  
        </>
    )
} 



