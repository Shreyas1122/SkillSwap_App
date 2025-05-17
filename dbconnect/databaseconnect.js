const mong=require('mongodb');
const color =require('colors');
const mo=mong.MongoClient;



const  MONGO_URL="mongodb+srv://Shreyas:Shreyas123@skillswapcluster.mqgvhg8.mongodb.net/?retryWrites=true&w=majority&appName=skillswapcluster";

var db;

function connection(){
  mo.connect(MONGO_URL).then(client=>{
    db=client.db('SkillSwap');
    console.log("Connected to the Mongo Db Suceessfully".blue.bold);
 
  }).catch(err=>{
    console.log("error occured while connecting to the MongoDB ");
    console.log(err);
  });

}



function getdb(){
  if(db == null){
    throw new Error("Mongo NOt Coonected ")
  }
  else{
    return db;
  }
}
  


module.exports={
  connection,
  getdb
}