import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Wrapper from "./components/Extra/Wrapper";
import Layout from "./components/Extra/Layout";
import Movies from "./pages/Movies";
import Watcher from "./pages/Watcher";

export default function App() {
  return (
    <Layout>
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Watcher />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Layout>
  );
}
