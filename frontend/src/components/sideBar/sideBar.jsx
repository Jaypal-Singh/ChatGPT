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
    <div className="w-full h-full bg-slate-900 flex flex-col border-r border-slate-800">
      {/* 1. Logo (Fixed at the Top) */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* 2. Navigation (Takes all remaining vertical space and allows scrolling) */}
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <Navigate />
      </div>

      {/* 3. Account (Fixed at the Bottom) */}
      <div className="flex-shrink-0 border-t border-slate-800">
        <Account />
      </div>
    </div>
  );
};

export default SideBar;
