import { useState } from "react";

import styles from "./styles.module.scss";

//================================================== 

const API_URL = "http://localhost:8000";

type DetailsProps = {
  close: () => void,
  data?: {
    id: string | undefined,
    name: string,
    desc: string,
    start: Date,
    end: Date
  }
}

// freaking date parsing 
const when = (val?: any) => {
  const date = val ? (new Date(val)) : (new Date());
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// ================================================== 

export default function Details(props: DetailsProps) {
  const { close, data } = props;

  const user = JSON.parse(sessionStorage.getItem("user") as string);
  const plan = data || {
    id: undefined,
    name: "",
    desc: "",
    start: new Date(),
    end: new Date()
  };

  const [name, setName] = useState(plan.name);
  const [desc, setDesc] = useState(plan.desc);
  const [start, setStart] = useState(when(plan.start));
  const [end, setEnd] = useState(when(plan.end));

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

  async function create() {
    const body = {
      userId: user.id, 
      planList: user.planList, 
      name, 
      desc, 
      start, 
      end
    };

    const resp = await fetch(`${API_URL}/plan`, {
      method: "POST",
      headers: { 
        'Authorization': 'Bearer: ' + sessionStorage.getItem("token"),
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(body)
    });

    // get the id created in the DB
    if (resp.ok) {
      const data = await resp.json();
      user.planList = data.planList;
      const id = data.planList[data.planList.length-1];
      user.plans.push({ id, name, desc, start, end });
      sessionStorage.setItem("user", JSON.stringify(user));
    }

    return resp;
  }

  async function update() {
    const body = {
      userId: user.id, 
      planList: user.planList, 
      id: plan.id,
      name, 
      desc, 
      start, 
      end
    };

    const resp = await fetch(`${API_URL}/plan`, {
      method: "PATCH",
      headers: { 
        'Authorization': 'Bearer: ' + sessionStorage.getItem("token"),
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(body)
    });

    if (resp.ok) {
      const index = user.plans.findIndex((item: any) => item.id === plan.id);
      user.plans.splice(index, 1, { id: plan.id, name, desc, start, end });
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    
    if (plan.id) {
      update();
    } else {
      create();
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
