import React, { useEffect, useState } from 'react'
import styles from "./BasicInfo.module.css";
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
// import {memberDetails} from "../../utils/database/data"
export default function ViewRequests() {
  const { id } = useParams();
  console.log(id);

  const mystyles = {
    '& .MuiFormHelperText-root': {
        color: "red",
    }
}

const [viewRequests, setViewRequests] = useState({Pending:[],Reject:[],Complete:[]});

const [page, setPage] = useState({Pending:0,Reject:0,Complete:0});
const [rowsPerPage, setRowsPerPage] = useState({Pending:10,Reject:10,Complete:10});

useEffect(() => {
  // setViewRequests(memberDetails);
  // fetch('http://localhost:9000/member/requestLoan', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id:id      
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       console.log('API Response: ', result.payload[0].result);
  //       setViewRequests(result.payload[0].result);
  //     })
  //     .catch(error => {
  //       console.error('API Error:', error);
  //     });
  const result = [
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": null,
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": null,
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Pradeep Khengare",
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Samiksha Kad",
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": null,
        "amount": "100000",
        "period": 2,
        "unit": "years",
        "emi": "",
        "processing_fee": "1.5"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Pradeep Khengare",
        "amount": "100000",
        "period": 2,
        "unit": "years",
        "emi": "",
        "processing_fee": "1.5"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Samiksha Kad",
        "amount": "100000",
        "period": 2,
        "unit": "years",
        "emi": "",
        "processing_fee": "1.5"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": null,
        "amount": "100000",
        "period": 2,
        "unit": "years",
        "emi": "4387",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Pradeep Khengare",
        "amount": "100000",
        "period": 2,
        "unit": "years",
        "emi": "4387",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Samiksha Kad",
        "amount": "100000",
        "period": 2,
        "unit": "years",
        "emi": "4387",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": null,
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Pradeep Khengare",
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Samiksha Kad",
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": null,
        "amount": "100000",
        "period": 5,
        "unit": "months",
        "emi": "20251",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Pradeep Khengare",
        "amount": "100000",
        "period": 5,
        "unit": "months",
        "emi": "20251",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Samiksha Kad",
        "amount": "100000",
        "period": 5,
        "unit": "months",
        "emi": "20251",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": null,
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Pradeep Khengare",
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    },
    {
        "status": "Pending",
        "admin_reason": null,
        "admin_name": "Samiksha Kad",
        "amount": "100000",
        "period": 2,
        "unit": "months",
        "emi": "50313",
        "processing_fee": "1500"
    }
].reduce((acc,curr)=>{
    if(curr.status=="Reject"){
        acc.Reject.push(curr)
    }
    if(curr.status=="Complete"){
        acc.Complete.push(curr)
    }
     if(curr.status=="Pending"){
        acc.Pending.push(curr)
    }
    return acc
},{Pending:[],Reject:[],Complete:[]})
  setViewRequests(result)
}, []);

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
  { id: "AdminRequests", label: "Admin Requests", minWidth: 100 },
  { id: "Reason", label: "Reason", minWidth: 100 },
  { id: "ApprovedBy", label: "Approved By", minWidth: 100 },
  { id: "RaisedBy", label: "Raised By", minWidth: 100 },
];

const handleChangePage = (event, newPage, key) => {
  setPage({...page,[key]:newPage});
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage({...rowsPerPage,[key]:parseInt(event.target.value, 10)});
  setPage({...page,[key]:0});
};

    return (
        <>
            {console.log("viewRequests",viewRequests)}
            <table class="table table-bordered">
              <thead>
                <tr>
                  {columns.map((ele) => (
                    <th key={ele.label}>{ele.label} </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {viewRequests.Pending.length ? (
                  viewRequests.Pending.map((fle) => (
                    <>
                      <tr key={fle.amount} style={{ cursor: "pointer" }}>
                        <td>{fle.period}</td>
                        <td>{fle.unit}</td>
                        <td>{fle.emi}</td>
                        <td>{fle.processing_fee}</td>
                        <td>{fle.status}</td>
                        <td>{fle.admin_reason}</td>
                        <td>{fle.admin_name}</td>
                        <td>{fle.admin_name}</td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
            {viewRequests.Pending.length &&         
              <TablePagination
                component="div"
                count={viewRequests.Pending.length}
                page={page}
                onPageChange={(e,v)=>handleChangePage(e,v,"Pending")}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                onRowsPerPageChange={(e,v)=>handleChangeRowsPerPage(e,v,"Pending")}
          />}
            {/* {viewRequests.map((ele, index) => (
              <div className={styles.viewRequests}>
                <Grid container spacing={1}>
                  
                    <Grid item key={index} style={{marginRight: '10px' }}>
                      <strong>Amount: ₹</strong> {ele.amount} {' '}<br/>
                      <strong>Period: </strong> {ele.period} {' '}<br/>
                      <strong>Unit: </strong> {ele.unit} {' '}<br/>
                      <strong>EMI: ₹</strong> {ele.emi} {' '}<br/>
                      <strong>Processing Fee: ₹</strong> {ele.processing_fee} {' '}<br/>
                      <strong>Admin Requests:</strong> {ele.status} {' '}<br/>
                      <strong>Reason:</strong> {ele.admin_reason} {' '}<br/>
                      <strong>Approved By:</strong> {ele.admin_name}<br/>
                      <Button aria-describedby={id} type="button" >
                            Raised By : {ele.admin_name}
                        </Button>
                    </Grid>
             
                </Grid>
              </div>
                   ))} */}
        </>
    )
} 



