import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';

const NavigationBar = observer(() => {
    const { user } = useContext(Context)
    const { device } = useContext(Context)
    const navigate = useNavigate()

    function logOut() {
        user.setUser({})
        user.setIsAuth(false)
    }

    function toMain() {
        device.setSelectedBrand({})
        device.setSelectedType({})
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink onClick={() => toMain()} style={{ color: 'white' }} to={SHOP_ROUTE}>DeviceShop</NavLink>
                {user.isAuth
                    ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button
                            variant={'outline-light'}
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                        <Button
                            variant={'outline-light'}
                            onClick={() => logOut()}
                            style={{ marginLeft: 5 }}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>}
            </Container>
        </Navbar >
    )
})

export default NavigationBar