import CardPrimaryDashboard from "../components/Dashboard/CardPrimaryDashboard";
import ModalLogin from "../components/Dashboard/ModalLogin";
import Nav from "../components/Dashboard/Nav";
import { useDashboardStore } from "../store/dashboard";
import Search from "../components/Search/Search";
import { useState } from "react";
import UploadIptv from "../components/Search/UploadIptv";
import IptvList from "../components/Dashboard/IptvList";

export default function Dashboard() {
  const isAuth = useDashboardStore((state) => state.isAuth);
  const [title, setTitle] = useState("Dashboard");
  const [component, setComponent] = useState("movies");

  if (!isAuth) return <ModalLogin />;
  return (
    <>
      <Nav title={title} setComponent={setComponent} />
      {component === "movies" ? (
        <CardPrimaryDashboard setTitle={setTitle} />
      ) : component === "search" ? (
        <Search setComponent={setComponent} setTitle={setTitle} />
      ) : component === "push-iptv" ? (
        <UploadIptv setComponent={setComponent} setTitle={setTitle}/>
      ) : component === "iptv-list" ? (
        <IptvList setTitle={setTitle}/>
      ) : (
        ""
      )}
    </>
  );
}
