import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    if (isMenuOpen && window.innerWidth > 768) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/news/technology", label: "Technology" },
    { href: "/news/science", label: "Science" },
    { href: "/news/business", label: "Business" },
    { href: "/news/sports", label: "Sports" },
    { href: "/news/health", label: "Health" },
    { href: "/news/entertainment", label: "Entertainment" },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`flex items-center ${
        !isMenuOpen ? "justify-between" : "flex-col"
      } py-3 px-8 fixed top-0 left-0 w-full bg-white border-b-[1px] border-neutral-700 transition-colors dark:bg-black dark:border-neutral-50 z-50`}
    >
      <div className="flex w-full max-w-5xl justify-between items-center overflow-hidden">
        <div className="text-lg md:text-xl lg:text-2xl">
          <Link href={"/"} className="font-zina">
            News.
          </Link>
        </div>

        {!isMenuOpen ? (
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-black dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        ) : (
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-black dark:text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div>
        <div className="hidden md:flex md:items-center md:justify-between">
          {menuLinks?.map((menuLink) => (
            <Link
              key={menuLink.href}
              href={menuLink.href}
              className={`m-4 transition-all ease-in-out duration-300 hover:text-neutral-700 ${
                router.pathname === menuLink.href
                  ? "font-bold underline underline-offset-4"
                  : ""
              }`}
            >
              {menuLink.label}
            </Link>
          ))}
          <ThemeSwitch />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col min-h-screen mt-24">
                {menuLinks?.map((menuLink) => (
                  <Link
                    key={menuLink.href}
                    href={menuLink.href}
                    className={`m-4 transition-all ease-in-out duration-300 text-center hover:text-neutral-700 ${
                      router.pathname === menuLink.href
                        ? "font-bold underline underline-offset-4"
                        : ""
                    }`}
                  >
                    {menuLink.label}
                  </Link>
                ))}
                <ThemeSwitch />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
