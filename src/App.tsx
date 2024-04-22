import { lazy } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const LazyHome = lazy(()=> import("./view/home"))
const LazyLogin = lazy(()=> import("./view/login"))

const queryClient = new QueryClient();


import { Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<LazyLogin/>}></Route>
          <Route path='/home' element={<LazyHome/>}></Route>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
