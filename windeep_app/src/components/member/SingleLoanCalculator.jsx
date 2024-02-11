import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbaar from "../Navbaar/Navbaar";
import Button from "@mui/material/Button";
import styles from "./BasicInfo.module.css";
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import {
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import image1 from "../../assets/images/photoImage.jpg";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputAdornment,
  Container,
  IconButton,
  Alert,
  FormHelperText,
} from "@mui/material";
import Calculate from "./Calculate.jsx";
import Detail from "./Detail.jsx";

export default function SingleLoanCalculator({ CURRENT_USER, USER_TYPES }) {
  const regForName = RegExp(/^[A-Za-z]{3,30}$/);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log(id);

  const mystyles = {
    "& .MuiFormHelperText-root": {
      color: "red",
    },
  };

  const [errors, setErrors] = useState({
    errAmount: "",
    errInterest: "",
    errPeriod: "",
    errProcessingFee: "",
  });

  const [calculate, setCalculate] = useState(false);
  const [detail, setDetail] = useState(false);
  const [iscalculated, setIscalculated] = useState(false);

  const [registerCredentials, setRegisterCredentials] = useState({
    amount: "",
    interest: "",
    period: "",
    processingFee: "1.5", // Set the default value here
    unit: "months",
  });

  const handleUnitChange = (event) => {
    setRegisterCredentials({
      ...registerCredentials,
      unit: event.target.value,
    });
    setResetData(false);
    setIscalculated(false);
    setDetail(false);
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
      case "processingFee":
        error = regForName.test(value) ? "Invalid Processing Fee" : "";
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

  const calculateloan = () => {
    console.log("calculTE loan", registerCredentials);
    if (
      registerCredentials.amount !== "" &&
      registerCredentials.interest !== "" &&
      registerCredentials.period !== "" &&
      registerCredentials.processingFee !== ""
    ) {
      setCalculate(true);
      setIscalculated(true);
      setErrors({}); // Clear any previous errors
    } else {
      console.log("errors");
      setErrors({ ...errors, submit_error: "Enter All Loan Details" });
    }
  };

  const profileData = [
    {
      image: image1,
      Name: "Ganesh Khenat",
      Mobile: 9518354701,
      Email: "ganeshkhenat@gmail.com",
      "Date of Birth": "12-06-2023",
      "Aadhar Card": "202592951240",
      "Pan card": "ABCD00002",
      "IFSC code": "HDFC12345",
    },
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
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleRowClick = (id, memberLink) => {
    navigate(`/member/${id}/${memberLink}`);
  };

  const handleRowClickFinance = (memberLink) => {
    navigate(`/${memberLink}`);
  };

  const detailLoan = () => {
    setDetail(true);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {Object.entries(profileData[0]).map(([key, value], index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              {key === "image" ? (
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
    e.target.style.background = "grey";
  }

  const resetValues = () => {
    setRegisterCredentials({
      amount: "",
      interest: "",
      period: "",
      processingFee: "1.5",
      unit: "months",
    });
    setErrors({
      errAmount: "",
      errInterest: "",
      errPeriod: "",
      errProcessingFee: "",
    });
    setResetData(true);
    setIscalculated(false);
    setDetail(false);
  };
  useEffect(() => {
    // Reset the resetData state after re-render
    setResetData(false);
    setIscalculated(false);
    setDetail(false);

    // Reset the form values after re-render
    if (resetData) {
      setRegisterCredentials({
        amount: "",
        interest: "",
        period: "",
        processingFee: "1.5",
        unit: "months",
      });
    }
  }, [resetData, registerCredentials]);

  useEffect(() => {
    // Reset the resetData state after re-render
    setResetData(false);
    setIscalculated(false);
  }, [resetData]);

  useEffect(() => {
  
  }, []);

  const value = 1.5;

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
            <TextField
              helperText={errors.errInterest}
              sx={mystyles}
              name="interest"
              value={registerCredentials.interest}
              label="Interest"
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
                  sx={{ width: "170px", height: "40px" }}
                  label="Unit"
                  variant="outlined"
                  color="info"
                  value={registerCredentials.unit}
                  onChange={handleUnitChange}
                >
                  <MenuItem value="months">Months</MenuItem>
                  <MenuItem value="years">Years</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl sx={{ my: 2 }} fullWidth>
            <TextField
              helperText={errors.errProcessingFee}
              sx={mystyles}
              name="processingFee"
              value={registerCredentials.processingFee}
              label="Processing Fee"
              disabled
              size="small"
              onChange={handleInputChange}
              variant="outlined"
              color="info"
            />
          </FormControl>

          <Grid container spacing={15}>
            <Grid item className="text-center">
              <Button
                variant="contained"
                color="info"
                onClick={() => calculateloan()}
                className={styles.button_fun}
              >
                Calculate
              </Button>
            </Grid>
            <Grid item className="text-center">
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "grey",
                  borderColor: "black",
                }}
                onClick={resetValues}
                onMouseOver={changeBackground}
              >
                Reset
              </Button>
            </Grid>
            <Grid item className="text-center">
              <Button
                variant="contained"
                color="info"
                onClick={() => detailLoan()}
                className={styles.button_fun}
                disabled={!iscalculated}
              >
                Detail
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>

      {registerCredentials.amount.length > 0 &&
        registerCredentials.interest.length > 0 &&
        registerCredentials.period.length > 0 &&
        registerCredentials.processingFee.length > 0 &&
        registerCredentials.unit.length > 0 &&
        calculate &&
        iscalculated && <Calculate data={registerCredentials} />}

      {detail &&
        registerCredentials.amount.length > 0 &&
        registerCredentials.interest.length > 0 &&
        registerCredentials.period.length > 0 &&
        registerCredentials.processingFee.length > 0 &&
        registerCredentials.unit.length > 0 &&
        iscalculated && <Detail data={registerCredentials} />}
    </>
  );
}
