import CardPrimaryDashboard from "../components/Dashboard/CardPrimaryDashboard";
import ModalLogin from "../components/Dashboard/ModalLogin";
import Nav from "../components/Dashboard/Nav";
import { useDashboardStore } from "../store/dashboard";
import Search from "../components/Search/Search";
import { useState } from "react";

export default function Dashboard() {
  const isAuth = useDashboardStore((state) => state.isAuth);
  const [title, setTitle] = useState("Dashboard");
  const [component, setComponent] = useState("movies");

  if (!isAuth) return <ModalLogin />;
  return (
    <>
      <Nav title={title} setComponent={setComponent} />
      {component === "movies" ? (
        <CardPrimaryDashboard />
      ) : component === "search" ? (
        <Search />
      ) : (
        ""
      )}
    </>
  );
}
