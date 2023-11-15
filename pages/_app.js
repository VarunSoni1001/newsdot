import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class">
        <div className="w-[800px] h-[800px] rounded-[999px] fixed top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50" />
        <div className="w-[1000px] h-[1000px] rounded-[999px] fixed bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-gray-50 to-red-50" />
        <div className="w-[600px] h-[600px] rounded-[999px] fixed bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-blue-50 via-teal-50 to-slate-50" />
        <div className="w-[300px] h-[300px] rounded-[999px] fixed bottom-[-10px] left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-Fuchsia-50 via-cyan-50 to-green-50" />
        <div className="font-satoshi min-h-screen dark:bg-black pt-12 md:pt-20">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
