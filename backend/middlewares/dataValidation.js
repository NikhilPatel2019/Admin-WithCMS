const customModel = require('../models/schemaModel');

//POST - Validate all the fields passed in data - Check while creating a data
//@http://localhost:4000/data/post/:modelName
module.exports.validateData = async (req, res, next) => {
    const modelName = req.params.modelname;
    const model = await customModel.findOne({name: modelName});
    const data = req.body.data
    try{
        //checkpoint-1
        console.log("IN TRY BLOCK")
        const mentionRequired = [];

        //I. First check all the required fields are present or not.
        if(data){
            //1. Loop through the model(i.e all model fields)
            Object.entries(model.schemaModel).map(field => {
                //2. Take value of required
                const required = field[1].required;
            
                //3. If required is true
                if(required){
                    //3(A) - check if that field is present in a data
                    if(field[0] in data){
                        //DO NOTHING
                    }          
                    //3(B) - if not store in an array   
                    else{
                        mentionRequired.push(field[0]);
                    }    
                }
            })

            //4. Send all the requied field name to the user 
            if(mentionRequired.length !== 0){
                return res.status(404).json({message: `Missing Fields: [ ${mentionRequired} ]. Please enter them in order to store a data.`})
            }

            //Check if user has enered any invalid field
            const invalidField = []
            Object.entries(data).map(item => {
                if(!(item[0] in model.schemaModel)){
                    console.log(item[0] + " invalid")
                    invalidField.push(item[0])
                }
            })
            if(invalidField.length !== 0){
                return res.status(404).json({message: `[ ${invalidField} ] fields invalid.`})
            }
            //checkpoint-2
            console.log("Field Checking complete")

        }
        else {
            return res.status(404).json({message: "Send data instead of NOTHING"});
        }
        
        //II. Second Check data and validate it. 
        const dataErrors = []
        Object.entries(data).map(item => {
            const test = model.schemaModel[item[0]].required;
            const type = model.schemaModel[item[0]].type;
            
            if(item[0] in model.schemaModel){

                switch(type){
                    case 'Title':
                        checkIsNotEmpty(item[0],item[1]);
                        break;

                    case 'Text':
                        checkIsNotEmpty(item[0],item[1]);
                        //check if input text is of limited length
                        break;
 
                    case 'LargeText':
                        checkIsNotEmpty(item[0],item[1]);
                        //check if input text is of limited length
                        break;

                    case 'Date':
                        checkIsNotEmpty(item[0],item[1]);
                        isDate(item[1]);
                        break;
                    
                    case 'Number':
                        checkIsNotEmpty(item[0],item[1]);
                        isNumber(item[1])
                        break;

                    case 'Email':
                        checkIsNotEmpty(item[0],item[1]);
                        ValidateEmail(item[1])
                        break;

                    case 'Phone':
                        checkIsNotEmpty(item[0],item[1]);
                        validatePhone(item[1]);
                        break;

                    case 'Image':
                        checkIsNotEmpty(item[0],item[1]);
                        break;

                    case 'File':
                        checkIsNotEmpty(item[0],item[1]);
                        break;
                }
                
            }
            
        })

        console.log(dataErrors);
        if(dataErrors.length !== 0){
            res.send(dataErrors);
        }
        else{
            next();
        }

        //Check if given value is empty or null
        function checkIsNotEmpty(field, item) {
            if(item === null || item === '') {
                dataErrors.push(`MISSING FIELD: { ${field}: MISSING DATA } field REQUIRE data it cannot be left empty.`)
             }             
        }

        //Check if given value is date or not
        function isDate(date) {
            const validRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ 
            if (date.match(validRegex)) {
                //DO Nothing         
            } else {
                dataErrors.push(`INVALID DATE: [ ${date} ] `)
            }
          }

          //Check if email is valid
          function ValidateEmail(input) {

            var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
            if (input.match(validRegex)) {
                //DO Nothing         
            } else {
                dataErrors.push(`INVALID EMAIL: [ ${input} ] `)
            }
          
          }

          //Validate phone number
          function validatePhone(number){
            const regexExp = /^[6-9]\d{9}$/gi;
            const result = regexExp.test(number);
            if(!result){
                dataErrors.push(`INVALID PHONE NUMBER: [ ${number} ] . Phone number should be of length 10 only and shoulld always start with either  6 or 7 or 8 or 9.`)
            }
          }

          //check if given value is a NUMBER
          function isNumber(number){
            const result = isNaN(number);
            if(result){
                dataErrors.push(`INVALID NUMBER: [ ${number} ]. It should only contaion only of digits.`)
            }
          }
        
    } catch(err){ 
        return res.status(400).json({message: err});
    }    
    
} 

