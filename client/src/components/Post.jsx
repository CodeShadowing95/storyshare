/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { ulquiorra } from '../assets';
import { fetchUser } from '../utils';
import Dropdown from './Dropdown';
// import { bgColors } from '../constants'

const transformDate = (date) => {
  const dateParts = date.split('T');
  const [year, month, day] = dateParts[0].split('-');
  const [hour, minute, second] = dateParts[1].split(':');
  const [sec, millisec] = second.split('.');
  const dateObj = new Date(Date.UTC(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10),
    parseInt(hour, 10),
    parseInt(minute, 10),
    parseInt(sec, 10),
    parseInt(millisec, 10)
  ));

  const now = new Date();
  const timeDiff = now - dateObj;

  const yearsDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 365);
  const monthsDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24 / 30.416);
  const daysDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
  const hoursDiff = Math.floor(timeDiff / 1000 / 60 / 60);
  const minutesDiff = Math.floor(timeDiff / 1000 / 60);
  const secondsDiff = Math.floor(timeDiff / 1000);

  if(yearsDiff > 0) return 'Il y a ' + yearsDiff + ' an(s)';
  if(monthsDiff > 0) return 'Il y a ' + monthsDiff + ' mois';
  if(daysDiff > 0) return 'Il y a ' + daysDiff + ' jour(s)';
  if(hoursDiff > 0) return 'Il y a ' + hoursDiff + ' heure(s)';
  if(minutesDiff > 0) return 'Il y a ' + minutesDiff + ' minute(s)';
  if(secondsDiff > 0) return 'Il y a ' + secondsDiff + ' seconde(s)';
}

const Post = ({ id, post, onSetId, selectedId }) => {
  // const randomColor = () => {
  //   return bgColors[Math.floor(Math.random() * bgColors.length)];
  // }
  const { result: user } = fetchUser();

  const onDropdown = (id) => {
    onSetId(id === selectedId ? "" : id);
  }

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
              <img src={post.creatorAvatar ? post.creatorAvatar : ulquiorra} alt="user" className="w-full h-full object-cover" />
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
              <svg xmlns="http://www.w3.org/2000/svg" className="rotate-90" width="25" height="25" viewBox="0 0 24 24"><path fill="#000000" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"/></svg>
            </div>
            {post._id === selectedId &&
              <Dropdown post={post} user={user} />
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
              <p key={index} className="text-xs font-bold text-blue-600">{tag}</p>
            ))}
          </div>
        }

        {/* Footer */}
        <div className="w-full flex justify-between items-center mt-4  pt-2 border-t">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center px-2 py-1 gap-1 rounded-lg cursor-pointer transition-colors hover:bg-slate-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#6b7280" d="M178 36c-20.09 0-37.92 7.93-50 21.56C115.92 43.93 98.09 36 78 36a66.08 66.08 0 0 0-66 66c0 72.34 105.81 130.14 110.31 132.57a12 12 0 0 0 11.38 0C138.19 232.14 244 174.34 244 102a66.08 66.08 0 0 0-66-66m-5.49 142.36a328.69 328.69 0 0 1-44.51 31.8a328.69 328.69 0 0 1-44.51-31.8C61.82 159.77 36 131.42 36 102a42 42 0 0 1 42-42c17.8 0 32.7 9.4 38.89 24.54a12 12 0 0 0 22.22 0C145.3 69.4 160.2 60 178 60a42 42 0 0 1 42 42c0 29.42-25.82 57.77-47.49 76.36"/></svg>
              <p className="text-xs font-light group-hover:text-black">0</p>
            </div>
            <div className="flex justify-center items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-colors hover:bg-slate-50">
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
      </div>
    </div>
  )
}

export default Post