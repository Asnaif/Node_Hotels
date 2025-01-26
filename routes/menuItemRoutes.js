const express = require('express');
const router = express.Router()
const MenuItem = require('./../models/MenuItem');

router.post('/', async (req, res) => {
    try {
      const data = req.body; // Incoming menu data
      const newMenu = new MenuItem(data);
  
      // Save the new menu item to the database
      const response = await newMenu.save();
      console.log("Data saved:", response);
      res.status(201).json({ success: true, data: response });
    } catch (err) {
      console.error("Error saving data:", err.message);
      res.status(400).json({ error: err.message }); // Return validation errors if any
    }
  });
  
  // GET method to fetch all MenuItems
  router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("Data fetched:", data);
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Error fetching data:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });




  router.get('/:taste', async(req, res) =>{
    try{
      const taste = req.params.taste; // Extract the work type from the URL parameter 
      if(taste == 'sweet' || taste == 'spicy'){
        const response = await MenuItem.find({taste: taste});
        console.log('response fetched')
        res.status(200).json(response);

      }else{
        res.status(404).json({error: 'Invalid work type'});
      }

    }catch(err){
      console.log(err);
      res.status(500).json({error: "Internal Server Error"})
    }

    
  })

//comment added for testing purpose
  module.exports = router;