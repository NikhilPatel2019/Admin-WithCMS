import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/formContainer';
import Message from '../components/Message';
import axios from 'axios'

const LoginScreen = (  ) => {
    let navigate = useNavigate();

    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [message, setMessage] = useState();
    const adminInfo = localStorage.getItem('adminInfo');
    const admin = JSON.parse(adminInfo)

    useEffect(() => {
        //This is force redirect
      if(adminInfo){
        if(admin.isAdmin){
            navigate('/adminscreen');
         }
         
            } 
    }, [adminInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Submit Called")
        const loginDetails = {
            'email': email,
            'password': password
         }

         if(password && email){
         axios.post('http://localhost:9090/user/login', loginDetails)
         .then( response => {
             console.log(response);
             if(response.status === 200){
                 localStorage.setItem('adminInfo', JSON.stringify(response.data))
                 console.log(response.data.isAdmin);
                 
                 if(response.data.isAdmin){
                    navigate('/adminscreen');
                 }
                 else{
                    setMessage("Not Authorized as Admin")
                 }
                 
             }
         })
        }
    }

    return(
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message variant={`danger`} children={message}/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email'
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password'
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Submit</Button>
            </Form>

            {/* <Row className='py-3'>
                <Col>
                    New User? <Link to={`/signup`}> Register</Link>
                </Col>
            </Row> */}
        </FormContainer>
    )
}

export default LoginScreen;