import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Navbaar from '../Navbaar/Navbaar'
import Button from '@mui/material/Button';
import styles from "./BasicInfo.module.css";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import { Grid, Paper,Table,TableCell,TableContainer,TableHead,TableRow ,Box,Drawer,List,ListItem,ListItemButton,ListItemText,Select, MenuItem} from '@mui/material'
import { useParams,useLocation } from 'react-router-dom';
import image1 from "../../assets/images/photoImage.jpg";
import { useNavigate } from "react-router-dom";
import { TextField, FormControl, InputAdornment, Container, IconButton, Alert, FormHelperText } from "@mui/material";
import {memberDetails} from "../../utils/database"

export default function LoanRequestForm({CURRENT_USER,USER_TYPES}) {

  const regForName = RegExp(/^[A-Za-z]{3,30}$/);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log(id);

  const mystyles = {
    '& .MuiFormHelperText-root': {
        color: "red",
    }
}

  const [errors, setErrors] = useState({
        errAmount: "",
        errInterest: "",
        errPeriod: "",
        errEMI: "",

    });

    const [calculate, setCalculate] = useState(false);
    const [detail, setDetail] = useState(false);
    const [iscalculated, setIscalculated] = useState(false);
    const [isDivVisible, setDivVisibility] = useState(false);
    const [viewRequests, setViewRequests] = useState([]);

  const handleViewRequestsClick = async () => {
    setDivVisibility(!isDivVisible);
    setViewRequests(memberDetails);
  //  await fetch('http://localhost:9000/member/requestLoan', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id:id      })
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       console.log('API Response: handleViewRequestsClickhandleViewRequestsClickhandleViewRequestsClickhandleViewRequestsClick', result.payload[0].result);
  //       setViewRequests(result.payload[0].result);
  //       // Set the data received from the API to the state
  //     })
  //     .catch(error => {
  //       console.error('API Error:', error);
  //     });
  };


    const [registerCredentials, setRegisterCredentials] = useState({
        amount: "",
        interest: "",
        period: "",
        emi: "",
        unit: "months",
        processingFee:"1.5"
    });

    const handleUnitChange = (event) => {
      setRegisterCredentials({
        ...registerCredentials,
        unit: event.target.value,
      });
      setResetData(false);
      setIscalculated(false)
    };



      // For Validation
      const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        // Update state first
        setRegisterCredentials((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }));
      
        // Validate the input
        let error = "";
        switch (name) {
          case "amount":
            error = regForName.test(value) ? "Invalid Amount" : "";
            break;
          case "interest":
            error = regForName.test(value) ? "Invalid Interest" : "";
            break;
          case "period":
            error = regForName.test(value) ? "Invalid Period" : "";
            break;
          case "emi":
            error = regForName.test(value) ? "Invalid EMI" : "";
            break;
          default:
            break;
        }
      
        // Update the errors state
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: error,
        }));
      };

// New User Registration
const validateRegister = async () => {
    if (registerCredentials.amount !== "" && registerCredentials.interest !== "" && registerCredentials.period !== "" && registerCredentials.emi !== "" ) {
        const formData = new FormData();
        formData.append("amount", registerCredentials.amount);
        formData.append("interest", registerCredentials.interest);
        formData.append("period", registerCredentials.aadharCard);
        formData.append("emi", registerCredentials.emi);       
    }


};

const calculateInterest = (memberId) => {
  switch (true) {
    case memberId.startsWith('MEMB0000'):
      return 0.05;
    case memberId.startsWith('MEMB10000'):
      return 0.06;
      case memberId.startsWith('MEMB20000'):
        return 0.07;
    // Add more cases as needed
    default:
      return 0.08; // Default interest rate if no match
  }
};

const sendRequest= () =>{
    console.log("id",id);

      fetch('http://localhost:9000/member/requestLoan/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:id,
          amount:registerCredentials.amount,
          period:registerCredentials.period,
          unit:registerCredentials.unit,
          emi:registerCredentials.emi,
          processing_fee:registerCredentials.processingFee

        })
      })
        .then(response => response.json())
        .then(result => {
          console.log('API Response:', result.payload[0].result);
          // Set the data received from the API to the state
        })
        .catch(error => {
          console.error('API Error:', error);
        });

}

