import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    if (isMenuOpen && window.innerWidth > 768) {
      setIsMenuOpen(false);
    }
  };

  const checkScrollPosition = () => {
    const scrollThreshold = 1;
    const scrolled = window.scrollY > scrollThreshold;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", checkScrollPosition);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (
      searchQuery === "" ||
      searchQuery === undefined ||
      searchQuery.length === 0
    ) {
      toast("Please enter a search query!", {
        icon: <IoCloseCircleOutline color="red" />,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 1000,
      });
    } else {
      router.push(`/news/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div
      className={`flex items-center ${
        isScrolled || isMenuOpen
          ? "border-b-[1px] border-neutral-700 bg-white dark:bg-black dark:border-neutral-50"
          : "bg-transparent"
      } ${
        !isMenuOpen ? "justify-between" : "flex-col"
      } py-3 px-8 fixed top-0 left-0 w-full transition-all ease-in-out duration-300 z-50`}
    >
      <div className="flex w-full max-w-5xl justify-between items-center overflow-hidden">
        <div className="text-lg md:text-xl lg:text-2xl">
          <Link href={"/"} className="font-zina">
            News.
          </Link>
        </div>

        <div className="flex items-center justify-between">
          {searchButtonClicked && (
            <AnimatePresence>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: -10, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="flex items-center justify-center"
              >
                <button
                  onClick={() => {
                    setSearchButtonClicked(false);
                    setSearchQuery("");
                  }}
                  title="Close"
                >
                  <IoCloseCircleOutline
                    size={17}
                    className="mr-2 text-gray-500"
                  />
                </button>
                <form
                  onSubmit={handleSearch}
                  className="flex items-center rounded-lg bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white outline-none transition-all ease-in-out duration-300"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news"
                    className="placeholder:text-neutral-700 text-sm lg:text-base dark:placeholder:text-neutral-300 py-1 px-2 rounded-md bg-neutral-300 dark:bg-neutral-800 text-black dark:text-white outline-none transition-all ease-in-out duration-300 focus:outline-none"
                  />
                  <button type="submit" title="Search">
                    <FaSearch
                      size={16}
                      className="text-neutral-900 dark:text-white dark:hover:text-neutral-700 hover:text-neutral-700 transition-all duration-300 ml-2 -translate-x-[0.45rem]"
                    />
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>
          )}
          {!searchButtonClicked && (
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: -10, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              title="Search"
              onClick={() => setSearchButtonClicked(true)}
            >
              <FaSearch
                size={16}
                className="text-neutral-900 dark:text-white dark:hover:text-neutral-700 hover:text-neutral-700 transition-all duration-300"
              />
            </motion.button>
          )}
        </div>

        {!isMenuOpen ? (
          <button
            className="lg:hidden"
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
            className="lg:hidden"
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
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex lg:items-center lg:justify-between"
        >
          {menuLinks?.map((menuLink, index) => (
            <motion.div
              key={index}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              className="hidden lg:flex lg:items-center lg:justify-between"
            >
              <Link
                key={index + " " + menuLink.href}
                href={menuLink.href}
                className={`m-4 transition-all ease-in-out duration-300 hover:text-neutral-700 ${
                  router.pathname === menuLink.href
                    ? "font-bold underline underline-offset-4"
                    : ""
                }`}
              >
                {menuLink.label}
              </Link>
            </motion.div>
          ))}
          <ThemeSwitch />
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, display: "none" }}
              animate={{ opacity: 1, height: "auto", display: "block" }}
              exit={{ opacity: 0, height: 0, display: "none" }}
              className="lg:hidden"
            >
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col min-h-screen mt-20"
              >
                {menuLinks?.map((menuLink, index) => (
                  <Link
                    key={index + " " + menuLink.href}
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
