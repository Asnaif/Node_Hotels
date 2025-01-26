// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', ()=>{
//     console.log("file is created");
    
// })


// const note = require('./notes.js');
// console.log("this is server line");
// var _ = require('lodash')

// var age = note.age;
// var result = note.addNumber(age+18, 10);

// console.log(result);

// console.log(age);


// var data = ['person', 'person', 1, 2, 1, 2, 'name', 'age', "2"]
// var filter = _.uniq(data)
// console.log(filter);




// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('welcom to my hotel..... how can i help u ? ')
// })

// app.listen(3000)



//*************************************************************************************************************************************** */





const express = require('express');
const app = express();
const db = require('./db'); // MongoDB connection
//const Person = require('./models/person');
//const MenuItem = require('./models/MenuItem');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // store the converted data in req.body


// //Post route to add a person
// app.post('/person', async(req, res) =>{
//     try{
//         const data = req.body // Assuming the request body contains the person data

//         // Create a new person document using the mongoose model
//         const newPerson = new Person(data);

//         // save the new person to the data base
//         const response = await newPerson.save();
//         console.log("data saved");
//         res.status(200).json(response)
        
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error: "Internal Server Error"})
        
//     }
    
// });

// // Get method to get the person 
// app.get('/person', async (req, res) =>{
//     try{
//         const data = await Person.find();
//         console.log("data Fetched");
//         res.status(200).json(data)       

//     }catch(err){ 
//         console.log(err);
//         res.status(500).json({error: "Internal Server Error"})
//     }
// });


// POST method to create a new MenuItem
// app.post('/menu', async (req, res) => {
//     try {
//       const data = req.body; // Incoming menu data
//       const newMenu = new MenuItem(data);
  
//       // Save the new menu item to the database
//       const response = await newMenu.save();
//       console.log("Data saved:", response);
//       res.status(201).json({ success: true, data: response });
//     } catch (err) {
//       console.error("Error saving data:", err.message);
//       res.status(400).json({ error: err.message }); // Return validation errors if any
//     }
//   });
  
//   // GET method to fetch all MenuItems
//   app.get('/menu', async (req, res) => {
//     try {
//       const data = await MenuItem.find();
//       console.log("Data fetched:", data);
//       res.status(200).json({ success: true, data });
//     } catch (err) {
//       console.error("Error fetching data:", err.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

  // app.get('/person/:workType', async(req, res) =>{
  //   try{
  //     const workType = req.params.workType; // Extract the work type from the URL parameter 
  //     if(workType == 'Chef' || workType == 'Manager' || workType == 'waiter'){
  //       const response = await Person.find({work: workType});
  //       console.log('response fetched')
  //       res.status(200).json(response);

  //     }else{
  //       res.status(404).json({error: 'Invalid work type'});
  //     }

  //   }catch(err){
  //     console.log(err);
  //     res.status(500).json({error: "Internal Server Error"})
  //   }

    
  // })


      
const personRoutes = require('./routes/personRoutes')  // Import the Routes file

app.use('/person', personRoutes);  //use the routes

const menuItemRouts = require('./routes/menuItemRoutes')
app.use('/menu', menuItemRouts )

app.get('/', function (req, res) {
    res.send('🏨 Welcome to my hotel... How can I help you?');
});

// Start the server after DB connection is ready
db.once('open', () => {
    app.listen(3000, () => {
        console.log('🚀 Server is running on http://localhost:3000');
    });
});





/*{
    "name": "Alice",
    "Age": 28,
    "work": "chef",
    "mobile": "123-4567-890",
    "email": "alice@example.com",
    "adress": "123 Main St, city",
    "salary": 60000
}*/


// app.get('/idli', function (req, res) {
//   var costomize_id = {
//     name : "IDLI",
//     size : "10 cm diameter",
//     is_sahmber : true,
//     is_chatuny : false
//   }
//   res.send(costomize_id)
// });



//