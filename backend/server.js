//1. Import required node modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

//2. Importing all the necessary routes
const userRoutes = require('./routes/userRoutes');
const modelOperations = require('./routes/modelRoutes');
const dataOperations = require('./routes/dataRoutes');
const uploadRoutes = require('./routes/uploadRoute');

//3. Initialise express
const app = express();

//6. For removing Errors
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors()); 
dotenv.config();

//7. Connect to a mongodb database
connectDB()

//7. Connect to a local database
// mongoose.connect('mongodb://localhost/bookstoretesting', {
//     useNewUrlParser: true, useUnifiedTopology: true
// });
// //7(A) - After Connection
// mongoose.connection.on('open', function(ref){
//     console.log("Database Connected");
    
//     //7(B) - Getting List of all the collections
//     mongoose.connection.db.listCollections().toArray(function(err, names) {
//         console.log("Collections: ")
//         names.forEach((name, index) => {
//             console.log(index + ". " + name.name);
//         }); 
        
//     })
// })

//8 - Create routes for performing different functionality

//8(A) - Users Route 
app.use('/user', userRoutes);
//8(B) - ALL model operations to be performed on this route
app.use('/modeloperations', modelOperations);
//8(C) -ALL data operations to be performed on this route
app.use('/data', dataOperations);
//8(D) -For media uploads
app.use('/mediaUploads', uploadRoutes);

//Making upload folder static for uploading a media files.
//Making folder static so it can be accessed
// const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//5. Test the Server
app.get('/', (req,res) => {
    res.send("Testing the server running on port 9090")
})

//4. Start the Server
const PORT = process.env.PORT || 9090
app.listen(PORT, console.log(`Server Started On PORT ${PORT}`)) 