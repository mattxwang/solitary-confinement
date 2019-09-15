import React from 'react';
import Game from '../Game/Game';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const githubLink = "https://github.com/malsf21/solitary-confinement";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href={githubLink}><span role="img" aria-label="a playing card">🃏</span>Solitary Confinement</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href={githubLink} target="_blank" rel="noopener noreferrer">Source Code</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Game />
        <p className="text-center mt-2">
            made by <a href="https://matthewwang.me" target="_blank" rel="noopener noreferrer">matt wang</a> with react and react-bootstrap | cards by <a href="https://www.me.uk/cards/" target="_blank" rel="noopener noreferrer">Adrian Kennard</a>
        </p>
      </Container>
      
    </div>
  );
}

export default App;
