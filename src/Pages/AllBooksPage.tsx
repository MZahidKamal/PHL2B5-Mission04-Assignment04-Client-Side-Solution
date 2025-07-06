import type { FC } from "react"
import { useState } from "react"
import { FiBook, FiUser, FiTag, FiX, FiChevronLeft, FiChevronRight, FiInfo, FiEdit, FiBookOpen, FiAlertTriangle } from "react-icons/fi"
import { useDeleteABookMutation, useGetAllBooksQuery } from "../Redux/Api/baseApi.tsx"
import { useAppSelector } from "../Redux/Hook/hook.tsx"
import { selectTheme } from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx"
import { useNavigate } from "react-router"


interface BookDocumentInterface {
    title: string
    author: string
    genre: string
    isbn: string
    description: string
    copies: number
    available: boolean
    _id: string
    createdAt: string
    updatedAt: string
}


const AllBooksPage: FC = () => {

    const { data, isLoading } = useGetAllBooksQuery(undefined)
    const darkMode = useAppSelector(selectTheme)
    const [deleteBook] = useDeleteABookMutation()

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [bookToDelete, setBookToDelete] = useState<string | null>(null)
    const booksPerPage = 6

    const books: BookDocumentInterface[] = data?.data || []
    const totalPages = Math.ceil(books.length / booksPerPage)
    const startIndex = (currentPage - 1) * booksPerPage
    const endIndex = startIndex + booksPerPage
    const currentBooks = books.slice(startIndex, endIndex)


    const handleDeleteClick = (bookId: string) => {
        setBookToDelete(bookId)
        setShowDeleteModal(true)
    }


    const handleConfirmDelete = async () => {
        if (bookToDelete) {
            try {
                await deleteBook(bookToDelete).unwrap()
                // console.log(`Book successfully deleted: ${bookToDelete}`)
                setShowDeleteModal(false)
                setBookToDelete(null)
            } catch (error) {
                console.error("Failed to delete book:", error)
            }
        }
    }


    const handleCancelDelete = () => {
        setShowDeleteModal(false)
        setBookToDelete(null)
    }


    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }


    const getPageNumbers = () => {
        const pages = []
        const maxVisiblePages = 10
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }
        return pages
    }


    if (isLoading) {
        return (
            <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className={`h-8 rounded mb-8 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                                >
                                    <div className={`h-6 rounded mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                    <div className={`h-4 rounded mb-2 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                    <div className={`h-4 rounded mb-4 w-3/4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                    <div className={`h-20 rounded ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                </div>
                            ))}
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
                    <h1 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>All Books</h1>
                    <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Discover our collection of {books?.length || 0} books
                    </p>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentBooks?.map((book) => (
                        <div
                            key={book?._id}
                            className={`p-6 rounded-lg border hover:shadow-lg ${
                                darkMode
                                    ? "bg-gray-900 border-gray-800 hover:shadow-gray-900/20"
                                    : "bg-white border-gray-200 hover:shadow-gray-200/50"
                            }`}
                        >
                            {/* Book Header */}
                            <div className="mb-0">
                                <h3 className={`text-2xl font-bold mb-2 line-clamp-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    {book?.title}
                                </h3>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <FiUser className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                                        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{book?.author}</span>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <FiTag className={`w-4 h-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                                        <span
                                            className={`text-sm font-medium px-2 py-1 rounded ${
                                                darkMode ? "bg-gray-800 text-purple-300" : "bg-purple-50 text-purple-700"
                                            }`}
                                        >
                                            {book?.genre}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <div className="relative group">
                                    <button
                                        onClick={() => {
                                            navigate(`/books/${book?._id}`)
                                        }}
                                        className={`p-2 rounded-md cursor-pointer ${
                                            darkMode ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                    >
                                        <FiInfo className="w-4 h-4" />
                                    </button>
                                    <div
                                        className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap ${
                                            darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
                                        }`}
                                    >
                                        Details
                                    </div>
                                </div>

                                <div className="relative group">
                                    <button
                                        onClick={() => {
                                            navigate(`/edit-book/${book?._id}`)
                                        }}
                                        className={`p-2 rounded-md cursor-pointer ${
                                            darkMode ? "bg-blue-400 text-white hover:bg-blue-500" : "bg-blue-400 text-white hover:bg-blue-500"
                                        }`}
                                    >
                                        <FiEdit className="w-4 h-4" />
                                    </button>
                                    <div
                                        className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap ${
                                            darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
                                        }`}
                                    >
                                        Edit
                                    </div>
                                </div>

                                <div className="relative group">
                                    <button
                                        onClick={() => {
                                            navigate(`/borrow/${book?._id}`)
                                        }}
                                        className={`p-2 rounded-md cursor-pointer ${
                                            darkMode
                                                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                                                : "bg-indigo-500 text-white hover:bg-indigo-600"
                                        }`}
                                    >
                                        <FiBookOpen className="w-4 h-4" />
                                    </button>
                                    <div
                                        className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap ${
                                            darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
                                        }`}
                                    >
                                        Borrow
                                    </div>
                                </div>

                                <div className="relative group">
                                    <button
                                        onClick={() => handleDeleteClick(book._id)}
                                        className={`p-2 rounded-md cursor-pointer ${
                                            darkMode ? "bg-red-500 text-white hover:bg-red-600" : "bg-red-500 text-white hover:bg-red-600"
                                        }`}
                                    >
                                        <FiX className="w-4 h-4" />
                                    </button>
                                    <div
                                        className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap ${
                                            darkMode ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
                                        }`}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-md ${
                                currentPage === 1
                                    ? darkMode
                                        ? "text-gray-600 cursor-not-allowed"
                                        : "text-gray-400 cursor-not-allowed"
                                    : darkMode
                                        ? "text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                            }`}
                        >
                            <FiChevronLeft className="w-5 h-5" />
                        </button>

                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    currentPage === page
                                        ? darkMode
                                            ? "bg-blue-600 text-white"
                                            : "bg-blue-600 text-white"
                                        : darkMode
                                            ? "text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-md ${
                                currentPage === totalPages
                                    ? darkMode
                                        ? "text-gray-600 cursor-not-allowed"
                                        : "text-gray-400 cursor-not-allowed"
                                    : darkMode
                                        ? "text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
                            }`}
                        >
                            <FiChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* No Books Message */}
                {!isLoading && (!books || books.length === 0) && (
                    <div className="text-center py-12">
                        <FiBook className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            No books found
                        </h3>
                        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            There are no books available in the library at the moment.
                        </p>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div className="fixed inset-0 bg-gray-500/40 bg-opacity-50" onClick={handleCancelDelete}></div>

                        {/* Modal */}
                        <div
                            className={`relative w-full max-w-md p-6 rounded-lg border ${
                                darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                            }`}
                        >
                            {/* Header */}
                            <div className="flex items-center space-x-3 mb-4">
                                <FiAlertTriangle className={`w-6 h-6 ${darkMode ? "text-red-400" : "text-red-500"}`} />
                                <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Delete Book</h3>
                            </div>

                            {/* Content */}
                            <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                Are you sure you want to delete this book? This action cannot be undone.
                            </p>

                            {/* Buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleConfirmDelete}
                                    className={`flex-1 px-4 py-2 rounded-md font-medium cursor-pointer ${
                                        darkMode ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-600 text-white hover:bg-red-700"
                                    }`}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={handleCancelDelete}
                                    className={`flex-1 px-4 py-2 rounded-md font-medium cursor-pointer ${
                                        darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default AllBooksPage;
