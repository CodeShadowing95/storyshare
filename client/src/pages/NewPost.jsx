/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Editor, Tag } from "../components"
import { fetchUser } from "../utils";
import { createPost, getPost, updatePost } from "../services/post-service";
import { useLocation, useNavigate } from "react-router-dom";
import { loader } from "../assets";

const NewPost = ({ onSuccess }) => {
  const {result: user} = fetchUser();
  // For creating a new post
  const [description, setDescription] = useState('');
  const [editorDatas, setEditorDatas] = useState({});
  const [tagDatas, setTagDatas] = useState([]);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // For editing a post
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  const postId = searchParams.get("post");
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(location.pathname === "/edit-post") {
      setIsLoading(true);

      const formData = {
        postText: editorDatas.message,
        description,
        creator: user.username,
        images: editorDatas.pictures,
        tags: tagDatas
      }

      await updatePost(`${postId}`, formData)
      .then((response) => {
        if(response.error) {
          console.log(response.error);
          return;
        }

        onSuccess(true);
        navigate("/feed");
      })
      .catch((error) => {
        console.log(error);
      })

      setIsLoading(false);
      return;
    }


    if(!editorDatas.message) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    const formData = {
      postText: editorDatas.message,
      description,
      creator: user.username,
      creatorAvatar: user.imgProfile,
      images: editorDatas.pictures,
      tags: tagDatas
    }

    await createPost("create-post", formData)
    .then((response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }

      setDescription("");
      setEditorDatas({});
      setTagDatas({});

      setIsLoading(false);

      navigate("/feed");
    })
  }

  useEffect(() => {
    if(postId) {
      setIsLoaded(true);
      getPost(`${postId}`)
      .then((response) => {
        const { data } = response;
        setEditorDatas({ message: data.postText, pictures: data.images });
        setTagDatas(data.tags);
        setDescription(data.description);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaded(false);
      })
    }
  }, [postId]);


  return (
    <section className="w-[calc(100vw-300px)] min-h-screen flex px-8 pt-10 mb-8 gap-4 relative overflow-hidden">
      {location.pathname === "/edit-post" && isLoaded && (
        /* White overlay */
        <div className="absolute inset-0 flex justify-center items-center bg-white/70 z-20">
          <img src={loader} alt="loader" width="40" height="40" />
          <p className="text-lg font-medium">Chargement...</p>
        </div>
      )}

      <div className="w-[70%] h-full flex flex-col gap-4">
        {/* Title */}
        <div className="w-full flex justify-between">
          <div>
            <p className="text-xl font-extrabold mb-1">{location.pathname === "/create-post" ? "Nouveau post" : "Modifier le post"}</p>
            <p className="text-sm text-gray-500">{location.pathname === "/create-post" ? "Aventure, challenge, découverte, idée,... Partagez votre histoire" : "Une erreur dans votre post ? ... Modifiez le à tout moment"}</p>
          </div>
          <div className="flex gap-2">
            <button type="submit" className={`relative flex items-center font-medium rounded-lg text-sm text-gray-600 hover:bg-gray-100 px-5 py-2.5 text-center mb-2 border border-gray-600`} onClick={() => navigate("/feed")}>Annuler</button>
            <button type="submit" className={`relative flex items-center gap-2 text-white ${editorDatas.message || !isLoading ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50' : 'bg-gray-300 text-gray-400 cursor-not-allowed'} font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed`} disabled={isLoading || !editorDatas.message} onClick={handleSubmit}>
              {location.pathname === "/create-post" ? "Publier" : "Republier"}
              {isLoading &&
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect width="6" height="14" x="1" y="4" fill="#ffffff"><animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="9" y="4" fill="#ffffff" opacity=".4"><animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="17" y="4" fill="#ffffff" opacity=".3"><animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;.2"/></rect></svg>
              }
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full h-full flex justify-center items-center gap-4">
          {/* Left */}
          <form className="w-full h-full">
            <Editor setEditorDatas={setEditorDatas} data={postId && editorDatas} />
            <Tag setTagDatas={setTagDatas} data={postId && tagDatas} />
            <div className="w-full">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <textarea id="message" rows="3" name="sometext" value={description} className="block p-2.5 w-full text-[13px] text-gray-900 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Informations supplémentaires...(Optionnel)" onChange={handleChange}></textarea>
            </div>
          </form>
        </div>
      </div>

      {/* Preview */}
      <div className="w-[30%] max-h-[calc(100vh-50px)] flex flex-col p-4 border-2 rounded-xl">
        <div className="pb-1 border-b-4 border-b-yellow-500 mb-10">
          <p className="text-xl font-extrabold">Aperçu</p>
        </div>
        <div className="w-full max-h-[90%] p-2 rounded-xl shadow-lg border overflow-auto custom_scrollbar">
          {/* Header */}
          <div className="flex justify-between items-center">
            {/* Avatar & Username */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <img src="https://api.dicebear.com/8.x/shapes/svg?seed=Garfield" alt="user" className="w-full h-full object-cover" />
              </div>
              <div className="max-w-[200px]">
                <p className="text-sm font-bold">John DOE</p>
                <p className="text-xs text-gray-500">@social_media · Il y a 3 heures</p>
              </div>
            </div>

            {/* Options */}
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="rotate-90" width="25" height="25" viewBox="0 0 24 24"><path fill="#000000" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/></svg>
            </div>
          </div>

          {/* Content */}
          <div className="w-full flex flex-col gap-3 mt-4">
            {editorDatas.message ?
              <p className="text-xs font-medium breakwords">{editorDatas.message}</p>
              :
              <p className="text-xs font-medium">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi illo fugiat fugit reprehenderit odio temporibus quibusdam dolorum nobis.</p>
            }
            
            <div className="relative w-full">
              {editorDatas.pictures?.length ?
                editorDatas.pictures?.length <= 4 ?
                <div className={`w-full grid ${editorDatas.pictures?.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-0.5`}>
                  {editorDatas.pictures.map((image, index) => (
                    <div key={index} className="h-full overflow-hidden">
                      <img src={image.src} alt="post" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                :
                <>
                <div className={`w-full grid grid-cols-2 gap-0.5`}>
                  <div className="h-full relative overflow-hidden">
                    <img src="/uefa.jpg" alt="post" className="w-full h-full object-cover" />
                    {/* <img src={posts.images[0].src} alt="post" className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="h-full relative overflow-hidden">
                    <img src="/uefa.jpg" alt="post" className="w-full h-full object-cover" />
                    {/* <img src={posts.images[1].src} alt="post" className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="h-full relative overflow-hidden">
                    <img src="/uefa.jpg" alt="post" className="w-full h-full object-cover" />
                    {/* <img src={posts.images[2].src} alt="post" className="w-full h-full object-cover" /> */}
                  </div>
                  <div className="h-full relative overflow-hidden">
                    <img src="/uefa.jpg" alt="post" className="w-full h-full object-cover" />
                    {/* <img src={posts.images[3].src} alt="post" className="w-full h-full object-cover" /> */}
                    <div className="absolute inset-0 bg-black/60">
                      <div className="w-full h-full flex justify-center items-center">
                        <p className="text-base font-bold text-white">+{editorDatas.pictures?.length - 4} image(s)</p>
                      </div>
                    </div>
                  </div>
                </div>
                </>
                :
                <div className="relative w-full">
                  <img src="/uefa.jpg" alt="model" className="w-full h-full object-cover" />
                </div>
              }
            </div>
            {/* {editorDatas.pictures?.length === 0 &&
              <div className="relative w-full h-[200px]">
                <img src="/uefa.jpg" alt="model" className="w-full h-full object-cover" />
              </div>
            } */}

            {/* {editorDatas.pictures?.length > 0 &&
              <div className="relative w-full grid grid-cols-2 h-[200px]">
                {editorDatas.pictures?.length <= 4 &&
                  editorDatas.pictures.map((picture, index) => (
                    <>
                    <div key={index} className="overflow-hidden">
                      <img src={picture.src} alt="model" className="w-full h-full object-cover" />
                    </div>
                    <div className={`absolute bottom-0 right-0 w-1/2 h-1/2 ${editorDatas.pictures.length <= 4 ? "hidden" : "flex"} flex justify-center items-center bg-black/50`}>
                      <p className="text-sm font-bold text-white">+{editorDatas.pictures.length - 4} photos</p>
                    </div>
                    </>
                  ))
                }
              </div>
            } */}


            {description ?
              <p className="text-xs font-medium">{description}</p>
              :
              <p className="text-xs font-medium">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Some random text...</p>
            }

            <div className="w-full flex flex-wrap gap-1">
              {tagDatas.length > 0 ?
                tagDatas.map((tag, index) => (
                  <span key={index} className="text-xs font-bold text-blue-600">{tag}</span>
                ))
                :
                <>
                <span className="text-xs font-bold text-blue-600">#uefa</span>
                <span className="text-xs font-bold text-blue-600">#football</span>
                <span className="text-xs font-bold text-blue-600">#soccer</span>
                <span className="text-xs font-bold text-blue-600">#fifa</span>
                <span className="text-xs font-bold text-blue-600">#futbol</span>
                <span className="text-xs font-bold text-blue-600">#championsleague</span>
                <span className="text-xs font-bold text-blue-600">#worldcup</span>
                <span className="text-xs font-bold text-blue-600">#soccerworldcup</span>
                <span className="text-xs font-bold text-blue-600">#soccerworldcup2022</span>
                </>
            }
            </div>
            
            <div className="w-full flex justify-between items-center mt-2 border-y py-3">
              <div className="flex justify-center items-center gap-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#6b7280" d="M240 102c0 70-103.79 126.66-108.21 129a8 8 0 0 1-7.58 0C119.79 228.66 16 172 16 102a62.07 62.07 0 0 1 62-62c20.65 0 38.73 8.88 50 23.89C139.27 48.88 157.35 40 178 40a62.07 62.07 0 0 1 62 62"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#6b7280" d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zM5 5v2h14V5zm0 4v2h8V9zm0 4v2h10v-2z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#6b7280" d="m237.66 117.66l-80 80A8 8 0 0 1 144 192v-39.77c-57.1 3.24-96.25 40.27-107.24 52a12 12 0 0 1-20.68-9.58c3.71-32.26 21.38-63.29 49.76-87.37c23.57-20 52.22-32.69 78.16-34.91V32a8 8 0 0 1 13.66-5.66l80 80a8 8 0 0 1 0 11.32"/></svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#6b7280" d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"/></svg>
            </div>


            <div className="w-full flex items-center gap-2 p-2 rounded-full bg-gray-100 mt-4">
              <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
                <img src="https://api.dicebear.com/8.x/shapes/svg?seed=Garfield" alt="user" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs text-gray-600">Ajoutez un commentaire...</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-[25%] flex items-center gap-1 rounded-lg bg-red-100 p-2 ${error ? "-translate-y-8" : "translate-y-[100%]"} transition-all duration-200`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#dc2626" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg>
        <p className="text-xs text-red-600">Veuillez remplir tous les champs</p>
        <div onClick={() => setError("")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#dc2626" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>
    </section>
  )
}

export default NewPost