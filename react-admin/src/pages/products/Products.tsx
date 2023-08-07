import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import Nav from '../../components/Nav'
import Layout from '../../components/Layout'
import axios from 'axios'
import { User } from '../../models/user'
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import { Product } from '../../models/product'
import ButtonGroup from '@mui/material/ButtonGroup';

const Products = () => {
    const perPage = 10;
    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(0)

    useEffect(() => {

        (async () => {
            const { data } = await axios.get('products');
            setProducts(data);
        })()

        return () => {

        }
    }, [])

    const del = async (id: number) => {
        if (window.confirm('Are you sure ?')) {
            await axios.delete(`products/${id}`)

            setProducts(products.filter(p => p.id !== id));
        }
    }

    return (
        <Layout>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/products/create'}>
                    <Button variant="contained">Add</Button>
                </Link>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.slice(page * perPage, (page + 1) * perPage).map((product: Product) => {
                        return (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <img src={product.image} width={50} alt='product' />
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <ButtonGroup variant="contained" aria-label="small button group">
                                        <Link to={`/products/${String(product.id)}/edit`}>
                                            <Button variant="contained" color="primary">Edit</Button>
                                        </Link>
                                        <Button variant="contained" color="error" onClick={() => del(product.id)}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination rowsPerPageOptions={[]} count={products.length} onPageChange={(e: any, newPage: any) => setPage(newPage)} page={page} rowsPerPage={perPage} />
                </TableFooter>
            </Table>
        </Layout>
    )
}

export default Products