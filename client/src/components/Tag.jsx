/* eslint-disable react/prop-types */
import { useState } from "react";

const Tag = ({ setTagDatas }) => {
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [tagError, setTagError] = useState(false)

  const handleChange = (e) => {
    setTag(e.target.value)
  }

  const addTag = () => {
    if (!tag) {
      setTagError(true)
      return
    }

    setTagError(false)
    setTags([...tags, '#' + tag])
    setTagDatas([...tags, '#' + tag])
    setTag('')
  }

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
    setTagDatas(tags.filter((t) => t !== tag))
  }

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     addTag();
  //   }
  // }

  // useEffect(() => {
  //   const tagInput = document.getElementById('tag');
  //   if (tagInput) {
  //     tagInput.addEventListener('keypress', handleKeyPress);
  //   }
  //   return () => {
  //     if (tagInput) {
  //       tagInput.removeEventListener('keypress', handleKeyPress);
  //     }
  //   }
  // }, [addTag])

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="tag" className="block text-sm font-medium">Tags</label>
        <button type="button" className="flex gap-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-1 text-center" onClick={addTag}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/></svg>
          Ajouter
        </button>
      </div>
      <input type="text" id="tag" name="tag" value={tag} className="border border-gray-200 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2" placeholder="Saisissez un tag et appuyer sur Entrée pour ajouter" onChange={handleChange} />
      
      <div className={`flex items-center gap-1 rounded-lg bg-red-100 p-2 ${tagError ? "block" : "hidden"} transition-all duration-200`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#dc2626" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg>
        <p className="text-xs text-red-600">Veuillez ajouter un tag</p>
      </div>

      {tags.length > 0 &&
        <div className="w-full flex flex-wrap mt-2 gap-1">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center py-1 pl-2 pr-1 bg-gray-200 rounded-lg gap-2">
              <p className="text-xs font-bold">{tag}</p>
              <div className="cursor-pointer p-1 hover:bg-gray-300 rounded-lg" onClick={() => removeTag(tag)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ef4444" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Tag