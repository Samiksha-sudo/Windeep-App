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

    const [viewRequests, setViewRequests] = useState([]);

  useEffect(() => {
    // setViewRequests(memberDetails);
    fetch('http://localhost:9000/member/requestLoan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:id      })
      })
        .then(response => response.json())
        .then(result => {
          console.log('API Response: ', result.payload[0].result);
          setViewRequests(result.payload[0].result);
        })
        .catch(error => {
          console.error('API Error:', error);
        });
  }, []);



    return (
        <>
            {console.log("viewRequests",viewRequests)}
            {viewRequests.map((ele, index) => (
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
                   ))}
              <br />
        </>
    )
} 



