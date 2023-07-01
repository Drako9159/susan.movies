import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Wrapper from "./components/Extra/Wrapper";
import Layout from "./components/Extra/Layout";
import Movies from "./pages/Movies";
import Watcher from "./pages/Watcher";
import Dashboard from "./pages/Dashboard";
import ScrollTopTop from "./hooks/useScroll";
import useAuth from "./hooks/useAuth";
import NotFound from "./components/Extra/NotFound";
import WatcherIptv from "./pages/WatcherIptv";

export default function App() {
  useAuth();
  return (
    <Layout>
      <Wrapper>
        <BrowserRouter>
          <ScrollTopTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Watcher />} />
            <Route path="/iptvs/:id" element={<WatcherIptv />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Layout>
  );
}
