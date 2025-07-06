import NavbarComponent from "../Components/NavbarComponent.tsx"
import FooterComponent from "../Components/FooterComponent.tsx"
import { Outlet } from "react-router"
import type { FC } from "react"
import {selectTheme} from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx";
import {useAppSelector} from "../Redux/Hook/hook.tsx";
import {ToastContainer} from "react-toastify";


const MainLayout: FC = () => {

    // Use useAppSelector and useAppDispatch throughout your app instead of plain `useDispatch` and `useSelector`
    const darkMode = useAppSelector(selectTheme);


    return (
        <div className={`${darkMode ? "dark bg-gray-950" : "bg-white"}`}>
            <div className={'container m-auto'}>

                <NavbarComponent></NavbarComponent>

                <div className={"min-h-[calc(100vh-78px-241px)]"}>
                    <Outlet></Outlet>
                </div>

                <FooterComponent></FooterComponent>

                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                ></ToastContainer>

            </div>
        </div>
    )
}


export default MainLayout
