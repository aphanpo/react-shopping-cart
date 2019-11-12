import React, {useState} from 'react'
import { useCart } from '../redux/ducks/cart'
import "semantic-ui-css/semantic.min.css"
import { Button, Menu, Sidebar } from "semantic-ui-react"
import Cart from "./ShoppingCart"


export default function HomePage (props) {
  const {products, addClothes, cart, removeClothes, items} = useCart()
  const [visible, setVisible] = useState(false)

  function handleAdd(item) {
    addClothes(item)
  }

  return (
    <>
     <div className="topPart">
        <div className="aside">
          <p>Sizes:</p>
          <button className="size">XS</button>
          <button className="size">S</button>
          <button className="size">M</button>
          <button className="size">ML</button>
          <button className="size">L</button>
          <button className="size">XL</button>
          <button className="size">XXL </button>
        </div>

      <div className="prodFound">
        {items.length} Product(s) Found
      </div>

      <div id="filter">
        <p>Order by </p>
        <select>
          <option>Select</option>
          <option>Lowest to highest</option>
          <option>Highest to lowest</option>
        </select>
      </div>
    </div>

    <Button
      icon="shop"
      onClick={e => (visible ? setVisible(true) : setVisible(false))}
      className="cart"
      secondary
      />

    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={visible}
        direction="right"
        id="sidebar"
        >
          <Cart />
        </Sidebar>
    <Sidebar.Pusher>
    
    <div className="container">
      {items.map((product,i) => {
        return(
        <div className="mainSection" 
        key={'key' + i}
        >
          <p>{items.isFreeShipping}</p>
          <img id="picture" src={`/assets/${product.sku}_1.jpg`} />
          <p id="picName">{product.title}</p>
          <p id="picPrice">{product.currencyFormat} {product.price.toFixed(2)}</p>
          <p id="installments">{product.installments} x<b>$
            {(product.price / product.installments).toFixed(2)}</b></p>
          <div className="buy" onClick={e => handleAdd(items)}>
          <button>Add to cart</button>
        </div>
        </div>
        )
        })}
    </div>
    </Sidebar.Pusher>
    </Sidebar.Pushable>
    </>
  )
}


