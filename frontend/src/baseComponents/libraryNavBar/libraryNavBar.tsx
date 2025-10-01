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
import styles from './Navbar.module.scss';
import ThemeSwitcherView from '../ThemeSwitcher/ThemeSwitcherView'
import Link from 'next/link';


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
          <Navbar.Brand href="/" className={styles.navLink}>
            <BookFill className={`${styles.navIcon}`} />
            Library Manager
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav>

              <Nav.Link
                as={Link}
                href="/authors"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink}`}
              >
                <PeopleFill className={`${styles.navIcon}`} />
                All Authors
              </Nav.Link>

              <Nav.Link
                as={Link}
                href="/authorprofiles"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink}`}
              >
                <JournalBookmark className={`${styles.navIcon}`} />
                Authorprofiles
              </Nav.Link>

              <Nav.Link
                as={Link}
                href="/books"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink}`}
              >
                <Book className={`${styles.navIcon}`} />
                All Books
              </Nav.Link>

              <Nav.Link
                as={Link}
                href="/createbook"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink}`}
              >
                <PlusCircle className={`${styles.navIcon}`} />
                Add book
              </Nav.Link>

              <Nav.Link
                as={Link}
                href="/publishers"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink}`}
              >
                <Building className={`${styles.navIcon}`} />
                Publishers
              </Nav.Link>
            </Nav>
            <Nav>
              <div className={styles.themeToggle}>
                <ThemeSwitcherView />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  );
}