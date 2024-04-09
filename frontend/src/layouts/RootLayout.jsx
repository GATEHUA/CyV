import { SideBar } from "./sidebar/SideBar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div>
      <div className="flex font-Poppins bg-slate-200 dark:bg-gray-800 dark:text-white">
        <SideBar>
          {
            <div className="w-full h-full overflow-auto">
              <Outlet />
            </div>
          }
        </SideBar>
      </div>
    </div>
  );
};
