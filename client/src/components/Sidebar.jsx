/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { barragan, coyote, grimmjow, logo, logo_svg, szayel } from "../assets";
import { menus } from "../constants";

const Sidebar = ({ user }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [selected, setSelected] = useState("feed");
  const navigate = useNavigate();
  const location = useLocation();
  const {result: profile} = user;

  const goToPage = (page) => {
    setToggleDropdown(false);
    setSelected(page);
    navigate(`/${page}`);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  }

  useEffect(() => {
    setSelected(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <nav className="sticky top-0 left-0 pt-8 flex flex-col h-[100dvh] w-fit items-center max-sm:hidden lg:w-[300px] border-r">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        {/* Logo, User profile, menus */}
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          {/* Logo & user profile */}
          <div className="flex justify-center items-center">
            {/* Logo1 */}
            <div className="w-[60px] h-[60px] flex justify-center items-center p-2 bg-sky-100 rounded-full">
              <img src={logo} alt="logo" className="w-full h-full bg-contain" />
            </div>
            {/* Logo2 */}
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden -ml-2">
              <img src={profile?.imgProfile ? profile?.imgProfile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="user" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full relative z-20">
            <div className="flex flex-col justify-center items-center w-full z-20 bg-white cursor-pointer" onClick={() => {setToggleDropdown(!toggleDropdown)}}>
              <p className="text-base font-bold">{profile?.username}</p>
              <p className="text-xs text-gray-400">@social_media</p>
            </div>
          </div>
        </div>

        {/* Menus */}
        <div className="flex flex-col justify-center items-center gap-2 w-full px-8">
          {menus.map((menu) => (
            <div key={menu.id} className={`w-full p-2 flex justify-between items-center border rounded-xl cursor-pointer ${menu.link === selected ? 'bg-zinc-900 text-white' : 'hover:bg-sky-100'}`} onClick={() => goToPage(menu.link)}>
              <div className="flex center items-center gap-1 w-full">
                <img src={menu.icon} alt={menu.link} className={`w-5 h-5 filter ${menu.link === selected ? 'invert-0' : 'invert'}`} />
                <p className="text-xs font-semibold">{menu.title}</p>
              </div>
              <span className={`${menu.link !== "notifications" ? "hidden" : "inline-flex"} items-center rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-medium text-white ring-1 ring-inset ring-zinc-500/10`}>0</span>
            </div>
          ))}
          <div className="w-full h-[1px] bg-gray-300 mt-2 mb-1"></div>
            <div className={`w-full p-2 flex items-center border rounded-xl cursor-pointer gap-1 ${selected === "profile" ? 'bg-zinc-900 text-white' : 'hover:bg-sky-100'}`} onClick={() => goToPage("profile")}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill={selected === "profile" ? 'filter invert-0' : 'filter invert'} d="M14 7V5h8v2zm0 4V9h8v2zm0 4v-2h8v2zm-6-1q-1.25 0-2.125-.875T5 11q0-1.25.875-2.125T8 8q1.25 0 2.125.875T11 11q0 1.25-.875 2.125T8 14m-6 6v-1.9q0-.525.25-1t.7-.75q1.125-.675 2.388-1.012T8 15q1.4 0 2.663.338t2.387 1.012q.45.275.7.75t.25 1V20z"/></svg>
              <p className="text-xs font-semibold">Mon profil</p>
            </div>
            <div className="w-full flex items-center gap-1 border rounded-xl p-2 cursor-pointer hover:bg-sky-100" onClick={logout}>
              <svg xmlns="http://www.w3.org/2000/svg" className="rotate-180 w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="#000000" strokeWidth="1.5"><path strokeLinecap="round" d="M8.002 7c.012-2.175.108-3.353.877-4.121C9.757 2 11.172 2 14 2h1c2.828 0 4.243 0 5.121.879C21 3.757 21 5.172 21 8v8c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-1c-2.828 0-4.243 0-5.121-.879c-.769-.768-.865-1.946-.877-4.121"/><path d="M8 19.5c-2.357 0-3.536 0-4.268-.732C3 18.035 3 16.857 3 14.5v-5c0-2.357 0-3.536.732-4.268C4.464 4.5 5.643 4.5 8 4.5" opacity=".5"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12H6m0 0l2 2m-2-2l2-2"/></g></svg>
              <p className="text-xs font-semibold">Déconnexion</p>
            </div>
          <div className="w-full h-[1px] bg-gray-300 mt-1"></div>
        </div>
      </div>

      {/* Download the App Button */}
      <div className="border-2 rounded-lg p-4 mt-6 border-dashed flex flex-col justify-center items-center gap-4 relative max-w-[80%]">
        <div className="flex justify-center items-center p-2 rounded-2xl" style={{ backgroundImage: "linear-gradient(to right top, #c94f94, #bf5dab, #b06bbe, #9e78ce, #8985d9, #6e91e3, #4e9be8, #22a5e8, #00b0e4, #00b9da, #00c1cc, #05c7ba)" }}>
          <img src={logo_svg} alt="Storyshare" className="w-10 h-10"/>
        </div>
        <p className="text-xs font-bold w-32 text-center">Télécharger l{`'`}application mobile</p>

        <div className="absolute top-2 left-9 w-6 h-6 rounded-full -rotate-[30deg] shadow-xl overflow-hidden">
          <img src={barragan} alt="sub-img" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute bottom-12 right-8 w-8 h-8 rounded-full rotate-[15deg] shadow-xl overflow-hidden">
          <img src={szayel} alt="sub-img" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full rotate-[10deg] shadow-xl overflow-hidden">
          <img src={coyote} alt="sub-img" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute -bottom-1 -left-10 w-12 h-12 rounded-full -rotate-[45deg] shadow-xl overflow-hidden">
          <img src={grimmjow} alt="sub-img" className="w-full h-full object-cover"/>
        </div>
      </div>

      {/* <div className="w-full bg-zinc-900 flex justify-between items-center p-1 cursor-pointer group">
        <div className="flex items-center p-1 gap-1 translate-x-[calc(100%-100px)] group-hover:translate-x-0 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="M6.196 17.485q1.275-.918 2.706-1.451T12 15.5t3.098.534t2.706 1.45q.99-1.024 1.593-2.42Q20 13.666 20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.667.603 3.063t1.593 2.422M12 12.5q-1.263 0-2.132-.868Q9 10.763 9 9.5t.868-2.132T12 6.5t2.132.868Q15 8.237 15 9.5t-.868 2.132T12 12.5m0 8.5q-1.883 0-3.525-.701q-1.642-.7-2.858-1.916q-1.215-1.216-1.916-2.858T3 12t.701-3.525t1.916-2.858t2.858-1.916T12 3t3.525.701t2.858 1.916q1.215 1.216 1.916 2.858T21 12t-.701 3.525t-1.916 2.858q-1.216 1.215-2.858 1.916T12 21"/></svg>
          <p className="text-sm font-light text-white tracking-wider">Mon profil</p>
        </div>
        <div className="flex hover:bg-gray-100/30 rounded-full p-2 translate-x-full group-hover:translate-x-0 transition-all cursor-pointer" onClick={logout}>
          <svg xmlns="http://www.w3.org/2000/svg" className="rotate-180" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#ffffff" strokeWidth="1.5"><path strokeLinecap="round" d="M8.002 7c.012-2.175.108-3.353.877-4.121C9.757 2 11.172 2 14 2h1c2.828 0 4.243 0 5.121.879C21 3.757 21 5.172 21 8v8c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-1c-2.828 0-4.243 0-5.121-.879c-.769-.768-.865-1.946-.877-4.121"/><path d="M8 19.5c-2.357 0-3.536 0-4.268-.732C3 18.035 3 16.857 3 14.5v-5c0-2.357 0-3.536.732-4.268C4.464 4.5 5.643 4.5 8 4.5" opacity=".5"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12H6m0 0l2 2m-2-2l2-2"/></g></svg>
        </div>
      </div> */}
    </nav>
  )
}

export default Sidebar