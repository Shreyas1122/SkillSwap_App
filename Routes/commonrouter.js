const dbclass=require('../model/dataoperations');
const axios = require('axios');
const cookieParser = require('cookie-parser');


const { check, validationResult } = require("express-validator");




const simplereply=async (req,res,next)=>{

  console.log("hello papap duru duru duru ");

  const isloggedin=req.cookies?.isloggedin === "true"
  const ids=Number(req.cookies? req.cookies.id : null);
  console.log(typeof ids);
console.log("the id is ",ids);
console.log("the login is ",isloggedin)
  try{
const object=new dbclass.getQueries();

object.fetchdata("User").then(async(dataobject)=>{
            currentdataobject=dataobject;


      if(req.cookies.isloggedin){
    //perform the action only when the user is logged in 
       try{
           
          const response = await axios.post('https://python-similarity-model.onrender.com/data', {
      id:ids, });
        console.log('Response from Python API:', response.data["csv file created"]);
        lists=response.data["csv file created"];
        console.log("the data from the api is ",lists[0][2]);

       
      console.log(currentdataobject[0].teachSkill);
        //sending the data to the homepage of api response 
          res.render("Homepage", {Skills:currentdataobject,
          data: response.data["csv file created"],cookiesvalue:isloggedin})
            
        
        }catch(error){
           console.error('Error calling Python API:', error.message);}
          }
         else{
//perform the action wghen user is not logged in 
res.render("Homepage", {Skills:[],
          data: [],cookiesvalue:isloggedin})

          } });

    }catch(Error){
      console.log("Error in fetching the data from the database");
      console.log(Error);}
}


//get login page 
const loginpage=(req,res,next)=>{
 var cookiesvalue=req.cookies?.isloggedin === "true"
 console.log("the cookies value is ",cookiesvalue);
 res.render("loginpage",{errorMessages:[],oldinput:{username:"",password:""},cookiesvalue:cookiesvalue})
}


//post login page 
const loginsuccesful=[
   check("username")
   .notEmpty().withMessage("username cannot be empty")
   .trim()
   .isLength({min:2}).withMessage("username must be atleast 2 character long")
   .matches(/^[A-Za-z0-9]+$/).withMessage("Username should only contain alphabets and numbers"),
   check("password")
   .notEmpty().withMessage("passowrd cannot be empty")
   .trim()
   .isLength({min:8}).withMessage("Invalid password at least 8 character long ")
   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/).withMessage("password format incorrect"),

  (req,res,next)=>{
var cookiesvalue=req.cookies?.isloggedin === "true"
  
    const errors = validationResult(req);
    const username= req.body.username;
    const password= req.body.password;

    if (!errors.isEmpty()) {
      return res.render("loginpage", {
        errorMessages: errors.array().map(err => err.msg),
        oldinput: {
          username:username,
          password:password
        },
         cookiesvalue:cookiesvalue
      });
    }

    
    try{
const object=new dbclass.getQueries();
var cookiesvalue=req.cookies?.isloggedin === "true"


object.fetchdata("User").then(async(dataobject)=>{
            currentdataobject=dataobject;
            console.log("the query objet is as folloes "
            );
            //console.log(currentdataobject);
            const dataobjects= currentdataobject.find(element => username === element.username && password === element.password);
          if(dataobjects){ 
            if(req.cookies?.isloggedin !== "true"){

            const oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
            res.cookie('isloggedin', true, { maxAge:oneYear, httpOnly: true });
            res.cookie('id', dataobjects.id, { maxAge: oneYear, httpOnly: true });

            }
           console.log("User found");


           res.redirect("/Home");
          }else{
            console.log("User not found");
            res.render("loginpage", {
        errorMessages: ["Invalid username or password"],
        oldinput: {
          username,
          password
        },
         cookiesvalue:cookiesvalue
      });
          }
          });

    }catch(Error){
      console.log("Error in fetching the data from the database");
      console.log(Error);


    }
 
 

}]

const Getregister=(req,res,next)=>{
  var cookiesvalue=req.cookies?.isloggedin === "true"
  res.render("signuppage",{errorMessages:[],oldinput:{firstName : "",
    username :"",
    email:"",
    password : "",
    teachSkill : "",
    learnSkill :"",}
  })
}




