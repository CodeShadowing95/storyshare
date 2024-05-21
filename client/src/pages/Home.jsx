import { Route, Routes } from "react-router-dom"
import { Sidebar } from "../components"
import { fetchUser } from "../services/fetchUser"
import { Feed, NewPost, Posts } from "./index.js"

const Home = () => {
  const user = fetchUser();

  return (
    <>
      <Sidebar user={user && user} />
      <Routes>
        <Route path="/feed" exact element={<Feed />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create-post" element={<NewPost />} />
      </Routes>
    </>
  )
}

export default Home