import React from 'react'
import { Container, Logo, Logout} from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status )

  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/add-post',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }
  ]

  return (
    <header>
      <Container>
        <nav>
          <div>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul>
            {
              navItems.map((item) => (
                item.active ? (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.slug)}>
                      {item.name}
                    </button>
                  </li>
                ) : null
              ))
            }
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header