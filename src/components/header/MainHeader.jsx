import useAuthStore from "@/utils/authStoreZusland";
import LoginPopup from "../LoginAndRegister/Login/LoginPopup";
import DashboardHeader from "./DashboardHeader";
import DefaulHeader from "./DefaulHeader";
import MobileMenu from "./MobileMenu";

export default function HeaderLayout() {
  // Get user from Zustand store to check login status
  const { user } = useAuthStore();

  // Determine if user is logged in (user exists and has a token)
  const isLoggedIn = !!user && !!user.token;

  return (
    <>
      <LoginPopup />
      {isLoggedIn ? <DashboardHeader /> : <DefaulHeader />}
      <MobileMenu />
    </>
  );
}
