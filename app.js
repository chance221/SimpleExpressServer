const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const appList = require('./playapps/playapps.js')

app.use(cors());

app.use(morgan('common'))

app.listen(8000, () => {
  //This opens up a port to listen to local request.
  console.log('Server is listening on port 8000')
})

app.get('/', (req, res)  => {
  console.log('The server is listenin')
  res
  .status(200)
  .send('This is the home page who hoo!')
});

app.get('/apps', (req,res) =>{
  //this is where your code goes for this endpoint. This includes gathering all the data that sorts, searches and filters

  //This is how you get the filter results and set it to a default of blank. Use a deconstructor and set it to blank string

  const {filterCriteria= ""} = req.query;


  //Setting Sort criteria to blank as well

  const {sortCriteria = ""} = req.query;


  //Need to set up a method to sort and filter based on the query parameters
  // creates results that have been filtered. Also need to sort these results
  let results = appList.filter(listItem =>
    listItem
      .Genres
      .toLowerCase()
      .includes(filterCriteria.toLowerCase()) )
  
  //Test call to return the entire list
    
  res.json(results);
})


