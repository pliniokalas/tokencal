type Plan = {
  id: string,
  name: string,
  desc: string,
  start: string,
  end: string
}

export function indexedByDate(year: number, month: number, plans: Array<Plan>) {
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
