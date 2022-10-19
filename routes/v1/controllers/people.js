import express from 'express';
var router = express.Router();


router.get('/', function(req, res, next) {
    let nameSearch = req.query.nameSearch
    nameSearch = nameSearch ? nameSearch : ""
  
    //To fix this, do:
    //req.db.all(`SELECT * FROM people WHERE first_name = ?`, nameSearch, (err, allRows) => {
    req.models.all(`SELECT * FROM people WHERE first_name = "${nameSearch}"`, (err, allRows) => {
      if(err) {
        console.log("db error: " + err)
        res.send("db error" + err)
      }
      if(!allRows){
        return "";
      }
      let matchingPeople = allRows.map(row => `${row.first_name} ${row.last_name}`).join("\n")
      res.send(matchingPeople);
    })  
  });
  

export default router;
