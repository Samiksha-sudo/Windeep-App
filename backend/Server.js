    import express from 'express';
    import  cors from'cors';
    import memberRoutes from './routes/memberRoutes.js'
    import adminLoginRouter from './routes/adminLoginRouter.js';
    import memeberShareRouter from './routes/memeberShareRouter.js';
    import memberTransactionsRouter from './routes/memberTransactionsRouter.js';   
    import requestLoan from './routes/requestLoan.js';  


    const PORT = 9000
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use("/member", memberRoutes);
    app.use("/admin/login", adminLoginRouter); 
    app.use("/member/shares", memeberShareRouter);
    app.use("/member/loan", memberTransactionsRouter);
    app.use("/member/requestLoan", requestLoan);
    app.listen(PORT, (err) => {
        if (err) throw err; 
        console.log(`working on ${PORT}`)
    })