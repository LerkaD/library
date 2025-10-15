'use client';
import {
  Container,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';
import {
  BookFill,
  PeopleFill,
  JournalBookmark,
  Book,
  PlusCircle,
  Building,
  PersonFill
} from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import ThemeSwitcherView from '../ThemeSwitcher/ThemeSwitcherView'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/app/basic_types'
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, setUser } from '@/store/authSlice';

export default function LibraryNavBar() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch()

  const state = useSelector((state: any) => state);
  console.log('Full Redux state:', state);

  const { user, isAuthenticated } = useSelector((state: any) => state.authCheker);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          dispatch(logout())
          return;
        }
        // checl valid token on server
        const response = await fetch('http://localhost:8000/api/auth/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(login({
            user: data.user,
            token: token
          }));
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          dispatch(logout())
        }
      } catch (error) {
        console.error('Auntification error:', error);
        dispatch(logout())
      }
    };

    checkAuth();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    dispatch(logout())

    setExpanded(false);

    router.push('/');
    router.refresh();
  };

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
                href="/books"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink}`}
              >
                <Book className={`${styles.navIcon}`} />
                All Books
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
                href="/publishers"
                onClick={() => setExpanded(false)}
                className={`${styles.navLink}`}
              >
                <Building className={`${styles.navIcon}`} />
                Publishers
              </Nav.Link>

              {user?.role === 'ADMIN' && (
                <>
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
                    href="/createbook"
                    onClick={() => setExpanded(false)}
                    className={`${styles.navLink}`}
                  >
                    <PlusCircle className={`${styles.navIcon}`} />
                    Add book
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav className="ms-auto">
              <div className={styles.themeToggle}>
                <ThemeSwitcherView />
              </div>

              {isAuthenticated ? (
                <NavDropdown
                  title={
                    <PersonFill
                      className={`${styles.navIcon}`}
                      style={{ marginLeft: '15px' }}
                    />
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.ItemText className="text-muted small">
                    User: <strong>{user.username}</strong>
                  </NavDropdown.ItemText>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    href="/user-profile"
                    onClick={() => setExpanded(false)}
                  >
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={handleLogout}
                  >
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                //not autorized
                <>
                  <Nav.Link
                    as={Link}
                    href="/login"
                    onClick={() => setExpanded(false)}
                    className={`${styles.navLink}`}
                  >
                    LogIn
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    href="/registration"
                    onClick={() => setExpanded(false)}
                    className={`${styles.navLink}`}
                  >
                    Registration
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}