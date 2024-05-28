/* eslint-disable react/prop-types */

const Searchgroup = ({ onSearch }) => {
  const getSearch = (e) => {
    onSearch(e.target.value)
  }

  return (
    <div className="flex items-center w-[300px]">
      <form className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#6b7280" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"/></svg>
        </div>

        <input type="text" id="search" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 pe-8 p-2.5" placeholder="Rechercher un groupe..." onChange={getSearch} />

        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#6b7280" d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20zm1-7.7L16.95 6h-9.9zm0 0"/></svg>
        </button>
      </form>
    </div>
  )
}

export default Searchgroup