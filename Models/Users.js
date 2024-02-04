const mongoose= require("mongoose");

// user Schema

const userSchema= new mongoose.Schema({
  Role:{
    type:String,
    required:true,
  },
  Email:{
    type:String,
    required:true,
  },
  Password:{
    type:String,
    required:true,
  },

  OfficeNumber:{
    type:String,
    required:true,
  },

  BusinessName:{
    type:String,
    required:true
  },

  EIN:{
    type:String,
    required:true
  },

  CompanyAddress:{
    type:String,
    required:true
  },

  CompanyLogoImage:{
    type:String,
    required:true
  },

  WebsiteLink:{
    type:String,
    required:true
  },

  CompanySize:{
    type:String,
    required:true
  },

  CompanyState:{
    type:String,
    required:true
  },

  CompanyCity:{
    type:String,
    required:true
  },
  CompanyZip:{
    type:String,
    required:true
  },
 

  HearAboutCollebsetgo:{
    type:String,
    required:true
  },



  // accounts:[
  //   {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:"Account",
  // },
  // ],

},{
  timestamps:true,
  toJSON:{virtuals:true},
});

// model
const UserRoute = mongoose.model("UserRoute",userSchema);

module.exports=UserRoute;