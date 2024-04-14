import { lazy } from "react"
const LazyHome = lazy(()=> import("./view/home"))
const LazyLogin = lazy(()=> import("./view/login"))


import { Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LazyLogin/>}></Route>
        <Route path='/home' element={<LazyHome/>}></Route>
      </Routes>
    </>
  )
}

export default App
