"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ToastContainer
        position="top-right"
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
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </SessionProvider>
  );
}
