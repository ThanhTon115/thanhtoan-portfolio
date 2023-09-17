import {configureStore} from "@reduxjs/toolkit"
import projectReducer from "./projectReducer"

export const store = configureStore({
    reducer: {
        movie: projectReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch