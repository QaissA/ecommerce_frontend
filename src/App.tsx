import { Route, BrowserRouter, Routes } from "react-router-dom"
import LandingPage from "./modules/landing-page/landing-page"
import Login from "./modules/signin/login"
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from "./modules/dashboard/dashboard";
import Signin from "./modules/sign-in/signin";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
