import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import axios from 'axios'
import { User } from '../models/user'
import { Button, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'

const Users = () => {
    const perPage = 10;
    const [users, setUsers] = useState<User[] | []>([])
    const [page, setPage] = useState(0)

    useEffect(() => {

        (async () => {
            const { data } = await axios.get('ambassadors');
            setUsers(data);
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
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.slice(page * perPage, (page + 1) * perPage).map((user: User) => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Link to={`/users/${String(user.id)}/links`}>
                                        <Button variant="contained" color="primary">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination rowsPerPageOptions={[]} count={users.length} onPageChange={(e: any, newPage: any) => setPage(newPage)} page={page} rowsPerPage={perPage} />
                </TableFooter>
            </Table>
        </Layout>
    )
}

export default Users