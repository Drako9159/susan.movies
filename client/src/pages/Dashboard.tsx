import CardPrimaryDashboard from "../components/Dashboard/CardPrimaryDashboard";
import ModalLogin from "../components/Dashboard/ModalLogin";
import Nav from "../components/Dashboard/Nav";
import { useDashboardStore } from "../store/dashboard";
import Search from "../components/Search/Search";
import { useState, useEffect } from "react";
import UploadIptv from "../components/Search/UploadIptv";
import IptvList from "../components/Dashboard/IptvList";

export default function Dashboard() {
  const isAuth = useDashboardStore((state) => state.isAuth);
  const [title, setTitle] = useState("Dashboard");
  const [component, setComponent] = useState("movies");

  useEffect(() => {
    if (component === "movies") setTitle("Movies");
    if (component === "search") setTitle("Push Movie");
    if (component === "push-iptv") setTitle("Push IPTV");
    if (component === "iptv-list") setTitle("IPTV");
  }, [component]);

  if (!isAuth) return <ModalLogin />;
  return (
    <>
      <Nav title={title} setComponent={setComponent} />
      {component === "movies" ? (
        <CardPrimaryDashboard />
      ) : component === "search" ? (
        <Search setComponent={setComponent} />
      ) : component === "push-iptv" ? (
        <UploadIptv setComponent={setComponent} />
      ) : component === "iptv-list" ? (
        <IptvList />
      ) : (
        ""
      )}
    </>
  );
}
