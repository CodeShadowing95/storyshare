import { Navigate, Route, Routes } from "react-router-dom"
import { Sidebar } from "../components"
import { fetchUser } from "../utils"
import { Feed, NewPost, Posts } from "./index.js"
import { useState } from "react"

const Home = () => {
  const user = fetchUser();
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <Sidebar user={user && user} />
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" exact element={<Feed onSuccess={isSuccess} />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create-post" element={<NewPost />} />
        <Route path="/edit-post" element={<NewPost onSuccess={setIsSuccess} />} />
      </Routes>
    </>
  )
}

export default Home