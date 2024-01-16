import * as ordersAPI from '../../utilities/order-api';
import styles from './CheckoutPage.module.css'


import { useEffect, useState } from 'react';

export default function CheckoutPage() {

    const [cart, setCart] = useState(null);

    async function getCart() {
        const cart = await ordersAPI.getCart();
        console.log("CART: ", cart)
        setCart(cart);
      }

    async function handleChangeQty(itemId, newQty) {
        const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
        setCart(updatedCart);
    }

    useEffect(()=>{
        getCart()
    },[])

  return (
    <main className={styles.CheckoutPage}>
        <h2>Check out</h2>
        {cart && (
            <div id="cart">
              <h3>Your cart</h3>
              {cart.lineItems.length ? 
                cart.lineItems.map((item, index) => {
                  return (
                    <div className='cart-item' key={item._id}>
                      {item.item.name} x{item.qty}
                      <button onClick={()=>{
                        handleChangeQty(item._id, item.qty-1)
                      }}>
                        Remove
                      </button>
                    </div>
                  )
                })
              :
              "Your cart is empty"}
            </div>
          )}
        <button>
            Check out
        </button>
    </main>
  )
}