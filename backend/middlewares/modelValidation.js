const customModel = require('../models/schemaModel');

const preDefinedFields = {
    Text: 'String',
    LargeText: 'String',
    Number: 'Integer',
    Email: 'String',
    Image: 'Image',
    File: 'Buffer',
    Phone: 'Number',
    Title: 'String',
    Date: 'Date', 
}

//Check if model is already present
module.exports.checkModel = async (req,res,next) => {
    const modelName = req.body.name;
    const allModels = await customModel.find({}); 
    let modelAlreadyPresent = false;
    //Check if model is already present but 
        allModels.map(model => {
            if(model.name===modelName){
                modelAlreadyPresent = true;
                return res.status(404).json({message: `Model with given name ALREADY PRESENT`});;
            }
        });

        if(!modelAlreadyPresent){
            next();
        }
        
}

//POST and PUT Model - Validate all the fields passed - Check while creating and updating a data
//@http://localhost:4000/modeloperations/createSchema
//@http://localhost:4000/modeloperations/updateSchema/:modelName
module.exports.validateFields = async (req, res, next) => {
    // const modelName = req.body.name;
    const schemaModel = req.body.schemaModel;
    const invalid = []

    try{
        
         //1(A) -Check if Anything is present in schema model.
        if(schemaModel){

            //2. Iterate through each field in schema model
            Object.entries(schemaModel).map(field => {
                
                //3. Getting the type of field
                const type = field[1].type;
        
                //4(A) - If a field type is mentioned
                if(type){
                    //5(A). Check the field type with the preDefinedField declared above
                    if(`${type}` in preDefinedFields){
                        //DO NOTHING
                        // res.send(`Field type ${type} validated`)
                    }
                    //5(B) - Field type invalid -> push it in invalid array
                    else {
                        invalid.push(type);                       
                    }
                }

                //4(B) - If a field type is mentioned
                else{
                    invalid.push("NO Type Mentioned")
                }
            });
            
            //6(A) - Invalid array is not empty - so send error message to user
            if(invalid.length !== 0){
                return res.status(404).json({message: `Please specify valid field type`});  
            }
            //6(B) - Move to next function
            else{
                // return res.send('Model validated');
                console.log("Speaking from <<modelValidation>> file and <<validateFields>> function::<=>:: SCHEMA VALIDATION SUCCESSFULL")
                next();
            }
        }

        //1(B) - If nothing is present in schema model then send error message
        else {
            return res.status(404).json({message: "Please send a schemaModel"});
        }       
        
    } catch(err){ 
        return res.status(400).json({message: err});
    }
    
    
} 