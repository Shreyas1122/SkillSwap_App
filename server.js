const exp=require("express");
const body_parse=require("body-parser");
const simplereplyimports=require("./Routes/commonrouter");
const cookieParser = require('cookie-parser');
const morgan =require("morgan");
const path = require("path");
const db=require("./dbconnect/databaseconnect");
const expressession=require("express-session");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const dburl="mongodb+srv://Shreyas:Shreyas123@skillswapcluster.mqgvhg8.mongodb.net/?retryWrites=true&w=majority&appName=skillswapcluster";

const store=new MongoStore({
  uri:dburl,
  collection:"sessions"
});

app=exp();
app.use(cookieParser());
app.use(exp.static('public'));
app.use(morgan('dev'));
app.use(session({
secret:"Encryption key 1",
resave:false,
saveUnintialized:true,
store:store,
}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname, "Views"));  //for local run use ./Views
app.use(body_parse.urlencoded());



app.use("/Home",simplereplyimports.simplereply);   
app.get("/login",simplereplyimports.loginpage);
app.post("/login",simplereplyimports.loginsuccesful);
app.get("/register",simplereplyimports.Getregister);
app.post("/register",simplereplyimports.postregister);
app.get("/logout",simplereplyimports.logout);
app.get("/",simplereplyimports.home)



const port_number=process.env.PORT || 20000;

app.listen(port_number,()=>{
  db.connection();
console.log("The server is started successfully dear ");
});
