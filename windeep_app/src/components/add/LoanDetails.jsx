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

export default function LoanDetails() {
  const [errors, setErrors] = useState({
      errloanAmount: "",
      errPeriod:"",
      errInterest:"",
      processingFee:"",
      errAmountDisbursed: "",
      errPassword: "",
      errConfirm_password: "",
      submit_error: "",
  });
  const [registerCredentials, setRegisterCredentials] = useState({
      loanAmount: "",
      processingFee: "",
      amountDisbursed: "",
      period:"",
      interest:"",
      password: "",
      cpassword: "",
      profile: "",
  });
  const [show, setShow] = useState({
      showPassword: false,
      showConfPassword: false,
  });

  const navigate = useNavigate();

  // For Validation
  const handler = (event) => {
      const { name, value } = event.target;
      let error = "";
      switch (name) {
          case "loanAmount":
              error = regForName.test(value) ? "" : "Invalid  Loan Amount";
              setErrors({ ...errors, errloanAmount: error });
              break;

          case "processingFee":
              error = regForName.test(value) ? "" : "Invalid Processing Fee";
              setErrors({ ...errors, processingFee: error });
              break;

          case "amountDisbursed":
              error = regForEmail.test(value) ? "" : "Invalid Amount Disbursed";
              setErrors({ ...errors, errAmountDisbursed: error });
              break;

          case "period":
              error = regForEmail.test(value) ? "" : "Invalid Period";
              setErrors({ ...errors, errPeriod: error });
              break;

          case "interest":
              error = regForEmail.test(value) ? "" : "Invalid Interest";
              setErrors({ ...errors, errInterest: error });
              break;

          default:
              break;
      }
      setRegisterCredentials({ ...registerCredentials, [name]: value });
  };

  // New User Registration
  const validateRegister = async () => {
      if (registerCredentials.loanAmount !== ""  && registerCredentials.processingFee !== "" && registerCredentials.amountDisbursed !== "" && registerCredentials.password !== "" && registerCredentials.confirm_password !== "" && registerCredentials.profile !== "" && registerCredentials.period !== "" && registerCredentials.interest !== ""
      ) {
          const formData = new FormData();
          formData.append("loanAmount", registerCredentials.loanAmount);
          formData.append("processingFee", registerCredentials.processingFee);
          formData.append("period", registerCredentials.period);
          formData.append("interest", registerCredentials.interest);
          formData.append("amountDisbursed", registerCredentials.amountDisbursed);
          formData.append("profile", registerCredentials.profile);
         
      }

      else {
          setErrors({ ...errors, submit_error: "Enter All Registration Details" });
      }
  };

  return (
      <>
          <Container>
              <div className={styles.registration}>
                  {errors.submit_error.length !== 0 && (
                      <Alert severity="error">{errors.submit_error}</Alert>
                  )}
                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                          helperText={errors.errloanAmount}
                          sx={mystyles}
                          name="loanAmount"
                          label="Loan Amount"
                          size="small"
                          onBlur={handler}
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
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}  style={{ width: "131%" }}>
                              <DatePicker label="Loan Distributed Date" />
                          </DemoContainer>
                      </LocalizationProvider>
                  </FormControl>

                  <FormControl sx={{ my: 2 }} fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}  style={{ width: "131%" }}>
                              <DatePicker label="Loan Close Date" />
                          </DemoContainer>
                      </LocalizationProvider>
                  </FormControl>

                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                          helperText={errors.processingFee}
                          sx={mystyles}
                          name="processingFee"
                          label="Processing Fee"
                          size="small"
                          onBlur={handler}
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
                      <TextField
                          helperText={errors.errAmountDisbursed}
                          sx={mystyles}
                          name="amountDisbursed"
                          label="Amount Disbursed"
                          size="small"
                          onBlur={handler}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment >
                                      <BorderColorTwoToneIcon color="info" />
                                  </InputAdornment>
                              ),
                          }}
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>


                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                          helperText={errors.errPeriod}
                          sx={mystyles}
                          name="period"
                          label="Period"
                          size="small"
                          onBlur={handler}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment >
                                      <BorderColorTwoToneIcon color="info" />
                                  </InputAdornment>
                              ),
                          }}
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>

                  <FormControl sx={{ my: 2 }} fullWidth>
                      <TextField
                          helperText={errors.errInterest}
                          sx={mystyles}
                          name="interest"
                          label="Interest"
                          size="small"
                          onBlur={handler}
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment >
                                      <BorderColorTwoToneIcon color="info" />
                                  </InputAdornment>
                              ),
                          }}
                          variant="outlined"
                          color="info"
                      />
                  </FormControl>

                  <div className="text-center">
                      <Button
                          variant="contained"
                          color="success"
                          onClick={() => validateRegister()}
                          className={styles.button_fun}
                      >
                          Submit
                      </Button>
                  </div>
              </div>
          </Container>
      </>
  );
}