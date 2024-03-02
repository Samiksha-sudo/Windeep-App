import React, { useEffect, useState } from 'react'
import {  Paper,Table,TableCell,TableContainer,TableHead,Checkbox, FormControlLabel,TableBody,TableRow ,Box,Drawer,List,ListItem,ListItemButton,ListItemText,Grid,TextField,Alert,  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,Button} from '@mui/material'
import { useParams,useLocation } from 'react-router-dom';
import image1 from "../../assets/images/photoImage.jpg";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from "./BasicInfo.module.css";
import { useSelector } from 'react-redux';
import Calculator from "../calculator/CalculatorMain";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
export default function SingleMemberTransactions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id ,loan_id,loan_type} = useParams();
  const UserToken = useSelector((state) => state.loggedInUserReducer);
  const [anchorToggle, setAnchorToggle] = useState(false);
  const [ProfileData, setProfileData] = useState({});
  console.log(id)
  const regForNumber = /^[0-9]*$/;

  console.log("mainData========================>",id,loan_id)

let columns = []
  if(UserToken.isAdmin){
     columns = [
      { id: 'Date', label: 'Date', minWidth: 170 },
      { id: 'period', label: 'Period', minWidth: 100 },       
      { id: 'EMI', label: 'EMI', minWidth: 100 },
      { id: 'Principal', label: 'Principal', minWidth: 100 },
      { id: 'Interest', label: 'Int.', minWidth: 100 },
      { id: 'balance', label: 'Balance', minWidth: 100 },
      { id: 'Fee/Fine', label: 'Fee Fine', minWidth: 100 },
      { id: 'onlyInterest', label: 'Only Interest', minWidth: 100 },
      { id: 'Remarks', label: 'Remarks', minWidth: 100 },
      { id: 'adminRemarks', label: 'Admin Remarks', minWidth: 100 },
      { id: 'action', label: 'Action', minWidth: 150 }
      
       ];
  }else{
     columns = [
      { id: 'Date', label: 'Date', minWidth: 170 },
      { id: 'period', label: 'Period', minWidth: 100 },       
      { id: 'EMI', label: 'EMI', minWidth: 100 },
      { id: 'Principal', label: 'Principal', minWidth: 100 },
      { id: 'Interest', label: 'Int.', minWidth: 100 },
      { id: 'balance', label: 'Balance', minWidth: 100 },
      { id: 'Fee/Fine', label: 'Fee Fine', minWidth: 100 },
      { id: 'onlyInterest', label: 'Only Interest', minWidth: 100 },
      { id: 'Remarks', label: 'Remarks', minWidth: 100 }        
       ];
  }
  const columnsDefault = [
      {
        emi: "month",label:"Mon", minWidth: 70 
      },
      {
      emi: "emi",label:"EMI", minWidth: 70 
    },
    {
      emi: "principal",label:"Principal", minWidth: 70 
    },
    {
      emi: "interest",label:"Int.", minWidth: 70 
    },
    {
      emi: "balance",label:"Balance", minWidth: 70 
    }    



  ]

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


      const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

      const [isGridOpen, setIsGridOpen] = useState(false);

      const [loanTransactionDetails, setLoanTransactionDetails] = useState([]);
      const [editMode, setEditMode] = useState(false);

      

      const [formData, setFormData] = useState({
        emi:'',
        Principal: '',
        interest:'',
        Fee:0,
        onlyInterest:0,
        remarks:'',
        adminRemarks:'',
        adminRemarksCheckbox: false,
        date: '',
        id:''
      });

      const [errors, setErrors] = useState({
        errFee: "",
        erronlyInterest: "",
        submit_error: ""
    });

      const [data, setData] = useState([]);
      const [dataLoan, setDataLoan] = useState([]);


    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };


      const handleAddClick = () => {
        // Assuming you have an API endpoint for inserting data
        setIsGridOpen(!isGridOpen);
        setErrors({ ...errors, submit_error: "" })
        
      };

      const handleInputChange = (e) => {
        
       
        if (e && e.target) {
          // Handle changes from regular text fields
          const { name, value, type, checked } = e.target;
          let error = "";
          switch (name) {
  
              case "Fee":
                
                  error = regForNumber.test(value)  ? "" : "Please Enter Fee in number ";
                  setErrors({ ...errors, errFee: error });
                  break;
  
              case "onlyInterest":
                  error =  regForNumber.test(value) ? "" : "Please Enter Interest in number";
                  setErrors({ ...errors, erronlyInterest: error });
                  break;
  
              default:
                  break;
          }
          setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value, // Check if it's a checkbox
          }));
        } else if (e) {
          console.log('Date Picker Event:', e);
          const { name, value, type, checked } = e.target;
          let error = "";
          switch (name) {
  
              case "Fee":
                
                  error = regForNumber.test(value)  ? "" : "Please Enter Fee in number ";
                  setErrors({ ...errors, errFee: error });
                  break;
  
              case "onlyInterest":
                  error =  regForNumber.test(value) ? "" : "Please Enter Interest in number";
                  setErrors({ ...errors, erronlyInterest: error });
                  break;
  
              default:
                  break;
          }
          // Extract and set the date based on the actual structure
          // (e.g., if the date is nested, use e.date or e.value or similar)
          setFormData((prevData) => ({
            ...prevData,
            date: e.target.value, // Adjust this line accordingly
          }));
          setFormData((prevData) => ({
            ...prevData,
            date: e.target.value,
          }));
        }
      };

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate() + 1;
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
    
        // Pad day and month with leading zeros if necessary
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
    
        // Return formatted date string
        return `${formattedDay}-${formattedMonth}-${year}`;
      };

      const handleSubmit = async () => {
        console.log('Checkbox value:', formData.adminRemarksCheckbox);
        console.log('Checkbox value:', formData);
        formData.loan_id = loan_id;
    
        if (Object.keys(errors).length == 0) {
          console.error('Errors found, cannot submit the form');
          setErrors({ ...errors, submit_error: "Please provide fee and interest in numbers" });
          return;
      } else {
          setErrors({ ...errors, submit_error: "" }); // Reset submit_error when there are no errors
      }
    
        // setFormData({
        //   Fee:'',
        //   onlyInterest:'',
        //   remarks:'',
        //   adminRemarks:'',
        //   adminRemarksCheckbox: false,
        // });
    
        await fetch('http://localhost:9000/member/loan/addSingleLoan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(result => {
            console.log('API Response', result.payload[0].result);
            // Clear the form data
            setFormData({
                Fee:'',
                onlyInterest:'',
                remarks:'',
                adminRemarks:'',
                adminRemarksCheckbox: false,
            });
            setErrors({ ...errors, submit_error: "" });
            console.log('Submit error after clearing:', errors.submit_error); // Debugging
        })
        .catch(error => {
            console.error('API Error:', error);
        });
    
        // setLoanTransactionDetails(singleLoanDetails);
    
        await fetch('http://localhost:9000/member/loan/singleLoanDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: loan_id, 
            }),
        })
        .then(response => response.json())
        .then(result => {
            console.log('API Response:=================================', result.payload[0].result);
    
            if( result.payload[0].result.length == 0){
                navigate(`/member/${id}/loan`);
            }
            // Set the data received from the API to the state
            setLoanTransactionDetails(result.payload[0].result);
            setErrors({ ...errors, submit_error: "" })
        })
        .catch(error => {
            console.error('API Error:', error);
        });
    
        setIsGridOpen(!isGridOpen);
    };
    
    
      
      
      

      useEffect(() => {
        // Make the API request when the component mounts
        // setDataLoan(singleLoanDetails);
        fetch('http://localhost:9000/member/loan/singleLoan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: loan_id, 
          }),
        })
          .then(response => response.json())
          .then(result => {
            console.log('API Response sinfle loan detiails', result.payload[0].result);
            // Set the data received from the API to the state
            setDataLoan(result.payload[0].result[0]);
            setErrors({ ...errors, submit_error: "" })
          })
          .catch(error => {
            console.error('API Error:', error);
          });


          // setLoanTransactionDetails(singleLoanDetails);

          fetch('http://localhost:9000/member/loan/singleLoanDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: loan_id, 
            }),
          })
            .then(response => response.json())
            .then(result => {
              console.log('API Response:=================================', result.payload[0].result);
              // Set the data received from the API to the state
              if( result.payload[0].result.length == 0){
                navigate(`/member/${id}/loan`);
              }
              setLoanTransactionDetails(result.payload[0].result);
              setErrors({ ...errors, submit_error: "" })
            })
            .catch(error => {
              console.error('API Error:', error);
            });
            setErrors({ ...errors, submit_error: "" })
      }, [id]);

      const generateActionButtons = (row) => (
        <>
          <IconButton color="error" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => handleEdit(row)}>
            <EditIcon />
          </IconButton>
        </>
      );

      const handleDelete = async(row)=>{
        console.log("--------------------------------------------------- rows",row);
        await fetch('http://localhost:9000/member/loan/deleteTransactionDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id:row.id, loan_id: loan_id}),
        })
        .then(response => response.json())
        .then(result => {
          console.log('API Response', result.payload[0].result);
        })
        .catch(error => {
          console.error('API Error:', error);
        });
      
        await fetch('http://localhost:9000/member/loan/singleLoanDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: loan_id, 
          }),
        })
        .then(response => response.json())
        .then(result => {
          console.log('API Response:=================================', result.payload[0].result);
          // Set the data received from the API to the state
          if( result.payload[0].result.length == 0){
            navigate(`/member/${id}/pages`);
          }
          setLoanTransactionDetails(result.payload[0].result);
          setErrors({ ...errors, submit_error: "" })
        })
        .catch(error => {
          console.error('API Error:', error);
        });
        // setLoanTransactionDetails(singleLoanDetails);
      }

      const handleEdit = async(row)=>{
        console.log(row);

        setFormData({
          id :row.id,
          emi: row.emi,
          Principal: row.principal,
          interest: row.interest,
          Fee: row.fee_fine,
          onlyInterest: row.only_interest,
          remarks: row.remarks,
          adminRemarks: row.admin_remarks,
          adminRemarksCheckbox: false,
        });

        setFormData((prevData) => ({
          ...prevData,
          date: row.date, // Set the date from the row object
        }));
        formData.loan_id = loan_id
        setErrors({ ...errors, submit_error: "" });
        setIsGridOpen(true);
        setEditMode(true);


      }

      const handleEditshare = async()=>{

        formData.loan_id = loan_id
        await fetch('http://localhost:9000/member/loan/editSingleLoan', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(result => {
            console.log('API Response', result.payload[0].result);
            // Set the data received from the API to the state
            setData(result.payload[0].result[0]);
            setErrors({ ...errors, submit_error: "" })
          })
          .catch(error => {
            console.error('API Error:', error);
          });

          await fetch('http://localhost:9000/member/loan/singleLoanDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: loan_id, 
            }),
          })
            .then(response => response.json())
            .then(result => {
              console.log('API Response:=================================', result.payload[0].result);
              // Set the data received from the API to the state
              if( result.payload[0].result.length == 0){
                navigate(`/member/${id}/loan`);
              }
              setLoanTransactionDetails(result.payload[0].result);
              setFormData({
                Fee:'',
                onlyInterest:'',
                remarks:'',
                adminRemarks:'',
                adminRemarksCheckbox: false,
              });
              setErrors({ ...errors, submit_error: "" });
            })
            .catch(error => {
              console.error('API Error:', error);
            });

            // setLoanTransactionDetails(singleLoanDetails);
            // setFormData({
            //   Fee:'',
            //   onlyInterest:'',
            //   remarks:'',
            //   adminRemarks:'',
            //   adminRemarksCheckbox: false,
            // });

            setIsGridOpen(false);
            setEditMode(false);
            setErrors({ ...errors, submit_error: "" })
      }

      const navigateToLoanPage = () => {
        navigate(`/member/${id}/pages`);
      };

      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' :350 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
            {Object.entries(ProfileData).map(([key, value], index) => (
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

               <Paper sx={{ width: "100%", padding: "1%" }}>  


        {UserToken.isAdmin ? <Button variant='contained' sx={{ my: 2 }} onClick={handleAddClick}>Add</Button>:""}

        <Button variant='contained' sx={{ my: 2,ml:3 }} onClick={navigateToLoanPage} color="secondary" >Back</Button>
        {errors.submit_error.length !== 0 && (
                        <Alert severity="error">{errors.submit_error}</Alert>
                    )}
        {data && Object.keys(data).length > 0 && (
        <TableContainer component={Paper} sx={{ my: 3,width:"91%" ,marginLeft:"60px"}}  >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>Monthly EMI</TableCell>
            <TableCell>Processing Fee</TableCell>
            <TableCell>Total Repayment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Button variant="outlined" color="success"> {data.total_loan}</Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="success"> {data.interest}</Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="success">{data.period} {data.unit}</Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="success"> {data.monthly_emi}</Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="success">{data.processing_fee}</Button>
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="success"> {data.total_repayment}</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

)}

{isGridOpen &&  (
           <>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row' ,ml:4 }}>
            <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 1 ,ml:4}}>
            <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className={styles.inputData}
          style={styles.input}
          />
    <i class="calendar-icon fas fa-calendar-alt"></i>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 2 }}>
              <TextField
                type="number"
                name="Fee"
                value={formData.Fee}
                helperText={errors.errFee}
                onChange={handleInputChange}
                label="Fee"
                placeholder="Fee"
                sx={{ marginLeft: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 2 }}>
              <TextField
                type="number"
                name="onlyInterest"
                helperText={errors.erronlyInterest}
                value={formData.onlyInterest}
                onChange={handleInputChange}
                label="Only Interest"
                placeholder="Only Interest"
                sx={{ marginLeft: '8px' }}
              />
            </Grid>
            <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 2 }}>
              <TextField
                type="text"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                label="Remarks"
                placeholder="Remarks"
                sx={{ marginLeft: '8px' }}
              />
            </Grid>
            {UserToken.isAdmin ?
            <Grid item xs={12} sm={3} sx={{ maxWidth: "16% !important", my: 2 }}>
              <TextField
                type="text"
                name="adminRemarks"
                value={formData.adminRemarks}
                onChange={handleInputChange}
                label="Admin Remakrs"
                placeholder="Admin Remakrs"
                sx={{ marginLeft: '8px' }}
              />
            </Grid>
            :""}

          </Grid>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center',ml:4 }}>

      <Grid item xs={12} sm={3} sx={{ maxWidth: '16% !important', my: 2 }}>
      <Button
        sx={{
          ml: 4,
        }}
        variant="outlined"
        color="success"
        onClick={editMode ? handleEditshare : handleSubmit}
      >
        {editMode ? 'Edit' : 'Submit'}
      </Button>
    </Grid>
    {!editMode && (
      <Grid item xs={12} sm={3} sx={{ maxWidth: '16% !important', my: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              name="adminRemarksCheckbox"
              checked={formData.adminRemarksCheckbox}
              onChange={handleInputChange}
              disabled={formData.onlyInterest !== ''} 
            />
          }
          label="Please select checkBox if you want to auto Populate Data"
          sx={{ marginLeft: '8px', flexGrow: 1 }}
        />
      </Grid>
    )}
    </Grid>
         </>
        )}

