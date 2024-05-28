/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { GroupCard, Searchgroup } from "../components"
import { getUsers } from "../services/user-service";
import { createGroup, getGroups } from "../services/group-service";
import { loader } from "../assets";

const Group = ({ user }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(false)
  const [groups, setGroups] = useState([])


  const [users, setUsers] = useState([])
  const [memberFigures, setMemberFigures] = useState([])
  const [groupData, setGroupData] = useState({
    creator: user.result._id,
    name: "",
    description: "",
    image: "",
    members: [
      { user: user.result._id, role: "admin" },
    ],
    category: "Autre",
    privacy: "public",
  })

  const uploadImages = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // setImages([...images, { id: randomId, src: reader.result }]);
        setGroupData({ ...groupData,  image: reader.result });
      };
    };
  }

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value })
  }

  const onAddRemoveMember = (userData) => {
    if(groupData.members.find((item) => item.user === userData._id)) {
      setGroupData({ ...groupData, members: groupData.members.filter((item) => item.user !== userData._id) })
      setMemberFigures(memberFigures.filter((item) => item._id !== userData._id))
      return;
    }
    setGroupData({ ...groupData, members: [...groupData.members, { user: userData._id } ] })
    setMemberFigures([...memberFigures, userData])
  }

  const submitDatas = async (e) => {
    e.preventDefault();

    if((!groupData.name && !groupData.description && !groupData.members)) return

    setIsProcessing(true);
    try {
      // console.log(groupData);
      await createGroup("create-group", groupData)
      .then((response) => {
        console.log(response);
        setIsSuccess(true);
      })
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
      setOpenModal(false);
      window.location.reload();
    }

    emptyFields();
  }

  const emptyFields = () => {
    setGroupData({
      name: "",
      description: "",
      image: "",
      category: "",
      members: [],
      privacy: "public",
    })
    setMemberFigures([])
    setOpenModal(false);
  }

  const discardModalWhenClickOutside = (e) => {
    if (e.target.id === "modal") setOpenModal(false);
  }

  useEffect(() => {
    document.addEventListener("click", discardModalWhenClickOutside);
    return () => document.removeEventListener("click", discardModalWhenClickOutside);
  }, []);

  useEffect(() => {
    getUsers()
    .then((response) => {
      const { data: datas} = response.data;
      setUsers(datas.filter((item) => item._id !== user?.result?._id));
    })
  }, [user?.result?._id]);

  useEffect(() => {
    setLoadingGroups(true);
    getGroups(`creator/${user.result._id}`)
    .then((response) => {
      // console.log(response);
      const { data } = response;
      // console.log(data);
      setGroups(data);
      setLoadingGroups(false);
    })
  }, []);

  return (
    <section className="w-[calc(100vw-300px)] min-h-screen flex pt-10 px-4 relative overflow-hidden">
      {/* Groups */}
      <div className="w-full h-full flex flex-col gap-8 px-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-2xl font-extrabold">Forums <span className="text-sm text-gray-400 font-normal">|</span> <span className="text-sm text-gray-400 font-semibold">{groups?.length}</span></p>
          <div className="flex justify-center items-center gap-4">
            <Searchgroup />
            <div className="flex justify-center items-center gap-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer" onClick={() => setOpenModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
              Nouveau groupe
            </div>
          </div>
        </div>

        {/* Groups list */}
        <div className={`w-full h-full grid ${groups?.length > 0 ? "grid-cols-3" : "grid-cols-1"} gap-4 pb-4`}>
          {loadingGroups ?
            <div className="w-full flex justify-center items-center gap-2">
              <img src={loader} alt="loader" width="20" height="20" />
              <p className="text-[13px] font-medium">Chargement...</p>
            </div>
            :
            groups && (
              groups.length === 0 ? (
                <div className="w-full h-full flex flex-col justify-center items-center gap-4 bg-gray-100 border-[5px] border-dashed border-gray-300 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-400" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm7-5q.95 0 1.725-.55T14.8 14H19V5H5v9h4.2q.3.9 1.075 1.45T12 16"/></svg>
                  <h1 className="text-xl font-extrabold text-gray-400">Pas de groupes</h1>
                  <p className="text-sm text-gray-400">Aucun groupe créé pour le moment</p>
                </div>
              )
              :
              (
                groups.map((group) => (
                  <div key={group?._id}>
                    <GroupCard group={group} user={user} />
                  </div>
                ))
              )
            )
          }
        </div>

        {/* Modal Overlay */}
        <div id="modal" className={`fixed inset-0 justify-center items-center max-h-screen bg-black/50 ${openModal ? 'flex' : 'hidden'}`}>
          <div className="w-4/6 flex flex-col justify-center items-center p-4 bg-white rounded-lg">
            <div className="w-full flex justify-between items-center">
              <p className="text-xl font-extrabold">Créer un groupe</p>
              <div className="w-8 h-8 p-2 rounded-full border border-gray-400 hover:bg-gray-100 cursor-pointer" onClick={emptyFields}>
                <svg xmlns="http://www.w3.org/2000/svg" className="m-auto" viewBox="0 0 24 24"><path fill="#000000" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
              </div>
            </div>
            <form className="flex mt-6 gap-4 w-full">
              {/* Left side */}
              <div className="w-full grid gap-6">
                <div>
                  <label htmlFor="group_image" className="block mb-2 text-sm font-semibold text-gray-900">Image de groupe</label>
                  {/* Image */}
                  <div className="flex items-start gap-4">
                    <div className="flex justify-center items-center w-32 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                      {groupData.image !== "" ?
                        <img src={groupData.image} alt="group_image" className="w-full h-full object-cover" />
                      :
                        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24"><path fill="#9ca3af" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h9v5h2v2h5v9q0 .825-.587 1.413T19 21zm1-4h12l-3.75-5l-3 4L9 13zm11-8V7h-2V5h2V3h2v2h2v2h-2v2z"/></svg>
                      }
                    </div>
                    <div>
                      <button type="button" className="flex gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-300" onClick={uploadImages} disabled={isProcessing}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13q0-1.875-1.312-3.187T11 8.5q-1.875 0-3.187 1.313T6.5 13q0 1.875 1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13q0-1.05.725-1.775T11 10.5q1.05 0 1.775.725T13.5 13q0 1.05-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z"/></svg>
                        {groupData.image !== "" ? "Modifier l'image" : "Ajouter une image"}
                      </button>
                      {groupData.image !== "" &&
                        <button type="button" className="flex items-center gap-1 text-xs font-light text-red-500 mt-2" onClick={() => setGroupData({ ...groupData, image: "" })}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-red-500" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
                          Retirer l{`'`}image
                        </button>
                      }
                    </div>
                  </div>
                </div>
                {/* Groupe name */}
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-900">Groupe</label>
                  <input type="text" value={groupData.name} name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" placeholder="Nom du groupe" required onChange={handleChange} />
                </div>
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-900">Description</label>
                  <textarea name="description" value={groupData.description} rows="4" className="block p-2.5 w-full text-[13px] resize-y text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Description générale du groupe" onChange={handleChange}></textarea>
                </div>
                {/* Categorie */}
                <div>
                  <label htmlFor="categories" className="block mb-2 text-sm font-semibold text-gray-900">Catégorie</label>
                  <select name="category" value={groupData.category} id="catgories" className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" onChange={handleChange}>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Aides & Assistances sociales">Aides & Assistances sociales</option>
                    <option value="Développement Web">Informatique</option>
                    <option value="Jeux Vidéos">Divertissement</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts & Culture">Arts & Culture</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Autres">Autres</option>
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className="bg-gray-200 w-[1px]"></div>

              {/* Right side */}
              <div className="w-full">
                <div className="mb-4">
                  <label htmlFor="categories" className="block mb-2 text-sm font-semibold text-gray-900">Visibilité</label>
                  <select name="privacy" value={groupData.privacy} className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" onChange={handleChange}>
                    <option value="public">Public</option>
                    <option value="private">Privée</option>
                  </select>
                </div>

                <p className="text-sm font-semibold mb-2">Membres</p>
                <div id="states-button" className="flex-shrink-0 z-10 inline-flex justify-between items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 w-full cursor-pointer" onClick={() => setToggleMenu(!toggleMenu)}>
                  <div className="flex justify-center items-center gap-2">
                    Ajouter des membres
                    <div className="p-2 w-6 h-6 flex justify-center items-center bg-orange-500 rounded-full text-xs font-bold text-black">{memberFigures ? memberFigures.length : 0}</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#6b7280" d="m12 15l-5-5h10z"/></svg>
                </div>
                <div className={`z-10 ${toggleMenu ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-full`}>
                  {/* Search */}
                  <div className="relative w-full p-2">
                    <input type="text" id="voice-search" className="outline-none bg-white border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 pe-8 p-1.5" placeholder="Rechercher un utilisateur..." required />

                    <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#6b7280" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"/></svg>
                    </button>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 max-h-[285px] overflow-auto">
                    {users.map((userObj) => (
                      <li key={userObj._id}>
                        <div className={`inline-flex w-full px-4 py-2 text-sm text-gray-700 ${memberFigures.includes(userObj) ? 'bg-blue-50' : 'hover:bg-gray-100'}`}>
                          <div className="inline-flex justify-between items-center w-full">
                            <div className="inline-flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden">
                                <img src={userObj?.imgProfile ? userObj?.imgProfile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="member" className="w-full h-full object-cover" />
                              </div>
                              {userObj?.username}
                            </div>
                            <div className={`flex justify-center items-center px-2 py-1 rounded-md shadow-lg border ${memberFigures.includes(userObj) ? "bg-blue-200 border-blue-300" : "bg-gray-200 border-gray-300 hover:bg-gray-100"}`} onClick={() => onAddRemoveMember(userObj)}>
                              {memberFigures.includes(userObj) ? (
                                <div className="flex justify-center items-center gap-2 cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24"><path fill="currentColor" d="M17.55 12L14 8.45l1.425-1.4l2.125 2.125l4.25-4.25l1.4 1.425zM9 12q-1.65 0-2.825-1.175T5 8q0-1.65 1.175-2.825T9 4q1.65 0 2.825 1.175T13 8q0 1.65-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z"/></svg>
                                  <p className="text-xs font-semibold text-blue-500 mr-2">Ajouté</p>
                                </div>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24"><path fill="currentColor" d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3zm-9-2q-1.65 0-2.825-1.175T5 8q0-1.65 1.175-2.825T9 4q1.65 0 2.825 1.175T13 8q0 1.65-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z"/></svg>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </form>

            {/* Create & cancel buttons */}
            <div className="flex justify-between items-center mt-8 gap-4">
              <button className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" disabled={isProcessing} onClick={submitDatas}>
                Confirmer
                {isProcessing && 
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect width="6" height="14" x="1" y="4" fill="#ffffff"><animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="9" y="4" fill="#ffffff" opacity=".4"><animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="17" y="4" fill="#ffffff" opacity=".3"><animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;.2"/></rect></svg>
                }
              </button>
              <button className="w-full hover:bg-gray-200 border-2 border-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" onClick={emptyFields} disabled={isProcessing}>Annuler</button>
            </div>
          </div>
        </div>
      </div>


      {/* Success edit message */}
      <div className={`absolute top-8 right-1/2 flex items-center gap-1 rounded-lg bg-green-100 p-2 ${isSuccess ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#16a34a" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg>
        <p className="text-xs text-green-600">🎉 Le groupe a été créé 🎉</p>
        <div onClick={() => setIsSuccess(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#16a34a" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>
    </section>
  )
}

export default Group