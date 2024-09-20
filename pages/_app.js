import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem={false}>
        {/* Light mode gradients */}
        <div className="w-[800px] h-[800px] rounded-[999px] fixed top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-50 dark:hidden" />
        <div className="w-[1000px] h-[1000px] rounded-[999px] fixed bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-100 via-gray-100 to-red-50 dark:hidden" />
        <div className="w-[600px] h-[600px] rounded-[999px] fixed bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-100 via-teal-50 to-slate-50 dark:hidden" />
        <div className="w-[300px] h-[300px] rounded-[999px] fixed bottom-[-10px] left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-fuchsia-50 via-cyan-50 to-green-100 dark:hidden" />

        {/* Dark mode gradients */}
        <div className="w-[800px] h-[800px] rounded-[999px] fixed top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-purple-900/30 via-indigo-900/from-purple-900/30 to-blue-900/from-purple-900/30 hidden dark:block" />
        <div className="w-[1000px] h-[1000px] rounded-[999px] fixed bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-gray-900/from-purple-900/30 via-blue-900/from-purple-900/30 to-red-900/from-purple-900/30 hidden dark:block" />
        <div className="w-[600px] h-[600px] rounded-[999px] fixed bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-teal-900/from-purple-900/30 via-slate-900/from-purple-900/30 to-indigo-900/from-purple-900/30 hidden dark:block" />
        <div className="w-[300px] h-[300px] rounded-[999px] fixed bottom-[-10px] left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-fuchsia-900/from-purple-900/30 via-cyan-900/from-purple-900/30 to-green-900/from-purple-900/30 hidden dark:block" />

        <div className="font-satoshi min-h-screen pt-12 lg:pt-20">
          <Toaster reverseOrder={true} />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
