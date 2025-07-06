import type { FC } from "react"
import { useNavigate } from "react-router"
import { FiBook, FiPlus, FiSearch, FiEdit, FiTrendingUp, FiStar } from "react-icons/fi"
import { useAppSelector } from "../Redux/Hook/hook.tsx"
import { selectTheme } from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx"


const HomePage: FC = () => {

    const darkMode = useAppSelector(selectTheme)
    const navigate = useNavigate()


    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className={`p-4 rounded-full ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                            <FiBook className={`w-16 h-16 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                        </div>
                    </div>
                    <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Library Management
                    </h1>
                    <p
                        className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                        A minimal yet powerful library management system built with modern web technologies. Manage your book
                        collection, track borrowings, and organize your digital library with ease.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/books")}
                            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium cursor-pointer ${
                                darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                            <FiSearch className="w-5 h-5" />
                            <span>Explore Books</span>
                        </button>
                        <button
                            onClick={() => navigate("/create-book")}
                            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium cursor-pointer ${
                                darkMode
                                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                            }`}
                        >
                            <FiPlus className="w-5 h-5" />
                            <span>Add New Book</span>
                        </button>
                    </div>
                </div>

                {/* Technology Stack Section */}
                <div className="mb-16">
                    <div
                        className={`p-8 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                    >
                        <div className="text-center mb-8">
                            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                Built with Modern Technologies
                            </h2>
                            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Leveraging the power of React, Redux Toolkit Query, and TypeScript for a robust and scalable solution.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className={`inline-flex p-3 rounded-lg mb-4 ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                                    <FiEdit className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                                </div>
                                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    React & TypeScript
                                </h3>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Modern component-based architecture with type safety and excellent developer experience.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className={`inline-flex p-3 rounded-lg mb-4 ${darkMode ? "bg-purple-900" : "bg-purple-100"}`}>
                                    <FiTrendingUp className={`w-8 h-8 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                                </div>
                                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    Redux Toolkit Query
                                </h3>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Efficient state management and API integration with caching and real-time updates.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className={`inline-flex p-3 rounded-lg mb-4 ${darkMode ? "bg-green-900" : "bg-green-100"}`}>
                                    <FiStar className={`w-8 h-8 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                                </div>
                                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    Clean Design
                                </h3>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Minimalistic and responsive UI design with dark mode support and accessibility features.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage;
