import { useState, useRef } from "react";

import styles from "./styles.module.scss";

export default function LoginPage() {
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

  return (
    <>
      <h1 className={styles.hero}>TokenCal</h1>

      <form method="POST" className={styles.authForm}>  
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

        { signup 
            ? <button type="submit" formAction="/register">Registrar</button>
            : <button type="submit" formAction="/login">Registrar</button>
        }
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
    </>
  );
}
