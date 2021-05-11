import { useState } from "react";

import styles from "./styles.module.scss";

//================================================== 

const API_URL = "http://localhost:8000";

type DetailsProps = {
  close: () => void,
}

export default function Details(props: DetailsProps) {
  const { close } = props;

  const [name, setName] = useState("");
  const [start, setStart] = useState((new Date()).toISOString());
  const [end, setEnd] = useState(new Date().toISOString());

  function handleChange(e: any) {
    const field = e.target;

    switch(field.name) {
      case "name":
      setName(field.value);
        break;
      case "start":
      setStart(field.value);
        break;
      case "end":
      setEnd(field.value);
        break;
      default:
      break;
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const resp = await fetch(`${API_URL}/plan`, {
      method: "POST",
      headers: { },
      body: JSON.stringify({ name, start, end })
    });

    console.log(resp.ok);
  }

  return (
    <form className={styles.detailsContainer}>
      <input 
        name="name"
        placeholder="Nome do evento"
        value={name}
        type="text" 
        onChange={handleChange} 
      />

      <label htmlFor="start">De</label>
        <input
          name="start"
          type="date"
          value={start}
          onChange={handleChange}
        />
      

      <label htmlFor="end">Até</label>
        <input
          name="end"
          type="date"
          value={end}
          onChange={handleChange}
        />

      <menu>
        <button
          type="button"
          onClick={close}
          className={styles.closeBtn}
        >
          <img src={"./assets/x.svg"} />
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.saveBtn}
        >
          <img src={"./assets/save.svg"} />
          Salvar
        </button>
      </menu>
    </form>
  );
}
