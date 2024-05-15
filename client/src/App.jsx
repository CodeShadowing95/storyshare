import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Sidebar } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <main className="flex sm:p-8 px-4 pt-8 pb-4 w-full min-h-screen">
        <Sidebar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" exact element={<Home />} />
            {/* <Route path="/profile" element={<Profile />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/subscribers" element={<Subscriber />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}

export default App