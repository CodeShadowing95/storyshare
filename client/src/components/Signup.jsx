/* eslint-disable react/prop-types */
import { useState } from "react"
import { logo, signupBanner } from "../assets"
import { signup } from "../services/user-service"

const Signup = ({ onPanelSwitch, onError, onSuccess }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })

  const register = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      onError("password");
      return;
    }

    try {
      await signup("signup", formData);
      onSuccess(true);
      switchTo("signin");
    } catch (error) {
      onError("global");
      console.log(error);
    }

    onError("");
  }

  const switchTo = (panel) => {
    onPanelSwitch(panel)
    setFormData({ username: '', email: '', password: '', confirmPassword: '' })
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-2 rounded-3xl shadow-2xl card-signup">
      {/* Form */}
      <div className="w-[40%] h-full flex items-center px-20">
        <div className="w-full flex flex-col justify-center gap-5">
          <img src={logo} alt="logo" className="w-12 h-12" />

          <div className="flex flex-col justify-center w-full">
            <h1 className="text-xl font-bold">Inscription</h1>
            <p className="text-sm">Inscrivez-vous et rejoignez notre communauté.</p>
          </div>

          <form className="w-full flex flex-col justify-center gap-3" onSubmit={register}>
            <input type="text" name="username" id="username" value={formData.username} className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-none" placeholder="Nom" required onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <input type="email" name="email" id="email" value={formData.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-none" placeholder="Email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="password" name="password" id="password" value={formData.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-none" placeholder="Mot de passe" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-none" placeholder="Confirmer votre mot de passe" required onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />

            <div className="flex flex-col gap-2 w-full mt-6">
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Confirmer</button>
              <p className="text-xs">Vous avez déja un compte ? <span className="text-blue-500 cursor-pointer" onClick={() => switchTo("signin")}>Connectez-vous</span></p>
            </div>
          </form>
        </div>
      </div>

      {/* Carousel images */}
      <div className="w-[60%] h-full flex justify-center items-center rounded-3xl overflow-hidden">
        <div className="w-full h-full relative">
          <img src={signupBanner} alt="signin" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export default Signup