import type {FC, FormEvent, ChangeEvent} from "react"
import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router"
import { FiBook, FiUser, FiTag, FiCopy, FiCalendar, FiCheckCircle, FiXCircle, FiArrowLeft, FiBookOpen, FiClock } from "react-icons/fi"
import {useBorrowABookMutation, useGetABookByIdQuery} from "../Redux/Api/baseApi.tsx"
import {useAppSelector} from "../Redux/Hook/hook.tsx"
import {selectTheme} from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx"
import {toast} from "react-toastify";


interface BookDocumentInterface {
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


interface BorrowFormData {
    quantity: number
    dueDate: string
}


const BorrowBookPage: FC = () => {

    const {bookId} = useParams()
    const {data, isLoading} = useGetABookByIdQuery(bookId as string)
    const [borrowABook, {isLoading: isBorrowing}] = useBorrowABookMutation()

    const darkMode = useAppSelector(selectTheme)
    const navigate = useNavigate()


    const [formData, setFormData] = useState<BorrowFormData>({
        quantity: 1,
        dueDate: "",
    })


    const [borrowResult, setBorrowResult] = useState<any>(null)

    const bookData: BookDocumentInterface = data?.data


    // Set minimum date to tomorrow
    const getTomorrowDate = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toISOString().split("T")[0]
    }


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            dueDate: getTomorrowDate(),
        }))
    }, [])


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" ? Number.parseInt(value) || 1 : value,
        }))
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!bookData?._id || formData.quantity < 1 || formData.quantity > (bookData?.copies || 0) || !formData.dueDate) {
            return
        }

        const newBorrowObj = {
            book: bookData._id,
            quantity: formData.quantity,
            dueDate: new Date(formData.dueDate).toISOString(),
        }

        try {
            const result = await borrowABook(newBorrowObj).unwrap()
            // console.log("Borrow Success:", result)
            if (result?.success) {
                toast(`${result.message}`);
                setBorrowResult(result)
                setTimeout(()=>{
                    navigate("/borrow-summary");
                }, 1500)
            }
        } catch (error) {
            console.error("Failed to borrow book:", error)
        }
    }


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }


    if (isLoading) {
        return (
            <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className={`h-8 rounded mb-8 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div
                                className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                            >
                                <div className={`h-6 rounded mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                <div className="space-y-4">
                                    {Array.from({length: 4}).map((_, index) => (
                                        <div key={index}
                                             className={`h-10 rounded ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                    ))}
                                </div>
                            </div>
                            <div
                                className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                            >
                                <div className={`h-6 rounded mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
                                <div className={`h-32 rounded ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}></div>
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
                        <FiXCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-red-400" : "text-red-500"}`}/>
                        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Book Not Found
                        </h3>
                        <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            The book you're trying to borrow doesn't exist or has been removed.
                        </p>
                        <button
                            onClick={() => navigate("/books")}
                            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md font-medium cursor-pointer ${
                                darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                        >
                            <FiArrowLeft className="w-4 h-4"/>
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
                        className={`inline-flex items-center space-x-2 mb-4 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                            darkMode
                                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                        <FiArrowLeft className="w-4 h-4"/>
                        <span>Back to Books</span>
                    </button>
                    <h1 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Borrow
                        Book</h1>
                    <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Borrow a book from our library collection
                    </p>
                </div>

                {/* Book Information Card */}
                <div className="mb-8">
                    <div
                        className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                    >
                        <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${darkMode ? "bg-blue-900" : "bg-blue-100"}`}>
                                <FiBook className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                            </div>
                            <div className="flex-1">
                                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    {bookData?.title}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <FiUser
                                            className={`w-4 h-4 ${darkMode ? "text-green-400" : "text-green-600"}`}/>
                                        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            {bookData?.author}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FiTag
                                            className={`w-4 h-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`}/>
                                        <span
                                            className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{bookData?.genre}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FiCopy
                                            className={`w-4 h-4 ${darkMode ? "text-orange-400" : "text-orange-600"}`}/>
                                        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                            {bookData?.copies} available
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {bookData?.available ? (
                                            <FiCheckCircle
                                                className={`w-4 h-4 ${darkMode ? "text-green-400" : "text-green-600"}`}/>
                                        ) : (
                                            <FiXCircle
                                                className={`w-4 h-4 ${darkMode ? "text-red-400" : "text-red-600"}`}/>
                                        )}
                                        <span
                                            className={`text-sm font-medium ${
                                                bookData?.available
                                                    ? darkMode
                                                        ? "text-green-300"
                                                        : "text-green-700"
                                                    : darkMode
                                                        ? "text-red-300"
                                                        : "text-red-700"
                                            }`}
                                        >
                                            {bookData?.available ? "Available" : "Unavailable"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Borrow Form */}
                    <div
                        className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                    >
                        <h3 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                            Borrow Details
                        </h3>

                        {!bookData?.available ? (
                            <div
                                className={`p-4 rounded-lg border ${darkMode ? "bg-red-900 border-red-700" : "bg-red-50 border-red-200"}`}
                            >
                                <div className="flex items-center space-x-2">
                                    <FiXCircle className={`w-5 h-5 ${darkMode ? "text-red-400" : "text-red-600"}`}/>
                                    <span className={`font-medium ${darkMode ? "text-red-300" : "text-red-800"}`}>
                                        Book Not Available
                                    </span>
                                </div>
                                <p className={`mt-2 text-sm ${darkMode ? "text-red-200" : "text-red-700"}`}>
                                    This book is currently not available for borrowing. Please check back later or
                                    contact the library.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Quantity */}
                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        <div className="flex items-center space-x-2">
                                            <FiCopy
                                                className={`w-4 h-4 ${darkMode ? "text-orange-400" : "text-orange-600"}`}/>
                                            <span>Number of Copies</span>
                                        </div>
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        min="1"
                                        max={bookData?.copies || 1}
                                        className={`w-full px-3 py-2 rounded-md border cursor-text ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        }`}
                                        placeholder="Enter number of copies"
                                        required
                                    />
                                    <p className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        Maximum {bookData?.copies} copies available
                                    </p>
                                </div>

                                {/* Due Date */}
                                <div>
                                    <label
                                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                        <div className="flex items-center space-x-2">
                                            <FiCalendar
                                                className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                                            <span>Due Date</span>
                                        </div>
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleInputChange}
                                        min={getTomorrowDate()}
                                        className={`w-full px-3 py-2 rounded-md border cursor-text ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        }`}
                                        required
                                    />
                                    <p className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        Select a future date for returning the book
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isBorrowing || !bookData?.available}
                                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium cursor-pointer ${
                                        isBorrowing || !bookData?.available
                                            ? darkMode
                                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : darkMode
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                >
                                    {isBorrowing ? (
                                        <>
                                            <div
                                                className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiBookOpen className="w-4 h-4"/>
                                            <span>Borrow Book</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Result Section */}
                    <div
                        className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                    >
                        <h3 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Borrow
                            Status</h3>

                        {borrowResult?.success ? (
                            <div
                                className={`p-4 rounded-lg border ${darkMode ? "bg-green-900 border-green-700" : "bg-green-50 border-green-200"}`}
                            >
                                <div className="flex items-center space-x-2 mb-4">
                                    <FiCheckCircle
                                        className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`}/>
                                    <span
                                        className={`text-lg font-semibold ${darkMode ? "text-green-300" : "text-green-800"}`}>
                                        Book Borrowed Successfully!
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <FiBook
                                            className={`w-5 h-5 mt-0.5 ${darkMode ? "text-green-400" : "text-green-600"}`}/>
                                        <div>
                                            <p className={`font-medium ${darkMode ? "text-green-200" : "text-green-700"}`}>
                                                {bookData?.title}
                                            </p>
                                            <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>
                                                by {bookData?.author}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <FiCopy
                                            className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`}/>
                                        <p className={`${darkMode ? "text-green-200" : "text-green-700"}`}>
                                            <span className="font-medium">{borrowResult?.data?.quantity}</span> copies
                                            borrowed
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <FiClock
                                            className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`}/>
                                        <p className={`${darkMode ? "text-green-200" : "text-green-700"}`}>
                                            Due date: <span
                                            className="font-medium">{formatDate(borrowResult?.data?.dueDate)}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-green-600">
                                    <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>
                                        Please return the book by the due date to avoid late fees.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                                <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Complete the borrow form to see the confirmation here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BorrowBookPage;