const logout=(req,res,next)=>{

  res.clearCookie('isloggedin');
  var cookiesvalue=false;
  req.cookies.username="";
  req.cookies.password="";
  res.render("loginpage",{errorMessages:[],oldinput:{username:"",password:""},cookiesvalue:cookiesvalue})
}

const home=(req,res,next)=>{
  res.redirect("/Home");
}


const postregister = [
  check("firstName")
    .notEmpty().withMessage("First name should not be empty")
    .trim()
    .isLength({ min: 2 }).withMessage("First name should be at least 2 characters long")
    .matches(/^[A-Za-z]+$/).withMessage("First name should only contain alphabets"),

  check("username")
    .notEmpty().withMessage("Username should not be empty")
    .trim()
    .isLength({ min: 2 }).withMessage("Username should be at least 2 characters long")
    .matches(/^[A-Za-z0-9]+$/).withMessage("Username should only contain alphabets and numbers"),
    check("email")
    .notEmpty().withMessage("email should not be empty")
    .trim()
    .isLength({ min: 3 }).withMessage("email should be at least 3 characters long")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage("please enter the valid email format"),


  check("password")
    .notEmpty().withMessage("Password should not be empty")
    .trim()
    .isLength({ min: 8 }).withMessage("Password should be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .withMessage("Password must include uppercase, lowercase, number, and special character"),

  check("confirmPassword")
    .notEmpty().withMessage("Confirm password should not be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("teachSkill")
    .notEmpty().withMessage("Teaching skill should not be empty")
    .trim()
    .isLength({ min: 2 }).withMessage("Please elaborate the skill")
    .matches(/^[A-Za-z\s]+$/).withMessage("Teaching skill should only contain alphabets")
,

  check("learnSkill")
    .notEmpty().withMessage("Learning skill should not be empty")
    .trim()
    .isLength({ min: 2 }).withMessage("Please enter more than 2 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("Learn skill should only contain alphabets")
,
check("teachSkillcategory")
    .notEmpty().withMessage("teachSkillcategory should not be empty")
    .trim()
    .isLength({ min: 2 }).withMessage("Please enter more than 2 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("teachSkillcategory should only contain alphabets")
,
check("teachSkillsubcategory")
    .notEmpty().withMessage("teachSkillsubcategory should not be empty")
    .trim()
    .isLength({ min: 2 }).withMessage("Please enter more than 2 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("teachSkillsubcategory should only contain alphabets")
,
check("learnSkillcategory")
    .notEmpty().withMessage("learnSkillcategory should not be empty")
    .trim()
    .isLength({ min: 2 }).withMessage("Please enter more than 2 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("learnSkillcategory should only contain alphabets")
,
check("learnSkillsubcategory")
    .notEmpty().withMessage("learnskillsubcategory should not be empty")
    .trim()
    .isLength({ min: 2 }).withMessage("Please enter more than 2 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("learnSkillsubcategory should only contain alphabets")   
,  // Final handler
  async(req, res) => {

if(!req.session.Issignedin){
    req.session.Isignedin = true;
    req.session.teachSkill = req.body.teachSkill;
    req.session.learnSkill = req.body.learnSkill;
    req.session.email = req.body.email;}

    const errors = validationResult(req);
    const { firstName,lastName, username,email, password, teachSkill,teachSkillcategory,teachSkillsubcategory,learnSkill,learnSkillcategory,learnSkillsubcategory} = req.body;

    if (!errors.isEmpty()) {
      return res.render("signuppage", {
        errorMessages: errors.array().map(err => err.msg),
        oldinput: {
          firstName,
          lastName,
          username,
          email,
          password,
          teachSkill,
          learnSkill,
          teachSkillcategory,
          teachSkillsubcategory,
          learnSkillcategory,
          learnSkillsubcategory
        }
      });
    }
    req.cookies.username=req.body.username;
    req.cookies.password=req.body.password;
    const object=new dbclass.getQueries(req.body.username,req.body.email,req.body.password,req.body.teachSkill,req.body.teachSkillcategory,req.body.teachSkillsubcategory,req.body.learnSkill,req.body.learnSkillcategory,req.body.learnSkillsubcategory);
    await  object.insertdata("User");
    console.log("User data:", req.body);
    res.redirect("/login");
  }
];

module.exports = {
  simplereply,
  loginpage,
  loginsuccesful,
  Getregister,
  postregister,
  logout,
  home
};