import {configureStore, type EnhancedStore} from '@reduxjs/toolkit';
import darkLightThemeReducer from '../Features/darkLightTheme/darkLightThemeSlice.tsx';
import {baseApi} from "../Api/baseApi.tsx";
// import loggerMiddleware from "../Middlewares/loggerMiddleware.tsx";


const reduxStore: EnhancedStore = configureStore({
    reducer: {
        darkLightTheme: darkLightThemeReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            // .concat(loggerMiddleware)
            .concat(baseApi.middleware)
    // Get all default middlewares and additionally add my custom logger middleware.
})


export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;


export default reduxStore;


// To Learn more, visit (https://redux-toolkit.js.org/rtk-query/usage/queries).
