import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {RootState, AppDispatch} from "../Store/reduxStore.tsx";


// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppSelector = useSelector.withTypes<RootState>;
// export const useAppDispatch = () => useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;


/*
আপনি যেহেতু "react-redux": "^9.2.0" ব্যবহার করছেন, এটি সর্বশেষ সংস্করণগুলোর (v9.x) মধ্যে পড়ে, যেখানে TypeScript ইন্টিগ্রেশন আরও উন্নত হয়েছে।
react-redux v9.x-এ TypedUseSelectorHook এবং টাইপ সেফটি এর জন্য সরাসরি সাপোর্ট আছে।
তবে useSelector.withTypes বা useDispatch.withTypes এখনো অফিসিয়াল API-তে নেই।
আপনার কোডে useAppSelector এবং useAppDispatch সঠিকভাবে কাজ করতে হলে, আপনাকে TypedUseSelectorHook-এর সাথে সামঞ্জস্য রাখতে হবে।
*/


// To Learn more, visit (https://redux.js.org/tutorials/typescript-quick-start).
