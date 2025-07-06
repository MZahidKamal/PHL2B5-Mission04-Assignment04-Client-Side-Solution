import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'

import MainLayout from "./Layouts/MainLayout.tsx";

import HomePage from "./Pages/HomePage.tsx";
import AllBooksPage from "./Pages/AllBooksPage.tsx";
import CreateBookPage from "./Pages/CreateBookPage.tsx";
import DetailBookInfoPage from "./Pages/DetailBookInfoPage.tsx";
import EditBookInfoPage from "./Pages/EditBookInfoPage.tsx";
import BorrowBookPage from "./Pages/BorrowBookPage.tsx";
import BorrowSummaryPage from "./Pages/BorrowSummaryPage.tsx";

import reduxStore from "./Redux/Store/reduxStore.tsx";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={reduxStore}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<MainLayout/>}>
                        <Route path={'/'} element={<HomePage/>}></Route>
                        <Route path={'/books'} element={<AllBooksPage/>}></Route>
                        <Route path={'/create-book'} element={<CreateBookPage/>}></Route>
                        <Route path={'/books/:id'} element={<DetailBookInfoPage/>}></Route>
                        <Route path={'/edit-book/:id'} element={<EditBookInfoPage/>}></Route>
                        <Route path={'/borrow/:bookId'} element={<BorrowBookPage/>}></Route>
                        <Route path={'/borrow-summary'} element={<BorrowSummaryPage/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
