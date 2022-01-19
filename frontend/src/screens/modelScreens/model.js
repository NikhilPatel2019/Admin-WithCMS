import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router';
import { Button } from 'react-bootstrap';
import Domain from '../../components/domain';

function Model() {
    const domainName = Domain()
    //1. Getting the model names from parameters passed
    let params = useParams();
    const modelName = params.modelName;
    console.log("Model Name Passed: " + params.modelName)

    //2. Storing schema in <model> 
    let [ model, setModel ] = useState({});

    //3. Requesting Schema by Model Name and storing it in <model>
    useEffect(() => {
        axios.get(`${domainName}/modeloperations/${modelName}`)
        .then(response => {
            setModel({...response.data})
            console.log(model)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[setModel,modelName])

    //4. Check If model and schema Model exist or not
    console.log(model)
    let schemaModel = model.schemaModel;
    console.log(schemaModel);

    return (
        <div>
            <Link to='/models'>
                <Button>Go Back</Button>
            </Link>
            <h1>Model Name: {model.name}</h1>
            <Link to={`/models/${modelName}/addfield`}>
                <button>Add New Field</button>
            </Link>
            

            {/* 5. Display all the field and its type on page */}
            {schemaModel && Object.entries(model.schemaModel).map(item => {
                const type = item[1].type;
                
                return(
                    //6. Iterating through every model fields and types.
                    <div key={item[0]}>
                        <hr />
                        <h2>Field Name: {item[0]}</h2>
                        <h4>Type: {type}</h4>
                    </div>
                )
            })}
            

        </div>
    )
}

export default Model;


