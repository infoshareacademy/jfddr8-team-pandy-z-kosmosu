import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './components/Pizza/pizzaSlice';

export const store = configureStore({
    reducer: {
        pizza: pizzaReducer,
    },
});