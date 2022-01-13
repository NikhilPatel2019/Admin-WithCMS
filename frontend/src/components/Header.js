import React, { useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap"; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

const Header = () => {
    let navigate = useNavigate();

    const Info = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(Info)
    console.log(userInfo)

    useEffect(() => {
        
      }, [Info, navigate])

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    }

    return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>

                <Link to='/'>
                  <Navbar.Brand > CMS</Navbar.Brand>
                </Link>

                { userInfo ? (
                  <Nav>
                    <NavDropdown title={userInfo.firstName} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    
                    <NavDropdown.Item onClick={logoutHandler}>Sign Out</NavDropdown.Item>
                  </NavDropdown>
                  </Nav>
                ) : 
                (
                    <LinkContainer to='/login'>
                        <Nav.Link >
                            Sign In
                        </Nav.Link>
                    </LinkContainer>
                )
                    
                }
          
        </Container>
      </Navbar> 
    </header>
  )
}

export default Header
