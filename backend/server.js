const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const modelOperations = require('./routes/modelRoutes');
const dataOperations = require('./routes/dataRoutes');
const uploadRoutes = require('./routes/uploadRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors()); 

mongoose.connect('mongodb://localhost/bookstoretesting', {
    useNewUrlParser: true, useUnifiedTopology: true
});

mongoose.connection.on('open', function(ref){
    console.log("Database Connected");
    
    //Getting List of all the collections
    mongoose.connection.db.listCollections().toArray(function(err, names) {
        console.log("Collections: ")
        names.forEach((name, index) => {
            console.log(index + ". " + name.name);
        }); 
        
    })
})

//User Routes
app.use('/user', userRoutes);
//ALL model operations to be performed on this route
app.use('/modeloperations', modelOperations);
//ALL data operations to be performed on this route
app.use('/data', dataOperations);
//For media uploads
app.use('/mediaUploads', uploadRoutes);

app.get('/', (req,res) => {
    res.send("Testing the server running on port 9090")
})

app.listen(9090, console.log("Server Started On Port 9090")) 