
const Sidebar = () => {
  return (
    <nav className="sticky top-0 left-0 pt-2 flex flex-col h-[calc(100vh-32px)] w-fit justify-between items-center max-sm:hidden lg:w-[300px] border-r">
      <div className="w-full flex flex-col justify-center items-center gap-6">
        {/* Logo, User profile, menus */}
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          {/* Logo & user profile */}
          <div className="flex justify-center items-center">
            {/* Logo1 */}
            <div className="w-[60px] h-[60px] flex justify-center items-center p-2 bg-sky-100 rounded-full">
              <img src="/assets/logo.png" alt="logo" className="w-full h-full bg-contain" />
            </div>
            {/* Logo2 */}
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden -ml-2">
              <img src="/assets/ulquiorra.png" alt="user" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full relative z-20">
            <div className="flex flex-col justify-center items-center w-full z-20 bg-white">
              <p className="text-base font-bold">Ulquiorra</p>
              <p className="text-xs text-gray-400">@social_media</p>
            </div>
            {/* Dropdown */}
            <div className="absolute w-full border bg-white rounded-sm p-2 z-10 hidden translate-y-1 transition-all">
              <div className="w-full flex flex-col justify-center gap-2">
                <div className="flex items-center p-1 gap-1 hover:bg-gray-100 cursor-pointer w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M12 11.385q-1.237 0-2.119-.882T9 8.385t.881-2.12T12 5.386t2.119.88t.881 2.12t-.881 2.118t-2.119.882m-7 7.23V16.97q0-.619.36-1.158t.97-.838q1.416-.679 2.833-1.018t2.837-.34t2.837.34t2.832 1.018q.61.298.97.838T19 16.969v1.646z"/></svg>
                  <p className="text-xs font-medium">Profil</p>
                </div>
                <div className="flex items-center p-1 gap-1 hover:bg-gray-100 cursor-pointer w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"/></svg>
                  <p className="text-xs font-medium">Déconnexion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menus */}
        <div className="flex flex-col justify-center items-center gap-2 w-full px-4">
          <div className="w-full p-2 flex items-center gap-1 border rounded-xl bg-zinc-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M14 9q-.425 0-.712-.288T13 8V4q0-.425.288-.712T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9zM4 13q-.425 0-.712-.288T3 12V4q0-.425.288-.712T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13zm10 8q-.425 0-.712-.288T13 20v-8q0-.425.288-.712T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21zM4 21q-.425 0-.712-.288T3 20v-4q0-.425.288-.712T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21z"/></svg>
            <p className="text-xs font-semibold text-white">Fil d{`'`}actualités</p>
          </div>
          <div className="w-full p-2 flex items-center gap-1 border rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="#000000" d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M4.5 3h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1m0 2h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5"/></svg>
            <p className="text-xs font-semibold">Mes publications</p>
          </div>
          <div className="w-full p-2 flex items-center gap-1 border rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M5.5 16V8a3 3 0 0 0-3-3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5a3 3 0 0 0 3-3m7-11c1.886 0 2.828 0 3.414.586c.586.586.586 1.528.586 3.414v6c0 1.886 0 2.828-.586 3.414C15.328 19 14.386 19 12.5 19h-1c-1.886 0-2.828 0-3.414-.586C7.5 17.828 7.5 16.886 7.5 15V9c0-1.886 0-2.828.586-3.414C8.672 5 9.614 5 11.5 5zm6 3v8a3 3 0 0 0 3 3a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5a3 3 0 0 0-3 3"/></svg>
            <p className="text-xs font-semibold">Mes stories</p>
          </div>
          <div className="w-full p-2 flex items-center gap-1 border rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M0 18v-1.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0v-1.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V18zm13.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"/></svg>
            <p className="text-xs font-semibold">Forums</p>
          </div>
          <div className="w-full p-2 flex items-center gap-1 border rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M3 22q-.425 0-.713-.288T2 21v-1.25q0-.775.4-1.413t1.1-.987q1.3-.65 2.688-1T9.024 16q1.45 0 2.838.35t2.662 1q.675.35 1.075.988t.4 1.412V21q0 .425-.288.713T15 22H3Zm17 0h-2.475q.225-.175.35-.438t.125-.587V19.5q0-.95-.488-1.775t-1.212-1.45q.8.2 1.588.438t1.512.612q.65.35 1.125.9T21 19.5V21q0 .425-.287.712T20 22ZM9 15q-1.45 0-2.475-1.025T5.5 11.5q0-1.45 1.025-2.475T9 8q1.45 0 2.475 1.025T12.5 11.5q0 1.45-1.025 2.475T9 15Zm8.5-3.5q0 1.45-1.025 2.475T14 15q-.2 0-.362-.013t-.338-.062q.625-.725.913-1.6T14.5 11.5q0-.95-.288-1.825t-.912-1.6q.175-.05.338-.062T14 8q1.45 0 2.475 1.025T17.5 11.5Zm1-1.5q0-1.875-1.313-3.188T14 5.5q1.875 0 3.188-1.313T18.5 1q0 1.875 1.313 3.188T23 5.5q-1.875 0-3.188 1.313T18.5 10Z"/></svg>
            <p className="text-xs font-semibold">Amis</p>
          </div>
          <div className="w-full p-2 flex justify-between items-center border rounded-xl">
            <div className="flex center items-center gap-1 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h1v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18t-.288.713T19 19zm7 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m0-9q.425 0 .713-.288T13 12V9q0-.425-.288-.712T12 8t-.712.288T11 9v3q0 .425.288.713T12 13m0 3q.425 0 .713-.288T13 15t-.288-.712T12 14t-.712.288T11 15t.288.713T12 16"/></svg>
              <p className="text-xs font-semibold">Notifications</p>
            </div>
            <span className="inline-flex items-center rounded-md bg-zinc-900 px-2 py-1 text-[10px] font-medium text-white ring-1 ring-inset ring-zinc-500/10">0</span>
          </div>
          <div className="w-full p-2 flex items-center gap-1 border rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M14.5 23q-.625 0-1.062-.437T13 21.5v-7q0-.625.438-1.062T14.5 13h7q.625 0 1.063.438T23 14.5v7q0 .625-.437 1.063T21.5 23zm.5-1.5h6q.2 0 .35-.15t.15-.35q0-.15-.05-.275t-.15-.25q-.625-.675-1.463-1.075T18 19t-1.838.4t-1.462 1.075q-.05.05-.2.525q0 .2.15.35t.35.15m3-3.5q.625 0 1.063-.438T19.5 16.5t-.437-1.062T18 15t-1.062.438T16.5 16.5t.438 1.063T18 18m-7.925 4q-.375 0-.612-.213t-.288-.537l-.325-2.4q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1q-.025-.175-.025-.337v-.676q0-.162.025-.337l-1.325-1Q2.675 9.95 2.525 9.3t.2-1.225L3.9 6.025q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1t1.162-.45h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-.625.45q-.125.1-.275.138t-.3.037h-3.875q-.15 0-.275-.1t-.175-.225q-.4-.95-1.263-1.562T12.05 8.5q-1.45 0-2.475 1.025T8.55 12q0 1.1.588 1.963t1.537 1.262q.125.05.225.175t.1.275v5.475q0 .35-.262.6t-.663.25"/></svg>
            <p className="text-xs font-semibold">Paramètres</p>
          </div>
        </div>
      </div>

      {/* Download the App Button */}
      <div className="border-2 rounded-lg p-8 border-dashed flex flex-col justify-center items-center gap-4 relative max-w-[80%]">
        <div className="flex justify-center items-center p-2 rounded-2xl" style={{ backgroundImage: "linear-gradient(to right top, #c94f94, #bf5dab, #b06bbe, #9e78ce, #8985d9, #6e91e3, #4e9be8, #22a5e8, #00b0e4, #00b9da, #00c1cc, #05c7ba)" }}>
          <img src="/assets/logo_svg.svg" alt="Storyshare" className="w-10 h-10"/>
        </div>
        <p className="text-xs font-bold w-32 text-center">Télécharger l{`'`}application mobile</p>

        {/* Photos */}
        <div className="absolute top-6 left-12 w-6 h-6 rounded-full -rotate-[30deg] shadow-xl overflow-hidden">
          <img src="/assets/barragan.png" alt="sub-img" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute bottom-16 right-12 w-8 h-8 rounded-full rotate-[15deg] shadow-xl overflow-hidden">
          <img src="/assets/szayel.png" alt="sub-img" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full rotate-[10deg] shadow-xl overflow-hidden">
          <img src="/assets/grimmjow.png" alt="sub-img" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute -top-10 -left-4 w-12 h-12 rounded-full -rotate-[45deg] shadow-xl overflow-hidden">
          <img src="/assets/coyote.png" alt="sub-img" className="w-full h-full object-cover"/>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar