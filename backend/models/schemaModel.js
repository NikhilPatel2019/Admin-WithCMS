const mongoose = require('mongoose');


const schemaModel = new mongoose.Schema(
    {
        schemaModel: {
            type: Object, 
            required: true
        },
        name: {
            type: String, required: true, index: true, unique: true
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    } 
)

const customModel = mongoose.model("Models", schemaModel);

module.exports  = customModel;