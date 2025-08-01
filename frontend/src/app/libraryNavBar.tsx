import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function LibraryNavBar() {
  return (
    <>
      <br />
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Library manager</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/authors/">Authors</Nav.Link>
            <Nav.Link href="/publishers/">Publishers</Nav.Link>
            <Nav.Link href="/books/">Books</Nav.Link>
            <Nav.Link href="/createbook/">Add book</Nav.Link>
            <Nav.Link href="/authorprofiles/">Author profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default LibraryNavBar;
