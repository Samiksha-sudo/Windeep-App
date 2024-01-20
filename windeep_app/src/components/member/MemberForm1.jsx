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
    import { TextField, FormControl, InputAdornment, Container, IconButton, Alert, FormHelperText,Typography } from "@mui/material";
    import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { DatePicker } from '@mui/x-date-pickers/DatePicker';
    import MemberForm2 from './MemberForm2';
    import MemberForm3 from './MemberForm3';
    import Stepper from '@mui/material/Stepper';
    import Step from '@mui/material/Step';
    import StepLabel from '@mui/material/StepLabel';

    // import { Document, Page } from 'react-docx';

    import { Worker, Viewer } from '@react-pdf-viewer/core';

    import { renderAsyncDocument } from 'react-docx';



    export default function MemberForm1({CURRENT_USER,USER_TYPES,language}) {

    const regForName = RegExp(/^[A-Za-z]{3,30}$/);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    console.log(id);
    console.log("USER_TYPES in member 1 form",USER_TYPES);
    console.log("language",language)
    const mystyles = {
        '& .MuiFormHelperText-root': {
            color: "red",
        }
    };


    const [errors, setErrors] = useState({
            errname: "",
            errage: "",
            erroccupation: "",
            errEMI: "",

        });
        const [calculate, setCalculate] = useState(false);
        const [detail, setDetail] = useState(false);
        const [iscalculated, setIscalculated] = useState(false);
        const [activeStep, setActiveStep] = React.useState(0);

        const [isDivVisible, setDivVisibility] = useState(false);

        const handleViewRequestsClick = () => {
          setDivVisibility(!isDivVisible);
        };

        const handleNext = () => {
            setActiveStep(activeStep + 1);
        };
        
        const handleBack = () => {
            setActiveStep(activeStep - 1);
        };

        const [registerCredentials, setRegisterCredentials] = useState({
            name: "",
            age: "",
            occupation: "",
            emi: "",
            unit: "months"
        });

        const [selectedImage, setSelectedImage] = useState(null);

        const handleImageChange = (event) => {
          const file = event.target.files[0];
      
          if (file) {
            const reader = new FileReader();
      
            reader.onload = (e) => {
              setSelectedImage(e.target.result);
            };
      
            reader.readAsDataURL(file);
          }
        };

        const handleUnitChange = (event) => {
            setRegisterCredentials({
              ...registerCredentials,
              unit: event.target.value,
            });
            setResetData(false);
            setIscalculated(false)
          };
          const calculateloan = () => {
            if (
              registerCredentials.name !== "" &&
              registerCredentials.age !== "" &&
              registerCredentials.occupation !== "" &&
              registerCredentials.processingFee !== ""
            ) {
              setCalculate(true);
              setIscalculated(true);
              setErrors({}); // Clear any previous errors
            } else {
              console.log("errors")
              setErrors({ ...errors, submit_error: "Enter All Loan Details" });
            }
          };
          const detailLoan = () =>{
            setDetail(true)
          }

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
            case "name":
                error = regForName.test(value) ? "Invalid name" : "";
                break;
            case "age":
                error = regForName.test(value) ? "Invalid age" : "";
                break;
            case "occupation":
                error = regForName.test(value) ? "Invalid occupation" : "";
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
        function changeBackground(e) {
            e.target.style.background = 'grey';
          }
  
          const resetValues = () => {
            console.log("in reset log")
            setRegisterCredentials({
              name: "",
              age: "",
              occupation: "",
              processingFee: "",
              unit: "months"
            });
            setErrors({
              errname: "",
              errage: "",
              erroccupation: "",
              errProcessingFee: ""
            });
            setResetData(true);
            setIscalculated(false);
  
            console.log("registerCredentials",registerCredentials)
          };

    // New User Registration
    const validateRegister = async () => {
        if (registerCredentials.name !== "" && registerCredentials.age !== "" && registerCredentials.occupation !== "" && registerCredentials.emi !== "" ) {
            const formData = new FormData();
            formData.append("name", registerCredentials.name);
            formData.append("age", registerCredentials.age);
            formData.append("occupation", registerCredentials.aadharCard);
            formData.append("emi", registerCredentials.emi);       
        }


    };




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


            return <>
            {language == "english"?        
            
             <Container>
                 
                <div className={styles.registration}>
                <h3>Member Info</h3>   
                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            helperText={errors.errname}
                            sx={mystyles}
                            name="name"
                            value={registerCredentials.name}
                            label="Name"
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
                        <TextField
                            helperText={errors.errage}
                            sx={mystyles}
                            name="age"
                            value={registerCredentials.age}
                            label="Age"
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
                        <TextField
                            helperText={errors.erramount}
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
                        <Grid item >
                        <TextField
                            helperText={errors.erroccupation}
                            sx={mystyles}
                            name="occupation"
                            value={registerCredentials.occupation}  
                            label="Occupation"
                            size="small"
                            onChange={handleInputChange} 
                            variant="outlined"
                            color="info"
                          />
                        </Grid>
                        <Grid item >

                        <FormControl  fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker label="Date" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                        </Grid>
                      </Grid>

                        

                    </FormControl>

                 


                    <FormControl sx={{ my: 2 }} fullWidth>
                        <Grid container spacing={2} >
                      <Grid item className="text-center">
                      <label htmlFor="Photo" style={{ marginBottom: '10px' }}>Photo</label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginBottom: '20px' }}
                        />
                        {selectedImage && (
                            <div>
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px' }}
                            />
                            </div>
                        )}
                      </Grid>
                      <Grid item className="text-center">

                      <label htmlFor="Sign" style={{ marginBottom: '10px' }}>Sign</label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginBottom: '20px' }}
                        />
                        {selectedImage && (
                            <div>
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px' }}
                            />
                            </div>
                        )}
                      </Grid>
                  </Grid>
                            
                       
                        </FormControl>

                        <h3>Relative Information 1 </h3>   
                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            helperText={errors.errname}
                            sx={mystyles}
                            name="name"
                            value={registerCredentials.name}
                            label="Name"
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
                        <TextField
                            helperText={errors.errrelation}
                            sx={mystyles}
                            name="relation"
                            value={registerCredentials.relation}
                            label="Relation"
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
                        <Grid container spacing={2} >
                      <Grid item className="text-center">

                      <label htmlFor="Sign" style={{ marginBottom: '10px' }}>Sign</label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginBottom: '20px' }}
                        />
                        {selectedImage && (
                            <div>
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px' }}
                            />
                            </div>
                        )}
                      </Grid>
                  </Grid>
                            
                       
                        </FormControl>

                        <h3>Relative Information 2 </h3>   
                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            helperText={errors.errname}
                            sx={mystyles}
                            name="name"
                            value={registerCredentials.name}
                            label="Name"
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
                        <TextField
                            helperText={errors.errrelation}
                            sx={mystyles}
                            name="relation"
                            value={registerCredentials.relation}
                            label="Relation"
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
                        <Grid container spacing={2} >
                      <Grid item className="text-center">

                      <label htmlFor="Sign" style={{ marginBottom: '10px' }}>Sign</label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginBottom: '20px' }}
                        />
                        {selectedImage && (
                            <div>
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px' }}
                            />
                            </div>
                        )}
                      </Grid>
                  </Grid>
                            
                       
                        </FormControl>

                        <h3>Guarantor Information 1 </h3>   
                        <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            helperText={errors.errname}
                            sx={mystyles}
                            name="name"
                            value={registerCredentials.name}
                            label="Name"
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
                        <TextField
                            helperText={errors.errmemberId}
                            sx={mystyles}
                            name="memberId"
                            value={registerCredentials.memberId}
                            label="MemberId"
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

                    <Grid item >
                    <Button
                            variant="contained"
                            color="success"

                        >
                            Send Request
                        </Button>

         

                <Button sx={{ ml: 2 }}
                    variant="contained"
                    color="info"
                    onClick={handleViewRequestsClick}

                >
                    View Request
                </Button>
                </Grid>
                    

                        <h3>Guarantor Information 2 </h3>   
                        <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            helperText={errors.errname}
                            sx={mystyles}
                            name="name"
                            value={registerCredentials.name}
                            label="Name"
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
                        <TextField
                            helperText={errors.errrelation}
                            sx={mystyles}
                            name="relation"
                            value={registerCredentials.relation}
                            label="Relation"
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


                    <Grid item >
                    <Button
                            variant="contained"
                            color="success"

                        >
                            Send Request
                        </Button>

         

                <Button sx={{ ml: 2 }}
                    variant="contained"
                    color="info"

                >
                    View Request
                </Button>
                </Grid>

                    <Button  sx={{ my:4 }}
                            variant="contained"
                            color="success"
                            className={styles.button_fun}
                        >
                            Submit
                        </Button>

                  
                </div>
            </Container>:        
            <Container>
                <div className={styles.registration}>
                    <FormControl sx={{ my: 2 }} fullWidth>
                        <TextField
                            helperText={errors.errname}
                            sx={mystyles}
                            name="name"
                            value={registerCredentials.name}
                            label="नाव"
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
                        <TextField
                            helperText={errors.errage}
                            sx={mystyles}
                            name="Age"
                            value={registerCredentials.age}
                            label="वय"
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

                          <TextField
                            helperText={errors.erroccupation}
                            sx={mystyles}
                            name="Occupation"
                            value={registerCredentials.occupation}  
                            label="व्यवसाय"
                            size="small"
                            onChange={handleInputChange} 
                            variant="outlined"
                            color="info"
                          />
                      

                    </FormControl>

                    <FormControl sx={{ my: 2 }} fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}  style={{ width: "131%" }}>
                                <DatePicker label="दिनांक" />
                            </DemoContainer>
                        </LocalizationProvider>
                        </FormControl>
                
                <FormControl sx={{ my: 2 }} fullWidth>
                        <Grid container spacing={2} >
                      <Grid item className="text-center">
                      <label htmlFor="Photo" style={{ marginBottom: '10px' }}>फोटो</label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginBottom: '20px' }}
                        />
                        {selectedImage && (
                            <div>
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px' }}
                            />
                            </div>
                        )}
                      </Grid>
                      <Grid item className="text-center">

                      <label htmlFor="Sign" style={{ marginBottom: '10px' }}>सही</label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginBottom: '20px' }}
                        />
                        {selectedImage && (
                            <div>
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px' }}
                            />
                            </div>
                        )}
                      </Grid>
                  </Grid>
                            
                       
                        </FormControl>



                    <Button
                            variant="contained"
                            color="success"
                            className={styles.button_fun}
                        >
                            Submit
                        </Button>



               
                </div>
            </Container>};

            {isDivVisible && (
                      <>  

                      <div className={styles.viewRequests}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                           <strong> Guarantor Requests : </strong>  Pending 
                            <br/>
                            <strong>  Reason : </strong>Not having enough payment
                            <br/>
                            <strong>  Approved By : </strong>Pradeep
                        </TableContainer>
                      </div>
                      <br />
              
                    </> 
      )}


            </>
         
    } 



