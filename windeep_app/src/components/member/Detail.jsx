import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./BasicInfo.module.css";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography, TextField, FormControl, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function Detail(props) {
  const [calculation, setCalculation] = useState({
    emi: 0,
    processingFee: 0,
    totalRepayment: 0,
    emiDetails: [],
  });

  const  calculateEMIInYears = (principal, annualInterestRate, tenureYears, processingFeeRate) => {
    // Convert annual interest rate to monthly and calculate total number of installments
    const monthlyInterestRate = (annualInterestRate / 12) / 100;
    const totalInstallments = tenureYears * 12;

    // Calculate EMI using the formula
    const emi = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), totalInstallments) /
        (Math.pow((1 + monthlyInterestRate), totalInstallments) - 1);

    // Calculate processing fee
    const processingFee = principal * (processingFeeRate / 100);

    // Calculate total repayment amount
    const totalRepayment = emi * totalInstallments + processingFee;

    // Initialize outstanding loan balance
    let outstandingBalance = principal;

    // Initialize arrays to store results for each month
    const emiDetails = [];

    // Calculate EMI details for each month
    for (let month = 1; month <= totalInstallments; month++) {
        // Calculate monthly interest
        const monthlyInterest = (outstandingBalance * monthlyInterestRate);

        // Calculate monthly principal
        const monthlyPrincipal = emi - monthlyInterest;

        // Update outstanding balance
        outstandingBalance -= monthlyPrincipal;

        // Store details for the current month
        emiDetails.push({
            month,
            emi,
            principal: Math.round(monthlyPrincipal),  
            interest: Math.round(monthlyInterest),    
            balance: Math.round(outstandingBalance)   
        });
    }

    return {
        emi: Math.round(emi),                 
        processingFee: Math.round(processingFee), 
        totalRepayment: Math.round(totalRepayment), 
        emiDetails
    };
}

const  calculateEMIMonths = (principal, annualInterestRate, tenureMonths, processingFeeRate) => {
    // Convert annual interest rate to monthly
    const monthlyInterestRate = (annualInterestRate / 12) / 100;

    // Calculate EMI using the formula
    const emi = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenureMonths) /
        (Math.pow((1 + monthlyInterestRate), tenureMonths) - 1);

    // Calculate processing fee
    const processingFee = principal * (processingFeeRate / 100);

    // Calculate total repayment amount
    const totalRepayment = emi * tenureMonths + processingFee;

    // Initialize outstanding loan balance
    let outstandingBalance = principal;

    // Initialize arrays to store results for each month
    const emiDetails = [];

    // Calculate EMI details for each month
    for (let month = 1; month <= tenureMonths; month++) {
        // Calculate monthly interest
        const monthlyInterest = (outstandingBalance * monthlyInterestRate);

        // Calculate monthly principal
        const monthlyPrincipal = emi - monthlyInterest;

        // Update outstanding balance
        outstandingBalance -= monthlyPrincipal;

        // Store details for the current month
        emiDetails.push({
            month,
            emi,
            principal: Math.round(monthlyPrincipal),  
            interest: Math.round(monthlyInterest),    
            balance: Math.round(outstandingBalance)   
        });
    }

    return {
        emi: Math.round(emi),                 
        processingFee: Math.round(processingFee), 
        totalRepayment: Math.round(totalRepayment), 
        emiDetails
    };
}

  useEffect(() => {
    if (props.data.unit === "years") {
      const EmiCalculate = calculateEMIInYears(props.data.amount, props.data.interest, props.data.period, props.data.processingFee);
      console.log("EmiCalculate in years",EmiCalculate);
      setCalculation(EmiCalculate);
    } else {
      const EmiCalculate = calculateEMIMonths(props.data.amount, props.data.interest, props.data.period, props.data.processingFee);
      console.log("EmiCalculate in months",EmiCalculate);
      setCalculation(EmiCalculate);
    }

  }, [props.data.amount, props.data.interest, props.data.period, props.data.unit, props.data.processingFee]);

  return (
    <React.Fragment>
      <Container>
        <div className={styles.registration}>
          <TableContainer component={Paper}>
            <Table style={{ border: '2px solid black' }}>
              <TableBody>
              <TableRow>
          <TableCell style={{ border: '1px solid black' , padding: '6px',    width: "80px"}} sx={{ color: 'white', backgroundColor: '#0288d1'}}>   <Typography variant="body1" fontWeight="bold" gutterBottom>
                Month
              </Typography></TableCell>
            <TableCell style={{ border: '1px solid black' , padding: '6px' ,    width: "80px"}} sx={{ color: 'white', backgroundColor: '#0288d1'}}><Typography variant="body1" fontWeight="bold" gutterBottom>
            Principal
              </Typography></TableCell>
            <TableCell style={{ border: '1px solid black', padding: '6px' ,    width: "80px"}} sx={{ color: 'white', backgroundColor: '#0288d1'}}><Typography variant="body1" fontWeight="bold" gutterBottom>
            Interest
              </Typography></TableCell>
            <TableCell style={{ border: '1px solid black' , padding: '6px',    width: "80px"}} sx={{ color: 'white', backgroundColor: '#0288d1'}}><Typography variant="body1" fontWeight="bold" gutterBottom>
            Balance
              </Typography></TableCell>


          </TableRow>
                {calculation.emiDetails.map((detail) => (
                  <TableRow key={detail.month}>
                    <TableCell style={{ border: '1px solid black' }}>{detail.month}</TableCell>
                    <TableCell style={{ border: '1px solid black' }}>{detail.principal}</TableCell>
                    <TableCell style={{ border: '1px solid black' }}>{detail.interest}</TableCell>
                    <TableCell style={{ border: '1px solid black' }}>{detail.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </React.Fragment>
  );
}
