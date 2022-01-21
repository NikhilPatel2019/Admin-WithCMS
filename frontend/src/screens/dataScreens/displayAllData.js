import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Domain from '../../components/domain';

const DisplayAllData = () => {
    //1. Getting the model names from parameters passed
    let params = useParams();
    const modelName = params.modelName;

    const domainName = Domain();

    //2. Storing data in <model> 
    let [ model, setModel ] = useState([]);

    //3. Requesting data by Model Name and storing it in <model>
    useEffect(() => {
        axios.get(`${domainName}/data/${modelName}`)
        .then(response => {
            setModel([...response.data])
            console.log(model)
        })
        // eslint-disable-next-line
    },[setModel,modelName])

    //6. Delete the data
    const handleDelete = (e) => {
        e.preventDefault();

        axios.delete(`${domainName}/data/delete/${e.target.value}`)
        .then(response => {
            console.log(response);
        })

        // navigate(`/mydata/displayDataByModel/${modelName}`);
    }

    return (
        <div>
            <Link to={`/data`}>
                <Button>Go Back</Button>
            </Link>
             <h1>Model Name: {modelName}</h1> 
            <Link to={`/data/${modelName}/addNewData`} >
                <button>Add new data</button>
            </Link>
            {/* 4. Traverse through received Object            */}
            { model &&
                model.map((item, index) => {
                    console.log(item)
                    return(
                        <div key={index}>
                        <hr /> 
                        <h2>Data No.: {index}</h2>
                            {/* 5. Traversing through the object data field which contains all the field and values */}
                            {item && Object.entries(item.data).map((f, index) => 
                                
                                {
                                    console.log(f[0]);
                                    return(
                                        <div key={index}>
                                            <h3>{f[0]}: {f[1]}</h3>
                                        </div>
                                    )  
                                })}
                        <Link to={`/data/editData/${modelName}/${item._id}`} state={{ from: item }}>                            
                            <button>Edit</button>
                        </Link>
                        <button value={item._id}  type="submit" onClick={handleDelete}>Delete</button>
                        </div>
                    )
                   
                })
            }
        </div>
    )
}

export default DisplayAllData;