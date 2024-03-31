import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: "О компании",
        href: "/routes/pages/about",
        loader: false,
    },
    {
        name: "Оптовым покупателям",
        href: "/routes/pages/opt",
        loader: false,
    },
    {
        name: "Контакты",
        href: "/routes/pages/contacts",
        loader: false,
    },
]

 export const navSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
    }
})

export const {reducer} = navSlice;
