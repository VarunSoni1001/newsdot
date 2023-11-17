import Link from "next/link";
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Tooltip from "./Tooltip";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkScrollPosition = () => {
    const scrollThreshold = window.innerHeight * 0.001;
    const isBottom =
      window.scrollY + window.innerHeight >=
      document.body.scrollHeight - scrollThreshold;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const links = [
    {
      href: "https://varunsoni.vercel.app",
      icon: (
        <span className="font-zina text-lg">
          V<span className="text-fuchsia-700">S</span>
        </span>
      ),
      title: "Checkout my portfolio",
    },
    {
      href: "https://github.com/VarunSoni1001",
      icon: <FaGithub size={16} />,
      title: "Follow me on GitHub",
    },
    {
      href: "https://www.linkedin.com/in/varunsoni1001",
      icon: <FaLinkedinIn size={16} />,
      title: "Follow me on Linkedin",
    },
    {
      href: "https://instagram.com/varunsoni.dev",
      icon: <FaInstagram size={16} />,
      title: "Follow me on Instagram",
    },
    {
      href:
        "https://x.com/Varunsoni1001" || "https://twitter.com/Varunsoni1001",
      icon: <FaXTwitter size={16} />,
      title: "Follow me on X (Twitter)",
    },
  ];

  return (
    <div
      className={`py-1 px-4 lg:py-4 lg:px-8 sticky bottom-0 transition-all ease-in-out duration-300 ${
        isAtBottom
          ? "border-t-0 bg-transparent"
          : "border-t-[1px] border-t-neutral-700 bg-white dark:bg-black dark:border-neutral-50"
      }`}
    >
      {" "}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <span className="block pt-1 lg:pt-0 lg:inline-block">
            <span className="pr-2 font-medium text-sm lg:text-base">
              Made by Varun Soni{" "}
            </span>
            <span className="font-bold border-l border-l-neutral-500 dark:border-neutral-200 py-1 pl-2 text-sm lg:text-base">
              &copy;{" "}
            </span>
            2023<span className="font-zina text-sm lg:text-base"> News.</span>
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-3">
            {links?.map((link, index) => (
              <Tooltip key={index} text={link.title}>
                <Link
                  href={link.href}
                  key={index}
                  className="hover:text-neutral-600 transition-colors ease-in-out duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </Link>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
