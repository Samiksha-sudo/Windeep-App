// memeberShareRouter.js
import express from 'express';

const memeberShareRouter = express.Router();

import { sequelize, QueryTypes } from '../config/connection.js';

memeberShareRouter.post("/", async (req, res) => {
    try {
        console.log("request body in member", req.body);
        let query = `SELECT * FROM shares s where s.member_id = "${req.body.id}" and is_deleted = 0;`;
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

memeberShareRouter.post("/totalContribution", async (req, res) => {
  try {
      console.log("request body in member", req.body);
      let query = `SELECT total_contribution+monthly_contribution as totalContribution ,monthly_contribution FROM windeep_finance.shares where  
      member_id = "${req.body.id}" and is_deleted = 0 order by id desc limit 1 
     ;`;
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

memeberShareRouter.post("/add", async (req, res) => {
    try {
      let monthlyContribution = req.body.monthly_contribution || null;
      let totalContribution = req.body.total_contribution || null;
      let startDate = req.body.date || null;
      let bonus = req.body.bonus || null;
      let remarks = req.body.remarks || null;
      let createdBy = req.body.created_by || null;
      let updatedBy = req.body.update_by || null;
      let adminRemarks = req.body.admin_remarks || null;
      let memberId = req.body.member_id || null;
      
      let insertQuery = `INSERT INTO windeep_finance.shares 
                        (id, monthly_contribution, total_contribution, start_date, bonus, remarks, created_by, updated_by, admin_remarks, is_deleted, member_id)
                        VALUES 
                        (DEFAULT, 
                        ${monthlyContribution ? `'${monthlyContribution}'` : 'null'}, 
                        ${totalContribution ? `'${totalContribution}'` : 'null'}, 
                        ${startDate ? `'${startDate}'` : 'null'}, 
                        ${bonus ? `"${bonus}"` : 'null'}, 
                        ${remarks ? `"${remarks}"` : 'null'}, 
                        ${createdBy ? `"${createdBy}"` : 'null'}, 
                        ${updatedBy ? `"${updatedBy}"` : 'null'}, 
                        ${adminRemarks ? `"${adminRemarks}"` : 'null'}, 
                        '0', 
                        ${memberId ? `'${memberId}'` : 'null'});`;
      
      // Execute your insert query here
      
        let insertResult = await sequelize.query(insertQuery, {
          type: QueryTypes.INSERT,
        });
        console.log("insert query line 41", JSON.stringify(insertQuery));
        console.log("insert result line 42-->", JSON.stringify(insertResult));
  
        res.json({
          payload: [{ result: insertResult }],
          message: "Member data inserted successfully",
          error: "",
        });
    } catch (error) {
      console.error("Error in member share add:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  memeberShareRouter.post("/edit", async (req, res) => {
    try {
      console.log("request body in memeberShareRouter edit", req.body);
    
      let updateQuery = `
      UPDATE shares
      SET start_date = '${req.body.date}', monthly_contribution =' ${req.body.monthly_contribution}',total_contribution =' ${req.body.total_contribution}',
      bonus = '${req.body.bonus}' , remarks = '${req.body.remarks}',updated_by = '${req.body.update_by}'
      WHERE member_id = '${req.body.member_id}' and id = ${req.body.id};
  `;
  
  let updateResult = await sequelize.query(updateQuery, {
      replacements: [],
      type: QueryTypes.UPDATE,
  });
  
        console.log("update query line 29", JSON.stringify(updateQuery));
        console.log("update result line 30-->", JSON.stringify(updateResult));
  
        res.json({
          payload: [{ result: updateResult }],
          message: "Member data updated successfully",
          error: "",
        });
      
    } catch (error) {
      console.error("Error in member share add:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  memeberShareRouter.post("/delete", async (req, res) => {
    try {
      console.log("request body in memeberShareRouter edit", req.body);
    
      let updateQuery = `
      UPDATE shares
      SET is_deleted = 1
      WHERE member_id = '${req.body.member_id}' and id = ${req.body.id};
  `;
  
  let updateResult = await sequelize.query(updateQuery, {
      replacements: [],
      type: QueryTypes.UPDATE,
  });
  
        console.log("update query line 29", JSON.stringify(updateQuery));
        console.log("update result line 30-->", JSON.stringify(updateResult));
  
        res.json({
          payload: [{ result: updateResult }],
          message: "Member data updated successfully",
          error: "",
        });
      
    } catch (error) {
      console.error("Error in member share add:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


export default memeberShareRouter;
