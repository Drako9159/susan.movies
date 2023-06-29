import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Wrapper from "./components/Extra/Wrapper"
import Layout from "./components/Extra/Layout"
import Movies from "./pages/Movies";

export default function App() {
  return (
    <Layout>
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Layout>
  );
}
