import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import queryClient from "../core/constants/queryClient";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { ToastContainer } from "@contentstack/react-toastify";

const AppProvider = () => {
  return (
    <Suspense fallback={<div>IsLoading</div>}>
      <QueryClientProvider client={queryClient}>
        <div className={`bg-background-default mx-auto`}>
          <RouterProvider router={router} />
          <ToastContainer position="top-left" reverseOrder={false} />
        </div>
      </QueryClientProvider>
    </Suspense>
  );
};

export default AppProvider;
