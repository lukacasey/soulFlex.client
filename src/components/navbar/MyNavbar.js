import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function MyNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="logo"
            // need to download and use
            src="https://scontent.fsyd3-1.fna.fbcdn.net/v/t39.30808-6/313414679_101146732813997_3027693699314990880_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=QlnT8m0lKfsAX-xaCCC&_nc_ht=scontent.fsyd3-1.fna&oh=00_AfAPVDvEzRV4oNDvGlaEo_22hW1aHvEOBAEBygdtEjSreg&oe=64A08B85"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          SoulFlex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#book">Book a Session</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#inquiry">Send an Inquiry</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