<div style={{ display: 'flex' }}>
  <table class="table table-bordered"  style={{ height: '300px' }}>
  <thead>
      <tr>

          <th colSpan={11} >Customer Loan Details - Loan Type {loan_type} </th>
      </tr>
    </thead>
    <thead>
      <tr>
        {columns.map((ele) => (
          <th key={ele.label} style={{ height: '72px',width: '75px' }} >{ele.label} </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {loanTransactionDetails.map((ele) => (
        <tr
          scope="row"
          key={ele.memberId}
          style={{ cursor: 'pointer' }}
        >
          <td style={{ width: '11%' }}>{formatDate(ele.date)}</td>
          <td style={{ width: '4%' }}>{ele.period}</td>
          <td style={{ width: '8%' }}>{ele.emi}</td>
          <td style={{ width: '8%' }}>{ele.principal}</td>
          <td style={{ width: '6%' }}>{ele.interest}</td>
          <td style={{ width: '5%' }}>{ele.balance}</td>
          <td style={{ width: '4%' }}>{ele.fee_fine}</td>
          <td style={{ width: '4%' }}>{ele.only_interest}</td>

          <td style={{ width: '100px' }}>{ele.remarks}</td>
          {UserToken.isAdmin ?
            <>
          <td style={{ width: '100px' }}>{ele.admin_remarks}</td>
          <td style={{ width: '90px' }}>{generateActionButtons(ele)}</td>
          </> :""}
        </tr>
      ))}
    </tbody>
  </table>

  <table class="table table-bordered"  style={{ width: '47%', maxHeight: "2% !important" }}>
  <thead>
      <tr>

          <th colSpan={8} >Reference For Loan </th>
      </tr>
    </thead>
    <thead>
      <tr>
        {columnsDefault.map((ele) => (
          <th key={ele.label} style={{ height: '72px '}}>{ele.label} </th>
        ))}
      </tr>
    </thead>
    <tbody  style={{ maxHeight: "2% !important"}}>
      {console.log(dataLoan.emi_details,"type of", typeof dataLoan.emi_details)}
      {dataLoan && dataLoan.emi_details && Array.isArray(dataLoan.emi_details) && dataLoan.emi_details.map((ele) => (
  <tr
    scope="row"
    key={ele.memberId}
    style={{ cursor: 'pointer' }}
  >
    <td style={{ width: '2%' }}>{ele.month}</td>
    <td style={{ width: '3%' }}>{ele.emi}</td>
    <td style={{ width: '2%' }}>{ele.principal}</td>
    <td style={{ width: '2%' }}>{ele.interest}</td>
    <td style={{ width: '2%' }}>{ele.balance}</td>
  </tr>
))}
    </tbody>
  </table>
</div>


      </Paper> 
        </>
    )
} 



