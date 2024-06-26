/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post"
import { deletePost, getPosts } from "../services/post-service";
import { barragan, coyote, imgModel1, imgModel2, loader, yammy } from "../assets";
import { fetchUser } from "../utils";
import { getUsers } from "../services/user-service";
import { getPublicGroups } from "../services/group-service";

const Feed = ({ onSuccess }) => {
  const { result: user} = fetchUser();
  const [posts, setPosts] = useState([]);
  let tempPosts = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState("")
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const [suggestions, setSuggestions] = useState([])
  const [loadingSug, setLoadingSug] = useState(true)

  const [modalData, setModalData] = useState("");
  const [waitingDelete, setWaitingDelete] = useState(false)

  const [groups, setGroups] = useState([])
  const randomGroup = useRef()
  const [loadingGroup, setLoadingGroup] = useState(false)

  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/${page}`);
  }

  const postDelete = async (id) => {
    setWaitingDelete(true);

    await deletePost(id)
    .then((response) => {
      console.log(response);
    })

    setModalData("");
    setWaitingDelete(false);
    setOpenModal(false);
    setIsDeleted(true);
    window.location.reload();
    // navigateTo("feed");
  }

  const memoizedGetPosts = useMemo(() => async () => {
    setIsLoading(true);

    if(tempPosts.current.length > 0) {
      if(posts.length === tempPosts.current.length) {
        setPosts(tempPosts.current);
        setIsLoading(false);
        return;
      }
    }

    await getPosts()
    .then((response) => {
      const { data } = response.data;
      setPosts(data);
      tempPosts.current = data;
    })
    
    setIsLoading(false);
  }, [posts.length])

  // API call to get posts
  useEffect(() => {
    memoizedGetPosts()
  }, [memoizedGetPosts])

  // Get friends suggestions
  useEffect(() => {
    getUsers()
    .then((response) => {
      const { data } = response.data;
      const users = data.filter((item) => item._id !== user._id);
      setSuggestions(users);
      setLoadingSug(false);
    })
  }, [user._id])

  // Handling success message
  useEffect(() => {
    if(isSuccess === false) return;
    setIsSuccess(onSuccess);
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000)
  }, [isSuccess, onSuccess])

  // Handling delete message
  useEffect(() => {
    if(isDeleted === false) return;
    setTimeout(() => {
      setIsDeleted(false);
    }, 5000)
  }, [isDeleted])

  // Handling delete modal
  useEffect(() => {
    modalData && setOpenModal(true);
  }, [modalData])


  // Handling groups
  useEffect(() => {
    setLoadingGroup(true)

    getPublicGroups()
    .then((response) => {
      const { data } = response;
      const tempGroup = data.filter((item) => item.creator !== user._id);
      setGroups(tempGroup);

      randomGroup.current = tempGroup[Math.floor(Math.random() * tempGroup.length)]

      setLoadingGroup(false)
    })
  }, [user._id, suggestions.length])




  return (
    <section className="w-[calc(100vw-300px)] min-h-screen flex pt-6 px-4 relative overflow-hidden">
      {/* Success edit message */}
      <div className={`fixed top-24 left-[40%] z-20 ${isSuccess ? "translate-y-0" : "-translate-y-[200%]"} transition-all rounded-xl`}>
        <div className="w-[300px] flex flex-col justify-center items-center gap-1 rounded-lg bg-green-50 p-4 shadow-2xl relative">
          <div className="absolute top-1 right-2 rounded-lg border" onClick={() => setIsSuccess(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="#16a34a" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/></svg>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="mb-4" width="40" height="40" viewBox="0 0 448 512"><path fill="#16a34a" d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7L54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"/></svg>
          <p className="text-lg font-bold mb-2">Yay !</p>
          <p className="text-sm font-medium text-gray-500 mb-8">Votre post a bien été modifié.</p>
          <div className="text-sm font-extrabold text-green-500 hover:text-green-600 transition-colors cursor-pointer" onClick={() => setIsSuccess(false)}>OK, COOL</div>
        </div>
      </div>

      {/* Success delete message */}
      <div className={`fixed top-24 left-[40%] z-20 ${isDeleted ? "translate-y-0" : "-translate-y-[200%]"} transition-all rounded-xl`}>
        <div className="w-[300px] flex flex-col justify-center items-center gap-1 rounded-lg bg-green-50 p-4 shadow-2xl relative">
          <div className="absolute top-1 right-2 rounded-lg border" onClick={() => setIsDeleted(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="#16a34a" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/></svg>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="mb-4" width="40" height="40" viewBox="0 0 448 512"><path fill="#16a34a" d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7L54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"/></svg>
          <p className="text-lg font-bold mb-2">Post supprimé !</p>
          <div className="text-sm font-extrabold text-green-500 hover:text-green-600 transition-colors cursor-pointer" onClick={() => setIsSuccess(false)}>OK</div>
        </div>
      </div>

      {/* Modal Delete */}
      <div className={`fixed inset-0 justify-center items-center bg-black/70 z-30 ${openModal ? "flex" : "hidden"}`}>
        <div className={`flex flex-col justify-center items-center gap-3 rounded-lg bg-white shadow-xl shadow-black/30 w-[400px] p-6 ${openModal ? "translate-y-0" : "-translate-y-[200%]"} transition-transform duration-300`}>
          <div className="flex justify-center items-center rounded-full p-2 bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="#dc2626" d="M240.26 186.1L152.81 34.23a28.74 28.74 0 0 0-49.62 0L15.74 186.1a27.45 27.45 0 0 0 0 27.71A28.31 28.31 0 0 0 40.55 228h174.9a28.31 28.31 0 0 0 24.79-14.19a27.45 27.45 0 0 0 .02-27.71m-20.8 15.7a4.46 4.46 0 0 1-4 2.2H40.55a4.46 4.46 0 0 1-4-2.2a3.56 3.56 0 0 1 0-3.73L124 46.2a4.77 4.77 0 0 1 8 0l87.44 151.87a3.56 3.56 0 0 1 .02 3.73M116 136v-32a12 12 0 0 1 24 0v32a12 12 0 0 1-24 0m28 40a16 16 0 1 1-16-16a16 16 0 0 1 16 16"/></svg>
          </div>
          <p className="text-base font-bold">Confirmer la suppression ?</p>
          <p className="text-sm text-gray-500 text-center max-w-[300px]">Cette action est irréversible. Votre post sera supprimé définitivement. Voulez-vous confirmer la suppression ?</p>
          <button className="w-full flex justify-center items-center py-2 mt-2 gap-4 bg-red-600 hover:bg-red-700 rounded-md text-sm font-semibold text-white shadow-md cursor-pointer disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={waitingDelete} onClick={() => postDelete(modalData)}>
            Oui, supprimer
            {waitingDelete && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect width="6" height="14" x="1" y="4" fill="#ffffff"><animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="9" y="4" fill="#ffffff" opacity=".4"><animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="17" y="4" fill="#ffffff" opacity=".3"><animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;.2"/></rect></svg>}
          </button>
          <div className="w-full flex justify-center items-center py-2 border-2 hover:bg-gray-100 rounded-md text-sm font-semibold cursor-pointer" onClick={() => setOpenModal(false)}>Annuler</div>
        </div>
      </div>

      {/* Feed */}
      <div className="w-[calc(100%-300px)] h-full flex flex-col gap-4 px-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-base font-extrabold">Fil d{`'`}actualités</p>
          <div className="flex justify-center items-center gap-4">
            <p className="text-xs font-semibold cursor-pointer">Tous</p>
            <p className="text-xs text-gray-400 cursor-pointer">Récents</p>
            <p className="text-xs text-gray-400 cursor-pointer">Populaires</p>
            <p className="text-xs text-gray-400 cursor-pointer">Enregistrés</p>
          </div>
        </div>
        
        {/* Add a post */}
        <div className="w-full p-4 flex justify-between items-center rounded-xl bg-gradient-to-tr from-[#f4f4f5] to-[#e4e4e7] border-2 mb-4 shadow-lg">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-2xl font-bold">Salut, {user.username.split(" ")[0]} 👋</h1>
            <p className="text-sm text-gray-500">Qu{`'`}est-ce que tu veux nous partager aujourd{`'`}hui ?</p>
          </div>
          
          <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center items-center rounded-lg p-1 cursor-pointer shadow-lg transition-all" style={{ background: "linear-gradient(132deg, rgb(2, 106, 122) 0.00%, rgb(242, 78, 163) 100.00%)" }} onClick={() => navigateTo("create-post")}>
              <div className="flex justify-center items-center rounded-lg gap-1 p-2 bg-gray-800 transition-all hover:bg-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="M19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21m-1-4H6v1.5h12zM6 15.5h12V14H6zM6 12h12V6H6zm0 5v1.5zm0-1.5V14zM6 12V6zm0 2v-2zm0 3v-1.5z"/></svg>
                <p className="text-[13px] text-white font-semibold">Nouveau post</p>
              </div>
            </div>
            <div className="flex justify-center items-center rounded-lg p-1 cursor-pointer shadow-lg transition-all" style={{ background: "linear-gradient(132deg, rgb(2, 106, 122) 0.00%, rgb(242, 78, 163) 100.00%)" }}>
              <div className="flex justify-center items-center rounded-lg gap-1 p-2 bg-gray-800 transition-all hover:bg-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#ffffff" d="M5.5 16V8a3 3 0 0 0-3-3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5a3 3 0 0 0 3-3m13-8v8a3 3 0 0 0 3 3a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5a3 3 0 0 0-3 3" opacity=".5"/><path fill="#ffffff" d="M11.5 19c-1.886 0-2.828 0-3.414-.586C7.5 17.828 7.5 16.886 7.5 15V9c0-1.886 0-2.828.586-3.414C8.672 5 9.614 5 11.5 5h1c1.886 0 2.828 0 3.414.586c.586.586.586 1.528.586 3.414v6c0 1.886 0 2.828-.586 3.414C15.328 19 14.386 19 12.5 19z"/></svg>
                <p className="text-[13px] text-white font-semibold">Nouvelle story</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="w-full flex flex-col gap-2">
          {/* <Post /> */}
          {isLoading ?
            <div className="w-full flex justify-center items-center gap-2">
              <img src={loader} alt="loader" width="25" height="25" />
              <p className="text-sm font-medium">Recherche de nouveaux posts...</p>
            </div>
            :
            posts.length === 0 ?
              <div className="w-full h-[calc(100vh-220px)] flex flex-col justify-center items-center gap-4 bg-gray-100 border-[5px] border-dashed border-gray-300 rounded-lg">
                <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Pensive%20Face.png" alt="Pensive Face" width="100" height="100" />
                <h1 className="text-3xl font-extrabold text-gray-400">Fil d{`'`}actualités vide!</h1>
                <p className="text-sm font-light text-gray-400">Aucun post pour le moment</p>
              </div>
            :
            posts.map((post, index) => (
              <Post key={post._id} id={index} post={post} onSetId={setSelectedPost} selectedId={selectedPost} onModalPost={setModalData} />
            ))
          }
        </div>
      </div>

      {/* Stories & Suggestions && Recommendations */}
      {/* <div className="sticky top-0 right-0 w-[300px] h-full gap-8 px-4"> */}
      <div className="w-[300px] h-full gap-8 px-3">
        {/* Stories */}
        <div className="w-full flex-col gap-2 overflow-hidden mb-8">
          <p className="text-base font-extrabold mb-3">Vidskits</p>
          {/* If stories empty */}
          {/* <div className="w-full h-[200px] flex justify-center items-center border-dashed border-2 rounded-md bg-gray-100">
            <div className="w-full flex flex-col justify-center items-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#a0a0a0" d="M5.5 16V8a3 3 0 0 0-3-3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5a3 3 0 0 0 3-3m7-11c1.886 0 2.828 0 3.414.586c.586.586.586 1.528.586 3.414v6c0 1.886 0 2.828-.586 3.414C15.328 19 14.386 19 12.5 19h-1c-1.886 0-2.828 0-3.414-.586C7.5 17.828 7.5 16.886 7.5 15V9c0-1.886 0-2.828.586-3.414C8.672 5 9.614 5 11.5 5zm6 3v8a3 3 0 0 0 3 3a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5a3 3 0 0 0-3 3"/></svg>
              <p className="text-xs font-semibold text-gray-500 max-w-[200px] text-center">Aucune story pour le moment</p>
            </div>
          </div> */}

          {/* If stories not empty */}
          <div className="w-[300px] h-[200px] gap-2 flex overflow-auto">
            <div className="w-[150px] flex justify-center items-end rounded-xl p-1 overflow-hidden relative">
              <img src={imgModel1} alt="example" className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 flex flex-col justify-end p-2">
                <div className="flex items-center bg-white rounded-full shadow-xl gap-1 p-[1px]">
                  <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
                    <img src={barragan} alt="user" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11px] font-bold max-w-[100px] truncate">Ulquiorra Cifer</p>
                </div>
              </div>
            </div>
            <div className="w-[150px] flex justify-center items-end rounded-xl p-1 overflow-hidden relative">
              <img src={imgModel1} alt="example" className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 flex flex-col justify-end p-2">
                <div className="flex items-center bg-white rounded-full shadow-xl gap-1 p-[1px]">
                  <div className="w-[25px] h-[25px] rounded-full overflow-hidden">
                    <img src={barragan} alt="user" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11px] font-bold max-w-[100px] truncate">Ulquiorra Cifer</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Suggestions */}
        <div className="w-full flex-col gap-2 mb-8">
          <div className="w-full flex justify-between items-center mb-3">
            <p className="text-base font-extrabold">Suggestions</p>
            {suggestions.length > 3 &&
              <p className="text-xs text-blue-500 hover:underline cursor-pointer">Voir tout</p>
            }
          </div>
          {loadingSug ?
            <div className="w-full h-[200px] flex flex-col justify-center items-center border-dashed border-2 rounded-sm bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#a0a0a0" d="M20 10.73q-.31 0-.52-.21t-.21-.52t.21-.52t.52-.21t.52.21t.21.52t-.21.52t-.52.21m0-3.23q-.213 0-.357-.144T19.5 7V4q0-.213.144-.356q.144-.144.357-.144t.356.144T20.5 4v3q0 .213-.144.356q-.144.144-.357.144M9 11.385q-1.237 0-2.119-.882T6 8.385t.881-2.12T9 5.386t2.119.88t.881 2.12t-.881 2.118T9 11.385m-7 6.192v-.608q0-.619.36-1.158t.97-.838q1.416-.679 2.833-1.018T9 13.615t2.837.34t2.832 1.018q.61.298.97.838T16 16.969v.608q0 .44-.299.74t-.74.298H3.039q-.44 0-.739-.299t-.3-.74"/></svg>
              <p className="text-xs font-semibold text-gray-500 max-w-[200px] text-center">Chargement des suggestions...</p>
            </div>
            :
            suggestions?.length === 0 ?
              /* If suggestions empty */
              <div className="w-full h-[200px] flex flex-col justify-center items-center border-dashed border-2 rounded-sm bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><circle cx="12" cy="12" r="0" fill="#a0a0a0"><animate id="svgSpinnersPulse20" fill="freeze" attributeName="r" begin="0;svgSpinnersPulse21.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersPulse21.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle><circle cx="12" cy="12" r="0" fill="#000000"><animate id="svgSpinnersPulse21" fill="freeze" attributeName="r" begin="svgSpinnersPulse20.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulse20.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle></svg>
                <p className="text-xs font-semibold text-gray-500 max-w-[200px] text-center">Aucune suggestion d{`'`}amis pour le moment</p>
              </div>
              :
              /* If suggestions not empty */
              <div className="w-full flex flex-col gap-3">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <div key={index} className="w-full flex justify-between items-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img src={suggestion.imgProfile ? suggestion.imgProfile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="user" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs font-bold max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">@{suggestion.username}</p>
                    </div>
                    <button className="text-xs font-medium bg-zinc-900 text-white rounded-full px-2 py-1.5 flex justify-center items-center gap-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
                      Ajouter
                    </button>
                  </div>
                ))}
              </div>
          }
        </div>


        {/* Recommandations */}
        <div className="w-full">
          {loadingGroup ? (
            <div className="w-full flex flex-col gap-6 mb-8 rounded-md border border-gray-300 p-4 animate-pulse">
              <div className="flex justify-center items-center gap-4">
                <div className="w-[70px] h-[70px] rounded-full bg-neutral-400"></div>
                <div className="w-[70px] h-[70px] bg-neutral-400"></div>
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <div className="h-2.5 bg-neutral-400 rounded-full w-full"></div>
                <div className="h-2.5 bg-neutral-400 rounded-full w-[70%]"></div>
                <div className="h-2.5 bg-neutral-400 rounded-full w-28"></div>
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="h-8 bg-neutral-400 rounded-full w-24"></div>
              </div>
            </div>
          )
          :
          (
            groups?.length === 0 ? (
              <div className="w-full h-[200px] flex flex-col justify-center items-center border-dashed border-2 rounded-sm bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path fill="#a0a0a0" d="M0 18v-1.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0v-1.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V18zm13.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"/></svg>
                <p className="text-xs font-semibold text-gray-500 max-w-[200px] text-center">Aucun groupe pour le moment</p>
              </div>
            )
            :
            (
              <div className="w-full flex flex-col gap-3 mb-8 rounded-md border border-gray-300 p-4">
                <div className="flex justify-center items-center gap-4">
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <img src={user?.imgProfile ? user.imgProfile : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="user" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-[85px] h-[85px]">
                    <img src={randomGroup.current?.image ? randomGroup.current?.image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="user" className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Content */}
                <div className="w-full flex justify-center items-center">
                  <p className="text-[13px] text-center text-gray-500">{user?.username.split(' ')[0]}, découvrez les activités du groupe <span className="text-black font-semibold">{randomGroup.current?.name}</span> qui pourraient vous intéresser</p>
                </div>
                {/* Button */}
                <div className="w-full flex justify-center items-center">
                  <button className="w-[150px] h-8 border border-blue-500 rounded-full text-sm text-blue-500 hover:bg-blue-50 hover:border-2 transition-colors">Voir le groupe</button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default Feed