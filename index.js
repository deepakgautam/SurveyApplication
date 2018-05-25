const express = require('express');
const app = express();
app.get('/',(req,res) => {
    res.send({hi : 'there' })
})

//if we are working on development enviornment than we dont have 
// envirement variable acess provided by horecu or any other deployements server in that 
// case it will be 5000  else it will be equal to envirement variable provided by 
// deployement server
const PORT = process.env.PORT || 5000
app.listen(PORT);