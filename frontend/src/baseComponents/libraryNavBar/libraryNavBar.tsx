'use client';
import {
  Container,
  Nav,
  Navbar
} from 'react-bootstrap';
import {
  BookFill,
  PeopleFill,
  JournalBookmark,
  Book,
  PlusCircle,
  Building
} from 'react-bootstrap-icons';
import { useState } from 'react';
import styles from './Navbar.module.css';
import ThemeSwitcherView from '../ThemeSwitcher/ThemeSwitcherView'


export default function LibraryNavBar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.navbarContainer}>
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        collapseOnSelect
        className={styles.navbar}
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <BookFill className={`${styles.navIcon} me-2`} />
            Library Manager
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link
                href="/authors"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink} d-flex align-items-center`}
              >
                <PeopleFill className={`${styles.navIcon} me-2`} />
                All Authors
              </Nav.Link>

              <Nav.Link
                href="/authorprofiles"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink} d-flex align-items-center`}
              >
                <JournalBookmark className={`${styles.navIcon} me-2`} />
                Authorprofiles
              </Nav.Link>

              <Nav.Link
                href="/books"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink} d-flex align-items-center`}
              >
                <Book className={`${styles.navIcon} me-2`} />
                All Books
              </Nav.Link>

              <Nav.Link
                href="/createbook"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink} d-flex align-items-center`}
              >
                <PlusCircle className={`${styles.navIcon} me-2`} />
                Add book
              </Nav.Link>

              <Nav.Link
                href="/publishers"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink} d-flex align-items-center`}
              >
                <Building className={`${styles.navIcon} me-2`} />
                Publishers
              </Nav.Link>
            </Nav>

            {/* <Nav>
              <div className={styles.themeToggle}>
                <ThemeToggle />
              </div>
            </Nav> */}
            <Nav>
              <div className={styles.themeToggle}>
                <ThemeSwitcherView />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}