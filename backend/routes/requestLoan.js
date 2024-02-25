// memeberShareRouter.js
import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'  
const saltRounds = 10 
const jwtSecret = "windeepApp" 
const requestLoan = express.Router();

import { sequelize, QueryTypes } from '../config/connection.js';

requestLoan.post("/add", async (req, res) => {
    try {
        console.log("request body in member", req.body);

        let query = `INSERT INTO view_requests (member_from, member_to, admin_reason, guarantor_reason, status, created_by, amount,period,unit,emi,processing_fee, is_deleted) VALUES ('${req.body.id}', '${req.body.id}', null, null, 1, '${req.body.id}','${req.body.amount}','${req.body.period}','${req.body.unit}','${req.body.emi}','${req.body.processing_fee}',0)`;
        let result = await sequelize.query(query, { type: QueryTypes.INSERT });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));

        let query1 = `SELECT json_arrayagg(member_id) as admin_array from admin_details where is_deleted = 0;`;
        let result1 = await sequelize.query(query1, { type: QueryTypes.SELECT });
        console.log("query line 19", JSON.stringify(query1));
        console.log("result line 20-->", JSON.stringify(result1[0].admin_array));

        let querySTart = `INSERT INTO view_requests (member_from, member_to, admin_reason, guarantor_reason, status, created_by, amount,period,unit,emi,processing_fee,is_deleted) VALUES `;

        for(let i = 0;i<result1[0].admin_array.length;i++){
            querySTart +=` ('${req.body.id}', '${result1[0].admin_array[i]}', null, null, 1, '${req.body.id}', '${req.body.amount}','${req.body.period}','${req.body.unit}','${req.body.emi}','${req.body.processing_fee}',0),`;
        }
        querySTart = querySTart.slice(0,-1)
        let resultData = await sequelize.query(querySTart, { type: QueryTypes.INSERT });
        console.log("query line 15", JSON.stringify(querySTart));
        console.log("result line 16-->", JSON.stringify(resultData));

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
requestLoan.post("/", async (req, res) => {
    try {
        console.log("request body in member", req.body);
        let query = `SELECT (select name from member_details where member_id = vr.member_from) as member_name,rs.status as status, vr.admin_reason, ad.name as admin_name,
        vr.amount,vr.period,vr.unit,vr.emi,vr.processing_fee,vr.id as viewRequestsId
        FROM view_requests vr 
        left join requests_status rs on vr.status = rs.id
        left join admin_details ad on vr.member_to = ad.member_id
        left join member_details md on md.member_id = ad.member_id 
         where member_to = "${req.body.id}" 
         and vr.is_deleted = 0;`;
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

requestLoan.post("/viewRequests", async (req, res) => {
    try {
        console.log("request body in member", req.body);
        let query = `SELECT (select name from member_details where member_id = vr.member_from) as member_name,rs.status as status, vr.admin_reason, ad.name as admin_name,
        vr.amount,vr.period,vr.unit,vr.emi,vr.processing_fee,vr.id as viewRequestsId
        FROM view_requests vr 
        left join requests_status rs on vr.status = rs.id
        left join admin_details ad on vr.member_to = ad.member_id
        left join member_details md on md.member_id = ad.member_id 
         where member_from = "${req.body.id}" 
         and vr.is_deleted = 0;`;
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

requestLoan.post("/accept", async (req, res) => {
    try {
        console.log("request body in member", req.body);

        if(req.body.status=="accept"){
            let query = `UPDATE view_requests vr set status = 3 
         where id = "${req.body.id}" 
         and vr.is_deleted = 0;`;
        let result = await sequelize.query(query, { type: QueryTypes.UPDATE });
        console.log("query line 15", JSON.stringify(query));
        console.log("result line 16-->", JSON.stringify(result));
        if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Loan Request Accepted",error:"" });
        } else {
            res.status(401).json({ payload:[{ result: []}],message:"",error:"No Member Data" });
        }
        }
        else{
            let query = `UPDATE view_requests vr set status = 2
            where id = "${req.body.id}" 
            and vr.is_deleted = 0;`;
           let result = await sequelize.query(query, { type: QueryTypes.UPDATE });
           console.log("query line 15", JSON.stringify(query));
           console.log("result line 16-->", JSON.stringify(result));
           if (result.length > 0) {
            res.json({ payload:[{ result: result}],message:"Loan Request Rejected",error:"" });
        } else {
            res.status(401).json({ payload:[{ result: []}],message:"",error:"No Member Data" });
        }
        }
        

        // Check if a user with the provided email and password exists
        
    } catch (error) {   
        console.error("Error in admin login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

  


export default requestLoan;
