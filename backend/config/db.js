const mongoose = require('mongoose');

const connectDB = async () => {
    try { 
        const conn =  await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`);
                //3(B). On connection display all the models
        mongoose.connection.on('open', function(ref){            
            //Getting List of all the collections
            mongoose.connection.db.listCollections().toArray(function(err, names) {
                console.log("Collections: ")
                names.forEach((name, index) => {
                    console.log(index + ". " + name.name);
                });
                
            })
        })
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}

module.exports=  connectDB;