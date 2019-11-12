import Axios from "axios"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// const ADD_TO_CART = 'cart/ADD_TO_CART'
// const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART'
const GET_PRODUCTS = 'cart/GET_PRODUCTS'
const SHOW_CART = '/cart/SHOW_CART'


const initialState = {
    products:[],
    items: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        // case ADD_TO_CART:
        //     return {...state, items: action.payload}
        // case REMOVE_FROM_CART:
        //     return {...state, products: action.payload.filter(product => product.id !== action.payload)}
        case GET_PRODUCTS:
            return {...state, items: action.payload}
        case SHOW_CART:
            return {...state, products: action.payload}
        default:
            return state
    }
}

function getProducts() {
    return dispatch => {
        Axios.get("./products").then(resp => {
            dispatch({
                type: GET_PRODUCTS,
                payload: resp.data
            })
        })
    }
}

export function addToCart(item) {
    return dispatch => {
        Axios.post("/cart",{item}).then(resp => {
            dispatch(showCartItems(resp.data))
        })
    }
}

export function removeFromCart(id) {
    return dispatch => {
        Axios.post(`/cart/${id}`).then(resp => {
            dispatch(showCartItems(resp.data))
        })
    }
}

export function showCartItems() {
    return dispatch => {
        Axios.get("/cart").then(resp => {
            dispatch({
                type: SHOW_CART,
                payload: resp.data
            })
        })
    }
}

export function useCart() {
    const dispatch = useDispatch()
    const products = useSelector(appState => appState.cartState.products)
    const items = useSelector(appState => appState.cartState.items)
    const cart = useSelector(appState => appState.cartState.products)
    const addClothes = clothes => dispatch(addToCart(clothes))
    const removeClothes = id => dispatch(removeFromCart(id))
    const fetch = () => dispatch(getProducts())
    
    useEffect(() => {
        fetch()
        dispatch(showCartItems())
        dispatch(getProducts())
    }, [dispatch])

    return { products, cart, addClothes, removeClothes,items } 
}