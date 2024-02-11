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

export default function Member({CURRENT_USER,USER_TYPES}) {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    // Make the API request when the component mounts
    
    // setData(adminLoginHome)
    fetch('http://localhost:9000/admin/login/home', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('API Response:', result.payload[0].result);
        // Set the data received from the API to the state
        setData(result.payload[0].result);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }, [])

  console.log("CURRENT_USER",CURRENT_USER)

  const handleRowClick = (id) => {
    navigate(`${id}/pages`);
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


  return (
    <>
      <Paper sx={{ width: "100%", padding: "1%" }}>
        <div className="cdb-form" style={{ width: "100%" }}>
          <input
            type="text"
            className="form-control search_member"
            id="cdb-autocomplete"
            placeholder="Search"
            name="q"
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
                    100000 Rs
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
                    src={`${ele.image}`}
                    className="profile_img"
                    alt="user image"
                  />
                </td>
                <td>{ele.name}</td>
                <td>{ele.member_id}</td>
                <td>{ele.loan_dist_date}</td>
                <td>{ele.loan_close_date}</td>
                <td>{ele.loan_amount}</td>
                <td>{ele.processing_fee}</td>
                <td>{ele.amt_disbursed}</td>
                <td>{ele.tenure}</td>
                <td>{ele.emi}</td>
                <td>{ele.total_interest}</td>
                <td>{ele.amount_recivable}</td>
                <td>{ele.amount_recivied}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>

    </>
  );
}
