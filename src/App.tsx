import { Route, BrowserRouter, Routes } from "react-router-dom"
import LandingPage from "./modules/landing-page/landing-page"
import SignIn from "./modules/signin/singin"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route  path="/signin" element={<SignIn />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
