import express from "express";
import registerModel from "../db/RegisterSchema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import multer from "multer";
import bcrypt from "bcrypt";
import { sequelize, QueryTypes } from '../config/connection.js';
import cron from 'node-cron'
// import firebase from "firebase";


import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics"; 


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBdNiv-2tj0KgL92ZcNXbWXhwo2yEwNNEY",
  authDomain: "windeep-7e254.firebaseapp.com",
  projectId: "windeep-7e254",
  storageBucket: "windeep-7e254.appspot.com",
  messagingSenderId: "292488325849",
  appId: "1:292488325849:web:6ad2ba954e75722b77ecc8",
  measurementId: "G-5K8KLV3X9Q"
};



const app = initializeApp(firebaseConfig);
const storageData = getStorage(app);

const saltRounds = 10;
const jwtSecret = "windeepApp";
const memberRoutes = express.Router();
let transporter = nodemailer.createTransport({
  service: "gmail",
  port:465,
  secure:true,
  logger:true,
  debug:true,
  secureConnection:false,
  auth: {
    user: "kadsamiksha1999@gmail.com",
    pass: "skum dvfb oqxf vvit"
  },
  tls:{
    rejectUnauthorized:true
  }
});


const initialDate = new Date(); // Change this to your desired initial date

// Calculate the next run date as 25 days after the initial date
const nextRunDate = new Date(initialDate.getTime() + (25 * 24 * 60 * 60 * 1000));

const DIR = "../frontend/public/images/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "user" + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
memberRoutes.post("/registerMember", async (req, res) => {
    let passwordHash = "";
    console.log("---------------------------------------->",req.body)
    // Hash the password with the generated salt
     passwordHash = await bcrypt.hash(req.body.password, saltRounds);

        console.log('Generated hash:', passwordHash);
    console.log("password",passwordHash)
    console.log("request body in member", req.body);
    let query = `SELECT count(member_id) as count FROM member_details where aadhar_card = "${req.body.aadharCard}";`;
    let result = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log("query line 51", JSON.stringify(query));
    console.log("result line 52-->", JSON.stringify(result));
    if (result[0].count == 0) {
      let query = `SELECT count(pan_card) as count FROM member_details where pan_card = "${req.body.panCard}";`;
      let result = await sequelize.query(query, { type: QueryTypes.SELECT });
      console.log("query line 58", JSON.stringify(query));
      console.log("result line 59-->", JSON.stringify(result));
      if (result[0].count == 0) {
        let query = `SELECT count(account_number) as count FROM member_details where account_number = "${req.body.accountNumber}";`;
        let result = await sequelize.query(query, { type: QueryTypes.SELECT });
        console.log("query line 63", JSON.stringify(query));
        console.log("result line 64-->", JSON.stringify(result));
        if (result[0].count == 0) {
            const newMemberId = await getNewMemberId();
            let insertQuery = `INSERT INTO windeep_finance.member_details (member_id, name, email, password, contact_no, aadhar_card, pan_card, ifsc_code, account_number, bank_address) VALUES ('${newMemberId}', '${req.body.fullName}', '${req.body.email}', '${passwordHash}', '${req.body.mobile}', '${req.body.aadharCard}', '${req.body.panCard}', '${req.body.ifsc}', '${req.body.accountNumber}', '${req.body.bankAddress}');`;
            let insertResult = await sequelize.query(insertQuery, { type: QueryTypes.INSERT });
            console.log("query line 78", JSON.stringify(insertQuery));
            console.log("result line 79-->", JSON.stringify(insertResult));

            let data = {
                email:req.body.email,
                password:passwordHash,
                memberId: newMemberId,
                isAdmin:false
            }

            const token = encryptData(data);
                console.log("token", token)
  
            res.json({ err: 1, msg: "Member registered successfully", memberId: newMemberId,token });
        } else {
          res.json({ err: 0, msg: "Account Number already exist" });
        }
      } else {
        res.json({ err: 0, msg: "Pan Number already exist" });
      }
    } else {
      res.json({ err: 0, msg: "Aadhar Number already exist" });
    }
  
});

