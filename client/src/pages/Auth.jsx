import { useEffect, useState } from "react";
import { Signin, Signup } from "../pages";

const Auth = () => {
  const [panel, setPanel] = useState("signin");
  const [isError, setIsError] = useState("");
  const [isSigninError, setIsSigninError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsError("");
      setIsSigninError(false);
    }
  }, [isSuccess]);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden">
      <div className={`absolute top-8 flex items-center gap-1 rounded-lg bg-red-100 p-2 ${isError ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#dc2626" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg>
        <p className="text-xs text-red-600">{isError === "password" ? "Les mots de passe ne sont pas identiques" : "Une erreur est survenue! Veuillez réessayer!"}</p>
        <div onClick={() => setIsError("")}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#dc2626" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>
      <div className={`absolute top-8 flex items-center gap-1 rounded-lg bg-red-100 p-2 ${isSigninError ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#dc2626" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg>
        <p className="text-xs text-red-600">Email ou mot de passe incorrects !</p>
        <div onClick={() => setIsSigninError(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#dc2626" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>
      <div className={`absolute top-8 flex items-center gap-1 rounded-lg bg-green-100 p-2 ${isSuccess ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#16a34a" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"/></svg>
        <p className="text-xs text-green-600">🎉 Merci pour votre inscription 🎉</p>
        <div onClick={() => setIsSuccess(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 cursor-pointer" width="15" height="15" viewBox="0 0 24 24"><path fill="#16a34a" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
        </div>
      </div>

      <div className="flex w-[calc(100dvw-500px)] h-[calc(100dvh-200px)] card-container">
        <div className={`w-full h-full flex justify-center items-center ${panel === "signup" ? 'rotate-y-180' : 'rotate-y-0'} card-inner`}>
          {/* Sign in side */}
          <Signin onPanelSwitch={() => setPanel("signup")} onError={setIsSigninError} />
          {/* Sign up side */}
          <Signup onPanelSwitch={() => setPanel("signin")} onError={setIsError} onSuccess={setIsSuccess} />
        </div>
      </div>
    </div>
  )
}

export default Auth