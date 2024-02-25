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
  const [totalAccountData, setTotalAccountData] = useState([]);
  const [formData, setFormData] = useState({
    search: "",
    accountbalance:0,
    isEditing:false,
    totalEmi:0,
    totalShares:0,
    projectedAmount:0,
    totalLoan:0
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
    { id: "amt_disbursed", label: "Amount Disbursed", minWidth: 100 },
    { id: "tenure", label: "Tenure", minWidth: 100 },
    { id: "emi", label: "EMI", minWidth: 100 },
    { id: "total_interest", label: "Total Interest", minWidth: 100 },
    { id: "amount_recivable", label: "Amount Recievable", minWidth: 100 },
    { id: "amount_recivied", label: "Amount Recieved", minWidth: 100 },
  ]; 

  const rows = [
    {
      image: image1,
      name: "Ganesh khenat",
      member_id : "MEMB00009WD",
      loan_dist_date: "12-12-2021",
      loan_close_date: "10-12-2023",
      loan_amount: " 1,00,000.00",
      processing_fee: " 1,500.00",
      amt_disbursed: "2,95,500.00",
      tenure: 24,
      emi: "4,387.14",
      total_interest: "5272.00",
      amount_recivable: "1,000",
      amount_recivied: "1,0000",
    },
    {
      image: image1,
      name: "Ganesh khenat",
      member_id : "MEMB00009WD",
      loan_dist_date: "12-12-2021",
      loan_close_date: "10-12-2023",
      loan_amount: " 1,00,000.00",
      processing_fee: " 1,500.00",
      amt_disbursed: "2,95,500.00",
      tenure: 24,
      emi: "4,387.14",
      total_interest: "5272.00",
      amount_recivable: "1,000",
      amount_recivied: "1,0000",
    },
    {
      image: image1,
      name: "Ganesh khenat",
      member_id : "MEMB00009WD",
      loan_dist_date: "12-12-2021",
      loan_close_date: "10-12-2023",
      loan_amount: " 1,00,000.00",
      processing_fee: " 1,500.00",
      amt_disbursed: "2,95,500.00",
      tenure: 24,
      emi: "4,387.14",
      total_interest: "5272.00",
      amount_recivable: "1,000",
      amount_recivied: "1,0000",
    },
    {
      image: image1,
      name: "Ganesh khenat",
      member_id : "MEMB00009WD",
      loan_dist_date: "12-12-2021",
      loan_close_date: "10-12-2023",
      loan_amount: " 1,00,000.00",
      processing_fee: " 1,500.00",
      amt_disbursed: "2,95,500.00",
      tenure: 24,
      emi: "4,387.14",
      total_interest: "5272.00",
      amount_recivable: "1,000",
      amount_recivied: "1,0000",
    },
    {
      image: image1,
      name: "Ganesh khenat",
      member_id : "MEMB00009WD",
      loan_dist_date: "12-12-2021",
      loan_close_date: "10-12-2023",
      loan_amount: " 1,00,000.00",
      processing_fee: " 1,500.00",
      amt_disbursed: "2,95,500.00",
      tenure: 24,
      emi: "4,387.14",
      total_interest: "5272.00",
      amount_recivable: "1,000",
      amount_recivied: "1,0000",
    },
    {
      image: image1,
      name: "Ganesh khenat",
      member_id : "MEMB00009WD",
      loan_dist_date: "12-12-2021",
      loan_close_date: "10-12-2023",
      loan_amount: " 1,00,000.00",
      processing_fee: " 1,500.00",
      amt_disbursed: "2,95,500.00",
      tenure: 24,
      emi: "4,387.14",
      total_interest: "5272.00",
      amount_recivable: "1,000",
      amount_recivied: "1,0000",
    },
  ];
  const handleClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      isEditing: true,
    }));
    
  };
  
  const handleInputChange = (e) => {
    // Handle changes from regular text fields
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
  
  const handleBlur = () => {
    
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
            name="totalLoan"
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
                <TableCell align="center" colSpan={2} onClick={handleClick}>
                    {formData.isEditing ? (
                      <input
                        className='mt-2 accountBalance'
                        type="text"
                        name="accountbalance"
                        value={formData.accountbalance}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder='AccountBalance'
                      />
                    ) : (
                      formData.accountbalance
                    )}
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    100000 Rs
                  </TableCell>

                  <TableCell align="center" colSpan={3}>
                    1000 Rs
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    1000000 Rs
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    96
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
                <td>{ele.amt_disbursed}</td>
                <td>{ele.period} {ele.unit} </td>
                <td>{ele.emi}</td>
                <td>{ele.interest}</td>
                <td>{ele.amount_recivable}</td>
                <td>{ele.amount_recivied}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>

      {data.length ?         <TablePagination
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
