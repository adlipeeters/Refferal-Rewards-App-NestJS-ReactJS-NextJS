import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import axios from 'axios'
import { User } from '../models/user'
import { Accordion, AccordionDetails, AccordionSummary, Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import { Order } from '../models/order'
import { OrderItem } from '../models/order-item'

const Orders = () => {
    const perPage = 10;
    const [orders, setOrders] = useState<Order[] | []>([])
    const [page, setPage] = useState(0)

    useEffect(() => {

        (async () => {
            const { data } = await axios.get('orders');
            setOrders(data);
        })()

        return () => {

        }
    }, [])

    return (
        <Layout>

            {orders.map((order: Order) => {
                return (
                    <Accordion key={order.id}>
                        <AccordionSummary>
                            {order.name} ${order.total}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Product Title</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.order_items.map((order_item: OrderItem) => {
                                        return (
                                            <TableRow key={order_item.id}>
                                                <TableCell>{order_item.id}</TableCell>
                                                <TableCell>{order_item.product_title}</TableCell>
                                                <TableCell>{order_item.price}</TableCell>
                                                <TableCell>{order_item.quantity}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                )
            })}

        </Layout>
    )
}

export default Orders