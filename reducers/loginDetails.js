import { SAVE_USER_DETAILS } from '../redux/cart_action';
// const initial_state = {
//     user_id: 9,
//     name: "Ayobami Babalol",
//     email: 'babalolaisaac@gmail.com',
//     role_id: 1,
//     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzgxMGE5MzRlMmFmMTk5ODRlYTc1ZWY4NWZjNDE0YWJjMzVmOGM5ZTgzYTZiMTI0MjRiYTNlZTZmNGU2ZTc5NDEwZmIxYWYxNGI5NWJmMDAiLCJpYXQiOjE1ODY1NDY3MTAsIm5iZiI6MTU4NjU0NjcxMCwiZXhwIjoxNjE4MDgyNzA5LCJzdWIiOiI5Iiwic2NvcGVzIjpbXX0.PIE-jE8Cb_tcwCRd6Cuqje-57i2EKuL5ZARf-MkQU-BjGiYQhKZ5zvCM7_SXGKKjvTNa_aqIlo9maMwhGljrMwsN2gJ1u35AaR5op5WgzQHJpFnUvxKgdTSanQtUYwmFLgRY9gK10rvnZxEsnCPWTSbhT3OlIewb7LSZ3StcnKxVNJ0yv1HKpVpEZoHe09LTzFZ4j_pf3oqTJhhHw8t0bPAqSpjh-hoAkEzqYhZZer4y2VGlUU0Jt94rlqGCBgCnWnVlBd2mIcgfTgETePbEjQBg2UUHvjuGmn_MsxZSdU5fNw6R-NqvgyYb6vOFA347_lGPty8e5OXv4fzH-4icbUHhmaEroll_hGHieigLYM9qDy0MWbuDd40hA3LAciFNamHStxf1Oc5RfslVxayXpPoETvvoaPzIncwNkhcoccb-DaYgaI4u3Q-0cDvmBgPnnPVPFaK6lldl2a7FhqiT0FrF8sHUWaSMFgj1Uyl6e57mUX03TvV4PZbNgT1RSBOvhV_LLikRJXQe8kZX9OIXXutM9NzrOljqnyCg5YUj4PWOUfGAU6iyzuvcvczKU425BBGam0MaEHrUOAcUlHtIe0z7LB8fGoVpQfKU7T3BaBC0srUD9clv52NrNoz3ftf_VMbfhQIUU0EeU5Tx177wJnh2Zjs_fvUWArr_1hx6esI'
// };
export default function loginDetails(state = {}, action = {}) {
    switch (action.type) {

        case SAVE_USER_DETAILS:
            {
                state = action.payload;
                return state;

            }


    }
    return state;
}