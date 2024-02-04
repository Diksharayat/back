const bcrypt=require('bcryptjs');
const UserRoute = require("../../Models/Users");
const { AppErr, appErr } = require('../../utils/aapErr');
const generateToken = require('../../utils/generateToken');
const verifyToken = require('../../utils/verifyToken');



const resgisterUserController=async(req,res,next)=>{
  const {Role,
    Email,
    Password,
    OfficeNumber,
    BusinessName,
    EIN,
    CompanyAddress,
    WebsiteLink,
    CompanyLogoImage,
    CompanySize,
    CompanyState,
    CompanyCity,
    CompanyZip,
    HearAboutCollebsetgo,}=req.body;

  try{
       
  // Check if the email exist
  const userFound=await UserRoute.findOne({Email});
  if (userFound) {
      return next(appErr("user already exists",400));
  };
 

  // we will handle this error in catch instead of like following
  // // check if the fields are empty
  // if(!email || !password || !fullname)
  // return res.json({message:"please provide all field"})


 
  // hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(Password,salt);
    
  // create user
  const user=await UserRoute.create({
    Role,
    Email,
    Password: hashedPassword,
    OfficeNumber,
    BusinessName,
    EIN,
    CompanyAddress,
    WebsiteLink,
    CompanyLogoImage,
    CompanySize,
    CompanyState,
    CompanyCity,
    CompanyZip,
    HearAboutCollebsetgo,
       
  });

    res.json({
       status:"success",
       Role:user.Role,
       Email:user.Email,
       id: user._id
  })
}catch(error){
    next(new Error(error));
}

}

const loginUserController=async(req,res,next)=>{
  const {Email,Password} = req.body;
     try{
     // check if email exist
     const userFound= await UserRoute.findOne({Email});
     if(!userFound) return next(new AppErr("invalid login credentials",400))
     // check for password validity'
      const isPasswordMatch= await bcrypt.compare(Password,userFound.Password)
      if(!isPasswordMatch) return next(new AppErr("invalid login credentials",400))
     
     
      res.json({
     status:'success',
     Role:userFound.Role,
     id:  userFound._id,
     token:generateToken(userFound._id),
    
     });
  }catch(error){
     next(new AppErr(error.message,500));
  }

}

const profileUserController=async(req,res,next)=>{
   // const result =verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTRlY2Q1ZGU1OGNlMzRhYjk1MTY5MCIsImlhdCI6MTcwNTMyMDU2MSwiZXhwIjoxNzA1MzI0MTYxfQ.1NDyFy0HrAbRcu0qBcIn7ZbF9P2h0ODImO6hq7oKS0I");
     // console.log(result);
     // how to get the token from header

     // const headerObj=req.headers;
     // const token=headerObj["authorization"].split(" ")[1];
     // console.log(token);
     console.log(req.user);
  try{
     const user=await UserRoute.findById(req.user)
     res.json(user);
     
     
  }catch(error){
     next(new AppErr(error.message,500));
  }
}

const deleteUserController=async(req,res,next)=>{
  await UserRoute.findByIdAndDelete(req.user);
  res.status(200).json({
     status:'success',
     data:null
  })
     try{
       res.json({msg:'delete route'})
  }catch(error){
     next(new AppErr(error.message,500));
  }

}

const updateUserController=async(req,res,next)=>{
  try {
    // check if email exists
    if(req.body.Email){
         const userFound =await UserRoute.findOne({Email: req.body.Email});
         if(userFound) return next(new AppErr("Email is taken or you already have this email", 400));
    }
   
  
    //check if user is updating the password 
    if(req.body.Password){
    const salt =await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.Password,salt);

    //update the user
    const user= await UserRoute.findByIdAndUpdate(req.user,{
         Password:hashedPassword,

    },{
         new:true,
         runValidators:true,
    }) ;
    // send the response
    return res.status(200).json({
         status:"success",
         data:user,
    });
}

  const user=await UserRoute.findByIdAndUpdate(req.user,req.body,{
    new:true,
    runValidators:true,
  });
    // send the response
    res.status(200).json({
         status:"success",
         data:user,
    });
} catch (error) {
  next(new AppErr(error.message,500));
}

}


module.exports={
  resgisterUserController,
  loginUserController,
  profileUserController,
  deleteUserController,
  updateUserController,
}