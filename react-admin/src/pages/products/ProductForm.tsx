import React, { SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Button, TextField } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: '',
        description: '',
        image: '',
        price: '',
    });

    useEffect(() => {
        if (id) {

            (async () => {
                const { data } = await axios.get(`products/${id}`);
                setProduct({
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    price: data.price,
                })
            })()
        }
    }, [])

    const [redirect, setRedirect] = useState(false);

    const handleChange = (event: any) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
        }
        if (id) {
            await axios.put(`products/${id}`, data);
        } else {
            await axios.post('products', data);
        }

        setRedirect(true);
    };

    useEffect(() => {
        if (redirect) {
            navigate('/products');
        }
    }, [redirect, navigate]);

    return (
        <Layout>
            <form className="mt-4" onSubmit={submit}>
                <div className="mb-3">
                    <TextField label="Title" name="title" value={product.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <TextField label="Description" name="description" value={product.description} rows={4} multiline onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <TextField label="Image" name="image" value={product.image} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <TextField label="Price" name="price" value={product.price} type="number" onChange={handleChange} />
                </div>
                <Button variant="contained" color="primary" type='submit'>Submit</Button>
            </form>
        </Layout>
    )
}

export default ProductForm