import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Form, Row } from 'react-bootstrap'
import { Context } from '..'

const BrandBar = observer(() => {
    const { device } = useContext(Context)

    return (
        <Form className='d-flex'>
            {device.brands.map(brand =>
                <Card
                    style={{ cursor: "pointer" }}
                    onClick={() => brand.id === device.selectedBrand.id ? device.setSelectedBrand({}) : device.setSelectedBrand(brand)}
                    key={brand.id}
                    className="p-3"
                    border={brand.id === device.selectedBrand.id ? "danger" : "light"}
                >
                    {brand.name}
                </Card>
            )}
        </Form>
    )
})

export default BrandBar