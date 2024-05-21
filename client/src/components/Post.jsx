import { bgColors } from '../constants'

const Post = () => {
  const post_bgcolor = bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <div className={`w-full flex flex-col gap-4 p-4 rounded-xl ${post_bgcolor}`}>
      {/* User & Options */}
      <div className="w-full flex justify-between items-center">
        {/* User */}
        <div className="flex justify-center items-center gap-2">
          {/* Avatar */}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img src="/assets/ulquiorra.png" alt="user" className="w-full h-full object-cover" />
          </div>

          {/* User info */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold">Ulquiorra Cifer</p>
            <p className="text-xs text-gray-400">Il y a 3 heures</p>
          </div>
        </div>

        {/* Options */}
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center transition-all cursor-pointer hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#000000" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/></svg>
        </div>
      </div>


      {/* Images if any */}
      <div className="w-full h-[200px] border gap-1 flex">
        <div className="h-full rounded-2xl overflow-hidden">
          <img src="/assets/test1.jpg" alt="post" className="w-full h-full object-contain" />
        </div>
        <div className="h-full rounded-2xl overflow-hidden">
          <img src="/assets/test2.jpg" alt="post" className="w-full h-full object-contain" />
        </div>
        <div className="h-full rounded-2xl overflow-hidden">
          <img src="/assets/test3.jpg" alt="post" className="w-full h-full object-contain" />
        </div>
        <div className="h-full rounded-2xl bg-zinc-900/80 flex-1 flex justify-center items-center">
          <p className="text-lg text-white font-bold text-center">Plus de photos</p>
        </div>
      </div>

      {/* Text */}
      <p className="text-[12px] leading-5 font-medium">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum doloribus eaque earum delectus tempora minima? Tempore, consequatur quia. Libero, minus veritatis amet maxime hic assumenda eum. Molestiae nisi quis eaque?</p>

      {/* Tags */}
      <div className="w-full flex flex-wrap gap-1">
        <p className="text-xs font-bold text-blue-600">#vacances</p>
        <p className="text-xs font-bold text-blue-600">#randonnées</p>
        <p className="text-xs font-bold text-blue-600">#montagnes</p>
        <p className="text-xs font-bold text-blue-600">#nature</p>
        <p className="text-xs font-bold text-blue-600">#paysage</p>
        <p className="text-xs font-bold text-blue-600">#voyagesexotiques</p>
      </div>

      {/* Footer */}
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center px-2 py-1 gap-1 rounded-lg cursor-pointer transition-colors hover:bg-neutral-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="#6b7280" d="M240 102c0 70-103.79 126.66-108.21 129a8 8 0 0 1-7.58 0C119.79 228.66 16 172 16 102a62.07 62.07 0 0 1 62-62c20.65 0 38.73 8.88 50 23.89C139.27 48.88 157.35 40 178 40a62.07 62.07 0 0 1 62 62"/></svg>
            <p className="text-xs font-light group-hover:text-black">J{`'`}aime</p>
          </div>
          <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-colors hover:bg-neutral-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#6b7280" d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zM5 5v2h14V5zm0 4v2h8V9zm0 4v2h10v-2z"/></svg>
            <p className="text-xs font-light group-hover:text-black">Commenter</p>
          </div>
          <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-colors hover:bg-neutral-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path fill="#6b7280" d="m237.66 117.66l-80 80A8 8 0 0 1 144 192v-39.77c-57.1 3.24-96.25 40.27-107.24 52a12 12 0 0 1-20.68-9.58c3.71-32.26 21.38-63.29 49.76-87.37c23.57-20 52.22-32.69 78.16-34.91V32a8 8 0 0 1 13.66-5.66l80 80a8 8 0 0 1 0 11.32"/></svg>
            <p className="text-xs font-light group-hover:text-black">Partager</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-colors hover:bg-neutral-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#6b7280" d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"/></svg>
          <p className="text-xs font-light group-hover:text-black">Enregistrer</p>
        </div>
      </div>
    </div>
  )
}

export default Post