//PUT - Validate all the fields passed in data - Check while Updating a data
//@http://localhost:4000/data/update/:id
module.exports.validateUpdatingData = async (req,res,next) => {
    const data = req.body.data;
    const modelName = req.params.modelName;
    const model = await customModel.findOne({name: modelName});
    //II. Second Check data and validate it. 

    try{
        const dataErrors = []
        Object.entries(data).map(item => {
        
        const test = model.schemaModel[item[0]].required;
        const type = model.schemaModel[item[0]].type;
        
        if(item[0] in model.schemaModel){

            switch(type){
                case 'Title':
                    checkIsNotEmpty(item[0],item[1]);
                    break;

                case 'Text':
                    checkIsNotEmpty(item[0],item[1]);
                    //check if input text is of limited length
                    break;

                case 'LargeText':
                    checkIsNotEmpty(item[0],item[1]);
                    //check if input text is of limited length
                    break;

                case 'Date':
                    checkIsNotEmpty(item[0],item[1]);
                    isDate(item[1]);
                    break;
                
                case 'Number':
                    checkIsNotEmpty(item[0],item[1]);
                    isNumber(item[1])
                    break;

                case 'Email':
                    checkIsNotEmpty(item[0],item[1]);
                    ValidateEmail(item[1])
                    break;

                case 'Phone':
                    checkIsNotEmpty(item[0],item[1]);
                    validatePhone(item[1]);
                    break;

                case 'Image':
                    checkIsNotEmpty(item[0],item[1]);
                    break;

                case 'File':
                    checkIsNotEmpty(item[0],item[1]);
                    break;
            }
            
        }
        
    })

    console.log(dataErrors);
    if(dataErrors.length === 0){
        console.log("EVERYYTHING OOOK")
        next();
    }
    else{
        res.send(dataErrors);
    }

    //Check if given value is empty or null
    function checkIsNotEmpty(field, item) {
        if(item === null || item === '') {
            dataErrors.push(`MISSING FIELD: { ${field}: MISSING DATA } field REQUIRE data it cannot be left empty.`)
         }             
    }

    //Check if given value is date or not
    function isDate(date) {
        const validRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ 
            if (date.match(validRegex)) {
                //DO Nothing         
            } else {
                dataErrors.push(`INVALID DATE: [ ${date} ] `)
            }
      }

      //Check if email is valid
      function ValidateEmail(input) {

        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if (input.match(validRegex)) {
            //DO Nothing         
        } else {
            dataErrors.push(`INVALID EMAIL: [ ${input} ] `)
        }
      
      }

      //Validate phone number
      function validatePhone(number){
        const regexExp = /^[6-9]\d{9}$/gi;
        const result = regexExp.test(number);
        if(!result){
            dataErrors.push(`INVALID PHONE NUMBER: [ ${number} ] . Phone number should be of length 10 only and shoulld always start with either  6 or 7 or 8 or 9.`)
        }
      }

      //check if given value is a NUMBER
      function isNumber(number){
        const result = isNaN(number);
        if(result){
            dataErrors.push(`INVALID NUMBER: [ ${number} ]. It should only contaion only of digits.`)
        }
      }
    }
    catch(err){
        return res.status(400).json({message: err});
    }
    
}