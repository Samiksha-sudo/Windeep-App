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
import MemberForm1 from './MemberForm1';
import MemberForm2 from './MemberForm2';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function MemberForm3({CURRENT_USER,USER_TYPES}) {

  const regForName = RegExp(/^[A-Za-z]{3,30}$/);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log(id);

  const mystyles = {
    '& .MuiFormHelperText-root': {
        color: "red",
    }
};

const steps = ['Member Info','Member Details', 'Your Info'];



  const [errors, setErrors] = useState({
        errAmount: "",
        errInterest: "",
        errPeriod: "",
        errEMI: "",

    });

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep(activeStep - 1);
      };

    const [registerCredentials, setRegisterCredentials] = useState({
        amount: "",
        interest: "",
        period: "",
        emi: "",
        unit: "months"
    });





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




    return (
        <>


        </>
    )
} 



