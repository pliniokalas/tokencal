import { useState, useRef, useContext, useEffect } from "react";
import { NavContext } from "../../utils/routing";

import styles from "./styles.module.scss";

// ================================================== 

const API_URL = "http://localhost:8000";

type LoginProps = { 
  login: () => void,
  isAuth: boolean
}

export default function LoginPage(props: LoginProps) {
  const { login, isAuth } = props;
  const nav = useContext(NavContext);

  const [signup, setSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [cPassword, setConfirm] = useState("");

  const cPassRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: any) {
    const field = e.target;
    setErrorMsg("");

    switch(field.name) {
      case "name":
        setName(field.value);
        break;
      case "email":
        setEmail(field.value);
        break;
      case "password":
        setPass(field.value);
        break;
      case "cPassword":
        setConfirm(field.value);
        validatePassword(field.value);
        break;
      default:
        break;
    }
  }

  function validatePassword(val: string) {
    if (password !== val) {
      cPassRef.current?.setCustomValidity("Precisa ser igual ao campo 'senha'");
    } else {
      cPassRef.current?.setCustomValidity("");
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const mode = signup ? "signup" : "login";

    const resp = await fetch(`${API_URL}/${mode}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await resp.json();
    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify({
      name: data.name,
      plans: data.plans,
      planList: data.planList,
    }));

    // redirect
    if (resp.ok) {
      login();
    }
  }

  useEffect(() => {
    if (isAuth) {
      nav.navigate("/home");
    }
  },[isAuth]);

  return (
    <section className={styles.loginContainer}>
      <h1 className={styles.hero}>TokenCal</h1>

      <form className={styles.authForm} onKeyDown={(e) => e.code === "Enter" && handleSubmit(e)}>  
        { errorMsg && <p className={styles.error}>{errorMsg}</p> }

        { signup 
          && <>
            <label htmlFor="name">nome</label>
            <input 
              name="name"
              value={name} 
              onChange={handleChange} 
              type="text" 
              required
            />
          </>
        }

        <label htmlFor="email">e-mail</label>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
          required
        />

        <label htmlFor="password">senha</label>
        <input
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          required
          minLength={6}
        />

        { signup 
          && <>
            <label htmlFor="cPassword">confirmar</label>
            <input
              name="cPassword"
              value={cPassword}
              onChange={handleChange}
              type="password"
              required
              minLength={6}
              ref={cPassRef}
            />
          </>
        }

        <button type="button" onClick={handleSubmit}>
          { signup ? "Registrar" : "Entrar" }
        </button>
      </form>

      { signup
        ?
        <p className={styles.authHint}>
          Já tem uma conta?
          <button type="button" onClick={() => setSignup(false)}>Entrar</button>
        </p>
        :
        <p className={styles.authHint}>
          Ainda não tem uma conta?
          <button type="button" onClick={() => setSignup(true)}>Registrar</button>
        </p>
      }
    </section>
  );
}
