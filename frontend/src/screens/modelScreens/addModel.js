import React, { useState } from 'react';
import { useNavigate } from 'react-router'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Domain from '../../components/domain';

const NewModel = () => {
    //1. Use Navigate to go to allModels route after submitting schema
    let navigate = useNavigate();

    const domainName = Domain()

    //2. fields to record all the fields submitted
    const [ fields, setFields ] = useState([])

    //3. set modelName inputed by user
    const [ modelName, setModelName ] = useState();

    //5. Set modelName inputed by user - character by character
    const handleChange = (e) => {
        const model = e.target.value;
        setModelName(model);      
    }

    //7. Adding new field in fields array
    const handleNewField= (e) => {
        e.preventDefault();

        //7(A) - get name and type of a field using event object
        const name = e.target.name.value;
        const type =  e.target.fieldType.value;
        const required = e.target.required.value;

        //7(B) - Create object using this name and type and push it in an array
        const addNewField = {
            "fieldName": name, 
            "fieldType": type,
            "required":  (required === 'true')
        }
        console.log(addNewField)
        setFields([...fields,addNewField])
        console.log(fields)
        console.log(modelName)

    }    

    //9. Delete the specific field 
    const handleDelete = (e) => {
        //9(A) - index passed in dataset object
        console.log(e.target.dataset.index)
        const index =e.target.dataset.index;

        //9(B) - Delete object from the fields array with given index
        fields.splice(index,1);
        console.log(fields)
        setFields([...fields])
    }

    //11. Generate schema for back-end and send data to backend
    const handleSubmit = () => {
        console.log(fields)

        //11(A) - All fields will be stored here - schemaType of <schemaModel>
        let schema = { }

        //11(B) - Creating object and pushing it to schema 
        if(fields){
            fields.map(field => {
                
                //11(C) - this is what schema model for every field should be like
                const currentField = {
                    [field.fieldName]: {
                        "type": field.fieldType,
                        "required": (field.required === 'true')
                    }
                }
                console.log(currentField)
                //11(D) - push it on schema
                Object.assign(schema, currentField)

                return( console.log());
            })
        }        
        
        //11(E) - final data that is to be sent to back-end
        const dataToSend = {
            "schemaModel": {
                ...schema
            },
            "name": modelName
        }
        console.log(dataToSend);

        //11(F) - Sending data to back-end
        axios.post(`${domainName}/modeloperations/createSchema`, dataToSend)
        .then(response => {
            console.log(response)
        })

        //11(G) - Go Back
        navigate(`/models`);
    }

    return (
        <div>
            <Link to='/models'>
                <Button>Go Back</Button>
            </Link>
            <h1>Add New Model</h1>
            <div>
                {/* 4. Taking modelName as Input from user */}
                
                 <div>
                 <label>Model Name: </label>
                    <input type="text" name="modelName" onChange={handleChange}/>
                </div>
               

                {/* 6. Add New Field Option to user  - Take fieldName and fieldType as input*/}
                <h5>Add New Field Here</h5>   

                <form onSubmit={handleNewField}>

                    <div>
                        <label>Field Name:</label>
                        <input type="text" name="name"/>
                        
                    </div>
                    
                    <select name="fieldType" className="custom-select">
                        <option value="Text">Text</option>
                        <option value="LargeText">Large Text</option>
                        <option value="Title">Title</option>
                        <option value="Number">Number</option>
                        <option value="Email">Email</option>
                        <option value="Date">Date</option>
                        <option value="Image">Image</option>
                        <option value="File">File</option>
                        <option value="Phone">Phone</option>
                    </select>
                    
                    
                    {/* <h5>Required:</h5>
                    <ul>
                        <li>
                        <input id="true" type="radio" name="required" value="true" defaultChecked />
                        <label htmlFor="true">true</label>
                        </li>
                        <li>
                        <input id="false" type="radio" name="required" value="false" />
                        <label htmlFor="false">false</label>
                        </li>
                    </ul> */}
                    
                
                    <div>
                        <input type="radio" name="required" id="true"  value="true"  checked />
                        <input id="false" type="radio" name="required" value="false"  />
                        <label htmlFor="true">
                            <div ></div>
                            <span>Mandatory</span>
                        </label>
                        <label htmlFor="false">
                            <div></div>
                            <span>Not Mandatory</span>
                        </label>
                    </div>
                

                    <button className="submit-button" type="submit">Add</button>
                </form>                

                {/* 8. Display All the fields added by the user */}
                <h3 className="sub-heading">Fields Added</h3>
                {fields.map((field, index) => (
                    <div key={index}>
                        <h5>Field Name: {field.fieldName}</h5>
                        <h5>Field Type: {field.fieldType}</h5>
                        <button className="delete-field" onClick={handleDelete } data-index={index}>Delete</button>
                    </div>
                ))}
                <hr/>
                
                {/* 10. Save data and go back to allModels Route */}
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default NewModel;