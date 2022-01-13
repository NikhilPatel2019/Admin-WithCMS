import { useNavigate, useParams } from "react-router";
import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddNewField = () => {
    //1. Params for getting Modelname and navigate to go back to previous page when submitted
    let params = useParams();
    let navigate = useNavigate()
    console.log(params)

    //3. HandleSUbmit
    const handleSubmit= (e) => {
        e.preventDefault();

        //4. Getting values of fields
        const name = e.target.name.value;
        const type =  e.target.fieldType.value;
        const required = e.target.required;
        console.log("FIeld Name: " + name);
        console.log("FIeld Type: " + type);

        //5. Create object of newfield that backend needs
        const newField = {
            "schemaModel": {
                [name]: {
                    "type": type,
                    "required": (required === 'true')
                }
            }
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //6. Send PUT request to update schema
        axios.put(`http://localhost:9090/modeloperations/updateSchema/${params.modelName}`, newField, config)
        .then(response => {
            console.log(response.data);
        })

        //7. Go back after schema is updated
        navigate(`/models/${params.modelName}`);
    }

    return (
        
        <div>
            <Link to={`/models/${params.modelName}`}>
                <Button>Go Back</Button>
            </Link>
            <h1>Add New field</h1>
            {/* 2. Creating form to get new field details */}
            <form onSubmit={handleSubmit}>
                <label>Name:</label><br/>
                <input type="text" name="name" /><br/>
                <label>Choose field type:</label>
                <select name="fieldType">
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
                    <h5>Required</h5>
                    <input id="true" type="radio" name="required" value="true" defaultChecked />
                    <label htmlFor="true">true</label>
                    <input id="false" type="radio" name="required" value="false" />
                    <label htmlFor="false">false</label><br/>
                    
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddNewField;