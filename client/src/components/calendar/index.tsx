import { useState } from "react";
import styles from "./styles.module.scss";

// ================================================== 

const MONTHS = [
  "Janeiro", 
  "Fevereiro", 
  "Março", 
  "Abril", 
  "Maio", 
  "Junho", 
  "Julho", 
  "Agosto", 
  "Setembro", 
  "Outubro", 
  "Novembro", 
  "Dezembro"
];

// ================================================== 

export default function Calendar() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const user = JSON.parse(sessionStorage.getItem("user") as string);
  const page = buildCalendarPage(year, month, user.plans);

  return (
    <section className={styles.calendarContainer}>
      
      <CalendarHeader 
        year={year}
        month={month}
        changeY={(val: number) => setYear(val)}
        changeM={(val: number) => setMonth(val)}
      />

      <div className={styles.dateContainer}>
        <span>Dom</span>
        <span>Seg</span>
        <span>Ter</span>
        <span>Qua</span>
        <span>Qui</span>
        <span>Sex</span>
        <span>Sab</span>

      {/* tail of last month */}
      { page[0].map((entry, index) => (
        <ul className={styles.day} key={entry.date + "" + index}>
          <li className={`${styles.dateLabel} ${styles.tail}`}>{entry.date}</li>
        </ul>
        )) 
      }

      {/* current month */}
      { page[1].map((entry, index) => (
        <ul className={styles.day} key={entry.date + "" + index}>
          <li className={`${styles.dateLabel} ${entry.today && styles.today}`}>{entry.date}</li>
          { entry.plans?.map((item) => <li key={item.id}>{item.name}</li>) }
        </ul>
        )) 
      }

      {/* head of next month */}
      { page[2].map((entry, index) => (
        <ul className={styles.day} key={entry.date + "" + index}>
          <li className={`${styles.dateLabel} ${styles.head}`}>{entry.date}</li>
        </ul>
        )) 
      }
      </div>
    </section>
  );
}

// ================================================== 

type HeaderProps = {
  year: number,
  month: number,
  changeY: (val: number) => void,
  changeM: (val: number) => void
}

function CalendarHeader(props: HeaderProps) {
  const { year, month, changeY, changeM } = props;

  function handleNextMonth() {
    const newMonth = (month + 1) % 12;

    if (newMonth === 0) {
      changeY(year + 1);
    }

    changeM(newMonth);
  }

  function handlePrevMonth() {
    const newMonth = month === 0 ? 11 : (month - 1); 

    if (newMonth === 11) {
      changeY(year - 1);
    }

    changeM(newMonth);
  }

  return (
    <menu className={styles.calendarHeader}>
      <button
        type="button"
        onClick={handlePrevMonth}
      >
        <img src={"./assets/left_g.svg"} alt="Mês anterior" />
      </button>

      <h1 className={styles.calendarTitle}>{`${MONTHS[month]}, ${year}`}</h1>

      <button
        type="button"
        onClick={handleNextMonth}
      >
        <img src={"./assets/right_g.svg"} alt="Próximo mẽs" />
      </button>
    </menu>
  );
}

// ================================================== 

type Plan = {
  id: string,
  name: string,
  desc: string,
  start: string,
  end: string
}

function indexedByDate(year: number, month: number, plans: Array<Plan>) {
  const indexed: any = {};

  for (let item of plans) {
    const [y, mon, d] = item.start.split("-");
    const m = +mon-1;

    if (+y !== year || +m !== month) { 
      continue;
    }

    if (!indexed[d]) {
      indexed[d] = [];
    }

    indexed[d].push(item);
  }

  return indexed;
}

function buildCalendarPage(year: number, month: number, plans: Array<Plan>) {
  const today = new Date();

  // current month
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  // tail of last month
  const lastStart = new Date(year, month, 1 - (monthStart.getDay() || 7));
  const lastEnd = new Date(year, month, 0); 

  // "date blocks"
  const currBlocks = (monthEnd.getDate() - monthStart.getDate()) + 1;
  const tailBlocks = (lastEnd.getDate() - lastStart.getDate()) + 1;
  const headBlocks = (6*7) - (currBlocks + tailBlocks);

  // head of next month
  const nextStart = new Date(year, month + 1, 1);
  const nextEnd = new Date(year, month + 1, headBlocks); 

  const currentPlans = indexedByDate(year, month, plans);

  const tail = [];
  for (let i=lastStart.getDate(); i<=lastEnd.getDate(); i++) {
    tail.push({ date: i, plans: [], today: false });
  }

  const curr = [];
  for (let i=monthStart.getDate(); i<=monthEnd.getDate(); i++) {
    curr.push({ 
      date: i, 
      plans: currentPlans[i], 
      today: month === today.getMonth() && i === today.getDate() 
    });
  }

  const head = [];
  for (let i=nextStart.getDate(); i<=nextEnd.getDate(); i++) {
    head.push({ date: i, plans: [], today: false });
  }

  return [tail, curr, head];
}
