let express = require('express');
let app = express();

//Install database
const { QuickDB } = require('quick.db');
const db = new QuickDB();

// to parse JSON
app.use(express.json());

//Serve public folder
app.use('/', express.static('public'));

//Define routes
app.post('/noCups', (req, res)=> {
  console.log(req.body);
  let currentDate = Date();
  let obj = {
      date: currentDate,
      coffee: req.body.number
  }

  //DB - add values to the DB
  db.push("coffeeTrackerData", obj);
  res.json({task:"success"});
});

//add route to get all coffee track information
app.get('/getCups', (req,res)=> {
  //DB - fetch from the DB
  db.get("coffeeTrackerData").then(coffeeData => {
    // console.log(coffeeData);
    let obj = {data: coffeeData};
    // console.log(obj);
    res.json(obj);
  });
});


//listen at port 5000
let port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log('listening at ', port);
})
