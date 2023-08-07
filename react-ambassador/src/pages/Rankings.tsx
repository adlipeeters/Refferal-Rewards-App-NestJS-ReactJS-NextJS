import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Stats as StatsInterface } from '../models/stats'

const Rankings = () => {
    const [rankings, setRankings] = useState([])

    useEffect(() => {

        (async () => {
            const { data } = await axios.get('rankings');
            setRankings(data)
            console.log(data)
        })()
    }, [])

    return (
        <Layout>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankings.map((r: { name: string, revenue: number }, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{r.name}</td>
                                    <td>{r.revenue}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Rankings