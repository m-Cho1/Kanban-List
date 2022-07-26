import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AppContext from '../lib/app-context';

export default class MainNav extends React.Component {
  render() {
    const { handleSignOut } = this.context;
    return (
    <>
      {[false].map(expand => (
        <Navbar key={expand} bg="primary" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#" className="text-white">Kanban List <span><i className='bi bi-ui-checks text-white'></i></span></Navbar.Brand>
            <Navbar.Toggle style={{ background: 'white' }} aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#sign-in" onClick={handleSignOut}>Sign Out</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
    );
  }
}

MainNav.contextType = AppContext;
