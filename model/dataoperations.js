

const db=require('../dbconnect/databaseconnect')
const dbclass=require('../model/dataoperations');


const getQueries=class GetQueries{
  GetQueries(){
 }

 constructor(username,email,password,teachSkill,teachSkillcategory,teachSkillsubcategory,learnSkill,learnSkillcategory,learnSkillsubcategory){
this.username=username;
this.email=email;
this.password=password;
this.teachSkill=teachSkill;
this.teachSkillcategory=teachSkillcategory;
this.teachSkillsubcategory=teachSkillsubcategory;
this.learnSkill=learnSkill;
this.learnSkillcategory=learnSkillcategory; 
this.learnSkillsubcategory=learnSkillsubcategory;
 }



 async getNextId(collectioname) {
  const database = db.getdb();
  const lastEntry = await database.collection(collectioname)
      .find().sort({ id: -1 }).limit(1).toArray(); // Find last inserted document

  if (lastEntry.length > 0) {
      return lastEntry[0].id + 1; // Increment last ID
  } else {
      return 0; // Start from 0 if no records exist
  }
}

 async insertdata(collectioname){
    const databse=db.getdb();
    let nextId;
    if(collectioname == "User"){
       nextId = await this.getNextId("User");
    }else{
     nextId = await this.getNextId("LearnSkill");
    }
    // const nextId = await this.getNextId(""); // Get next auto-increment ID from counters
    const { username,email,password,teachSkill,teachSkillcategory,teachSkillsubcategory,learnSkill,learnSkillcategory,learnSkillsubcategory} = this;  //getting all th values from this 
    return databse.collection(collectioname).insertOne({
        id: nextId,
        username,
        email,
        password,
        teachSkill,
        teachSkillcategory,
        teachSkillsubcategory,
        learnSkill,
        learnSkillcategory,
        learnSkillsubcategory
  });
  }


  async fetchdata(collectioname){
    const database=db.getdb();
    return database.collection(collectioname).find().toArray();
  }
}







module.exports={
  getQueries

}