import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import supportReducer from "./slices/SupportSlice";
import authReducer from "./slices/AuthSlice";
import accountReducer from "./slices/AccountSlice";
import productReducer from "./slices/ProductSlice";
import cartReducer from "./slices/CartSlice";
import categoryReducer from "./slices/CategorySlice";
import checkoutReducer from "./slices/CheckoutSlice";
import reviewReducer from "./slices/ReviewSlice"
// Config cho auth - lưu vào sessionStorage (tự động xóa khi đóng browser)
const authPersistConfig = {
  key: "auth",
  storage: storageSession,
};

// Config cho cart - lưu vào localStorage (persistent)
const cartPersistConfig = {
  key: "cart",
  storage: storage,
};

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth", "cart"],
};

// Áp dụng persist config cho từng reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  account: accountReducer,
  support: supportReducer,
  product: productReducer,
  cart: persistedCartReducer,
  category: categoryReducer,
  checkout: checkoutReducer,
  review: reviewReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
