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
    const str = item.start.split("T")[0];

    const y = +str.split("-")[0];
    const m = +str.split("-")[1] - 1;
    const d = +str.split("-")[2];

    if (y !== year || m !== month) { 
      continue;
    }

    if (!indexed[d]) {
      indexed[d] = [];
    }

    indexed[d].push(item);
  }

  return indexed;
}