memberRoutes.post("/listMembers", async (req, res) => {

  let query = `select md.name,md.member_id,lt.start_date,lt.end_date,lt.total_loan,lt.processing_fee,lt.period,lt.unit,lt.interest
  from member_details md left join loan_transactions lt on lt.member_id = md.member_id 
  where (md.name LIKE '%${req.body.search}%' OR md.member_id LIKE '%${req.body.search}%')and
  md.is_deleted = 0 limit ${req.body.limit} offset ${req.body.offset};`;
  let result = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log("query line 51", JSON.stringify(query));
  console.log("result line 52-->", JSON.stringify(result));

  let query1 = `select count(*) as totalCount
  from member_details md left join loan_transactions lt on lt.member_id = md.member_id 
  where (md.name LIKE '%${req.body.search}%' OR md.member_id LIKE '%${req.body.search}%')and
  md.is_deleted = 0 ;`;
  let result1 = await sequelize.query(query1, { type: QueryTypes.SELECT });

  console.log("query line 51", JSON.stringify(query1));
  console.log("result line 52-->", JSON.stringify(result1));

  res.json({ err: 1, msg: "Member registered successfully", payload:[{members: result,count:result1[0].totalCount }] 
  });


});

memberRoutes.post("/downloadLink", async (req, res) => {
  let query = `SELECT download_link FROM windeep_finance.loan_form where is_deleted = 0 and member_id = 0;`;
  let result = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log("query line 51", JSON.stringify(query));
  console.log("result line 52-->", JSON.stringify(result));
  let link = "";

const httpsReference = ref(storageData, result[0].download_link);  
await getDownloadURL(httpsReference)
  .then((url) => {
    link = url
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });




  res.json({ err: 1, msg: "Link Fetched successfully", payload:[{link: link}] 
  });


});

memberRoutes.post("/listSingleMember", async (req, res) => {

  let query = `SELECT name as Name,member_id as "Member Id" ,
    email as Email,contact_no as Mobile,dob as "Date of Birth",aadhar_card as "Aadhar Card" ,pan_card as "Pan Card",
    ifsc_code as "IFSC Code", account_number as "Account Number",bank_address as "Bank Address"
  FROM windeep_finance.member_details where is_deleted = 0 and member_id = "${req.body.id}" ;
  ;`;
  let result = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log("query line 51", JSON.stringify(query));
  console.log("result line 52-->", JSON.stringify(result));


  res.json({ err: 1, msg: "Member Listed successfully", payload:[{ result}] 
  });


});





cron.schedule(`0 0 */${nextRunDate.getDate()} */25 * *`, async () => {
  try {
    let query = `SELECT s.member_id,md.email,md.name
    FROM windeep_finance.shares s left join member_details md on md.member_id = s.member_id
    WHERE total_contribution = 46000 AND s.is_deleted = 0 
    GROUP BY member_id;`;
    let result = await sequelize.query(query, { type: QueryTypes.SELECT });
    
    result.map(ele => {
      let mailOptions = {
        from: "kadsamiksha1999@gmail.com",
        to: ele.email,
        subject: "Windeep Finance",
        text: `${ele.name}, Your next month for shares will be last month. Please fill your last month fees.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
    console.log('Scheduled email task executed successfully.');
  } catch (error) {
    console.error('Error executing scheduled email task:', error);
  }
});

memberRoutes.post(
  "/profilePicService",
  upload.single("profileImg"),
  (req, res) => {
    registerModel.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          profilepic: req.file.filename,
        },
      },
      { new: true },
      (err, data) => {
        if (err) throw err;
        else {
          const token = encryptData(data);
          res.json({
            err: 0,
            msg: "Profile Pic Updated",
            token: token,
            values: data,
          });
        }
      }
    );
  }
);


const encryptData = (data) => {
  let pay = {
    ...data._doc,
  };
  const token = jwt.sign(pay, jwtSecret, { expiresIn: 360000 });
  return token;
};

const getNewMemberId = async () => {
    // Retrieve the last member ID from the database
    const lastMemberIdQuery = "SELECT member_id FROM member_details ORDER BY member_id DESC LIMIT 1;";
    const lastMemberIdResult = await sequelize.query(lastMemberIdQuery, { type: QueryTypes.SELECT });
  
    if (lastMemberIdResult.length > 0) {
      // Extract the numeric part of the last member ID
      const lastIdNumericPart = parseInt(lastMemberIdResult[0].member_id.replace("MEMB", ""), 10);
  
      // Increment the numeric part and format it back to the member ID format
      const newNumericPart = lastIdNumericPart + 1;
      const newMemberId = `MEMB${newNumericPart.toString().padStart(5, "0")}WD`;
  
      return newMemberId;
    } else {
      // If there are no existing members, start with the initial member ID
      return "MEMB00001WD";
    }
  };

export default memberRoutes;
