/* eslint-disable react/prop-types */

const Dropdown = ({ post, user }) => {
  return (
    <div className="absolute translate-y-2 -translate-x-[90%] z-10">
      <div className="w-[300px] py-1 bg-white rounded-md border">
        {/* If the user is the creator of the post */}
        {post.creator === user.username && (
          <>
          <div className="w-full flex items-center p-3 hover:bg-gray-200 cursor-pointer">
            <div className="text-sm inline-flex gap-2 items-center font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/></svg>
              <p className="text-[13px]">Modifier mon post</p>
            </div>
          </div>
          </>
        )}

        {/* If the user is not the creator of the post */}
        {post.creator !== user.username && (
          <>
          <div className="w-full flex items-center p-3 hover:bg-gray-200 cursor-pointer" onClick={() => alert("Invitation envoyée")}>
            <div className="text-sm inline-flex gap-2 items-center font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3zm-9-2q-1.65 0-2.825-1.175T5 8q0-1.65 1.175-2.825T9 4q1.65 0 2.825 1.175T13 8q0 1.65-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z"/></svg>
              <p className="text-[13px]">Envoyer une invitation</p>
            </div>
          </div>
          <div className="w-full flex items-center p-3 hover:bg-gray-200 cursor-pointer">
            <div className="text-sm inline-flex gap-2 items-center font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862m3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.775 0 6.725 2.087T23 11.5q-.575 1.475-1.513 2.738T19.3 16.45m.5 6.15l-4.2-4.15q-.875.275-1.762.413T12 19q-3.775 0-6.725-2.087T1 11.5q.525-1.325 1.325-2.463T4.15 7L1.4 4.2l1.4-1.4l18.4 18.4zM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.062t.975-.138l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525zm4.2 4.2"/></svg>
              <p className="text-[13px]">Masquer tous ses posts</p>
            </div>
          </div>
          <div className="w-full flex items-center p-3 hover:bg-gray-200 cursor-pointer">
            <div className="text-sm inline-flex gap-2 items-center font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#000000" d="M5 21V4h9l.4 2H20v10h-7l-.4-2H7v7z"/></svg>
              <p className="text-[13px]">Signaler le post</p>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dropdown