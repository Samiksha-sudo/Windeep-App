import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbaar from "../Navbaar/Navbaar";
import image1 from "../../assets/images/photoImage.jpg";
import { useNavigate } from "react-router-dom";
import Calculator from "../calculator/CalculatorMain";

import {
  Accordion,
  AccordionSummary,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  TableHead,
  Autocomplete,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Drawer,
  AccordionDetails,
  ListItem,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SingleMembershares from "./SingleMemberShares"
import SingleMemberLoan from "./SingleMemberLoan";
import SingleLoanCalculator from "./SingleLoanCalculator";
import LoanRequestForm from "./LoanRequestForm";
import LoanForm from "./LoanForm";
import GuranteeForm from "./GuranteeForm";
import ViewRequests from "./ViewRequests";


export default function ParentTabs({CURRENT_USER,USER_TYPES}) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const [anchorToggle, setAnchorToggle] = useState(false);

  const handleChange = (e,newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
 
  }, [])

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const toggleDrawer = (event,open) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAnchorToggle(open);
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

  const list = () => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={(e)=>toggleDrawer(e,false)}
      onKeyDown={(e)=>toggleDrawer(e,false)}
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

  return (
    <>
      <div className="mt-3" style={{ display: "flex", justifyContent: "space-between" }}>
 
          <React.Fragment>
            <Button
              onClick={(e) => toggleDrawer(e,true)}
              sx={{ marginLeft: "1%" }}
            >
              <img
                src="/static/media/photoImage.85cade08451cf2e3683a.jpg"
                alt="Profile"
                className="profile_img"
              />
            </Button>
            <Drawer
              anchor={'left'}
              open={anchorToggle}
              onClose={(e) => toggleDrawer(e,false)}
            >
              {list()}
            </Drawer>
          </React.Fragment>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Calculator</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Calculator/>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
            <Tab label="Shares" {...a11yProps(0)} />
            <Tab label="Loan" {...a11yProps(1)} />
            <Tab label="Loan Calculator" {...a11yProps(2)} />
            <Tab label="Request Loan" {...a11yProps(3)} />
            <Tab label="View Requests" {...a11yProps(4)} />
            <Tab label="Loan Form" {...a11yProps(5)} />
            <Tab label="Gurantor Form" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <SingleMembershares/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SingleMemberLoan/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SingleLoanCalculator/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <LoanRequestForm/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <ViewRequests/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <LoanForm/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <GuranteeForm/>
        </CustomTabPanel>

      </Box>
    </>
  );
}
