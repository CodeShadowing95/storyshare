/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Editor = ({ setEditorDatas, data }) => {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [datasEditor, setDatasEditor] = useState({ message: !data?.message ? message : data.message, pictures: images });

  const handleChange = (e) => {
    setMessage(e.target.value);
    setDatasEditor({ ...datasEditor, message: message });
  }

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
        const randomId = Array(12).fill(0).map(() => Math.random().toString(36)[2]).join('');

        setImages([...images, { id: randomId, src: reader.result }]);
        setDatasEditor({ ...datasEditor,  pictures: [...images, { id: randomId, src: reader.result }] });
      };
    };
  }

  const removeImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
    setDatasEditor({ ...datasEditor, pictures: images.filter((image) => image.id !== id) });
  }

  useEffect(() => {
    setEditorDatas(datasEditor);
  }, [datasEditor, setEditorDatas]);

  useEffect(() => {
    data &&
    setTimeout(() => {
      data.pictures?.length > 0 && setImages(data.pictures);
    })
  }, [data]);


  return (
    <div className="w-full mb-4 rounded-lg">
      {/* Editor */}
      <div className="w-full border mb-2 border-gray-200 rounded-lg bg-gray-50 shadow-sm">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100" onClick={uploadImages}>
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 ">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z"/>
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
              <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 ">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"/>
                </svg>
                <span className="sr-only">Add list</span>
              </button>
            </div>
          </div>
          <button type="button" data-tooltip-target="tooltip-fullscreen" className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 ">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"/>
            </svg>
            <span className="sr-only">Full screen</span>
          </button>
          <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
            Show full screen
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        
        <div className="px-4 py-2 bg-white rounded-b-lg">
          <label htmlFor="editor" className="sr-only">Publish post</label>
          <textarea name="message" id="editor" rows="8" value={data ? data.message : datasEditor.message} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none" placeholder="Qu'avez-vous en tête..." required onChange={e => handleChange(e)}></textarea>
        </div>
      </div>

      {/* Images */}
      {images?.length > 0 &&
        <div className="w-full flex flex-wrap gap-2 rounded-lg">
          {images.map(image => (
            <div key={image.id} className="border w-[150px] h-[100px] rounded-lg p-2 relative">
              <img src={image.src} alt="post" className="w-full h-full rounded-lg object-cover" />
              <div className="absolute -top-2 -right-2 cursor-pointer" onClick={() => removeImage(image.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ef4444" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Editor