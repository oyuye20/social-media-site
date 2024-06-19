import { lazy, Suspense } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
const LazyHome = lazy(()=> import("./view/home"))
const LazyPostModal = lazy(()=> import("./modal/modalPost"))
const LazyProfile = lazy(()=> import("./components/profile"))
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();
import {Navigate} from "react-router-dom";

import PostModal from './modal/modalPost';


import { Route, Routes } from "react-router-dom"
import Login from "@/view/login.tsx";
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />

        <Routes>
          <Route path='/' element={<Login/>}></Route>

            <Route path='/profile/:id' element={(
                <Suspense fallback={<p>Loading.....</p>}>
                    <LazyProfile/>
                </Suspense>
            )}></Route>

            <Route path='/home' element={(
                <Suspense fallback={<p>Loading.....</p>}>
                    <LazyHome/>
                </Suspense>
            )}></Route>

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
