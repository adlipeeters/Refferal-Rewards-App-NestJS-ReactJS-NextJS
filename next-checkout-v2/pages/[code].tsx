import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { SyntheticEvent, useEffect, useState } from 'react'
import axios from 'axios'
import constants from '@/constants'

const inter = Inter({ subsets: ['latin'] })

declare var Stripe: any;

export default function Home() {
  const router = useRouter();
  const { code } = router.query;
  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState<any>([]);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    country: '',
    city: '',
    zip: '',
  })

  const handleChange = (event: any) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => {
    if (code != undefined) {
      (async () => {
        const { data } = await axios.get(`${constants.endpoint}links/${code}`);
        setUser(data.user);
        setProducts(data.products);
        setQuantities(data.products.map((p: any) => ({
          product_id: p.id,
          quantity: 0,
        })))
      })()
    }

  }, [code])

  const change = (id: number, quantity: number) => {
    if (Number.isNaN(quantity)) {
      quantity = 0
    }
    setQuantities(quantities.map((q: any) => {
      if (q?.product_id === id) {
        return {
          ...q,
          quantity
        }
      }
      return q;
    }));
  }

  const total = () => {
    return quantities.reduce((s: any, q: any) => {
      const product: any = products.find((p: any) => p.id === q.product_id)
      return s + product?.price * q.quantity;
    }, 0)
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data } = await axios.post(`${constants.endpoint}orders`, {
      form,
      products: quantities
    })
    console.log(data)
    const stripe = new Stripe(constants.stripe_key)

    stripe.redirectToCheckout({
      sessionId: data.id
    })
  }

  return (
    <Layout>
      <main>
        <div className="py-5 text-center">
          <h2>Welcome</h2>
          <p className="lead">{user?.name} has invited yout to buy these products</p>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Products</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {products.map((product: any) => {
                return (
                  <div key={product?.id}>
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">{product?.title}</h6>
                        <small className="text-body-secondary">{product?.description}</small>
                      </div>
                      <span className="text-body-secondary">${product?.price}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center lh-sm">
                      <div>
                        <h6 className="my-0">Quantity</h6>
                      </div>
                      <input onChange={(e) => change(product.id, parseInt(e.target.value))} className="form-control text-muted" defaultValue={0} style={{ marginLeft: '5px', width: '80px' }} type="number" min="0" />
                    </li>
                  </div>
                )
              })}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total()}</strong>
              </li>
            </ul>

          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Personal Info</h4>
            <form className="needs-validation" onSubmit={submit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input name="first_name" onChange={handleChange} type="text" className="form-control" id="firstName" placeholder="First name" required />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input name="last_name" onChange={handleChange} type="text" className="form-control" id="lastName" placeholder="Last name" required />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input name="email" onChange={handleChange} type="email" className="form-control" id="email" placeholder="you@example.com" required />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input name="address" onChange={handleChange} type="text" className="form-control" id="address" placeholder="1234 Main St" required />

                </div>


                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input name="country" onChange={handleChange} type="text" className="form-control" id="country" placeholder="Country" />
                </div>

                <div className="col-md-5">
                  <label htmlFor="city" className="form-label">City</label>
                  <input name="city" onChange={handleChange} type="text" className="form-control" id="city" placeholder="City" />
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input name="zip" onChange={handleChange} type="text" className="form-control" id="zip" placeholder="Zip" />

                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">Checkout</button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  )
}
