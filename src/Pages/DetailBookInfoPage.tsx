import type { FC } from "react"
import { useParams } from "react-router"
import { FiBook, FiUser, FiTag, FiBarChart, FiFileText, FiCopy, FiCalendar, FiCheckCircle, FiXCircle, FiArrowLeft } from "react-icons/fi"
import { useGetABookByIdQuery } from "../Redux/Api/baseApi.tsx"
import { useAppSelector } from "../Redux/Hook/hook.tsx"
import { selectTheme } from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx"
import { useNavigate } from "react-router"


interface BookData {
    _id: string
    title: string
    author: string
    genre: string
    isbn: string
    description: string
    copies: number
    available: boolean
    createdAt: string
    updatedAt: string
}


const DetailBookInfoPage: FC = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const darkMode = useAppSelector(selectTheme)
    const { data, isLoading } = useGetABookByIdQuery(id as string)

    const bookData: BookData = data?.data

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }


    if (isLoading) {
        return (
            <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className={`h-8 rounded mb-8 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div
                                    className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                                >
                                    <div className={`h-8 rounded mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                    <div className={`h-4 rounded mb-2 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                    <div className={`h-4 rounded mb-4 w-3/4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                    <div className={`h-32 rounded ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                                >
                                    <div className={`h-6 rounded mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                    <div className="space-y-3">
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <div key={index} className={`h-4 rounded ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    if (!data?.success || !bookData) {
        return (
            <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <FiXCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-red-400" : "text-red-500"}`} />
                        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Book Not Found
                        </h3>
                        <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            The book you're looking for doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={() => navigate("/books")}
                            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md font-medium ${
                                darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            <span>Back to Books</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/books")}
                        className={`inline-flex items-center space-x-2 mb-4 px-3 py-2 rounded-md text-sm font-medium ${
                            darkMode
                                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        <span>Back to Books</span>
                    </button>
                    <h1 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Book Details</h1>
                    <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Complete information about this book
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div
                            className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                        >
                            {/* Book Title and Author */}
                            <div className="mb-6">
                                <h2 className={`text-3xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    {bookData?.title}
                                </h2>
                                <div className="flex items-center space-x-2 mb-4">
                                    <FiUser className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                                    <span className={`text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        by {bookData?.author}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FiTag className={`w-4 h-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                                    <span
                                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                                            darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-700"
                                        }`}
                                    >
                                        {bookData?.genre}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    Description
                                </h3>
                                <div className="flex items-start space-x-3">
                                    <FiFileText className={`w-5 h-5 mt-1 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                                    <p className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        {bookData?.description}
                                    </p>
                                </div>
                            </div>

                            {/* Availability Status */}
                            <div className="mb-6">
                                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    Availability
                                </h3>
                                <div
                                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
                                        bookData?.available
                                            ? darkMode
                                                ? "bg-green-900 text-green-300"
                                                : "bg-green-100 text-green-800"
                                            : darkMode
                                                ? "bg-red-900 text-red-300"
                                                : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {bookData?.available ? <FiCheckCircle className="w-5 h-5" /> : <FiXCircle className="w-5 h-5" />}
                                    <span className="font-medium">
                                        {bookData?.available ? "Available for borrowing" : "Currently unavailable"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Book Information */}
                        <div
                            className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                        >
                            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                Book Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <FiBarChart className={`w-4 h-4 mt-1 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                                    <div>
                                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>ISBN</p>
                                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{bookData?.isbn}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <FiCopy className={`w-4 h-4 mt-1 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                                    <div>
                                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Available Copies
                                        </p>
                                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{bookData?.copies}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <FiCalendar className={`w-4 h-4 mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                                    <div>
                                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Date Added</p>
                                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            {formatDate(bookData?.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <FiCalendar className={`w-4 h-4 mt-1 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                                    <div>
                                        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Last Updated
                                        </p>
                                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            {formatDate(bookData?.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div
                            className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                        >
                            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate(`/edit-book/${bookData?._id}`)}
                                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium ${
                                        darkMode
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                >
                                    <FiBook className="w-4 h-4" />
                                    <span>Edit Book</span>
                                </button>

                                <button
                                    onClick={() => navigate(`/borrow/${bookData?._id}`)}
                                    disabled={!bookData?.available}
                                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium ${
                                        !bookData?.available
                                            ? darkMode
                                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : darkMode
                                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                                    }`}
                                >
                                    <FiBook className="w-4 h-4" />
                                    <span>{bookData?.available ? "Borrow Book" : "Not Available"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DetailBookInfoPage;
