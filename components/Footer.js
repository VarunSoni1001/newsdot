import Link from "next/link";
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import Tooltip from "./Tooltip";

const Footer = () => {
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
      icon: <FaGithub size={17} />,
      title: "Follow me on GitHub",
    },
    {
      href: "https://www.linkedin.com/in/varunsoni1001",
      icon: <FaLinkedinIn size={17} />,
      title: "Follow me on Linkedin",
    },
    {
      href: "https://instagram.com/varunsoni.dev",
      icon: <FaInstagram size={17} />,
      title: "Follow me on Instagram",
    },
    {
      href:
        "https://x.com/Varunsoni1001" || "https://twitter.com/Varunsoni1001",
      icon: <FaXTwitter size={17} />,
      title: "Follow me on X (Twitter)",
    },
  ];

  return (
    <div className="py-4 px-4 md:px-8 bg-white border-t-[1px] sticky bottom-0 border-t-neutral-700 transition-colors dark:bg-black dark:border-neutral-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="block md:inline-block">
            <span className="pr-2 font-medium">Made by Varun Soni </span>
            <span className="font-bold border-l border-l-neutral-500 dark:border-neutral-200 py-1 pl-2">
              &copy;{" "}
            </span>
            2023<span className="font-zina"> News.</span>
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
