import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./BasicInfo.module.css";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import { TextField, FormControl, Button, InputAdornment, Container, IconButton, Alert } from "@mui/material";
const mystyles = {
    '& .MuiFormHelperText-root': {
        color: "red",
    }
}

const mystyleDate = {
    '.datePicker': {
        width: "213%"
      }
}
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[A-Za-z]{3,30}$/);
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");


export default function Review() {


  return (
    <React.Fragment>
            <Container>
                <div className={styles.registration}>

                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                        disabled
                            
                            sx={mystyles}
                            name="fullName"
                            label="Full Name"
                            size="small"
                            variant="outlined"
                            color="info"
                        />
                    </FormControl>

                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                        disabled
                            sx={mystyles}
                            name="mobile"
                            label="Mobile"
                            size="small"
                            variant="outlined"
                            color="info"
                        />
                    </FormControl>


                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                        disabled
                            sx={mystyles}
                            name="email"
                            label="Email"
                            size="small"
                            variant="outlined"
                            color="info"
                        />
                    </FormControl>




                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                        disabled
                            sx={mystyles}
                            name="aadharCard"
                            label="Aadhar Card"
                            size="small"
                            variant="outlined"
                            color="info"
                        />
                    </FormControl>

                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                        disabled
                            sx={mystyles}
                            name="panCard"
                            label="Pan Card"
                            size="small"
                            variant="outlined"
                            color="info"
                        />
                    </FormControl>

                    <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                      disabled
                          sx={mystyles}
                          name="loanAmount"
                          label="Loan Amount"
                          size="small"
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>

                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                      disabled
                          sx={mystyles}
                          name="loanAmount"
                          label="Loan Distributed Date"
                          size="small"
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>

                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                      disabled
                          sx={mystyles}
                          name="loanAmount"
                          label="Loan Close Date"
                          size="small"
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>


                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                      disabled
                          sx={mystyles}
                          name="processingFee"
                          label="Processing Fee"
                          size="small"
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>

                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                      disabled
                          sx={mystyles}
                          name="amountDisbursed"
                          label="Amount Disbursed"
                          size="small"
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>


                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                      disabled
                          sx={mystyles}
                          name="period"
                          label="Period"
                          size="small"
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>

                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                      disabled
                          sx={mystyles}
                          name="interest"
                          label="Interest"
                          size="small"
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>


                    <div className="text-center">
                        <Button
                            variant="contained"
                            color="success"
                            className={styles.button_fun}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Container>


    </React.Fragment>
  );
}