import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Paper,
  TablePagination  ,
  TextField,
  Grid,
  Alert
} from "@mui/material";
import { useParams } from "react-router-dom";
import image1 from "../../assets/images/photoImage.jpg";
import styles from "./BasicInfo.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from 'react-redux';

export default function SingleMembershares() {
  const { id } = useParams();
  const UserToken = useSelector((state) => state.loggedInUserReducer);

  let columns = [];

  if(UserToken.isAdmin ){

  columns = [
    { id: "date", label: "Date", minWidth: 170 },
    {
      id: "monthly_contribution",
      label: "Monthly Contribution",
      minWidth: 100,
    },
    { id: "total_contribution", label: "Total Contribution", minWidth: 100 },
    { id: "bonus", label: "Bonus", minWidth: 100 },
    { id: "remarks", label: "Remarks", minWidth: 100 },
    { id: "updatedBy", label: "Updated By", minWidth: 100 },
    { id: "adminRemarks", label: "Admin Remarks", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ]
}else{
  columns = [
    { id: "date", label: "Date", minWidth: 170 },
    {
      id: "monthly_contribution",
      label: "Monthly Contribution",
      minWidth: 100,
    },
    { id: "total_contribution", label: "Total Contribution", minWidth: 100 },
    { id: "bonus", label: "Bonus", minWidth: 100 },
    { id: "remarks", label: "Remarks", minWidth: 100 }
  ]
}

  const [data, setData] = useState([]);
  const mystyles = {
    helperText: {
      color: "red", // Apply red color to the helper text
    },
  };

  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showEditButton, setShowEditButton] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [formData, setFormData] = useState({
    id: "",
    date: "", // Initialize date with current date
    member_id: "",
    share_id: "",
    monthly_contribution: "",
    total_contribution: "",
    bonus: "",
    remarks: "",
    admin_remarks: "",
  });
  const [errors, setErrors] = useState({
    errdate: "",
    errmonthlyContribution: "",
    errtotalContribution:"",
    errBonus:"",
    submit_error: ""
});

  const [totalShares, setTotalShares] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false); // New state variable

  useEffect(() => {
    const limit = rowsPerPage;
    const offset = page * rowsPerPage;
  
    fetch("http://localhost:9000/member/shares", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        limit: limit,
        offset: offset
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setData(result.payload[0].result);
        setTotalCount(result.payload[0].count)
        setErrors({ ...errors, submit_error: "" })
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id, page, rowsPerPage]);
  

  const handleEdit = (row) => {
    console.log("row in edit",row)
    setFormData({
      id: row.id,
      date: row.start_date,
      member_id: row.member_id,
      monthly_contribution: row.monthly_contribution,
      total_contribution: row.total_contribution,
      bonus: row.bonus,
      remarks: row.remarks,
      admin_remarks: row.admin_remarks,
    });

    // Open the form for editing
    setIsGridOpen(true);
    setShowSubmitButton(false);
    setShowEditButton(true);
  };

  const handleEditShares = async () => {

    formData.member_id = data[0].member_id;
    formData.update_by = UserToken.name;

    const limit = rowsPerPage;
    const offset = page * rowsPerPage;

    await fetch("http://localhost:9000/member/shares/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {

        // Optionally, you can reset the form fields after successful insertion
        setFormData({
          id: "",
          date: "",
          member_id: "",
          share_id: "",
          monthly_contribution: "",
          total_contribution: "",
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });

      

    await fetch("http://localhost:9000/member/shares", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        limit: limit,
        offset: offset
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setData(result.payload[0].result);
        setTotalCount(result.payload[0].count);
        setErrors({ ...errors, submit_error: "" })
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    setIsGridOpen(false);
    await fetch("http://localhost:9000/member/shares/totalMonthlyContribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setTotalShares(result.payload[0].result[0].sumMonthlyContribution);
        setErrors({ ...errors, submit_error: "" });
        if (result.payload[0].result[0].sumMonthlyContribution == null) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);

        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const handleDelete = async (row) => {
    formData.member_id = data[0].member_id;
    formData.update_by = UserToken.name;
  
    const limit = rowsPerPage;
    const offset = page * rowsPerPage;
  
    await fetch("http://localhost:9000/member/shares/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: row.id,
        member_id: data[0].member_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally, you can reset the form fields after successful deletion
        setFormData({
          id: "",
          date: "",
          member_id: "",
          share_id: "",
          monthly_contribution: "",
          total_contribution: "",
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });
  
        // Check if all data has been deleted
        if (data.length === 0) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);

        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  
    // Fetch data again to update the table
    await fetch("http://localhost:9000/member/shares", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        limit: limit,
        offset: offset,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setData(result.payload[0].result);
        setTotalCount(result.payload[0].count);
        setErrors({ ...errors, submit_error: "" });
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  
    // Fetch total monthly contribution again
    await fetch("http://localhost:9000/member/shares/totalMonthlyContribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setTotalShares(result.payload[0].result[0].sumMonthlyContribution);
        
        if (result.payload[0].result[0].sumMonthlyContribution == null) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);

        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  
    setIsGridOpen(false);
  };


  const handleAddShares = async () => {
    formData.update_by = UserToken.name;
    formData.created_by = UserToken.name;
    formData.member_id = id;

    const limit = rowsPerPage;
    const offset = page * rowsPerPage;

    console.log("error",errors)

    if((formData.monthly_contribution != "" && formData.total_contribution != "" && errors.errmonthlyContribution == "") || formData.bonus){
      await fetch("http://localhost:9000/member/shares/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
  
          // Optionally, you can reset the form fields after successful insertion
          setFormData({
            id: "",
            date: "",
            member_id: "",
            share_id: "",
            monthly_contribution: "",
            total_contribution: "",
            bonus: "",
            remarks: "",
            admin_remarks: "",
          });
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
        });
        setIsGridOpen(false);
        setErrors({ ...errors, submit_error: "" })
      } else{
        setIsGridOpen(true);
        setErrors({ ...errors, submit_error: "Enter Monthly Contribution and Total Contribution Or Bonus" });
    }
  
      await fetch("http://localhost:9000/member/shares", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          limit: limit,
          offset: offset
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          // Set the data received from the API to the state
          setData(result.payload[0].result);
          setTotalCount(result.payload[0].count);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    


    // Send the form data to the server


    ;
    await fetch("http://localhost:9000/member/shares/totalMonthlyContribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setTotalShares(result.payload[0].result[0].sumMonthlyContribution);
        
        if (result.payload[0].result[0].sumMonthlyContribution == null) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };


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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "monthly_contribution":

        // Check if the value is a valid number
        error = value.length > 0 && !isNaN(Number(value)) ? "" : "Please enter a valid monthly contribution";
        setErrors({ ...errors, errmonthlyContribution: error });
        break;

        case "total_contribution":
            error = value.length > 0 && !isNaN(Number(value)) ? "" : "Please Enter valid total Contribution";
            setErrors({ ...errors, errtotalContribution: error });
            break;

        case "bonus":
            // Check if bonus is not empty and is a valid number
            if (value.trim() !== "" && isNaN(Number(value))) {
                error = "Bonus must be a valid number";
            } else {
                error = "";
            }
            setErrors({ ...errors, errBonus: error });
            break;

        default:
            break;
    }

    if (e && e.target) {
        // Handle changes from regular text fields
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    } else if (e) {
        // Handle changes from date picker
        setFormData((prevData) => ({
            ...prevData,
            date: e.target.value, // Assuming the date picker provides the date object directly
        }));
    }

    
};


  const handleAddClick = async() => {
    setIsGridOpen(!isGridOpen);
    setShowSubmitButton(true);
    setShowEditButton(false);
    
    try {

      
        const response = await fetch("http://localhost:9000/member/shares/totalContribution", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        
        if (!result || !result.payload || !Array.isArray(result.payload) || !result.payload[0].result || !Array.isArray(result.payload[0].result) || result.payload[0].result.length === 0) {
          throw new Error('Invalid response data format');
        }
    
        const { monthly_contribution, totalContribution } = result.payload[0].result[0];
    
        setFormData({
          id: "",
          date: "",
          member_id: "",
          monthly_contribution: monthly_contribution,
          total_contribution: totalContribution,
          bonus: "",
          remarks: "",
          admin_remarks: "",
        });


      }

     catch (error) {
      console.error("API Error:", error);
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/member/shares/totalData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id
          }),
        });
        const result = await response.json();
        console.log("API Response in totalData:", result.payload[0].result);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
  
    if (
      data.length > 0 &&
      data[0]?.member_details &&
      data[0].member_details.length > 0
    ) {
      fetchData();
  
      const firstRecord = data[0].member_details[0];
      console.log("firstRecord", firstRecord);
      setFormData({
        id: data[0].id,
        date: firstRecord.date,
        monthly_contribution: firstRecord.monthly_contribution,
        share_id: firstRecord.share_id,
        total_contribution: totalContributionData(
          data[0].monthly_contribution,
          data[0].member_details
        ),
        bonus: firstRecord.bonus,
        remarks: firstRecord.remarks,
        admin_remarks: firstRecord.admin_remarks,
      });
    }
  
    fetch("http://localhost:9000/member/shares/totalMonthlyContribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data received from the API to the state
        setTotalShares(result.payload[0].result[0].sumMonthlyContribution);
        setErrors({ ...errors, submit_error: "" });
        if (result.payload[0].result[0].sumMonthlyContribution == null) {
          // Reset total shares, page, and rows per page to 0
          setTotalShares(0);

        }
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id]);
  

  const totalContributionData = (monthly_contribution, data) => {
    if (data.length === 0) {
      return monthly_contribution;
    }

    var totalMonthlyContribution = data.reduce(
      (total, entry) => total + parseInt(entry.monthly_contribution || 0, 10),
      0
    );

    // Update the second entry's monthly contribution
    totalMonthlyContribution = parseInt(totalMonthlyContribution);
    monthly_contribution = parseInt(monthly_contribution);

    return (totalMonthlyContribution + monthly_contribution).toString();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  return (
    <>
      <Paper sx={{ width: "100%", padding: "1%" }}>
        {UserToken.isAdmin  ? (
          <Button variant="contained" sx={{ my: 2 }} onClick={handleAddClick}>
            Add
          </Button>
        ) : (
          ""
        )}
        <Button variant="outlined" sx={{ m: 2 }}>
          Total Shares{" "}
        </Button>{" "}
        :
        <Button variant="contained" sx={{ m: 2 }} >
          {" "}
          {totalShares}{" "}
        </Button>
        <br />
      
      <br/>
        {errors.submit_error.length !== 0 && (
                        <Alert severity="error">{errors.submit_error}</Alert>
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
              sx={{ maxWidth: "16% !important", my: 1 }}
            >
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
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="number"
                helperText={errors.errmonthlyContribution}
                name="monthly_contribution"
                value={formData.monthly_contribution}
                onChange={handleInputChange}
                label="Monthly Contribution"
                placeholder="Monthly Contribution"
                sx={{ marginLeft: "8px" }}
                className={styles.errorText}
                InputProps={{
                  classes: {
                    helperText: mystyles.helperText, 
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="number"
                helperText={errors.errtotalContribution}
                name="total_contribution"
                value={formData.total_contribution}
                onChange={handleInputChange}
                label="Total Contribution"
                placeholder="Total Contribution"
                sx={{ marginLeft: "8px" }}
                className={styles.errorText}
                InputProps={{
                  classes: {
                    helperText: mystyles.helperText, 
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="number"
                name="bonus"
                value={formData.bonus}
                helperText={errors.errBonus}
                onChange={handleInputChange}
                label="Bonus"
                placeholder="Bonus"
                sx={{ marginLeft: "8px" }}
                className={styles.errorText}
                InputProps={{
                  classes: {
                    helperText: mystyles.helperText, 
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="text"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                label="Remarks"
                placeholder="Remarks"
                sx={{ marginLeft: "8px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <TextField
                type="text"
                name="admin_remarks"
                value={formData.admin_remarks}
                onChange={handleInputChange}
                label="Admin Remarks"
                placeholder="Admin Remarks"
                sx={{ marginLeft: "8px" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ maxWidth: "16% !important", my: 2 }}
            >
              <Button
                sx={{
                  ml: 2,
                }}
                variant="outlined"
                color="success"
                onClick={handleAddShares}
                style={{ display: showSubmitButton ? "inline-block" : "none" }}
              >
                Submit
              </Button>

              <Button
                variant="outlined"
                color="success"
                onClick={handleEditShares}
                style={{ display: showEditButton ? "inline-block" : "none" }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        )}
        <table class="table table-bordered">
          <thead>
            <tr>
              {columns.map((ele) => (
                <th key={ele.label}>{ele.label} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((fle) => (
                <>
                  <tr key={fle.date} style={{ cursor: "pointer" }}>
                  <td>{formatDate(fle.start_date)}</td>
                    <td>{fle.monthly_contribution}</td>
                    <td>{fle.total_contribution}</td>
                    <td>{fle.bonus}</td>
                    <td>{fle.remarks}</td>
                    {UserToken.isAdmin ? 
                    <>
                    <td>{fle.updated_by}</td>
                    <td>{fle.admin_remarks}</td>
                    <td>{generateActionButtons(fle)}</td>
                    </>:""}
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
       
        {data.length ?         <TablePagination
      component="div"
      count={totalCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10, 20, 30, 40, 50]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />:""}

      </Paper>
    </>
  );
}