const calculateloan = () => {

  const { amount, period, unit } = registerCredentials;

    const interestRate = calculateInterest(id);

    // Convert annual interest rate to monthly
    const monthlyInterestRate = interestRate / 12;
    const processingFeeRate = 0.015; // 1.5%

    // Calculate processing fee
    const processingFee = amount * processingFeeRate;


    // Calculate EMI
    const n = period * (unit === 'years' ? 12 : 1); // Convert years to months if needed
    const emi =
      amount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, n) /
      (Math.pow(1 + monthlyInterestRate, n) - 1);

    // Update state with calculated values
    setRegisterCredentials({
      ...registerCredentials,
      emi: Math.round(emi.toFixed(2)),
      interest: (interestRate * 100).toFixed(2), // Convert to percentage for display
      processingFee:Math.round(processingFee)
    });

  console.log("registerCredentials in loanrequest form",registerCredentials)
  if (
    registerCredentials.amount !== "" &&
    registerCredentials.interest !== "" &&
    registerCredentials.period !== "" &&
    registerCredentials.emi !== ""
  ) {
    setCalculate(true);
    setIscalculated(true);
    setErrors({}); // Clear any previous errors
  } else {
    console.log("errors")
    setErrors({ ...errors, submit_error: "Enter All Loan Details" });
  }
};

  
    const columns = [
        { id: 'Date', label: 'Date', minWidth: 170 },
        { id: 'EMI', label: 'EMI', minWidth: 100 },
        { id: 'Principal', label: 'Principal', minWidth: 100 },
        { id: 'Interest', label: 'Interest', minWidth: 100 },
        { id: 'Fee/Fine', label: 'Fee/Fine', minWidth: 100 }
        ];

    const rows = [
        {
            date: "14-01-2023",
            emi:5994,
            Principal:5161,
            Interest:812,
            "Fee/Fine":3000
        },
        {
            date: "14-01-2023",
            emi:5994,
            Principal:5161,
            Interest:812,
            "Fee/Fine":3000
        },
        {
            date: "14-01-2023",
            emi:5994,
            Principal:5161,
            Interest:812,
            "Fee/Fine":3000
        },
        {
            date: "14-01-2023",
            emi:5994,
            Principal:5161,
            Interest:812,
            "Fee/Fine":3000
        },
        {
            date: "14-01-2023",
            emi:5994,
            Principal:5161,
            Interest:812,
            "Fee/Fine":3000
        },
        {
            date: "14-01-2023",
            emi:5994,
            Principal:5161,
            Interest:812,
            "Fee/Fine":3000
        },
        {
            date: "14-01-2023",
            emi:5994,
            Principal:5161,
            Interest:812,
            "Fee/Fine":3000
        },
        {
            date: "14-01-2023",
            emi:5994,
            Principal:5161,
            Interest:812,
            "Fee/Fine":3000
        },
    ]
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
      const [resetData, setResetData] = useState(false);


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


      const detailLoan = () =>{
        setDetail(true)
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

      function changeBackground(e) {
        e.target.style.background = 'grey';
      }

      const resetValues = () => {
        setRegisterCredentials({
            amount: "",
            interest: "",
            period: "",
            emi: "",
            unit: "months",
            processingFee: "1.5" // Reset processing fee to "1.5"
        });
        setErrors({
            errAmount: "",
            errInterest: "",
            errPeriod: "",
            errEMI: ""
        });
        setResetData(true);
        setIscalculated(false);
    };

    useEffect(() => {
      // Reset the resetData state after re-render
      setResetData(false);
      setIscalculated(false);
  
      // Reset the form values after re-render
      if (resetData) {
          setRegisterCredentials({
              amount: "",
              interest: "",
              period: "",
              emi: "",
              unit: "months"
          });
      }
  }, [resetData, registerCredentials]);

  useEffect(() => {
    // Reset the resetData state after re-render
    setResetData(false);
    setIscalculated(false);
  }, [resetData]);



    return (
        <>
      <Container>
              <div className={styles.registration}>
                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                          helperText={errors.errAmount}
                          sx={mystyles}
                          name="amount"
                          value={registerCredentials.amount}
                          label="Amount"
                          size="small"
                          onChange={handleInputChange} 
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment>
                                      <BorderColorTwoToneIcon color="info" />
                                  </InputAdornment>
                              ),
                          }}
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>
    
                  <FormControl sx={{ my: 2 }} fullWidth>
                    <Grid container spacing={2}>
                      <Grid item xs={12} lg={8}>
                        <TextField
                          helperText={errors.errPeriod}
                          sx={mystyles}
                          name="period"
                          value={registerCredentials.period}  
                          label="Period"
                          size="small"
                          onChange={handleInputChange} 
                          variant="outlined"
                          color="info"
                        />
                      </Grid>
                      <Grid item xs={12} lg={4}>

                        <Select
                        sx={{ width: '170px',height: '40px' }}
                          label="Unit"
                          variant="outlined"
                          color="info"
                          value={registerCredentials.unit}  
                          onChange={handleUnitChange}      
                        >
                          <MenuItem  value="months">Months</MenuItem>
                          <MenuItem value="years">Years</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </FormControl>
                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                          helperText={errors.emi}
                          sx={mystyles}
                          name="emi"
                          value={registerCredentials.emi}
                          label="EMI"
                          size="small"
                          disabled
                          onChange={handleInputChange} 
                         
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>

                  <FormControl sx={{ my: 2 }} fullWidth>
                  <TextField
                      helperText={errors.emi}
                      sx={mystyles}
                      name="processingFee"
                      value={registerCredentials.processingFee}
                      label="Processing Fee"
                      size="small"
                      disabled
                      onChange={handleInputChange}
                      variant="outlined"
                      color="info"
                  />
              </FormControl>



                <Grid container spacing={1} >
                    <Grid item className="text-center">
                    <Button
                          variant="contained"
                          color="info"
                          onClick={() => calculateloan()}
                          className={styles.button_fun}
                      >
                          Calculate EMI
                      </Button>
                    </Grid>
                    <Grid item className="text-center">

                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => sendRequest()}
                        >
                            Send Request
                        </Button>
                        </Grid>

                        <Grid item className="text-center">

                            <Button
                                variant="outlined"
                                color="info"
                                onClick={handleViewRequestsClick}
                            >
                                View Request
                            </Button>
                            </Grid>
                    <Grid item className="text-center">

                    <Button
                          variant="contained"
                          sx={{ color: 'white', backgroundColor: 'grey', borderColor: 'black' }}
                          onClick={resetValues}
                          onMouseOver={changeBackground}

                      >
                          Reset
                      </Button>
                    </Grid>
                    
                </Grid>
              </div>
          </Container>
          {isDivVisible && (
           
            <>
            {console.log("viewRequests",viewRequests)}
            {viewRequests.map((ele, index) => (
              <div className={styles.viewRequests}>
                <Grid container spacing={1}>
                  
                    <Grid item key={index} style={{marginRight: '10px' }}>
                      <strong>Amount: ₹</strong> {ele.amount} {' '}<br/>
                      <strong>Period: </strong> {ele.period} {' '}<br/>
                      <strong>Unit: </strong> {ele.unit} {' '}<br/>
                      <strong>EMI: ₹</strong> {ele.emi} {' '}<br/>
                      <strong>Processing Fee: ₹</strong> {ele.processing_fee} {' '}<br/>
                      <strong>Admin Requests:</strong> {ele.status} {' '}<br/>
                      <strong>Reason:</strong> {ele.admin_reason} {' '}<br/>
                      <strong>Approved By:</strong> {ele.admin_name}
                    </Grid>
             
                </Grid>
              </div>
                   ))}
              <br />
            </>
        )}


        </>
    )
} 



