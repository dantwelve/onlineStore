import React, { useContext } from 'react'
import { Route, Routes, Navigate } from "react-router-dom"
import { Context } from '..'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'

function AppRouter() {
    const { user } = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            <Route path="/*" element={<Navigate to={SHOP_ROUTE} replace />} />
        </Routes>
    )
}

export default AppRouter