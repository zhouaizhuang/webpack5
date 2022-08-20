import React, {Suspense, lazy}from "react"
import {Link, Routes, Route} from "react-router-dom"

const Home = lazy(() => import(/*webpackChunkName: 'home'*/"./views/Home")) // 懒加载 + 代码分块
const About = lazy(() => import(/*webpackChunkName: 'about'*/"./views/About"))

export default function App(){
  return <div>
    <h1>APP</h1>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
      </Routes>
    </Suspense>
  </div>
}
