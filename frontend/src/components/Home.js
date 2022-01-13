import React from 'react';
import { useNavigate } from 'react-router';

const Home = (  ) => { 
    let navigate = useNavigate();

    const Info = localStorage.getItem('userInfo');
    if(Info){
        navigate('/roleselect')
    }
    

    return(
        <div>
            <h1>Hedless CMS LANDING PAGE</h1>            
        </div>
    )
}

export default Home;