import Head from 'next/head'
import React from 'react'

const Layout = (props: any) => {
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous" />
                <script src="https://js.stripe.com/v3/"></script>
            </Head>
            <div className="container">
                {props.children}
            </div>
        </>
    )
}

export default Layout