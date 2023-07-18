import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
export default function Header() {
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>Welcome to Tic Tac Toe</Navbar.Brand>
                </LinkContainer>
            </Container>
        </Navbar>
    </header>
  )
}
