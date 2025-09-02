



import { useDispatch } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";

const MenuToggler = () => {
  const dispatch = useDispatch();
  // menu togggle handler
  const menuToggleHandler = () => {
    dispatch(menuToggle()); 
  };

  return (
    <>
          <style>{`
        @media (min-width: 1266px) {
          .d-1266-none {
            display: none !important;
          }
        }
      `}</style>
    <div className="mb-4 ms-0 show-100  d-1266-none">
      <button
        onClick={menuToggleHandler}
        type="button"
        className="theme-btn toggle-filters"
      >
        <span className="flaticon-menu-1"></span> Menu
      </button>
    </div>
    </>
  );
};

export default MenuToggler;
