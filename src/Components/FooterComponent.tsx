import type React from "react"
import {FiBook, FiMail, FiInfo, FiHeart} from "react-icons/fi"
import {Link} from "react-router";
import {selectTheme} from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx";
import {useAppSelector} from "../Redux/Hook/hook.tsx";


const FooterComponent: React.FC = () => {

    const supportLinks = [
        {name: "About Us", path: "/about", icon: FiInfo},
        {name: "Contact", path: "/contact", icon: FiMail},
        {name: "Help Center", path: "/help", icon: FiInfo},
        {name: "Privacy Policy", path: "/privacy", icon: FiInfo},
    ]


    const contactInfo = [{label: "Email", value: "info@booklibrary.com", icon: FiMail}]


    // Use useAppSelector and useAppDispatch throughout your app instead of plain `useDispatch` and `useSelector`
    const darkMode = useAppSelector(selectTheme);


    const handleLinkClick = (path: string) => {
        console.log(`Will implement ${path} route in future!`)
    }


    return (
        <footer className={`w-full border-t ${darkMode ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-6 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <FiBook className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                                <Link to={'/'}>
                                    <h3 className={`text-xl font-bold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                                        Book Library
                                    </h3>
                                </Link>
                            </div>
                            <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Your digital gateway to endless knowledge. Discover, borrow, and manage books with our
                                comprehensive
                                library management system.
                            </p>
                        </div>

                        {/* Support Links */}
                        <div className="space-y-4 flex justify-center">
                            <ul className="space-y-2">
                                {supportLinks
                                    ?.map((link, index) => {
                                        const IconComponent = link?.icon
                                        return (
                                            <li key={index}>
                                                <button
                                                    onClick={() => handleLinkClick(link?.path || "")}
                                                    className={`inline-flex items-center text-sm transition-all duration-200 hover:translate-x-1 ${
                                                        darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                                    }`}
                                                >
                                                    {IconComponent && (
                                                        <IconComponent
                                                            className={`w-4 h-4 mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                                                    )}
                                                    {link?.name}
                                                </button>
                                            </li>
                                        )
                                    })
                                    .slice(0, 2)}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div className="space-y-4 flex justify-center">
                            <ul className="space-y-2">
                                {supportLinks
                                    ?.map((link, index) => {
                                        const IconComponent = link?.icon
                                        return (
                                            <li key={index}>
                                                <button
                                                    onClick={() => handleLinkClick(link?.path || "")}
                                                    className={`inline-flex items-center text-sm transition-all duration-200 hover:translate-x-1 ${
                                                        darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                                    }`}
                                                >
                                                    {IconComponent && (
                                                        <IconComponent
                                                            className={`w-4 h-4 mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                                                    )}
                                                    {link?.name}
                                                </button>
                                            </li>
                                        )
                                    })
                                    .slice(2, 4)}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4 flex justify-center">
                            <ul className="space-y-3">
                                {contactInfo?.map((contact, index) => {
                                    const IconComponent = contact?.icon
                                    return (
                                        <li key={index} className="flex items-start space-x-3">
                                            {IconComponent && (
                                                <IconComponent
                                                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                                                />
                                            )}
                                            <div>
                                                <p
                                                    className={`text-xs font-medium uppercase tracking-wider ${
                                                        darkMode ? "text-gray-400" : "text-gray-500"
                                                    }`}
                                                >
                                                    {contact?.label}
                                                </p>
                                                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{contact?.value}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className={`py-6 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                © {new Date().getFullYear()} Book Library. All rights reserved.
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Made with</p>
                            <FiHeart className={`w-4 h-4 ${darkMode ? "text-red-400" : "text-red-500"}`}/>
                            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>for book
                                lovers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default FooterComponent;
