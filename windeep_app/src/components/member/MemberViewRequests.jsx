import React, { useEffect, useState } from 'react'
import styles from "./BasicInfo.module.css";
import { TablePagination,Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
// import {memberDetails} from "../../utils/database/data"
import { useSelector } from 'react-redux';

import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import EditIcon from "@mui/icons-material/Edit";
export default function MemberViewRequests() {
  const { id } = useParams();
  console.log(id);

  const mystyles = {
    '& .MuiFormHelperText-root': {
        color: "red",
    }
}

const [viewRequests, setViewRequests] = useState({Pending:[],Reject:[],Complete:[]});
const UserToken = useSelector((state) => state.loggedInUserReducer);
console.log("userToken0",UserToken)

const [page, setPage] = useState({Pending:0,Reject:0,Complete:0});
const [rowsPerPage, setRowsPerPage] = useState({Pending:10,Reject:10,Complete:10});

useEffect(() => {
    // Clear existing data
    setViewRequests({ Pending: [], Reject: [], Complete: [] });
  
    fetch('http://localhost:9000/member/requestLoan/viewRequests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log('API Response: ', result.payload[0].result);
        const categorizedData = result.payload[0].result.reduce((acc, curr) => {
          if (curr.status === "Reject") {
            acc.Reject.push(curr);
          } else if (curr.status === "Complete") {
            acc.Complete.push(curr);
          } else if (curr.status === "Pending") {
            acc.Pending.push(curr);
          }
          return acc;
        }, { Pending: [], Reject: [], Complete: [] });
  
        setViewRequests(categorizedData);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  
  }, [id, page, rowsPerPage]);
  

const columns = [
  { id: "amount", label: "Amount: ₹", minWidth: 170 },
  {
    id: "Period",
    label: "Period",
    minWidth: 100,
  },
  { id: "Unit", label: "Unit", minWidth: 100 },
  { id: "EMI", label: "EMI", minWidth: 100 },
  { id: "ProcessingFee", label: "Processing Fee", minWidth: 100 },
  { id: "Reason", label: "Reason", minWidth: 100 },
  { id: "RaisedBy", label: "Raised By", minWidth: 100 },
];

const columnsAccepted = [
  { id: "amount", label: "Amount: ₹", minWidth: 170 },
  {
    id: "Period",
    label: "Period",
    minWidth: 100,
  },
  { id: "Unit", label: "Unit", minWidth: 100 },
  { id: "EMI", label: "EMI", minWidth: 100 },
  { id: "ProcessingFee", label: "Processing Fee", minWidth: 100 },
  { id: "Reason", label: "Reason", minWidth: 100 },
  { id: "RaisedBy", label: "Raised By", minWidth: 100 },
  { id: "ApprovedBy", label: "Approved By", minWidth: 100 }
];

const columnsRejected = [
  { id: "amount", label: "Amount: ₹", minWidth: 170 },
  {
    id: "Period",
    label: "Period",
    minWidth: 100,
  },
  { id: "Unit", label: "Unit", minWidth: 100 },
  { id: "EMI", label: "EMI", minWidth: 100 },
  { id: "ProcessingFee", label: "Processing Fee", minWidth: 100 },
  { id: "Reason", label: "Reason", minWidth: 100 },
  { id: "RaisedBy", label: "Raised By", minWidth: 100 },
  { id: "RejectedBy", label: "Rejected By", minWidth: 100 }
];

const handleChangePage = (event, newPage, key) => {
  setPage({...page,[key]:newPage});
};

const handleChangeRowsPerPage = (event,key) => {
  setRowsPerPage({...rowsPerPage,[key]:parseInt(event.target.value, 10)});
  setPage({...page,[key]:0});
};





    return (
        <>
        <Paper sx={{ width: "100%", padding: "1%" }}>

          <Button variant='contained' sx={{ margin: "2%"}}>Pending Requests</Button>
            {console.log("viewRequests",viewRequests)}
            <Paper sx={{ width: "80%", padding: "1%", margin: "auto" }}>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    {columns.map((ele) => (
                      <th key={ele.label}>{ele.label} </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {viewRequests.Pending.length > 0 ? (
                    viewRequests.Pending.map((fle) => (
                      <tr key={fle.amount} style={{ cursor: "pointer" }}>
                        <td>{fle.amount}</td>
                        <td>{fle.period}</td>
                        <td>{fle.unit}</td>
                        <td>{fle.emi}</td>
                        <td>{fle.processing_fee}</td>
                        <td>{fle.admin_reason}</td>
                        <td>{fle.member_name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
          </Paper>


          {viewRequests.Pending.length > 0 &&         
    <TablePagination
        component="div"
        count={viewRequests.Pending.length}
        page={page.Pending}
        onPageChange={(e,v)=>handleChangePage(e,v,"Pending")}
        rowsPerPage={rowsPerPage.Pending}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        onRowsPerPageChange={(e,v)=>handleChangeRowsPerPage(e,v,"Pending")}
    />
}

          <br/>
          <Button variant='contained' sx={{ margin: "2%"}} color="success">Accepted Requests</Button>
            {console.log("viewRequests",viewRequests)}
            <Paper sx={{ width: "80%", padding: "1%", margin: "auto" }}>
  <table class="table table-bordered">
    <thead>
      <tr>
        {columnsAccepted.map((ele) => (
          <th key={ele.label}>{ele.label} </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {viewRequests.Complete.length ? (
        viewRequests.Complete.map((fle) => (
          <tr key={fle.amount} style={{ cursor: "pointer" }}>
            <td>{fle.amount}</td>
            <td>{fle.period}</td>
            <td>{fle.unit}</td>
            <td>{fle.emi}</td>
            <td>{fle.processing_fee}</td>
            <td>{fle.admin_reason}</td>
            <td>{fle.member_name}</td>
            <td>{fle.admin_name}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length}>No data available</td>
        </tr>
      )}
    </tbody>
  </table>
</Paper>


            {viewRequests.Complete.length &&         
              <TablePagination
                component="div"
                count={viewRequests.Complete.length}
                page={page.Complete}
                onPageChange={(e,v)=>handleChangePage(e,v,"Complete")}
                rowsPerPage={rowsPerPage.Complete}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                onRowsPerPageChange={(e,v)=>handleChangeRowsPerPage(e,v,"Complete")}
          />}

          <br/>
          <Button variant='contained' sx={{ margin: "2%"}} color="error">Rejected Requests</Button>
            {console.log("viewRequests",viewRequests)}
            <Paper sx={{ width: "80%", padding: "1%", margin: "auto" }}>
  <table class="table table-bordered">
    <thead>
      <tr>
        {columnsRejected.map((ele) => (
          <th key={ele.label}>{ele.label} </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {viewRequests.Reject.length ? (
        viewRequests.Reject.map((fle) => (
          <tr key={fle.amount} style={{ cursor: "pointer" }}>
            <td>{fle.amount}</td>
            <td>{fle.period}</td>
            <td>{fle.unit}</td>
            <td>{fle.emi}</td>
            <td>{fle.processing_fee}</td>
            <td>{fle.admin_reason}</td>
            <td>{fle.member_name}</td>
            <td>{fle.admin_name}</td>
            
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length}>No data available</td>
        </tr>
      )}
    </tbody>
  </table>
</Paper>


            {viewRequests.Reject.length &&         
              <TablePagination
                component="div"
                count={viewRequests.Reject.length}
                page={page.Reject}
                onPageChange={(e,v)=>handleChangePage(e,v,"Reject")}
                rowsPerPage={rowsPerPage.Reject}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                onRowsPerPageChange={(e,v)=>handleChangeRowsPerPage(e,v,"Reject")}
          />}
         </Paper>
         </>  
    )
} 



