import { indexedByDate } from "./indexed-by-date";

// ================================================== 

type Plan = {
  id: string,
  name: string,
  desc: string,
  start: string,
  end: string
}

export function buildCalendarPage(year: number, month: number, plans: Array<Plan>) {
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
