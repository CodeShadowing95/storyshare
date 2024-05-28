/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { deleteGroup, getGroup } from "../services/group-service"
import { groupIcon } from "../assets"

const GroupCard = ({ group, user }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [waitingDelete, setWaitingDelete] = useState(false)

  const removeGroup = async () => {
    setWaitingDelete(true)
    // console.log(group?._id);

    await deleteGroup(`delete-group/${group?._id}`)
    .then((response) => {
      console.log(response);
      // console.log(response.data?.message);
    })
    .catch((error) => {
      console.log(error);
    })
    
    setWaitingDelete(false)
    setOpenModal(false)
    window.location.reload()
  }

  useEffect(() => {
    getGroup(`group/${group?._id}`)
    .then((response) => {
      console.log(response.data?.message);
    })
  }, [group?._id])

  return (
    <div key={group?._id} className={`flex flex-col justify-between items-center w-[360px] max-h-[400px] gap-5 px-4 py-6 ${group?.privacy === "public" ? "bg-gray-50" : "bg-purple-50 border border-purple-300"} rounded-lg shadow-lg`}>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="flex justify-between items-start w-full">
          <div>
            <p className="text-base font-extrabold max-w-[200px]">{group?.name.slice(0, 45)}{group?.name.length > 45 ? "..." : ""}</p>
            { group?.status === "active" ? (
              <div className="flex justify-center items-center gap-0.5 mt-1 bg-yellow-100 border border-yellow-300 rounded-full px-2 py-0.5 max-w-[70px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 15 15"><path fill="#ca8a04" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0"/></svg>
                <p className="text-xs font-semibold text-yellow-600 text-center">{group?.status}</p>
              </div>
            )
            :
            (
              <div className="flex justify-center items-center gap-0.5 mt-1 bg-red-100 border border-red-300 rounded-full px-2 py-1 max-w-[70px]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 15 15"><path fill="#ca8a04" d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0a2.375 2.375 0 0 1 4.75 0"/></svg>
                <p className="text-xs font-semibold text-red-600 text-center">{group?.status}</p>
              </div>
            )}
          </div>
          <div className="w-20 h-20 overflow-hidden">
            <img src={group?.image ? group?.image : groupIcon} alt="groupe-image" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="w-full flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={user?.result.imgProfile ? user?.result.imgProfile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="user" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex gap-1 text-sm font-semibold">
              <p className="max-w-[150px] truncate">{user?.result.username}</p>
              <p>• Admin</p>
            </div>
            <p className="text-xs text-gray-400">{user?.result.email}</p>
          </div>
        </div>
      </div>

      <div className="w-full text-xs text-gray-600">
        <p className="break-words">{group?.description.slice(0, 150)}{group?.description.length > 150 ? '...' : ''}<span className="text-blue-500 cursor-pointer hover:underline">Voir plus</span></p>
      </div>

      <div className="w-full">
        <p className="text-xs text-gray-400 font-semibold">Catégorie</p>
        <p className="text-sm font-bold">{group?.category}</p>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="flex pl-4">
          {group?.members?.length <= 4 ? (
            group.members?.map((member, index) => (
              <div key={index} className={`w-8 h-8 bg-white p-0.5 rounded-full overflow-hidden -translate-x-${4 + (index * 2)}`}>
                <img src={member.user?.imgProfile} alt="user" className="w-full h-full rounded-full object-cover" />
              </div>
            ))
          )
          :
          (
            <>
            <div className={`w-8 h-8 bg-white p-0.5 rounded-full overflow-hidden -translate-x-4`}>
              <img src={group?.members[0].user?.imgProfile} alt="user" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className={`w-8 h-8 bg-white p-0.5 rounded-full overflow-hidden -translate-x-6`}>
              <img src={group?.members[1].user?.imgProfile} alt="user" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className={`w-8 h-8 bg-white p-0.5 rounded-full overflow-hidden -translate-x-8`}>
              <img src={group?.members[2].user?.imgProfile} alt="user" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className={`w-8 h-8 bg-white p-0.5 rounded-full overflow-hidden -translate-x-10`}>
              <img src={group?.members[3].user?.imgProfile} alt="user" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="w-8 h-8 bg-teal-100 p-0.5 rounded-full flex justify-center items-center overflow-hidden -translate-x-[52px]">
              <p className="text-xs font-extrabold text-teal-600">+4</p>
            </div>
            </>
          )}
        </div>
        <div className="relative w-8 h-8 rounded-full flex justify-center items-center transition-all cursor-pointer hover:bg-gray-200" onClick={() => setToggleMenu(!toggleMenu)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#4b5563" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/></svg>
          <div className={`absolute ${toggleMenu ? 'block' : 'hidden'} -inset-x-40 w-[200px] px-2 py-3 bg-white -translate-y-[90px] rounded-lg shadow-md dropdown`}>
            <div className="w-full">
              <div className="w-full px-3 py-2 gap-2 flex items-center text-gray-900 hover:bg-teal-50 hover:text-teal-500 rounded-md group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16q1.875 0 3.188-1.312T16.5 11.5q0-1.875-1.312-3.187T12 7q-1.875 0-3.187 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16m0-1.8q-1.125 0-1.912-.788T9.3 11.5q0-1.125.788-1.912T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2m0 4.8q-3.65 0-6.65-2.037T1 11.5q1.35-3.425 4.35-5.462T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19m0-2q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6Q9.175 6 6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"/></svg>
                <p className="text-xs font-semibold">Consulter</p>
              </div>
              <div className="w-full px-3 py-2 gap-2 flex items-center text-gray-900 hover:bg-teal-50 hover:text-teal-500 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/></svg>
                <p className="text-xs font-semibold">Modifier</p>
              </div>
              <div className="w-full px-3 py-2 gap-2 flex items-center hover:bg-red-50 text-red-500 rounded-md" onClick={() => setOpenModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
                <p className="text-xs font-semibold">Supprimer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Delete */}
      <div className={`fixed inset-0 justify-center items-center bg-black/70 z-30 ${openModal ? "flex" : "hidden"}`}>
        <div className={`flex flex-col justify-center items-center gap-3 rounded-lg bg-white shadow-xl shadow-black/30 w-[400px] p-6 ${openModal ? "translate-y-0" : "-translate-y-[200%]"} transition-transform duration-300`}>
          <div className="flex justify-center items-center rounded-full p-2 bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#dc2626" d="M240.26 186.1L152.81 34.23a28.74 28.74 0 0 0-49.62 0L15.74 186.1a27.45 27.45 0 0 0 0 27.71A28.31 28.31 0 0 0 40.55 228h174.9a28.31 28.31 0 0 0 24.79-14.19a27.45 27.45 0 0 0 .02-27.71m-20.8 15.7a4.46 4.46 0 0 1-4 2.2H40.55a4.46 4.46 0 0 1-4-2.2a3.56 3.56 0 0 1 0-3.73L124 46.2a4.77 4.77 0 0 1 8 0l87.44 151.87a3.56 3.56 0 0 1 .02 3.73M116 136v-32a12 12 0 0 1 24 0v32a12 12 0 0 1-24 0m28 40a16 16 0 1 1-16-16a16 16 0 0 1 16 16"/></svg>
          </div>
          <p className="text-base font-bold">Confirmer la suppression ?</p>
          <p className="text-sm text-gray-500 text-center max-w-[300px]">Cette action est irréversible. Le groupe sera supprimé définitivement. Voulez-vous confirmer la suppression ?</p>
          <button className="w-full flex justify-center items-center py-2 mt-2 gap-4 bg-red-600 hover:bg-red-700 rounded-md text-sm font-semibold text-white shadow-md cursor-pointer disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={waitingDelete} onClick={removeGroup}>
            Oui, supprimer
            {waitingDelete && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect width="6" height="14" x="1" y="4" fill="#ffffff"><animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="9" y="4" fill="#ffffff" opacity=".4"><animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="17" y="4" fill="#ffffff" opacity=".3"><animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;.2"/></rect></svg>}
          </button>
          <div className="w-full flex justify-center items-center py-2 border-2 hover:bg-gray-100 rounded-md text-sm font-semibold cursor-pointer" onClick={() => setOpenModal(false)}>Annuler</div>
        </div>
      </div>
    </div>
  )
}

export default GroupCard