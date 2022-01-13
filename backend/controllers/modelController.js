const customModel = require('../models/schemaModel');

//Get List of all the models present in a **models** Collection
module.exports.getAllModels = async (req,res) => {
    const models = await customModel.find({}); 
    res.send(models);
}

//GET single model specified by name
module.exports.getModelByName = async (req,res) => {
    try{
        const modelName = req.params.name;
        const model = await customModel.findOne({name: modelName});
        if(!modelName){
            res.status(404).json({message: "Mention Model Name"});
        }
        res.send(model);
    } catch(err){
        res.status(400).json({message: err});
    }
}
 
//Create a Model schema
module.exports.createSchema = async (req,res) => {
    const modelName = req.body.name;
    const schemaModel = req.body.schemaModel;
    const mod = await customModel.create({ name: modelName, schemaModel: schemaModel});
    mod.save();
    res.send("Model Created Successfully.") 
}

//UPDATING specified schema
module.exports.updateSchema = async(req,res) => {
    const modelName = req.params.name;
    const updatedSchemaModel = req.body.schemaModel;
    const presentSchema = await customModel.findOne({name: modelName});
    const id = presentSchema._id;
    
    if(presentSchema == null){
        res.send(`There is no model named ${modelName}. Please enter Model whch is already present.`);
    }
    else{
        // console.log(presentSchema.schemaModel)
        // const properties = Object.assign(presentSchema.schemaModel, updatedSchemaModel.schemaModel);
        // // let required = presentSchema.schemaModel.required;
        const old = presentSchema.schemaModel;
        const updt = updatedSchemaModel;
        // console.log(updt)
        //COMBINING OLD AND NEW SCHEMA
        const properties = {
            ...old, 
            ...updt
        }

        // console.log("PROPERTIES: " + properties);
        // console.log("REQURED: " + required); 
        

        // if(updatedSchemaModel.required.length !== 0){
        //     required = required.concat(updatedSchemaModel.required);
        // } 
        // await customModel.findOneAndUpdate(
        //     {name: modelName},
        //     { $set: {"schemaModel": properties}}
        // )
        await customModel.findByIdAndUpdate(
            {_id: id },
            {$set: {"schemaModel": properties}}
        )
        res.send(properties);
    }
    
}


module.exports.deleteModel = async (req,res) => {
    const modelID = req.params.id;
    await customModel.findByIdAndDelete(modelID);
    res.send("DELETED!");
}