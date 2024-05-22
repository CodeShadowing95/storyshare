/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { logo, signinBanner1, signinBanner2, signinBanner3, signinBanner4 } from '../assets'
import { signin } from '../services/user-service';
import { useNavigate } from 'react-router-dom';

const Signin = ({ onPanelSwitch, onError }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [panelNumber, setPanelNumber] = useState(0);
  const navigate = useNavigate();

  const connect = async (e) => {
    e.preventDefault();

    await signin("signin", formData)
    .then((response) => {
      if (response.error) {
        onError(true);
        return;
      }

      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/feed');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const switchTo = (panel) => {
    onPanelSwitch(panel);
    setFormData({ email: '', password: '' });
  }

  useEffect(() => {
    if (panelNumber === 0) {
      setPanelNumber(1)
    }

    const interval = setInterval(() => {
      if (panelNumber < 4) {
        setPanelNumber(panelNumber + 1)
      } else {
        setPanelNumber(1)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [panelNumber])

  return (
    <div className="w-full h-full flex justify-center items-center p-2 rounded-3xl shadow-2xl card-signin">
      {/* Form */}
      <div className="w-[40%] h-full flex items-center px-20">
        <div className="w-full flex flex-col justify-center gap-5">
          <img src={logo} alt="logo" className="w-12 h-12" />

          <div className="flex flex-col justify-center w-full">
            <h1 className="text-2xl font-bold">Connectez-vous</h1>
            <p className="text-sm">Partagez avec nous vos passions, vos histoires, vos défis. En tout votre quotidien.</p>
          </div>

          <form className="w-full flex flex-col justify-center gap-3" onSubmit={connect}>
            <input type="email" name="email" value={formData.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input type="password" name="password" value={formData.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2" placeholder="Mot de passe" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />

            <div className="flex flex-col gap-2 w-full mt-6">
              <button type='submit' className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Connexion</button>
              <p className="text-xs">Vous n’avez pas de compte ? <span className="text-blue-500 cursor-pointer" onClick={() => switchTo("signup")}>Inscrivez-vous</span></p>
            </div>
          </form>
        </div>
      </div>

      {/* Carousel images */}
      <div className="w-[60%] h-full flex justify-center items-center rounded-3xl relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-8 w-full grid grid-cols-4 justify-center items-center px-8 gap-2 z-10">
          <div className="h-[3px] bg-white/50 rounded-full relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-full bg-white rounded-full ${panelNumber === 1 && "translate-x-0"} -translate-x-[100%] duration-[5s]`}></div>
          </div>
          <div className="h-[3px] bg-white/50 rounded-full relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-full bg-white rounded-full ${panelNumber === 2 && "translate-x-0"} -translate-x-[100%] duration-[5s]`}></div>
          </div>
          <div className="h-[3px] bg-white/50 rounded-full relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-full bg-white rounded-full ${panelNumber === 3 && "translate-x-0"} -translate-x-[100%] duration-[5s]`}></div>
          </div>
          <div className="h-[3px] bg-white/50 rounded-full relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-full bg-white rounded-full ${panelNumber === 4 && "translate-x-0"} -translate-x-[100%] duration-[5s]`}></div>
          </div>
        </div>

        {/* Images */}
        <div className={`absolute inset-0 ${panelNumber === 1 ? "opacity-100" : "opacity-0"} transition-all duration-[0.5s]`}>
          <img src={signinBanner1} alt="signin" className="absolute w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-black to-transparent"></div>
          <div className="absolute inset-0 bottom-4 z-20">
            <div className="w-full h-full flex flex-col justify-end p-8">
              <p className="text-white text-3xl font-bold max-w-md mb-6">
                Sentez-vous libre de partager vos envies !
              </p>
              <div className="flex justify-center items-center max-w-[100px] px-2 py-1 bg-blue-500/20 rounded-full mb-4">
                <p className="text-white text-sm font-medium">Super Class</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute inset-0 ${panelNumber === 2 ? "opacity-100" : "opacity-0"} transition-all duration-[0.5s]`}>
          <img src={signinBanner2} alt="signin" className="absolute w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-black to-transparent"></div>
          <div className="absolute inset-0 bottom-4 z-20">
            <div className="w-full h-full flex flex-col justify-end p-8">
              <p className="text-white text-3xl font-bold max-w-md mb-6">
              Découvrez ce que les autres font et faites vous des amis !
              </p>
              <div className="flex justify-center items-center max-w-[100px] px-2 py-1 bg-blue-500/20 rounded-full mb-4">
                <p className="text-white text-sm font-medium">Magnifaïc</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute inset-0 ${panelNumber === 3 ? "opacity-100" : "opacity-0"} transition-all duration-[0.5s]`}>
          <img src={signinBanner3} alt="signin" className="absolute w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-black to-transparent"></div>
          <div className="absolute inset-0 bottom-4 z-20">
            <div className="w-full h-full flex flex-col justify-end p-8">
              <p className="text-white text-3xl font-bold max-w-md mb-6">
                Mettre les réseaux sociaux hors de portée des enfants !
              </p>
              <div className="flex justify-center items-center max-w-[100px] px-2 py-1 bg-blue-500/20 rounded-full mb-4">
                <p className="text-white text-sm font-medium">Prudencia</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute inset-0 ${panelNumber === 4 ? "opacity-100" : "opacity-0"} transition-all duration-[0.5s]`}>
          <img src={signinBanner4} alt="signin" className="absolute w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-black to-transparent"></div>
          <div className="absolute inset-0 bottom-4 z-20">
            <div className="w-full h-full flex flex-col justify-end p-8">
              <p className="text-white text-3xl font-bold max-w-md mb-6">
                Adaptable à tout type de résolution d{"'"}écran.
              </p>
              <div className="flex justify-center items-center max-w-[100px] px-2 py-1 bg-blue-500/20 rounded-full mb-4">
                <p className="text-white text-sm font-medium">Charisma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin