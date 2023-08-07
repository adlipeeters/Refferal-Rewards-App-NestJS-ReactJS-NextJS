import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Stats as StatsInterface } from '../models/stats'

const Stats = () => {
    const [stats, setStats] = useState<StatsInterface[]>([])

    useEffect(() => {

        (async () => {
            const { data } = await axios.get('stats');
            setStats(data)
        })()
    }, [])

    return (
        <Layout>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Link</th>
                            <th>Code</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((s: StatsInterface, index) => {
                            return (
                                <tr key={index}>
                                    <td>{`http://localhost:5000${s.code}`}</td>
                                    <td>{s.code}</td>
                                    <td>{s.revenue}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Stats