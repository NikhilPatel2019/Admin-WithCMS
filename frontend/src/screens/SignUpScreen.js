import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from '../components/formContainer';
import Message from '../components/Message';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SignUpScreen = (  ) => {
    let navigate = useNavigate();

    const adminInfo = localStorage.getItem('adminInfo');
    const admin = JSON.parse(adminInfo)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    // const [role, setRole] = useState('');

    useEffect(() => {
        if(adminInfo){
            if(admin.isAdmin){
                navigate('/adminscreen');
             }
             else{
                navigate('/userhome');
             }
                }
    }, [adminInfo, navigate, message])

    const submitHandler = (e) => {
        e.preventDefault();
        
        if(password !== confirmPassword){
           setMessage("Invalid Password")
        } else{
            const user = {
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'password': password
            }
            console.log(user);
            axios.post('http://localhost:9090/user/register', user)
            .then(response => {
                if(response.data === "user already exists"){
                    setMessage("User Already Registered")
                } else {
                    localStorage.setItem('adminInfo', JSON.stringify(response.data))
                        if(response.data.isAdmin){
                            navigate('/adminscreen');
                         }
                         else{
                            navigate('/userhome');
                         }
                            
                }

            })
        }       
    }
    
    return(
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" value={firstName} 
                                  onChange={(e) => setFirstName(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" value={lastName} 
                                  onChange={(e) => setLastName(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} 
                                  onChange={(e) => setEmail(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} 
                                  onChange={(e) => setPassword(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} 
                                  onChange={(e) => setConfirmPassword(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">Register</Button>

                <Row className="py-3">
                    <Col> Already have an account? <Link to={ `/login`}>
                                        Sign In
                                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default SignUpScreen;