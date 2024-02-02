import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbaar from "../Navbaar/Navbaar";
import {
  Grid,
  Paper,
  Table,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import image1 from "../../assets/images/photoImage.jpg";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {memberLoan} from "../../utils/database/data"

export default function SingleMemberLoan({ CURRENT_USER, USER_TYPES }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  console.log(id);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [isGridOpen, setIsGridOpen] = useState(false);

  const [formData, setFormData] = useState({
    reason: "",
    loan_type: "",
    totalLoan: "",
    unit: "months",
  });

  const [data, setData] = useState([]);

  const columns = [
    {
      id: "availed_on",
      label: "Financial Support Availed on Date",
      minWidth: 170,
    },
    { id: "availed_value", label: "Financial Support Availed", minWidth: 100 },
    {
      id: "processing_charge",
      label: "Financial Support Processing Charges",
      minWidth: 100,
    },
    {
      id: "interest_loan_id",
      label: "Interest Applicable	loan id",
      minWidth: 100,
    },
    { id: "loan_id", label: "Loan Id", minWidth: 100 },
    { id: "installment", label: "Installment", minWidth: 100 },
    {
      id: "comapansation_amount",
      label: "Financial Support + Compansation Amount",
      minWidth: 100,
    },
    {
      id: "repaid_support",
      label: "Financial Support Repaid Principal",
      minWidth: 100,
    },
    {
      id: "compansation_paid",
      label: "Financial Support Compansation Paid",
      minWidth: 100,
    },
    {
      id: "receivable_principle",
      label: "Financial Support Receivable Principal",
      minWidth: 100,
    },
    {
      id: "receivable_compansation",
      label: " Financial Support Receivable Compansation",
      minWidth: 100,
    },
    { id: "fine", label: "Applied", minWidth: 100 },
    { id: "remarks", label: "Remarks", minWidth: 100 },
  ];

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

  const handleTransaction = (loan_id) => {
    navigate(`/member/${id}/transactions/${loan_id}`);
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

  const handleInputChange = (e) => {
    if (e && e.target) {
      // Handle changes from regular text fields
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (e) {
      // Handle changes from date picker
      setFormData((prevData) => ({
        ...prevData,
        startDate: e.format("MM-DD-YYYY"),
        endDate: e.format("MM-DD-YYYY"),
      }));
    }
  };

  const handleAddClick = () => {
    // Assuming you have an API endpoint for inserting data
    setIsGridOpen(!isGridOpen);
  };
  const handleUnitChange = (event) => {
    setFormData({
      ...formData,
      unit: event.target.value,
    });
  };

  const handleAddLoan = async () => {
    console.log("formData", formData);
    formData.member_id = id;

    // await fetch("http://localhost:9000/member/loan/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("API Response:", result.payload[0].result);
    //     // Set the data received from the API to the state
    //     setData(result.payload[0].result);
    //     setFormData({
    //       reason: "",
    //       loan_type: "",
    //       totalLoan: "",
    //       unit: "months",
    //     });
    //     setIsGridOpen(!isGridOpen);
    //   })
    //   .catch((error) => {
    //     console.error("API Error:", error);
    //   });

      setFormData({
        reason: "",
        loan_type: "",
        totalLoan: "",
        unit: "months",
      });
      setIsGridOpen(!isGridOpen);

    // await fetch("http://localhost:9000/member/loan", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("API Response:", result.payload[0].result);
    //     // Set the data received from the API to the state
    //     setData(result.payload[0].result);
    //   })
    //   .catch((error) => {
    //     console.error("API Error:", error);
    //   });
  };

  setData(memberLoan)

  useEffect(() => {
    setData(memberLoan)
    // Make the API request when the component mounts
    // fetch("http://localhost:a /member/loan", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: id,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("API Response:", result.payload[0].result);
    //     // Set the data received from the API to the state
    //     setData(result.payload[0].result);
    //   })
    //   .catch((error) => {
    //     console.error("API Error:", error);
    //   });
  }, [id]);

  return (
    <>
      {CURRENT_USER != "Normal User" ? (
        <Button
          variant="contained"
          sx={{ marginLeft: 3 }}
          onClick={handleAddClick}
        >
          Add
        </Button>
      ) : (
        ""
      )}

      {isGridOpen && (
        <Grid
          container
          spacing={1}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid
            item
            xs={12}
            sm={3}
            sx={{ maxWidth: "16% !important", my: 2, ml: 3 }}
          >
            <TextField
              type="text"
              name="totalLoan"
              value={formData.totalLoan}
              onChange={handleInputChange}
              label="Total Loan"
              placeholder="Total Loan"
              sx={{ marginLeft: "8px" }}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 2 }}>
            <TextField
              type="text"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              label="Interest"
              placeholder="Interest"
              sx={{ marginLeft: "8px" }}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 2 }}>
            <TextField
              type="text"
              name="loan_type"
              value={formData.loan_type}
              onChange={handleInputChange}
              label="Loan Type"
              placeholder="Loan Type"
              sx={{ marginLeft: "8px" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{ maxWidth: "30% !important", my: 2, mr: 5 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <TextField
                  type="text"
                  name="period"
                  value={formData.Period}
                  onChange={handleInputChange}
                  label="Period"
                  placeholder="Period"
                  sx={{ marginLeft: "8px" }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Select
                  sx={{ width: "170px", height: "55px" }}
                  label="Unit"
                  variant="outlined"
                  color="info"
                  value={formData.unit}
                  onChange={handleUnitChange}
                >
                  <MenuItem value="months">Months</MenuItem>
                  <MenuItem value="years">Years</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={3}
            sx={{ maxWidth: "16% !important", my: 2, ml: 5 }}
          >
            <TextField
              type="text"
              name="processingFee"
              value={formData.processingFee}
              onChange={handleInputChange}
              label="Processing Fee"
              placeholder="Processing Fee"
              sx={{ marginLeft: "8px" }}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 2 }}>
            <TextField
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              label="Reason"
              placeholder="Reason"
              sx={{ marginLeft: "8px" }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={3}
            sx={{ maxWidth: "16% !important", my: 1, ml: 4 }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Loan Start Date"
                  onChange={handleInputChange}
                  name="startDate"
                  placeholder="Select Date"
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 2 }}>
            <Button
              sx={{
                ml: 4,
              }}
              variant="outlined"
              color="success"
              onClick={handleAddLoan}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} padding={2}>
        {data.length
          ? data.map((ele, index) => (
              <Grid item key={index} xs={6} md={4}>
                <Paper>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" sx={{ fontSize: 15 }}>
                        <strong>LOAN {ele.loan_type}</strong>
                      </Typography>

                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {ele.reason}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        Total Loan : ₹ {ele.total_loan}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        Interest : ₹ {ele.interest}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        Period : {ele.period} {ele.unit}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        Processing Fee : ₹ {ele.processing_fee}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        Total Repayment : ₹ {ele.total_repayment}
                      </Typography>
                      <Typography>
                        Monthly EMI : ₹ <strong>{ele.monthly_emi}</strong>
                        <br />
                        Loan Start Date: {ele.start_date}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => handleTransaction(ele.id)}
                      >
                        Transactions
                      </Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
            ))
          : ""}
      </Grid>
    </>
  );
}
