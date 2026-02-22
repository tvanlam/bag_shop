import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import { store, persistor } from "./redux/store";
import router from "./routes/RouterConfig";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function App() {
  const LoadingComponent = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg font-semibold text-gray-600">Đang tải...</div>
    </div>
  );

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={<LoadingComponent />} persistor={persistor}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#111",
                colorError: "#ef4444",
                borderRadius: 8,
              },
            }}
          >
            <RouterProvider router={router} />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
