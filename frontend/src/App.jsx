import React,{useEffect} from "react";
import {Routes,Route} from "react-router-dom";
import {AuthProvider,useAuth} from "./contexts/AuthContext";
import {AnalysisProvider} from "./contexts/AnalysisContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import LandingPage  from "./pages/LandingPage";
import AuthPage     from "./pages/AuthPage";
import UploadPage   from "./pages/UploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import HistoryPage  from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

function AppInner(){
  const{checkAuth}=useAuth();
  useEffect(()=>{checkAuth();},[]);// eslint-disable-line
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex-1">
        <Routes>
          <Route path="/"         element={<LandingPage/>}/>
          <Route path="/login"    element={<AuthPage/>}/>
          <Route path="/register" element={<AuthPage/>}/>
          <Route path="/upload"   element={<UploadPage/>}/>
          <Route path="/analysis" element={<AnalysisPage/>}/>
          <Route path="/history"  element={<HistoryPage/>}/>
          <Route path="*"         element={<NotFoundPage/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default function App(){
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AnalysisProvider>
          <AppInner/>
        </AnalysisProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
