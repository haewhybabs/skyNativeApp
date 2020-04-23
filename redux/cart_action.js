export const ADD_TO_CART = "ADD_TO_CART";

export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const SAVE_USER_DETAILS = "SAVE_USER_DETAILS";

export const SAVE_CART_SUMMARY = "SAVE_CART_SUMMARY";


export function addToCartAction({ id, name, price, qty, details }) {
    return {
        type: ADD_TO_CART,
        payload: {
            id,
            name,
            price,
            qty,
            details
        }
    }
}

export function removeFromCartAction({ id }) {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            id
        }
    }
}

export function saveUserDetailsAction({ user_id, name, email, role_id, token }) {
    return {
        type: SAVE_USER_DETAILS,
        payload: {
            user_id,
            name,
            email,
            role_id,
            token
        }
    }
}

export function saveCartSummaryAction({ vendor_id, cart_amount, vendor }) {
    return {
        type: SAVE_CART_SUMMARY,
        payload: {
            vendor_id,
            cart_amount,
            vendor

        }
    }
}