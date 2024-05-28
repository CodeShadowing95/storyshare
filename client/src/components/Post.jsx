/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { fetchUser, transformDate } from '../utils';
import Dropdown from './Dropdown';
import { addComment, addLike, getPostComments } from '../services/post-service';

const Post = ({ id, post, onSetId, selectedId, onModalPost }) => {
  const { result: user } = fetchUser();
  const [modalPostId, setModalPostId] = useState("");
  const [datas, setDatas] = useState([]);
  const [toggleComment, setToggleComment] = useState(false);
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [commenting, setCommenting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  const onDropdown = (id) => {
    onSetId(id === selectedId ? "" : id);
  }

  const like = async (id) => {
    await addLike(`post/${id}/like`, user._id)
    .then((response) => {
      const { likes } = response.data;
      setDatas(likes);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  const submitComment = async (e) => {
    e.preventDefault();

    setCommenting(true);

    await addComment(`post/${post._id}/comment`, comment, user)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })

    setComment("");
    setCommenting(false);
  }

  useEffect(() => {
    setDatas(post.likes);
  }, [post])

  useEffect(() => {
    setLoadingComments(true);
    getPostComments(`post/${post._id}/comments`)
    .then((response) => {
      setComments(response.data);
    })
    setLoadingComments(false);
  })

  useEffect(() => {
    onModalPost(modalPostId)
  }, [modalPostId, onModalPost])

  useEffect(() => {
    const handleClickAnywhere = (event) => {
      if (!event.target.closest(".dropdown")) {
        onSetId("");
      }
    };
    document.addEventListener("click", handleClickAnywhere);
    return () => {
      document.removeEventListener("click", handleClickAnywhere);
    };
  })

  return (
    <div key={id} className="w-full flex flex-col gap-4 mb-4">
      <div key={post._id} className={`w-full flex flex-col gap-4 p-4 rounded-xl border shadow-lg relative`}>
        {/* User & Options */}
        <div className="w-full flex justify-between items-center relative">
          {/* User */}
          <div className="flex justify-center items-center gap-2">
            {/* Avatar */}
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
              <img src={post.creatorAvatar ? post.creatorAvatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="user" className="w-full h-full object-cover" />
            </div>

            {/* User info */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold">{post.creator}</p>
              {/* <p className="text-xs text-gray-500">{transformDate(post.createdAt)}</p> */}
              <p className="text-xs text-gray-500">@social_media • {transformDate(post.createdAt)}</p>
            </div>
          </div>

          {/* Options */}
          <div className="relative dropdown" onClick={() => onDropdown(post._id)}>
            <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center transition-all cursor-pointer hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#000000" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/></svg>
            </div>
            {post._id === selectedId &&
              <Dropdown post={post} user={user} onToggleModal={setModalPostId} />
            }
          </div>
        </div>


        {/* Message */}
        <p className="text-sm">{post.postText}</p>

        {/* Images if any */}
        {post.images.length > 0 &&
          <div className="w-full relative cursor-pointer">
            {post.images.length &&
              post.images.length <= 4 ?
                <div className={`w-full grid ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}>
                  {post.images.map((image) => (
                    <div key={image.id} className="h-full rounded-2xl overflow-hidden">
                      <img src={image.src} alt="post" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                :
                <>
                <div className={`w-full grid grid-cols-2 gap-1`}>
                  <div className="h-full rounded-2xl overflow-hidden">
                    {/* <img src="/uefa.jpg" alt="post" className="w-full h-full object-cover" /> */}
                    <img src={post.images[0]?.src} alt="post" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-full rounded-2xl overflow-hidden">
                    <img src={post.images[1]?.src} alt="post" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-full rounded-2xl overflow-hidden">
                    <img src={post.images[2]?.src} alt="post" className="w-full h-full object-cover" />
                  </div>
                  <div className="h-full rounded-2xl overflow-hidden relative">
                    <img src={post.images[3]?.src} alt="post" className="w-full h-full object-cover" />
                    {/* <img src={postages[3].src} alt="post" className="w-full h-full object-cover" /> */}
                    <div className="absolute inset-0 bg-black/60 rounded-2xl">
                      <div className="w-full h-full flex justify-center items-center">
                        <p className="text-xl font-bold text-white">+{post.images.length - 4} image(s)</p>
                      </div>
                    </div>
                  </div>
                </div>
                </>
            }
          </div>
        }

        {/* Description */}
        {post.description &&
          <p className="text-xs leading-5 font-medium">{post.description}</p>
        }

        {/* Tags */}
        {post.tags.length > 0 &&
          <div className="w-full flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <div key={index} className="flex justify-center items-center p-2 rounded-lg bg-blue-100 group cursor-pointer">
                <p className="text-xs font-bold text-gray-600 group-hover:underline">{tag}</p>
              </div>
            ))}
          </div>
        }

        {/* Footer */}
        <div className="w-full flex justify-between items-center py-2 border-t">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center px-2 py-1 gap-0.5 rounded-lg cursor-pointer transition-colors hover:bg-slate-50" onClick={() => like(post._id)}>
              {datas.includes(user._id) ?
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#f43f5e" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#6b7280" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3m-4.4 15.55l-.1.1l-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05"/></svg>
              }
              <p className="text-xs font-light group-hover:text-black">{datas.length}</p>
            </div>
            <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-colors hover:bg-slate-50" onClick={() => setToggleComment(!toggleComment)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#6b7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 11h10M7 14h4m-8 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.667a2 2 0 0 0-1.2.4L3 21z"/></svg>
              <p className="text-xs font-light group-hover:text-black">Commenter</p>
            </div>
            <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-colors hover:bg-slate-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#6b7280" d="m240.49 103.52l-80-80A12 12 0 0 0 140 32v36.74c-25.76 3.12-53.66 15.89-76.75 35.47c-29.16 24.74-47.32 56.69-51.14 90A16 16 0 0 0 39.67 207c10.46-11.14 47-45.74 100.33-50.42V192a12 12 0 0 0 20.48 8.48l80-80a12 12 0 0 0 .01-16.96M164 163v-19a12 12 0 0 0-12-12c-49 0-86.57 21.56-109.79 40.11c7.13-18.16 19.63-35.22 36.57-49.59C101.3 103.41 128.67 92 152 92a12 12 0 0 0 12-12V61l51 51Z"/></svg>
              <p className="text-xs font-light group-hover:text-black">Partager</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-colors hover:bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#6b7280" d="M184 28H72a20 20 0 0 0-20 20v176a12 12 0 0 0 18.36 10.18l57.63-36l57.65 36A12 12 0 0 0 204 224V48a20 20 0 0 0-20-20m-4 174.35l-45.65-28.53a12 12 0 0 0-12.72 0L76 202.35V52h104Z"/></svg>
            <p className="text-xs font-light group-hover:text-black">Enregistrer</p>
          </div>
        </div>

        {/* Comments section */}
        <div className={`w-full ${toggleComment ? "flex" : "hidden"} flex-col justify-center p-2`}>
          <form onSubmit={submitComment}>
            {/* Title & number of comments */}
            <div className="w-full flex justify-between items-center">
              <div className="w-full items-center flex gap-4">
                <p className="text-base font-extrabold">Commentaires</p>
                <p className="text-xs font-light text-gray-500">{comments.length} commentaire(s)</p>
              </div>
              {/* Button */}
              <div className="w-full mt-2 flex justify-end">
                <button type="submit" className="flex gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 me-2 transition-colors disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed" disabled={!comment || commenting}>
                  Envoyer
                  {commenting &&
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><rect width="6" height="14" x="1" y="4" fill="#ffffff"><animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.25s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="9" y="4" fill="#ffffff" opacity=".4"><animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.15s" dur="0.75s" values="1;.2"/></rect><rect width="6" height="14" x="17" y="4" fill="#ffffff" opacity=".3"><animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;5"/><animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="22;14"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.3s" dur="0.75s" values="1;.2"/></rect></svg>
                  }
                </button>
              </div>
            </div>
            {/* Textarea */}
            <div className="w-full mt-3">
              <div className="w-full flex gap-1">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <img src={user?.imgProfile} alt="user" className="w-full h-full object-cover" />
                </div>
                <textarea id="message" rows="2" name="sometext" value={comment} className="block p-2.5 w-full text-[13px] text-gray-900 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" placeholder="Ajouter un commentaire..." onChange={handleChange}></textarea>
              </div>
            </div>
          </form>

          {comments.length > 5 &&
            <p className="text-xs font-light text-blue-500 mt-2">Afficher tous les commentaires</p>
          }

          {/* Comments */}
          <div className="w-full flex flex-col gap-2 mt-4">
            {loadingComments ? (
              <div className="w-full flex justify-center items-center gap-1">
                <p className="text-xs font-light">Chargement</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="#000000"><animate id="svgSpinners3DotsFade0" fill="freeze" attributeName="opacity" begin="0;svgSpinners3DotsFade1.end-0.25s" dur="0.75s" values="1;.2"/></circle><circle cx="12" cy="12" r="3" fill="#000000" opacity=".4"><animate fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.15s" dur="0.75s" values="1;.2"/></circle><circle cx="20" cy="12" r="3" fill="#000000" opacity=".3"><animate id="svgSpinners3DotsFade1" fill="freeze" attributeName="opacity" begin="svgSpinners3DotsFade0.begin+0.3s" dur="0.75s" values="1;.2"/></circle></svg>
              </div>
            ) : (
              comments?.length > 0 && (
                comments.map((comment) => (
                  <div key={comment._id} className="w-full rounded-lg bg-blue-50 px-4 py-2">
                    {/* User profile, time and options */}
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2 justify-center items-center">
                        <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                          <img src={comment.userAvatar} alt="user" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">{comment.username}</p>
                          <p className="text-xs font-medium text-gray-500">{transformDate(comment.createdAt)}</p>
                        </div>
                      </div>
  
                      {/* Options */}
                      {user._id === comment.userId ?
                        <div className="flex justify-center items-center gap-2">
                          <div className="flex justify-center items-center gap-1 border-r border-gray-300 pr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#000000" d="M7 21V8l7-7l1.85 1.85L14.55 8H23v4.4L19.35 21zm2-2h9l3-7v-2h-9l1.35-5.5L9 8.85zM9 8.85V19zM2 21V8h5v2H4v9h3v2z"/></svg>
                            <p className="text-xs font-light">0</p>
                          </div>
                          <div className="rounded-full flex justify-center items-center transition-all cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#000000" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/></svg>
                          </div>
                          <div className="rounded-full flex justify-center items-center transition-all cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ef4444" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
                          </div>
                        </div>
                        :
                        <div className="flex justify-center items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#000000" d="M7 21V8l7-7l1.85 1.85L14.55 8H23v4.4L19.35 21zm2-2h9l3-7v-2h-9l1.35-5.5L9 8.85zM9 8.85V19zM2 21V8h5v2H4v9h3v2z"/></svg>
                          <p className="text-xs font-light">0</p>
                        </div>
                      }
                    </div>
                    {/* Comment text */}
                    <div className="w-full mt-4">
                      <p className="text-[13px] font-light">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post