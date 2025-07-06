import type { FC } from "react"
import { FiBook, FiHash, FiBarChart, FiEye, FiList, FiBookOpen } from "react-icons/fi"
import { useGetBorrowSummaryQuery } from "../Redux/Api/baseApi.tsx"
import { useAppSelector } from "../Redux/Hook/hook.tsx"
import { selectTheme } from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx"
import { useNavigate } from "react-router"


interface BorrowedBook {
    _id: string
    totalQuantity: number
    book: {
        title: string
        isbn: string
    }
}


const BorrowSummaryPage: FC = () => {

    const { data, isLoading } = useGetBorrowSummaryQuery(undefined)
    const darkMode = useAppSelector(selectTheme)
    const navigate = useNavigate()

    const borrowedBooks: BorrowedBook[] = data?.data || []


    const handleBookClick = (bookId: string) => {
        navigate(`/books/${bookId}`)
    }


    const getTotalBorrowedBooks = () => {
        return borrowedBooks?.reduce((total, book) => total + (book?.totalQuantity || 0), 0)
    }


    if (isLoading) {
        return (
            <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className={`h-8 rounded mb-8 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div
                            className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                        >
                            <div className={`h-6 rounded mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                            <div className="space-y-3">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index} className={`h-12 rounded ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                ))}
                            </div>
                        </div>
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
                    <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-lg ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                            <FiList className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                        </div>
                        <div>
                            <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Borrow Summary</h1>
                            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                Overview of your borrowed books
                            </p>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div
                            className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                        >
                            <div className="flex items-center space-x-3">
                                <FiBookOpen className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                                <div>
                                    <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                                        {borrowedBooks?.length || 0}
                                    </p>
                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Unique Books</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                        >
                            <div className="flex items-center space-x-3">
                                <FiBarChart className={`w-6 h-6 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                                <div>
                                    <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                                        {getTotalBorrowedBooks()}
                                    </p>
                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Total Copies</p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                        >
                            <div className="flex items-center space-x-3">
                                <FiBook className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                                <div>
                                    <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Active</p>
                                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Status</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Borrowed Books Table */}
                <div
                    className={`rounded-lg border overflow-hidden ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                >
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                        <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Borrowed Books</h2>
                    </div>

                    {borrowedBooks?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className={`${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                                <tr>
                                    <th
                                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                            darkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FiBook className="w-4 h-4" />
                                            <span>Book Title</span>
                                        </div>
                                    </th>
                                    <th
                                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                            darkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FiHash className="w-4 h-4" />
                                            <span>ISBN</span>
                                        </div>
                                    </th>
                                    <th
                                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                            darkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FiBarChart className="w-4 h-4" />
                                            <span>Copies</span>
                                        </div>
                                    </th>
                                    <th
                                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                            darkMode ? "text-gray-400" : "text-gray-500"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <FiEye className="w-4 h-4" />
                                            <span>Actions</span>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className={`divide-y ${darkMode ? "divide-gray-800" : "divide-gray-200"}`}>
                                {borrowedBooks?.map((borrowedBook, index) => (
                                    <tr
                                        key={borrowedBook?._id || index}
                                        className={`hover:${darkMode ? "bg-gray-800" : "bg-gray-50"} cursor-pointer`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleBookClick(borrowedBook?._id)}
                                                className={`text-left hover:underline font-medium ${
                                                    darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                                                }`}
                                            >
                                                {borrowedBook?.book?.title}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span
                            className={`text-sm font-mono px-2 py-1 rounded ${
                                darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {borrowedBook?.book?.isbn}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                          <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
                              }`}
                          >
                            {borrowedBook?.totalQuantity}
                          </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleBookClick(borrowedBook?._id)}
                                                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium cursor-pointer ${
                                                    darkMode
                                                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                                }`}
                                            >
                                                <FiEye className="w-4 h-4" />
                                                <span>View</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <FiBookOpen className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                No Borrowed Books
                            </h3>
                            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                You haven't borrowed any books yet. Visit our collection to start borrowing!
                            </p>
                            <button
                                onClick={() => navigate("/books")}
                                className={`mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-md font-medium cursor-pointer ${
                                    darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                            >
                                <FiBook className="w-4 h-4" />
                                <span>Browse Books</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Additional Information */}
                {borrowedBooks?.length > 0 && (
                    <div className="mt-8">
                        <div
                            className={`p-4 rounded-lg border ${darkMode ? "bg-blue-900 border-blue-700" : "bg-blue-50 border-blue-200"}`}
                        >
                            <div className="flex items-start space-x-3">
                                <FiBook className={`w-5 h-5 mt-0.5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                                <div>
                                    <h4 className={`font-medium mb-1 ${darkMode ? "text-blue-300" : "text-blue-800"}`}>
                                        Important Reminder
                                    </h4>
                                    <p className={`text-sm ${darkMode ? "text-blue-200" : "text-blue-700"}`}>
                                        Please return your borrowed books by their due dates to avoid late fees. You can check individual
                                        due dates by clicking on each book title.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default BorrowSummaryPage;
