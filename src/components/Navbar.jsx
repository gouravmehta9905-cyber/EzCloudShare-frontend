import React  from "react";
import { Menu, X, Share2, Link, WalletCards, User, Wallet } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import SideMenu from "./SideMenu";
import CreditsDisplay from "./CreditsDisplay";
import { UserCreditsContext } from "../context/UserCreditsContext";
import { useEffect } from "react";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = React.useState(false);
  const {credits,fetchUserCredits}=React.useContext(UserCreditsContext); 

  useEffect(() => {
    fetchUserCredits(); // Fetch user credits when the Navbar mounts
  }, []);

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30 ">
      {/* Left side - menu button and title */}

      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors "
        >
          {openSideMenu ? (
            <X className="text-2xl " />
          ) : (
            <Menu className="text-2xl " />
          )}
        </button>

        <div className="flex items-center gap-2">
          <Share2 className=" text-blue-600" />
          <span className="text-lg font-medium text-black truncate">
            EZCloudShare
          </span>
        </div>
      </div>

      {/* right side - credits and user button  */}

      <SignedIn>
        <div className="flex items-center gap-4">
          
            <CreditsDisplay credits={credits} />
          

          <div className="relative">
            <UserButton />
          </div>
        </div>
      </SignedIn>

      {/* menu button for mobile */}
      {openSideMenu && (
        <div className="fixed top-18.25 left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
          {/* side menu bar */}
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
