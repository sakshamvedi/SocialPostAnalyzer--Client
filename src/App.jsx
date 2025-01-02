import { Button } from "./components/ui/button";
import Dashboard from "./pages/Dashboard";
import PostsSection from "./pages/PostSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from "./pages/SideNav";

function App() {
  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<><SideNav></SideNav><Dashboard /></>} />

        <Route path="/post" element={<><SideNav /><PostsSection /></>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
