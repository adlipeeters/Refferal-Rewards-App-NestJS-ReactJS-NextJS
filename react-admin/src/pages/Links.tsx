import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import axios from 'axios'
import { User } from '../models/user'
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import { Link } from '../models/link'
import { useParams } from 'react-router-dom';

const Links = (props: any) => {
    const perPage = 10;
    const [links, setLinks] = useState<Link[] | []>([])
    const [page, setPage] = useState(0)
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`users/${id}/links`);
            setLinks(data);
        })()

        return () => {

        }
    }, [])

    return (
        <Layout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Count</TableCell>
                        <TableCell>Revenue</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {links.slice(page * perPage, (page + 1) * perPage).map((link: Link) => {
                        return (
                            <TableRow key={link.id}>
                                <TableCell>{link.id}</TableCell>
                                <TableCell>{link.code}</TableCell>
                                <TableCell>{link.orders.length}</TableCell>
                                <TableCell>{link.orders.reduce((s, o) => s + o.total, 0) || 0}</TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination rowsPerPageOptions={[]} count={links.length} onPageChange={(e: any, newPage: any) => setPage(newPage)} page={page} rowsPerPage={perPage} />
                </TableFooter>
            </Table>
        </Layout>
    )
}

export default Links