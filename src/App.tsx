import { lazy, Suspense } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const LazyHome = lazy(()=> import("./view/home"))
const LazyPostModal = lazy(()=> import("./modal/modalPost"))
const LazyLogin = lazy(()=> import("./view/login"))
const queryClient = new QueryClient();

import PostModal from './modal/modalPost';


import { Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/login' element={<LazyLogin/>}></Route>
          <Route path='/' element={<LazyHome/>}></Route>


          <Route path='/post/:id' element={(
            <Suspense fallback={<p>Loading.....</p>}>
              <LazyPostModal/>
            </Suspense>
          )}></Route>

        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
