import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/order-api';
import styles from './NewOrderPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser }) {
  console.log(user)
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      console.log("ITEMS:", items)
      // categoriesRef.current = items.reduce((cats, item) => {
      //   const cat = item.category.name;
      //   return cats.includes(cat) ? cats : [...cats, cat];
      // }, []);
      setMenuItems(items);
      // setActiveCat(categoriesRef.current[0]);
      // setActiveCat(categoriesRef.current[0]);
    }
    getItems();
    async function getCart() {
      const cart = await ordersAPI.getCart();
      console.log("CART: ", cart)
      setCart(cart);
    }
    getCart();
  }, []);
  // Providing an empty 'dependency array'
  // results in the effect running after
  // the FIRST render only

  /*-- Event Handlers --*/
  async function handleAddToOrder(itemId) {
    const updatedCart = await ordersAPI.addItemToCart(itemId);
    setCart(updatedCart);
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  return (
    <main className={styles.NewOrderPage}>
      <aside>
        <Logo />
        {/* <CategoryList
          categories={categoriesRef.current}
          cart={setCart}
          setActiveCat={setActiveCat}
        /> */}
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <section>
        {/* <MenuList
          menuItems={menuItems.filter(item => item.category.name === activeCat)}
          handleAddToOrder={handleAddToOrder}
        /> */}
        {/* <OrderDetail
          order={cart}
          handleChangeQty={handleChangeQty}
          handleCheckout={handleCheckout}
        /> */}

        <div id="books">
          {menuItems.map((item, index) => {
            const src = `/` + item.img
            return (
              <div className='book' key={item._id}>
                <h2>{item.name}</h2>
                <img src={src} alt="" />
                <button onClick={()=>{
                  handleAddToOrder(item._id)
                }}>
                  Add to order
                </button>
                <button>
                  Buy now
                </button>
              </div>
            )
          })}
        </div>
        
          {cart && (
            <div id="cart">
              <h3>Your cart</h3>
              {cart.lineItems.length ? 
                cart.lineItems.map((item, index) => {
                  return (
                    <div className='cart-item' key={item._id}>
                      {item.item.name} x{item.qty}
                    </div>
                  )
                })
              :
              "Your cart is empty"}
            </div>
          )}

      </section>
    </main>
  );
}