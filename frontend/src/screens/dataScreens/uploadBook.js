import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Domain from '../../components/domain';

const UploadBook = () => {
    let navigate = useNavigate();

    const domainName = Domain()

    //2. Storing schema in <model>, input data in <data> and model ID in <id>
    let [ model, setModel ] = useState({});
    let [data, setData ] = useState({});
    let [id, setId] = useState();

    useEffect(() => {
        //3. Getting schema by modelname - needed for form building
        axios.get(`${domainName}/modeloperations/bookDetails`)
        .then(response => {
            setId(response.data._id);
            setModel({...response.data})
        })
    },[setModel])

    //7. Set input type
    const handleFieldType = (type) => {
        switch (type) {
            case "Text":
              return "text";
            case "LargeText":
                return "text";
            case "Title":
                return "text";
            case "Number":
              return "number";
            case "Email":
                return "email";
            case "Date":
                return "date";
            case "Image":
                return "file";
            case "File":
                return "file";
            case "Phone":
                return "tel";
            default:
              return null;
          }
    }
    
    //6. Update data of a input value along with data variable
    const handleChange = async (e) => {
        console.log(e.target)
        console.log(data)
        if(e.target.type === "file"){
            const file = e.target.files[0]
            const formData = new FormData();
            formData.append('file', file)

            try{
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                const pathReceived  = await axios.post(`${domainName}/mediaUploads/image`, formData, config );
                const fileLocation = `${domainName}/${pathReceived.data}`;
                let newValue = { [e.target.name]: `${fileLocation}`}
                console.log(newValue)
                setData({...data, ...newValue})
            } catch(error) {
                console.log(error);
            }
        }
        
        else {
            let newValue = { [e.target.name]: e.target.value}
            console.log(newValue)
            setData({...data, ...newValue})
        }
        
        console.log(data);        
    }

    //8. Saving the data by creating json object and sending it to backend.
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        console.log(id)
        // validate(data)
        //8(a) - JSON object creation which backend needs
        let updatedData = {
            "modelId": id,
            "data": {
                    ...data                   
            }
        }
        console.log(updatedData)

        //8(b) - Update data
        axios.post(`${domainName}/data/post/bookDetails`, updatedData)
        .then(response => {
            console.log(response)
        })

        //8(c) - Go Back to previous page
        navigate(`/userhome`);
    }

//Check if given value is empty or null
        function checkIsNotEmpty(field, item) {
            if(item === null || item === '') {
                console.log(field + "EMPTY")
             }             
        }

    return (

        <div className="new-data">
            <Link to='/userhome'>
                <Button>Go Back</Button>
            </Link>
        <div className="container">
            <h1 className="header">Upload Book</h1>
            {/* 4. Dynamic form Generation */}
            <form id="form" className="form" onSubmit={handleSubmit}>
             {
                model.schemaModel &&
                    Object.entries(model.schemaModel).map(item => {
                        const type = item[1].type;
                        // const field = item[0];
                        // console.log(type)
                        
                        return(
                            //5. Displaying each fields and its data
                            <div key={item[0]}>      
                            { type === "LargeText" ? (
                                <>
                                <label>{item[0]}: </label>
                                <textarea name={item[0]}  onChange={handleChange} rows="4" cols="20" />  
                                </>
                            ) : (
                                <>
                                <div className="form-control" key={item[0]}>
                                    <label htmlFor={item[0]}>{item[0]}</label>
                                    <input  name={item[0]} type={handleFieldType(type)} onChange={handleChange}  id={item[0]} />
                                    <i className="fas fa-check-circle"></i>
                                    <i className="fas fa-exclamation-circle"></i>
                                    <small>Error message</small>
                                </div>
                                </>  
                            )}                          
                                {/* <label>{item[0]}: </label>
                                <input name={item[0]} type={handleFieldType(type)} onChange={handleChange} />                                */}
                            </div>

                            
                        )
                    })
            }

           <button>Submit</button>
           </form>
        </div>
        </div>
    )
}

export default UploadBook;