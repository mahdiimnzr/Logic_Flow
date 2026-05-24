import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import queryClient from "../core/constants/queryClient";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Bounce, ToastContainer } from "react-toastify";

const AppProvider = () => {
  return (
    <Suspense fallback={<div>IsLoading</div>}>
      <QueryClientProvider client={queryClient}>
        <div className={`light bg-background-default mx-auto h-screen`}>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={false}
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </div>
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppProvider;
