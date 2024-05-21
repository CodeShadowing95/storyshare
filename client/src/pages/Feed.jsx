import { useNavigate } from "react-router-dom";
import Post from "../components/Post"

const Feed = () => {
  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/${page}`);
  }

  return (
    <section className="w-[calc(100vw-300px)] min-h-screen flex px-4 pt-10">
      {/* Feed */}
      <div className="w-[calc(100%-300px)] h-full flex flex-col gap-4 px-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-base font-extrabold">Fil d{`'`}actualités</p>
          <div className="flex justify-center items-center gap-4">
            <p className="text-xs font-semibold cursor-pointer">Tous</p>
            <p className="text-xs text-gray-400 cursor-pointer">Récents</p>
            <p className="text-xs text-gray-400 cursor-pointer">Favoris</p>
            <p className="text-xs text-gray-400 cursor-pointer">Populaires</p>
          </div>
        </div>
        
        {/* Add a post */}
        <div className="w-full p-4 flex justify-between items-center rounded-xl bg-gray-50 border-2 mb-4">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-2xl font-bold">Salut, Ulquiorra 👋</h1>
            <p className="text-sm text-gray-500">Qu{`'`}est-ce que tu veux nous partager aujourd{`'`}hui ?</p>
          </div>
          
          <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center items-center rounded-lg p-1 cursor-pointer shadow-lg transition-all" style={{ background: "linear-gradient(132deg, rgb(2, 106, 122) 0.00%, rgb(242, 78, 163) 100.00%)" }} onClick={() => navigateTo("create-post")}>
              <div className="flex justify-center items-center rounded-lg gap-1 p-2 bg-gray-800 transition-all hover:bg-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="M19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21m-1-4H6v1.5h12zM6 15.5h12V14H6zM6 12h12V6H6zm0 5v1.5zm0-1.5V14zM6 12V6zm0 2v-2zm0 3v-1.5z"/></svg>
                <p className="text-sm text-white font-semibold">Nouveau post</p>
              </div>
            </div>
            <div className="flex justify-center items-center rounded-lg p-1 cursor-pointer shadow-lg transition-all" style={{ background: "linear-gradient(132deg, rgb(2, 106, 122) 0.00%, rgb(242, 78, 163) 100.00%)" }}>
              <div className="flex justify-center items-center rounded-lg gap-1 p-2 bg-gray-800 transition-all hover:bg-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="M5.5 16V8a3 3 0 0 0-3-3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5a3 3 0 0 0 3-3m13-8v8a3 3 0 0 0 3 3a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5a3 3 0 0 0-3 3" opacity=".5"/><path fill="#ffffff" d="M11.5 19c-1.886 0-2.828 0-3.414-.586C7.5 17.828 7.5 16.886 7.5 15V9c0-1.886 0-2.828.586-3.414C8.672 5 9.614 5 11.5 5h1c1.886 0 2.828 0 3.414.586c.586.586.586 1.528.586 3.414v6c0 1.886 0 2.828-.586 3.414C15.328 19 14.386 19 12.5 19z"/></svg>
                <p className="text-sm text-white font-semibold">Nouvelle story</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="w-full flex flex-col gap-2">
          {/* Post example */}
          <Post />
        </div>
      </div>

      {/* Stories & Suggestions && Recommendations */}
      {/* <div className="sticky top-0 right-0 w-[300px] h-full gap-8 px-4"> */}
      <div className="w-[300px] h-full gap-8 px-4">
        {/* Stories */}
        <div className="w-full flex-col gap-2 overflow-hidden mb-8">
          <p className="text-base font-extrabold mb-3">Stories</p>
          {/* If stories empty */}
          <div className="w-full h-[200px] flex justify-center items-center border-dashed border-2 rounded-sm bg-gray-100">
            <div className="w-full flex flex-col justify-center items-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#a0a0a0" d="M5.5 16V8a3 3 0 0 0-3-3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5a3 3 0 0 0 3-3m7-11c1.886 0 2.828 0 3.414.586c.586.586.586 1.528.586 3.414v6c0 1.886 0 2.828-.586 3.414C15.328 19 14.386 19 12.5 19h-1c-1.886 0-2.828 0-3.414-.586C7.5 17.828 7.5 16.886 7.5 15V9c0-1.886 0-2.828.586-3.414C8.672 5 9.614 5 11.5 5zm6 3v8a3 3 0 0 0 3 3a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5a3 3 0 0 0-3 3"/></svg>
              <p className="text-xs font-semibold text-gray-500 max-w-[200px] text-center">Aucune story pour le moment</p>
            </div>
          </div>

          {/* If stories not empty */}
          {/* <div className="w-[300px] h-[200px] gap-2 flex overflow-hidden">
            <div className="min-w-[120px] flex justify-center items-end rounded-xl p-1 overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url(/assets/test3.jpg)"}}>
              <div className="w-full flex items-center bg-white rounded-full shadow-xl gap-1 p-[1px]">
                <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
                  <img src="/assets/ulquiorra.png" alt="user" className="w-full h-full object-cover" />
                </div>
                <p className="text-[11px] font-bold overflow-hidden max-w-[75px] text-ellipsis whitespace-nowrap">Ulquiorra Cifer</p>
              </div>
            </div>
            <div className="min-w-[120px] flex justify-center items-end rounded-xl p-1 overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url(/assets/test1.jpg)"}}>
              <div className="w-full flex items-center bg-white rounded-full shadow-xl gap-1 p-[1px]">
                <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
                  <img src="/assets/yammy.png" alt="user" className="w-full h-full object-cover" />
                </div>
                <p className="text-[11px] font-bold overflow-hidden max-w-[75px] text-ellipsis whitespace-nowrap">Yammy Llargo</p>
              </div>
            </div>
            <div className="min-w-[120px] flex justify-center items-end rounded-xl p-1 overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url(/assets/test2.jpg)"}}>
              <div className="w-full flex items-center bg-white rounded-full shadow-xl gap-1 p-[1px]">
                <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
                  <img src="/assets/coyote.png" alt="user" className="w-full h-full object-cover" />
                </div>
                <p className="text-[11px] font-bold overflow-hidden max-w-[75px] text-ellipsis whitespace-nowrap">Yammy Llargo</p>
              </div>
            </div>
          </div> */}
        </div>


        {/* Suggestions */}
        <div className="w-full flex-col gap-2 mb-8">
          <p className="text-base font-extrabold mb-3">Suggestions</p>
          {/* If suggestions empty */}
          <div className="w-full h-[200px] flex flex-col justify-center items-center border-dashed border-2 rounded-sm bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#a0a0a0" d="M20 10.73q-.31 0-.52-.21t-.21-.52t.21-.52t.52-.21t.52.21t.21.52t-.21.52t-.52.21m0-3.23q-.213 0-.357-.144T19.5 7V4q0-.213.144-.356q.144-.144.357-.144t.356.144T20.5 4v3q0 .213-.144.356q-.144.144-.357.144M9 11.385q-1.237 0-2.119-.882T6 8.385t.881-2.12T9 5.386t2.119.88t.881 2.12t-.881 2.118T9 11.385m-7 6.192v-.608q0-.619.36-1.158t.97-.838q1.416-.679 2.833-1.018T9 13.615t2.837.34t2.832 1.018q.61.298.97.838T16 16.969v.608q0 .44-.299.74t-.74.298H3.039q-.44 0-.739-.299t-.3-.74"/></svg>
            <p className="text-xs font-semibold text-gray-500 max-w-[200px] text-center">Aucune suggestion d{`'`}amis pour le moment</p>
          </div>

          {/* If suggestions not empty */}
          {/* <div className="w-full flex flex-col gap-3">
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <img src="/assets/grimmjow.png" alt="user" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-bold">Grimmjow</p>
                  <p className="text-xs font-bold">Jeagerjaquez</p>
                </div>
              </div>
              <button className="text-xs font-medium bg-zinc-900 text-white rounded-full py-1 px-2">Ajouter</button>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <img src="/assets/szayel.png" alt="user" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center max-w-[100px]">
                  <p className="text-xs font-bold">Szayel Aporro</p>
                  <p className="text-xs font-bold">Granz</p>
                </div>
              </div>
              <button className="text-xs font-medium bg-zinc-900 text-white rounded-full py-1 px-2">Ajouter</button>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <img src="/assets/barragan.png" alt="user" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs font-bold">Barragan</p>
                  <p className="text-xs font-bold">Ruisenban</p>
                </div>
              </div>
              <button className="text-xs font-medium bg-zinc-900 text-white rounded-full py-1 px-2">Ajouter</button>
            </div>
          </div> */}
          {/* <p className="text-xs text-gray-400 mt-3 hover:text-black hover:underline cursor-pointer">Voir tous les utilisateurs</p> */}
        </div>


        {/* Recommandations */}
        <div className="w-full flex-col gap-2 mb-8">
          <p className="text-base font-extrabold mb-3">Recommandations</p>
          {/* If suggestions empty */}
          <div className="w-full h-[200px] flex flex-col justify-center items-center border-dashed border-2 rounded-sm bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#a0a0a0" d="M0 18v-1.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0v-1.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V18zm13.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"/></svg>
            <p className="text-xs font-semibold text-gray-500 max-w-[200px] text-center">Aucun groupe pour le moment</p>
          </div>

          {/* If suggestions not empty */}
          {/* <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[60px] h-[60px] rounded-sm overflow-hidden">
                  <img src="/assets/ux-ui-group.png" alt="user" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold overflow-hidden max-w-[120px] text-ellipsis whitespace-nowrap">UI/UX</p>
              </div>
              <button className="text-xs font-medium bg-zinc-900 text-white rounded-full py-1 px-3">Intégrer</button>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[60px] h-[60px] rounded-sm overflow-hidden">
                  <img src="/assets/lofi.jpg" alt="user" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold overflow-hidden max-w-[120px] text-ellipsis whitespace-nowrap">LOFI HipHop</p>
              </div>
              <button className="text-xs font-medium bg-zinc-900 text-white rounded-full py-1 px-3">Intégrer</button>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[60px] h-[60px] rounded-sm overflow-hidden">
                  <img src="/assets/uefa.jpg" alt="user" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold overflow-hidden max-w-[120px] text-ellipsis whitespace-nowrap">Champions League</p>
              </div>
              <button className="text-xs font-medium bg-zinc-900 text-white rounded-full py-1 px-3">Intégrer</button>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-[60px] h-[60px] rounded-sm overflow-hidden">
                  <img src="/assets/cooking.jpg" alt="user" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold overflow-hidden max-w-[120px] text-ellipsis whitespace-nowrap">Cuisine</p>
              </div>
              <button className="text-xs font-medium bg-zinc-900 text-white rounded-full py-1 px-3">Intégrer</button>
            </div>
          </div> */}
          {/* <p className="text-xs text-gray-400 mt-3 hover:text-black hover:underline cursor-pointer">Voir tous les groupes</p> */}
        </div>
      </div>
    </section>
  )
}

export default Feed