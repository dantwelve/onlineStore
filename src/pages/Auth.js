import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Form, Card, Button, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { Context } from '..';

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    async function click() {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
                navigate(SHOP_ROUTE)
            } else {
                data = await registration(email, password)
                console.log(data);
                navigate(LOGIN_ROUTE)
            }
            user.setUser(user)
            user.setIsAuth(true)

        } catch (e) {
            alert(e.data.message)
        }

    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        placeholder='Введите ваш email'
                        className='mt-3'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        placeholder='Введите ваш пароль'
                        className='mt-3'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                        {isLogin
                            ? <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></div>
                            : <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйтесь!</NavLink></div>
                        }
                        <Button
                            variant='outline-success'
                            onClick={click}
                        >
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth