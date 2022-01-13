const dataModel = require('../models/dataModel');

//GET data of specified model
module.exports.getDataByModel = async (req,res) => {
    try{
        const name = req.params.modelname;
        const data = await dataModel.find({modelName: name});
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
}

//POST data to specified model
module.exports.postData = async (req,res) => { 
    const name = req.params.modelname;
    const modelId = req.body.modelId;
    await dataModel.create({modelName: name, model: modelId, data: req.body.data});
    res.send("DATA POSTED!");
}

//PUT/Update data of a specific model
module.exports.updateData = async (req,res) => {
    const dataId = req.params.id;
    const data = req.body.data;
    const old = await dataModel.find({_id: dataId});
    const oldData = old[0].data;
    const properties = {
        ...oldData, 
        ...data
    }

    await dataModel.findByIdAndUpdate(
            {_id: dataId },
            {data: properties}
        )

    const updatedData = await dataModel.find({_id: dataId});
    res.send(updatedData);
}

//DELETE data of a specific model
module.exports.deleteData = async (req,res) => {
    const id = req.params.id;
    await dataModel.findByIdAndDelete(id);
    res.send("Data DELETED!!")
}