import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { HiOutlineHome } from "react-icons/hi2";
import { FaRankingStar } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { SlSettings } from "react-icons/sl";
import { ImExit } from "react-icons/im";
// import { useUserStore } from "../../store/UserStore";
import { toast } from "sonner";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { useThemeStore } from "../../store/ThemeStore";
import { PiUsersThreeBold } from "react-icons/pi";

export const SideBar = ({ children }) => {
  //   const user = useUserStore((state) => state.user);
  const theme = useThemeStore((state) => state.theme);
  const { darkTheme, ligthTheme, systemTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const sidebarClass = isOpen ? "sidebar-open" : "sidebar-closed";
  const arrowClass = isOpen ? "" : "rotate-180";
  return (
    <>
      {" "}
      <div>
        <div
          className={`bg-white dark:bg-slate-800 text-gray shadow-2xl z-[999] max-w-[16rem] h-screen overflow-hidden fixed sm:sticky top-0 left-0 ${sidebarClass} `}
        >
          <div className="flex items-center gap-3 justify-center font-medium border-b text-2xl border-slate-300 py-3 mx-2.5">
            {theme == "" ? (
              <img src="/images/logo.png" alt="" width={200} />
            ) : (
              <img src="/images/logo_white.png" alt="" width={200} />
            )}
          </div>
          <div className="flex flex-col h-full">
            <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-3  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
              <>
                <li>
                  <NavLink to={"/"} className="link">
                    <HiOutlineHome size={23} className="min-w-max" />
                    Inicio
                  </NavLink>
                </li>

                <li>
                  <NavLink to={"/employees"} className="link">
                    <PiUsersThreeBold size={23} className="min-w-max" />
                    Personal
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/employees"} className="link">
                    <PiUsersThreeBold size={23} className="min-w-max" />
                    Personal
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to={"/settings"} className="link">
                    <SlSettings size={23} className="min-w-max" />
                    Configuración
                  </NavLink>
                </li> */}
                <li>
                  <div className="flex p-2.5 bg-blue-50 dark:bg-slate-700 items-center rounded-md justify-between">
                    <MdLightMode
                      onClick={ligthTheme}
                      size={23}
                      className={` hover:text-blue-600 cursor-pointer ${
                        theme == "" && "text-blue-500 min-w-max"
                      }`}
                    />
                    <MdDarkMode
                      onClick={darkTheme}
                      size={23}
                      className={` hover:text-blue-600 cursor-pointer ${
                        theme == "dark" && "text-blue-500 min-w-max"
                      }`}
                    />
                    <HiMiniComputerDesktop
                      onClick={systemTheme}
                      size={23}
                      className={` hover:text-blue-600 cursor-pointer ${
                        theme == "system" && "text-blue-500 min-w-max"
                      }`}
                    />
                  </div>
                </li>
              </>
            </ul>
          </div>
          <div
            onClick={toggleSidebar}
            className={`absolute w-fit h-fit z-50 right-2.5 dark:hover:bg-slate-700 hover:bg-slate-100 rounded-full  p-2.5 bottom-5 cursor-pointer sm:block hidden ${arrowClass}`}
          >
            <IoIosArrowBack size={25} />
          </div>
        </div>
      </div>
      {isOpen ? (
        <button
          onClick={toggleSidebar}
          className="m-1 dark:hover:bg-slate-500 rounded-full p-1 dark:text-white block sm:hidden fixed top-0 cursor-pointer"
        >
          <MdMenu size={25} />
        </button>
      ) : (
        <div
          onClick={toggleSidebar}
          className={`sm:hidden fixed inset-0 max-h-screen z-[998] bg-[rgba(0,0,0,0.5)]`}
        ></div>
      )}
      {children}
    </>
  );
};
