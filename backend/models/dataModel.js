const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
    {
        model: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Model"
        },
        modelName: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

const dataModel = mongoose.model("Data", dataSchema);

module.exports  = dataModel;