import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbaar from "../Navbaar/Navbaar";
import image1 from "../../assets/images/photoImage.jpg";
import { useNavigate } from "react-router-dom";

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
} from "@mui/material";

// import {adminLoginHome} from "../../utils/database/data"

export default function Member() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);


  const [totalLoanData, setTotalLoanData] = useState([]);
  const [formData, setFormData] = useState({
    search: "",
    projectedAmount: 0,
    isEditing:false,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);



  useEffect(() => {
    const limit = rowsPerPage;
    const offset = page * rowsPerPage;
  
    // Reset data before fetching new data
    setData([]);
  
    fetch('http://localhost:9000/member/listMembers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: formData.search,
        limit: limit,
        offset: offset
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log('API Response:', result.payload[0].members);
      setData(result.payload[0].members);
      setTotalCount(result.payload[0].count);
    })
    .catch(error => {
      console.error('API Error:', error);
    });

    fetch('http://localhost:9000/member/listAndCalculateAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectedAmount: formData.projectedAmount
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log('API Response:', result.payload[0].resultdata);
      setTotalLoanData(result.payload[0].resultdata);
    })
    .catch(error => {
      console.error('API Error:', error);
    });


  }, [page, rowsPerPage, formData.search]);
  



  const handleRowClick = (id) => {
    navigate(`${id}/pages`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: "Photo", label: "Photo", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "member_id  ", label: "Member Id", minWidth: 100 },
    { id: "loan_dist_date", label: "Loan Distribution Date", minWidth: 100 },
    { id: "loan_close_date", label: "Loan Close Date", minWidth: 100 },
    { id: "loan_amount", label: "Loan Amount", minWidth: 100 },
    { id: "processing_fee", label: "Processing Fee", minWidth: 100 },
    { id: "tenure", label: "Tenure", minWidth: 100 },
    { id: "emi", label: "EMI", minWidth: 100 },
    { id: "total_interest", label: "Total Interest", minWidth: 100 },
    { id: "amount_recivable", label: "Amount Recievable", minWidth: 100 },
    { id: "amount_recivied", label: "Amount Recieved", minWidth: 100 },
  ]; 

  const handleClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      isEditing: true,
    }));
    
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  const handleBlur = async() => {
    await fetch('http://localhost:9000/member/listAndCalculateAccount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectedAmount: formData.projectedAmount
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log('API Response:', result);
    // Update state with the new projected amount if necessary
    // Ensure that result.payload[0].resultdata contains the updated value
    setTotalLoanData(result.payload[0].resultdata);
  })
  .catch(error => {
    console.error('API Error:', error);
  });
    setFormData((prevData) => ({
      ...prevData,
      isEditing: false,
    }));
  };


  return (
    <>
      <Paper sx={{ width: "100%", padding: "1%" }}>
        <div className="cdb-form" style={{ width: "100%" }}>
          <input
            type="text"
            className="form-control search_member"
            id="cdb-autocomplete"
            placeholder="Search"
            name="search"
            value={formData.search}
            onChange={handleInputChange}
          />
        </div>

        <div className="main_table">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Account Balance
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Total EMI
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Total Shares
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Projected Amount
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Total Loan
                  </TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="center" colSpan={2}>
                      {totalLoanData.projectedAmount}  ₹
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    {totalLoanData.totalEmi}  ₹
                  </TableCell>

                  <TableCell align="center" colSpan={3}>
                  {totalLoanData.totalShares}  ₹
                  </TableCell>
                  <TableCell align="center" colSpan={3}  onClick={handleClick}>
                  {formData.isEditing ? (
                  <input
                    className='mt-2 accountBalance'
                    type="text"
                    name="projectedAmount"
                    value={formData.projectedAmount}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder='projectedAmount'
                  />
                ) : (
                  totalLoanData.projectedAmount 
                )} &nbsp; ₹
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                  {totalLoanData.totalLoan}
                  </TableCell>
                </TableRow>
                <TableRow></TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
        <br />
        <table class="table table-bordered">
          <thead>
            <tr>
              {columns.map((ele) => (
                <th key={ele.label}>{ele.label} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((ele) => (
              <tr
                scope="row"
                key={ele.member_id  }
                onClick={() => handleRowClick(ele.member_id )}
                style={{cursor:"pointer"}}
              >
                <td>
                  <img
                    src={`${image1}`}
                    className="profile_img"
                    alt="user image"
                  />
                </td>
                <td>{ele.name}</td>
                <td>{ele.member_id}</td>
                <td>{ele.start_date}</td>
                <td>{ele.end_date}</td>
                <td>{ele.total_loan}</td>
                <td>{ele.processing_fee}</td>
                <td>{ele.period} {ele.unit} </td>
                <td>{ele.emi}</td>
                <td>{ele.interest}</td>
                <td>{ele.total_repayment}</td>
                <td>{ele.amount_received}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>

      {data.length ?        
       <TablePagination
      component="div"
      count={totalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10, 20, 30, 40, 50]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />:""}

    </>
  );
}
