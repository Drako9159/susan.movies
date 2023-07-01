import { useDashboardStore } from "../../store/dashboard";
import { dashboardLoginRequest } from "../../api/auth";
import styles from "./ModalLogin.module.css";

export default function ModalLogin() {
  const setToken = useDashboardStore((state) => state.setToken);
  const token = useDashboardStore((state) => state.token);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const username = (e.currentTarget[0] as HTMLInputElement).value;
    const password = (e.currentTarget[1] as HTMLInputElement).value;
    if (!username || !password) return alert("Please fill all fields");
    try {
      await dashboardLoginRequest(username, password).then((res) => {
        setToken(res.headers.authorization);
        console.log(token);
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.container}>
      <h2>Please Login</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
