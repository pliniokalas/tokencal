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
  const [desc, setDesc] = useState("");

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
      case "desc":
        setDesc(field.value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem("user") as string);

    const body = JSON.stringify({
      planList: user.planList, 
      userId: user.id, 
      name, 
      desc, 
      start, 
      end
    });

    const resp = await fetch(`${API_URL}/plan`, {
      method: "POST",
      headers: { 
        'Authorization': 'Bearer: ' + sessionStorage.getItem("token"),
        'Content-Type': 'application/json' 
      },
      body
    });

    // get the id created in the DB
    if (resp.ok) {
      const data = await resp.json();
      user.planList = data.planList;
      user.plans.push({ name, desc, start, end });
      sessionStorage.setItem("user", JSON.stringify(user));
    }

    close();
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

      <textarea
        name="desc"
        value={desc}
        placeholder="descrição"
        onChange={handleChange}
      />

      <menu>
        <button
          type="button"
          onClick={close}
          className={styles.closeBtn}
        >
          <img src={"./assets/x.svg"} /> {/* eslint-disable-line */}
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.saveBtn}
        >
          <img src={"./assets/save.svg"} /> {/* eslint-disable-line */}
          Salvar
        </button>
      </menu>
    </form>
  );
}
