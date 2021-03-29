import axios from 'axios';
// import { login } from '../../controllers/authController';
import { showAlert } from './alerts';

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const signup = async (name, email, password, passwordConfirm, userType, description, tag, experience, location, price) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                email,
                password,
                passwordConfirm,
                userType,
                description,
                tag,
                experience,
                location,
                price
            }
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Signed Up successfully');
            window.setTimeout(() => {
                location.reload(true);
            }, 2000);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout'
        });
        if ((res.data.status = 'success')) location.assign('/');
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.');
    }
};
