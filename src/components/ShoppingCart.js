import React from 'react'
import { useCart } from '../redux/ducks/cart'


export default function Cart() {
  const { products, cart, addClothes, removeClothes } = useCart()

  let prices = cart.map(cat => {
    return cat.item.price
  })
  function add(a,b) {
    return a + b
} 

function handleDelete(id) {
  removeClothes(id)
}
let subtotal = prices.reduce(add, 0).toFixed(2)

return (
  <div className="cartContainer">
    {cart.map(item=> {
      return (
        <div className="cartSec">
          <img src={`/assets/${item.item.sku}_2.jpg`}></img>
          <div className="colorSame">
            <div className="remove" onClick={e => handleDelete(cart.id)}>
            <button className="xButton">X</button>
          </div>
          <div className="style">{item.item.title}</div>
          <div>{item.item.style}</div>
          <div className="color">${item.item.price.toFixed(2)}</div>
          </div>
          </div>
      )
    })}

    <div id="subtotal">
      <p id="subName">Subtotal</p>
      <p className="subPrice">${subtotal}</p>
    </div>
    <div className="installs">
      <div> OR UP TO 5 x ${(subtotal / 5).toFixed(2)}</div>
    </div>
    <button>Checkout</button>
    </div>
  )
}