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
import Swal from 'sweetalert2'
import {jwtDecode} from 'jwt-decode';   
import { useSelector } from 'react-redux';
import {MemberRegister } from '../../config/LoginService'

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
const regForName = /^[A-Za-z ]+$/;
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
const regForAadharCard = RegExp(/^[0-9]{12}$/);
const regForPanCard = RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]$/);
const regForMobile = RegExp(/^[0-9]{10}$/);
const regForAccountNumber = RegExp(/^\d{14}$/)
const regForIFSCCode = RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/)

export default function BasicInfo() {
    const [errors, setErrors] = useState({
        errfullName: "",
        errAadharCard:"",
        errPanCard:"",
        errMobile:"",
        errEmail: "",
        errPassword: "",
        errConfirm_password: "",
        submit_error: "",
        erraccountNumber:"",
        errifsc:"",
        errbankAddress:""
    });
    const [registerCredentials, setRegisterCredentials] = useState({
        fullName: "",
        mobile: "",
        email: "",
        aadharCard:"",
        panCard:"",
        password: "",
        cpassword: "",
        profile: "",
        accountNumber:"",
        ifsc:"",
        bankAddress:""
    });
    const [show, setShow] = useState({
        showPassword: false,
        showConfPassword: false,
    });

    const navigate = useNavigate();
    const UserToken = useSelector((state) => state.loggedInUserReducer);
    console.log("userToken0",UserToken)

    // For Validation
    const handler = (event) => {
        let { name, value } = event.target;
        value = value.trim()
        let error = "";
        switch (name) {
            case "fullName":
                error = regForName.test(value) ? "" : "Invalid  Name";
                setErrors({ ...errors, errfullName: error });
                break;

            case "mobile":
                error = regForMobile.test(value) ? "" : "Invalid Mobile Number";
                setErrors({ ...errors, errMobile: error });
                break;

            case "email":
                error = regForEmail.test(value) ? "" : "Invalid Email";
                setErrors({ ...errors, errEmail: error });
                break;

            case "aadharCard":
                error = regForAadharCard.test(value) ? "" : "Invalid Aadhar Card";
                setErrors({ ...errors, errAadharCard: error });
                break;
    
            case "panCard":
                error = regForPanCard.test(value) ? "" : "Invalid Pan Card";
                setErrors({ ...errors, errPanCard: error });
                break;

            case "accountNumber":
                error = regForAccountNumber.test(value) ? "" : "Invalid Account Number";
                setErrors({ ...errors, erraccountNumber: error });
                break;

            // case "ifsc":
            //     error = regForIFSCCode.test(value) ? "" : "Invalid IFSC Code";
            //     setErrors({ ...errors, errifsc: error });
            //     break;

            case "password":
                error = regForpassword.test(value) ? "" : "Enter Strong Password";
                setErrors({ ...errors, errPassword: error });
                break;

            case "cpassword":
                error = value === registerCredentials.password ? "" : "Password does not match";
                setErrors({ ...errors, errConfirm_password: error });
                break;
            default:
                break;
        }
        setRegisterCredentials({ ...registerCredentials, [name]: value });
    };

    // New User Registration
    const validateRegister = async () => {
        if (registerCredentials.fullName !== ""  && registerCredentials.mobile !== "" && registerCredentials.email !== "" && registerCredentials.password !== "" && registerCredentials.cpassword !== "" && registerCredentials.profile !== "" && registerCredentials.aadharCard !== "" && registerCredentials.panCard !== "" && registerCredentials.accountNumber!=="" && registerCredentials.ifsc !== ""
        ) {
            const formData = new FormData();
            formData.append("fullName", registerCredentials.fullName);
            formData.append("mobile", registerCredentials.mobile);
            formData.append("aadharCard", registerCredentials.aadharCard);
            formData.append("panCard", registerCredentials.panCard);
            formData.append("email", registerCredentials.email);
            formData.append("profile", registerCredentials.profile);
            formData.append("password", registerCredentials.password);
            formData.append("cpassword", registerCredentials.cpassword);
            formData.append("accountNumber", registerCredentials.accountNumber);
            formData.append("ifsc", registerCredentials.ifsc);
            formData.append("bankAddress", registerCredentials.bankAddress);
            

           console.log("registeration details",registerCredentials);

        await MemberRegister(registerCredentials)
        .then(res=>{
            if(res.data.err == 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.msg,
                })
            }else{
            console.log("datatattatat------------------->",res)
                if(UserToken.isAdmin ){
                    Swal.fire({
                        icon: 'success',
                        title: 'Member Added successfully',
                        text: `MemberId: ${res.data.memberId} `
                      });
                      

                }else{
                    navigate("/member/login")
                }
            }
          
        }). catch (error=> {
            
            console.log("error in catch",error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.msg,
            })
        })

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
                            helperText={errors.errfullName}
                            sx={mystyles}
                            name="fullName"
                            label="Full Name"
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
                            helperText={errors.errMobile}
                            sx={mystyles}
                            name="mobile"
                            label="Mobile"
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
                            helperText={errors.errEmail}
                            sx={mystyles}
                            name="email"
                            label="Email"
                            size="small"
                            onBlur={handler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment >
                                        <EmailIcon color="info" />
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
                                <DatePicker label="Date of Birth" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            helperText={errors.errAadharCard}
                            sx={mystyles}
                            name="aadharCard"
                            label="Aadhar Card"
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
                            helperText={errors.errPanCard}
                            sx={mystyles}
                            name="panCard"
                            label="Pan Card"
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
                            helperText={errors.erraccountNumber}
                            sx={mystyles}
                            name="accountNumber"
                            label="Account Number"
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
                            helperText={errors.errbankAddress}
                            sx={mystyles}
                            name="bankAddress"
                            label="Bank Address"
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
                            helperText={errors.errifsc}
                            sx={mystyles}
                            name="ifsc"
                            label="IFSC Code"
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
                            helperText={errors.errPassword}
                            sx={mystyles}
                            name="password"
                            label="Password"
                            size="small"
                            type={show.showPassword ? "text" : "password"}
                            onBlur={handler}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton
                                            color="info"
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShow({ ...show, showPassword: !show.showPassword })
                                            }
                                            edge="end"
                                        >
                                            {show.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            color="info"
                        />
                    </FormControl>

                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            helperText={errors.errConfirm_password}
                            sx={mystyles}

                            name="cpassword"
                            label="Confirm Password"
                            size="small"
                            type={show.showConfPassword ? "text" : "password"}
                            onBlur={handler}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton
                                            color="info"
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShow({
                                                    ...show,
                                                    showConfPassword: !show.showConfPassword,
                                                })
                                            }
                                            edge="end"
                                        >
                                            {show.showConfPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            color="info"
                        />
                    </FormControl>
                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            type="file"
                            label="Profile"
                            name="profile"
                            focused
                            onChange={(e) =>
                                setRegisterCredentials({
                                    ...registerCredentials,
                                    profile: e.target.files[0],
                                })
                            }
                            variant="outlined"
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