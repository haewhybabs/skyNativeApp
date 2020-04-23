import { ADD_TO_CART, REMOVE_FROM_CART } from '../redux/cart_action';
const initial_state = [{
    id: 4,
    name: 'Amala',
    price: 50,
    qty: 1,
    details: []
}];

export default function cartReducer(state = [], action = {}) {
    switch (action.type) {
        case ADD_TO_CART:
            {
                const product = action.payload;
                const cart = state;
                const existingProductIndex = findProductIndex(cart, product.id);


                const updatedCart = existingProductIndex >= 0 ?
                    updateProductUnits(cart, product) : [...cart, product];
                return updatedCart;

            }
        case REMOVE_FROM_CART:
            {
                return state.filter(cartItem => cartItem.id !== action.payload.id)
            }

    }
    return state
}




/*Get product index from cart with productID*/
const findProductIndex = (cart, productID) => {
    return cart.findIndex(p => p.id === productID)
};

/*Update cart with the product index*/
const updateProductUnits = (cart, product) => {

    const productIndex = findProductIndex(cart, product.id);

    /*Push the entire cart to updatedCart*/
    const updatedCart = [...cart];
    /*Current Product to update*/
    const existingProduct = updatedCart[productIndex];

    // const totalAmount = product.price;
    // const detailAmount = 0;

    // if (product.details.length > 0) {

    //     for (let i = 0; i < product.details.length; i++) {
    //         detailAmount = detailAmount + product.details[i].price;
    //     }
    //     totalAmount = totalAmount + detailAmount;
    // }

    const updatedUnitsProduct = {
        ...existingProduct,
        qty: product.qty,
        details: product.details,
        // price: totalAmount
    };

    updatedCart[productIndex] = updatedUnitsProduct;

    return updatedCart;
}