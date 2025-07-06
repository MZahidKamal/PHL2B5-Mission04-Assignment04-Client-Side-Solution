import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../Store/reduxStore.tsx";


interface ThemeInterface {
    isDark: boolean;
    source: string;
}


// Helper function to get initial theme from localStorage
const getInitialTheme = (): ThemeInterface => {
    const savedTheme = localStorage.getItem("bookLibrary-theme");
    if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        return {
            isDark: parsedTheme.isDark, // Use saved isDark value
            source: parsedTheme.source, // Use saved source
        };
    }

    // Default to light theme if nothing in localStorage
    const defaultTheme = { isDark: false, source: "default" };
    localStorage.setItem("bookLibrary-theme", JSON.stringify(defaultTheme));
    return defaultTheme;
};


const darkLightThemeSlice = createSlice({
    name: "darkLightTheme",
    initialState: getInitialTheme(),
    reducers: {
        toggleDarkLightTheme: (state) => {
            state.isDark = !state.isDark; // Toggle theme
            state.source = "user-preference"; // Update source
            localStorage.setItem("bookLibrary-theme", JSON.stringify({ isDark: state.isDark, source: state.source })); // Save full object
        },
    }
})


export const selectTheme = (state: RootState) => {
    return state.darkLightTheme.isDark;
};


export const {toggleDarkLightTheme} = darkLightThemeSlice.actions;


export default darkLightThemeSlice.reducer;
