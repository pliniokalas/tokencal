import { useState, useContext, createContext } from "react";

export const DateContext = createContext({ 
  month: 0, 
  year: 0, 
  nextMonth: () => {},
  prevMonth: () => {},
});

// ================================================== 

export function DateProvider({ children } : { children: React.ReactNode }) {
  const [month, setMonth] = useState((new Date()).getMonth());
  const [year, setYear] = useState((new Date()).getFullYear());

  function nextMonth() {
    const newMonth = (month + 1) % 12;

    if (newMonth === 0) {
      setYear(year + 1);
    }

    setMonth(newMonth);
  }

  function prevMonth() {
    const newMonth = month === 0 ? 11 : (month - 1); 

    if (newMonth === 11) {
      setYear(year - 1);
    }

    setMonth(newMonth);
  }

  const ctx = {
    month, year, nextMonth, prevMonth
  }

  return (
    <DateContext.Provider value={ctx}>
      {children}
    </DateContext.Provider>
  );
}

// ================================================== 

export function useDate() {
  return useContext(DateContext);
}
