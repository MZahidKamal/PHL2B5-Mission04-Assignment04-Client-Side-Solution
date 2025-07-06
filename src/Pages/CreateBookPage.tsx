import type {FC, FormEvent, ChangeEvent} from "react"
import {useState} from "react"
import {FiBook, FiUser, FiTag, FiBarChart, FiFileText, FiCopy, FiPlus, FiCheck} from "react-icons/fi"
import {useCreateABookMutation} from "../Redux/Api/baseApi.tsx"
import {useAppSelector} from "../Redux/Hook/hook.tsx"
import {selectTheme} from "../Redux/Features/darkLightTheme/darkLightThemeSlice.tsx"
import {useNavigate} from "react-router";
import {toast} from "react-toastify";


interface BookFormInterface {
    title: string
    author: string
    genre: string
    isbn: string
    description: string
    copies: number
}


const CreateBookPage: FC = () => {

    const darkMode = useAppSelector(selectTheme)
    const [createABook, {data, isLoading}] = useCreateABookMutation()
    //console.log(useCreateABookMutation);
    const navigate = useNavigate();


    const [formData, setFormData] = useState<BookFormInterface>({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 1,
    })


    const genreOptions = ["FICTION", "NON-FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "copies" ? Number.parseInt(value) || 0 : value,
        }))
    }


    const handleGenreChange = (genre: string) => {
        setFormData((prev) => ({
            ...prev,
            genre,
        }))
    }


    const resetForm = () => {
        setFormData({
            title: "",
            author: "",
            genre: "",
            isbn: "",
            description: "",
            copies: 1,
        })
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // console.log("Form Data: ", formData)
        if (
            formData.title &&
            formData.author &&
            formData.genre &&
            formData.isbn &&
            formData.description &&
            formData.copies > 0
        ) {
            const newBookObj = {
                title: formData.title,
                author: formData.author,
                genre: formData.genre,
                isbn: formData.isbn,
                description: formData.description,
                copies: formData.copies,
            }

            try {
                const result = await createABook(newBookObj).unwrap()
                // console.log('Success:', result)
                if (result.success) {
                    toast(`${result.message}`);
                    resetForm();
                    setTimeout(()=>{
                        navigate("/books")
                    }, 1500)
                }
            } catch (error) {
                console.error("Failed to create book:", error)
            }
        }
    }


    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Create New
                        Book</h1>
                    <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Add a new book to the library collection
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div
                        className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Book Title */}
                            <div>
                                <label
                                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="flex items-center space-x-2">
                                        <FiBook className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}/>
                                        <span>Book Title</span>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-1 rounded-md border cursor-text ${
                                        darkMode
                                            ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                                    placeholder="Enter book title"
                                    required
                                />
                            </div>

                            {/* Author */}
                            <div>
                                <label
                                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="flex items-center space-x-2">
                                        <FiUser
                                            className={`w-4 h-4 ${darkMode ? "text-green-400" : "text-green-600"}`}/>
                                        <span>Author</span>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-1 rounded-md border cursor-text ${
                                        darkMode
                                            ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                                    placeholder="Enter author name"
                                    required
                                />
                            </div>

                            {/* Genre */}
                            <div>
                                <label
                                    className={`block text-sm font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="flex items-center space-x-2">
                                        <FiTag
                                            className={`w-4 h-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`}/>
                                        <span>Genre</span>
                                    </div>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {genreOptions.map((genre) => (
                                        <label
                                            key={genre}
                                            className={`flex items-center space-x-2 px-3 py-1.5  rounded-md border cursor-pointer ${
                                                formData.genre === genre
                                                    ? darkMode
                                                        ? "bg-purple-900 border-purple-600 text-purple-300"
                                                        : "bg-purple-50 border-purple-500 text-purple-700"
                                                    : darkMode
                                                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-750"
                                                        : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="genre"
                                                value={genre}
                                                checked={formData.genre === genre}
                                                onChange={() => handleGenreChange(genre)}
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                                                    formData.genre === genre
                                                        ? darkMode
                                                            ? "border-purple-400 bg-purple-400"
                                                            : "border-purple-600 bg-purple-600"
                                                        : darkMode
                                                            ? "border-gray-600"
                                                            : "border-gray-400"
                                                }`}
                                            >
                                                {formData.genre === genre &&
                                                    <div className="w-2 h-2 rounded-full bg-white"></div>}
                                            </div>
                                            <span className="text-sm font-medium">{genre}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* ISBN */}
                            <div>
                                <label
                                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="flex items-center space-x-2">
                                        <FiBarChart
                                            className={`w-4 h-4 ${darkMode ? "text-orange-400" : "text-orange-600"}`}/>
                                        <span>ISBN</span>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    name="isbn"
                                    value={formData.isbn}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-1 rounded-md border cursor-text ${
                                        darkMode
                                            ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                                    placeholder="Enter ISBN number"
                                    required
                                />
                            </div>

                            {/* Available Copies */}
                            <div>
                                <label
                                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="flex items-center space-x-2">
                                        <FiCopy className={`w-4 h-4 ${darkMode ? "text-red-400" : "text-red-600"}`}/>
                                        <span>Available Copies</span>
                                    </div>
                                </label>
                                <input
                                    type="number"
                                    name="copies"
                                    value={formData.copies}
                                    onChange={handleInputChange}
                                    min="1"
                                    className={`w-full px-3 py-1 rounded-md border cursor-text ${
                                        darkMode
                                            ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                                    placeholder="Enter number of copies"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                    <div className="flex items-center space-x-2">
                                        <FiFileText
                                            className={`w-4 h-4 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}/>
                                        <span>Short Description</span>
                                    </div>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className={`w-full px-3 py-1 rounded-md border resize-none cursor-text ${
                                        darkMode
                                            ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    }`}
                                    placeholder="Enter book description"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-1.5 rounded-md font-medium cursor-pointer ${
                                        isLoading
                                            ? darkMode
                                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : darkMode
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div
                                                className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiPlus className="w-4 h-4"/>
                                            <span>Create Book</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className={`px-4 py-1.5 rounded-md font-medium cursor-pointer ${
                                        darkMode
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Preview Section */}
                    <div
                        className={`p-6 rounded-lg border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                    >
                        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Preview</h3>

                        {data?.success ? (
                            <div
                                className={`p-4 rounded-lg border ${
                                    darkMode ? "bg-green-900 border-green-700" : "bg-green-50 border-green-200"
                                }`}
                            >
                                <div className="flex items-center space-x-2 mb-3">
                                    <FiCheck className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`}/>
                                    <span className={`font-medium ${darkMode ? "text-green-300" : "text-green-800"}`}>
                                        Book Created Successfully!
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <p className={`text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                                        <strong>Title:</strong> {data?.data?.title}
                                    </p>
                                    <p className={`text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                                        <strong>Author:</strong> {data?.data?.author}
                                    </p>
                                    <p className={`text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                                        <strong>Genre:</strong> {data?.data?.genre}
                                    </p>
                                    <p className={`text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                                        <strong>ISBN:</strong> {data?.data?.isbn}
                                    </p>
                                    <p className={`text-sm ${darkMode ? "text-green-200" : "text-green-700"}`}>
                                        <strong>Copies:</strong> {data?.data?.copies}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                                <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Fill out the form and create a book to see the preview here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreateBookPage;
