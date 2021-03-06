import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Domain from '../../components/domain';

const DisplayAllModels = () => {
    const domainName = Domain()

    let [ models, setModels ] = useState([]);

    useEffect(() => {
        axios.get(`${domainName}/modeloperations/all`)
        .then(response => {
            setModels(response.data)
            console.log(models)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleDelete = (e) => {
        const index = e.target.dataset.index;
        const id = e.target.dataset.id;
        console.log(id)
        models.splice(index,1);
        setModels([...models]);
        axios.delete(`${domainName}/modeloperations/deleteSchema/${id}`)
        .then(response => {
            console.log(response)
        })
    }

    return (
        <div>
            
                <Link to='/adminScreen'>
                    <Button>Go Back</Button>
                </Link>
            
            <h1 style={{"textAlign": "center"}}>ALL MODELS</h1>

            <div style={{"textAlign": "center"}}>
                <Link to="/models/addNewModel">  
                    <Button>Add New Model</Button>
                </Link>
            </div>
            
            
            {models && models.map((model, index) => 
                <div key={index}>
                    <Link  to={`/models/${model.name}`}>
                        <h3 key={index}>{`${index+1}. ${model.name}`} </h3>
                    </Link>
                    <button onClick={handleDelete} data-index={index} data-id={model._id}>Delete</button>
                </div>
                )}
        </div>
    )
}

export default DisplayAllModels;