const express=require("express");
const app =express();
require("./Config/dbConnect");
const cors=require('cors');

const userRoute = require("./routes/users/userRoutes");
const globalErrHandler = require("./middlewares/globalErrHandler");

//middleswares
// middlewares
app.use(express.json()) //pass incoming data
// cors middleware
app.use(cors());

//routes
 //user routes:

 app.use("/api/v2/users",userRoute);
    
    // POST/api/v1/users/register
// app.post('/api/v2/users/register',async(req,res)=>{
//        try {
//            res.json({msg:"Register route"})
//        } catch (error) {
//          res.json(error);
//        }
//  });

//   // POST/api/v1/users/login
// app.post('/api/v2/users/login',async(req,res)=>{
//        try {
//            res.json({msg:"login route"})
//        } catch (error) {
//            res.json(error);
//        }
//  });


//   // GET/api/v1/users/Profile/:id
//  app.get('/api/v2/users/profile/:id',async(req,res)=>{
//        try {
//           res.json({msg:"profile route"})
//        } catch (error) {
//            res.json(error);
//        }
//  });


//   // DELETE/api/v1/users/:id
//  app.delete('/api/v2/users/:id',async(req,res)=>{
//       try {
//            res.json({msg:"delete route"})
//        } catch (error) {
//            res.json(error);
//        }
//  });


//  // PUT/api/v1/users/:id
//  app.put('/api/v2/users/:id',async(req,res)=>{
//        try {
//            res.json({msg:"update route"})
//        } catch (error) {
//            res.json(error);
//        }
//  });


// Error handlers
app.use(globalErrHandler);


//listen to the server.

const port = process.env.PORT||3001;
app.listen(port,console.log(`SERVER IS UP AND RUNNING ON PORT ${port}`));