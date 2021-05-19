import { useFlag } from "@src/useFlag";

export default function Home() {
  const login = useFlag("login");
  return <div>{login ? <button>Login</button> : null}</div>;
}
