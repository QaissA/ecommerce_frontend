import { Route, BrowserRouter, Routes } from "react-router-dom"
import LandingPage from "./modules/landing-page/landing-page"
import Login from "./modules/signin/login"
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from "./modules/dashboard/dashboard";

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
