// import { Link } from "react-router-dom";
// import Logo from "./Logo/Logo";
// import Navigate from "./Navigate/Navigate";
// import Account from "./Account/Account";

// const SideBar = () => {
//   return (
//     <>
//       <Logo />
//       <Navigate />
//       <Account />
//     </>
//   );
// };

// export default SideBar;

import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo/Logo";
import Navigate from "./Navigate/Navigate";
import Account from "./Account/Account";

const SideBar = () => {
  return (
    // The main container for the sidebar: fixed width, full height, and uses flex-col
    <div className="w-64 h-full bg-gray-900 flex flex-col sticky">
      {/* 1. Logo (Fixed at the Top) */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* 2. Navigation (Takes all remaining vertical space and allows scrolling) */}
      <div className="flex-grow overflow-y-auto">
        <Navigate />
      </div>

      {/* 3. Account (Fixed at the Bottom) */}
      <div className="flex-shrink-0 border-t border-gray-700">
        <Account />
      </div>
    </div>
  );
};

export default SideBar;
