import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbaar from "../Navbaar/Navbaar";
import image1 from "../../assets/images/photoImage.jpg";
import { useNavigate } from "react-router-dom";
import Calculator from "../calculator/CalculatorMain";

import {
  Accordion,
  AccordionSummary,
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
import { useSelector } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import MemberViewRequests from "./MemberViewRequests";
export default function ParentTabs() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const UserToken = useSelector((state) => state.loggedInUserReducer);
  const [ProfileData, setProfileData] = useState({});
  const { id } = useParams();
  const [anchorToggle, setAnchorToggle] = useState(false);

  const handleChange = (e,newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch('http://localhost:9000/member/listSingleMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:id   
        })
      })
        .then(response => response.json())
        .then(result => {
          console.log('API Response: ', result.payload[0].result);
          setProfileData(result.payload[0].result[0])
        })
        .catch(error => {
          console.error('API Error:', error);
        });
       
  }, []);

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

  const list = () => {
    if (!ProfileData ) {
      return null; 
    }
  
    return (
      <Box
        sx={{ width: 350,marginTop:"5rem" }}
        role="presentation"
        onClick={(e)=>toggleDrawer(e,false)}
        onKeyDown={(e)=>toggleDrawer(e,false)}
      >
        <List>
          {console.log("data",Object.entries(ProfileData))}
          {Object.entries(ProfileData).map(([key, value], index) => (
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
  };
  

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
          <h2>
            {console.log("ProfileData----",ProfileData)}
                {ProfileData.Name}
          </h2>
          </div>
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
          <MemberViewRequests/>
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
