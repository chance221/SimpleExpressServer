const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const appList = require('./playapps/playapps.js')

app.use(cors());

//app.use(morgan('common'))


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
  
  /*After the list has been filtered you can now sort it. The sort() function does most of the heavy lifting, you just
  need to pass in which sorting criteria you wan to use. The first validates the input (even though you have a dropdown
  most likely you want to validate your code server side as well). If the sorting criteria is good you just need to 
  take the results and then pass them through the finction listed below. It uses a ternary operator with three potential 
  outcomes 1, -1, or 0. Read more about it if you don't quite get it as there is plenty out there to refer to.*/
  if (sortCriteria) {
    if (!['rating', 'app'].includes(sortCriteria)){
      return res
        .status(400)
        .send('Sort must be one of rank or app')
    }
    results.sort((a,b) => {
      return a[sortCriteria] > b[sortCriteria] ? 1 : a[sortCriteria] < b[sortCriteria] ? -1 : 0;
    })
  }
  res.json(results);
})


module.exports = app