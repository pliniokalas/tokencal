import { useDate } from "../../utils/date-context";
import { buildCalendarPage } from "../../utils/build-calendar-page";
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

const WEEK = [ "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab" ];

type Plan = {
  id: string,
  name: string,
  desc: string,
  start: string,
  end: string
}

// ================================================== 

export default function Calendar() {
  const { month, year } = useDate();

  const user = JSON.parse(sessionStorage.getItem("user") as string);
  const page = buildCalendarPage(year, month, user.plans);

  return (
    <section className={styles.calendarContainer}>
      
      <CalendarHeader />

      <div className={styles.dateContainer}>
        { WEEK.map((item, index) => <span key={item + index}>{item}</span>) }

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
            { entry.plans?.map((item: Plan) => <li key={item.id}>{item.name}</li>) }
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

function CalendarHeader() {
  const { month, year, nextMonth, prevMonth } = useDate();

  return (
    <menu className={styles.calendarHeader}>
      <button
        type="button"
        onClick={prevMonth}
      >
        <img src={"./assets/left_g.svg"} alt="Mês anterior" />
      </button>

      <h1 className={styles.calendarTitle}>{`${MONTHS[month]}, ${year}`}</h1>

      <button
        type="button"
        onClick={nextMonth}
      >
        <img src={"./assets/right_g.svg"} alt="Próximo mẽs" />
      </button>
    </menu>
  );
}
