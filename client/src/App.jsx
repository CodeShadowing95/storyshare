import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx';
import { fetchUser } from './services/fetchUser';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if (!user) navigate('/auth');
  }, [navigate]);

  return (
    <main className="flex min-h-screen relative">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </main>
  )
}

export default App