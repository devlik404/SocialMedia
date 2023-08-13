
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./layouts/index";
import {ThreadDetail} from "./layouts/ThreadDetail";
import Register from "./pages/register";


function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/detail/:id" element={<ThreadDetail/>}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
