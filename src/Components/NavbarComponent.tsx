import type React from "react"
import {useState} from "react"
import {FiHome, FiBook, FiPlus, FiList, FiMenu, FiX, FiSun, FiMoon} from "react-icons/fi"
import {Link, useLocation} from "react-router"
import {selectTheme, toggleDarkLightTheme} from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx"
// import {useDispatch, useSelector} from "react-redux"
// import type {RootState, AppDispatch} from "../Redux/Store/reduxStore.tsx"
import {useAppDispatch, useAppSelector} from "../Redux/Hook/hook.tsx";


const NavbarComponent: React.FC = () => {

    const navbarButtons = [
        {name: "Home", path: "/", icon: FiHome},
        {name: "All Books", path: "/books", icon: FiBook},
        {name: "Create Book", path: "/create-book", icon: FiPlus},
        {name: "Borrow Summary", path: "/borrow-summary", icon: FiList},
    ]


    // const darkMode = useSelector((state: RootState) => state.darkLightTheme.isDark)
    // const dispatch = useDispatch<AppDispatch>()
    // Use useAppSelector and useAppDispatch throughout your app instead of plain `useDispatch` and `useSelector`
    const darkMode = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
    const location = useLocation()


    const toggleDarkMode = () => {
        dispatch(toggleDarkLightTheme())
    }


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev)
    }


    return (
        <nav
            className={`sticky top-0 z-50 w-full border-b ${
                darkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <h1 className={`text-5xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                                BookLibrary
                            </h1>
                        </Link>
                    </div>

                    <div className={"flex items-center space-x-4"}>
                        {/* Desktop Navigation */}
                        <div className="hidden 2xl:block">
                            <div className="flex items-center space-x-1">
                                {navbarButtons?.map((button, index) => {
                                    const IconComponent = button?.icon
                                    return (
                                        <Link
                                            to={button?.path || ""}
                                            key={index}
                                            className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium hover:scale-105 ${
                                                location.pathname === button?.path && location.pathname !== "/"
                                                    ? darkMode
                                                        ? "text-white bg-gray-800 border border-gray-700"
                                                        : "text-gray-900 bg-gray-100 border border-gray-300"
                                                    : darkMode
                                                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                            }`}
                                        >
                                            {IconComponent && (
                                                <IconComponent
                                                    className={`w-4 h-4 mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                                            )}
                                            {button?.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Right side controls */}
                        <div className="flex items-center space-x-2">
                            {/* Dark mode toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-md transition-all duration-200 hover:scale-110 ${
                                    darkMode ? "text-yellow-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
                                }`}
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? <FiSun className="w-5 h-5"/> : <FiMoon className="w-5 h-5"/>}
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={toggleMobileMenu}
                                className={`2xl:hidden p-2 rounded-md transition-all duration-200 hover:scale-110 ${
                                    darkMode
                                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? <FiX className="w-5 h-5"/> : <FiMenu className="w-5 h-5"/>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`2xl:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    <div className={`py-2 space-y-1 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                        {navbarButtons?.map((button, index) => {
                            const IconComponent = button?.icon
                            return (
                                <Link
                                    to={button?.path || ""}
                                    key={index}
                                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                                        location.pathname === button?.path && location.pathname !== "/"
                                            ? darkMode
                                                ? "text-white bg-gray-800 border border-gray-700"
                                                : "text-gray-900 bg-gray-100 border border-gray-300"
                                            : darkMode
                                                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`}
                                >
                                    {IconComponent && (
                                        <IconComponent
                                            className={`w-4 h-4 mr-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                                    )}
                                    {button?.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}


export default NavbarComponent;
