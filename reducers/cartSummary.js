import { SAVE_CART_SUMMARY } from '../redux/cart_action';

export default function cartSummary(state = {}, action = {}) {
    switch (action.type) {

        case SAVE_CART_SUMMARY:
            {
                state = action.payload;
                return state;

            }


    }
    return state;
}