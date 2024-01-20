// memberTransactionsRouter.js
import express from 'express';

const memberTransactionsRouter = express.Router();

import { sequelize, QueryTypes } from '../config/connection.js';

memberTransactionsRouter.post("/", async (req, res) => {
    try {
        console.log("request body in member", req.body);
        let query = `SELECT * FROM loan_transactions where is_deleted = 0 and member_id = '${req.body.id}';`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        // Check if a user with the provided email and password exists
        if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Member data fetched successfully",error:"" });
        } else {
            res.status(401).json({ payload:[{ result: []}],message:"",error:"No Member Data" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

memberTransactionsRouter.post("/add", async (req, res) => {
    try {
    console.log("reqbody ===================>",req.body);

    let EMI = 0,endData = "",totalInterestInMonths;

    if (req.body.unit == "years"){
        EMI = calculateEMIInYears(req.body.totalLoan,req.body.interest,req.body.period,req.body.processingFee);
        totalInterestInMonths = calculateTotalInterest(EMI.emiDetails);
    }
    else{
        EMI = calculateEMIMonths(req.body.totalLoan,req.body.interest,req.body.period,req.body.processingFee);
        totalInterestInMonths = calculateTotalInterest(EMI.emiDetails);
    }


    let insertQuery1 = `INSERT INTO windeep_finance.loan_transactions (id, reason, total_loan, start_date, end_date, monthly_emi, created_by,updated_by, interest,period,unit,processing_fee,total_repayment,emi_details,is_deleted, member_id,loan_type)
                VALUES (DEFAULT, '${req.body.reason}','${req.body.totalLoan}', '${req.body.startDate}', '${req.body.endDate}','${EMI.emi}',
                'Pradeep','Pradeep', ${totalInterestInMonths},${req.body.period} ,'${req.body.unit}', ${EMI.processingFee}, '${EMI.totalRepayment}', 
                '${JSON.stringify(EMI.emiDetails)}','0',
                '${req.body.member_id}', '${req.body.loan_type}');`;
    let insertResult1 = await sequelize.query(insertQuery1, {
        type: QueryTypes.INSERT,
    });
    console.log("insert query line 41", JSON.stringify(insertQuery1));
    console.log("insert result line 42-->", JSON.stringify(insertResult1));

    let insertQuery2 = `INSERT INTO windeep_finance.loan_transaction_details
        (id, loan_id, period,unit, emi, principal, balance, interest,date,is_deleted)
    VALUES (DEFAULT, '${insertResult1[0]}','${EMI.emiDetails[0].month}','${req.body.unit}', '${EMI.emi}', '${EMI.emiDetails[0].principal}','${EMI.emiDetails[0].balance}',
    '${EMI.emiDetails[0].interest}', '${req.body.startDate}', 0);`;
        let insertResult2 = await sequelize.query(insertQuery2, {
        type: QueryTypes.INSERT,
        });
        console.log("insert query line 41", JSON.stringify(insertQuery2));
        console.log("insert result line 42-->", JSON.stringify(insertResult2));
        
    res.json({
        payload: [{ result: insertResult1 }],
        message: "Member data inserted successfully",
        error: "",
    });
    } catch (error) {
      console.error("Error in member share add:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  memberTransactionsRouter.post("/addSingleLoan", async (req, res) => {
    try {
    console.log("reqbody ===================>",req.body);

    if (req.body.adminRemarksCheckbox ){

        let query = `SELECT emi_details,period,unit FROM loan_transactions where is_deleted = 0 and id = '${req.body.loan_id}';`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 15----", JSON.stringify(query));
        console.log("result line 16-->->", JSON.stringify(result));

        let query1 = `SELECT count(*) as count FROM loan_transaction_details where is_deleted = 0 and loan_id = '${req.body.loan_id}' and interest is not null;`;
        let result1 = await sequelize.query(query1, { type: QueryTypes.SELECT });
        console.log("query line 15----", JSON.stringify(query1));
        console.log("result line 16-->------------------------------------------------------------------->", JSON.stringify(result1));
        
        let EMI = result[0].emi_details

        let insertQuery3 = `INSERT INTO windeep_finance.loan_transaction_details
        (id, loan_id, period,unit, emi, principal, balance, interest,fee_fine,only_interest,remarks,admin_remarks,date,is_deleted)
       VALUES (DEFAULT, '${req.body.loan_id}','${EMI[result1[0].count].month}','${result[0].unit}', '${EMI[result1[0].count].emi}', '${EMI[result1[0].count].principal}','${EMI[result1[0].count].balance}',
       '${EMI[result1[0].count].interest}', '${req.body.Fee}', '${req.body.onlyInterest}', '${req.body.remarks}', '${req.body.adminRemarks}','${req.body.date}', 0);`;
           let insertResult3= await sequelize.query(insertQuery3, {
           type: QueryTypes.INSERT,
           });
           console.log("insert query line 41", JSON.stringify(insertQuery3));
           console.log("insert result line 42-->", JSON.stringify(insertResult3));
           
       res.json({
         payload: [{ result: insertResult3 }],
         message: "Member data inserted successfully",
         error: "",
       });
    }
    else{
        let insertQuery2 = `INSERT INTO windeep_finance.loan_transaction_details
         (id, loan_id, fee_fine,only_interest,remarks,admin_remarks,date,is_deleted)
        VALUES (DEFAULT, '${req.body.loan_id}', '${req.body.Fee}', '${req.body.onlyInterest}', '${req.body.remarks}', '${req.body.adminRemarks}','${req.body.date}',0);`;
            let insertResult2 = await sequelize.query(insertQuery2, {
            type: QueryTypes.INSERT,
            });
            console.log("insert query line 41", JSON.stringify(insertQuery2));
            console.log("insert result line 42-->", JSON.stringify(insertResult2));
            
        res.json({
          payload: [{ result: insertResult2 }],
          message: "Member data inserted successfully",
          error: "",
        });
    }


    } catch (error) {
      console.error("Error in member share add:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  memberTransactionsRouter.post("/singleLoan", async (req, res) => {
    try {
        console.log("request body in member", req.body);
        let query = `SELECT * FROM loan_transactions where is_deleted = 0 and id = '${req.body.id}';`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        // Check if a user with the provided email and password exists
        if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Member data fetched successfully",error:"" });
        } else {
            res.status(401).json({ payload:[{ result: []}],message:"",error:"No Member Data" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

memberTransactionsRouter.post("/editSingleLoan", async (req, res) => {
    try {
        console.log("request body in editSingleLoan", req.body);
        let query = ` UPDATE loan_transaction_details SET fee_fine = "${req.body.Fee}", 
        only_interest = "${req.body.onlyInterest}",remarks = "${req.body.remarks}",admin_remarks = "${req.body.adminRemarks}"
        where id = ${req.body.id} and loan_id = ${req.body.loan_id};`;
        let result = await sequelize.query(query, { type: QueryTypes.UPDATE });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        // Check if a user with the provided email and password exists
        if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Member data fetched successfully",error:"" });
        } else {
            res.status(401).json({ payload:[{ result: []}],message:"",error:"No Member Data" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


memberTransactionsRouter.post("/singleLoanDetails", async (req, res) => {
    try {
        console.log("request body in member", req.body);
        let query = `SELECT * FROM loan_transaction_details where is_deleted = 0 and loan_id = '${req.body.id}';`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        // Check if a user with the provided email and password exists
        if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Member data fetched successfully",error:"" });
        } else {
            res.status(401).json({ payload:[{ result: []}],message:"",error:"No Member Data" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

memberTransactionsRouter.post("/deleteTransactionDetails", async (req, res) => {
    try {
        console.log("request body in member", req.body);
        let query = ` UPDATE loan_transaction_details SET is_deleted = 1
        where id >= ${req.body.id} ;`;
        let result = await sequelize.query(query, { type: QueryTypes.UPDATE });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        let query1 = `SELECT count(*) as count FROM loan_transaction_details where is_deleted = 0 and loan_id = '${req.body.loan_id}';`;
        let result1 = await sequelize.query(query1, { type: QueryTypes.SELECT });
        console.log("query line 15", JSON.stringify(query1));
        console.log("result line 16-->", JSON.stringify(result1));

        if(result1[0].count == 0){
            let query = ` UPDATE loan_transactions SET is_deleted = 1
            where id = '${req.body.loan_id}' ;`;
            let result = await sequelize.query(query, { type: QueryTypes.UPDATE });
            console.log("query line 15", JSON.stringify(query));
            console.log("result line 16-->", JSON.stringify(result));
        }

        // Check if a user with the provided email and password exists
        if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Member data deleted successfully",error:"" });
        } else {
            res.status(401).json({ payload:[{ result: []}],message:"",error:"No Member Data" });
        }
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


const  calculateEMIInYears = (principal, annualInterestRate, tenureYears, processingFeeRate) => {
// Convert annual interest rate to monthly and calculate total number of installments
const monthlyInterestRate = (annualInterestRate / 12) / 100;
const totalInstallments = tenureYears * 12;

// Calculate EMI using the formula
const emi = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), totalInstallments) /
    (Math.pow((1 + monthlyInterestRate), totalInstallments) - 1);

// Calculate processing fee
const processingFee = principal * (processingFeeRate / 100);

// Calculate total repayment amount
const totalRepayment = emi * totalInstallments ;

// Initialize outstanding loan balance
let outstandingBalance = principal;

// Initialize arrays to store results for each month
const emiDetails = [];

// Calculate EMI details for each month
for (let month = 1; month <= totalInstallments; month++) {
    // Calculate monthly interest
    const monthlyInterest = (outstandingBalance * monthlyInterestRate);

    // Calculate monthly principal
    const monthlyPrincipal = emi - monthlyInterest;

    // Update outstanding balance
    outstandingBalance -= monthlyPrincipal;

    // Store details for the current month
    emiDetails.push({
        month,
        emi:Math.round(emi),
        principal: Math.round(monthlyPrincipal),  
        interest: Math.round(monthlyInterest),    
        balance: Math.round(outstandingBalance)   
    });
}

return {
    emi: Math.round(emi),                   
    processingFee: Math.round(processingFee), 
    totalRepayment: Math.round(totalRepayment), 
    emiDetails
};
}

const  calculateEMIMonths = (principal, annualInterestRate, tenureMonths, processingFeeRate) => {
// Convert annual interest rate to monthly
const monthlyInterestRate = (annualInterestRate / 12) / 100;

// Calculate EMI using the formula
const emi = principal * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), tenureMonths) /
    (Math.pow((1 + monthlyInterestRate), tenureMonths) - 1);

// Calculate processing fee
const processingFee = principal * (processingFeeRate / 100);

// Calculate total repayment amount
const totalRepayment = emi * tenureMonths ;

// Initialize outstanding loan balance
let outstandingBalance = principal;

// Initialize arrays to store results for each month
const emiDetails = [];

// Calculate EMI details for each month
for (let month = 1; month <= tenureMonths; month++) {
    // Calculate monthly interest
    const monthlyInterest = (outstandingBalance * monthlyInterestRate);

    // Calculate monthly principal
    const monthlyPrincipal = emi - monthlyInterest;

    // Update outstanding balance
    outstandingBalance -= monthlyPrincipal;

    // Store details for the current month
    emiDetails.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(monthlyPrincipal),  
        interest: Math.round(monthlyInterest),    
        balance: Math.round(outstandingBalance)   
    });
}

return {
    emi: Math.round(emi),                 
    processingFee: Math.round(processingFee), 
    totalRepayment: Math.round(totalRepayment), 
    emiDetails
};
}

const calculateTotalInterest = (emiDetails) => {
return emiDetails.reduce((totalInterest, monthDetails) => {
    return totalInterest + monthDetails.interest;
}, 0);
};
  


export default memberTransactionsRouter;
