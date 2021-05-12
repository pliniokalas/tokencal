export function mergeDate(field: any, complement: any) {
  const template = new Date();

  if (field.name === "date") {
    const inp = field.value.split("-");
    template.setFullYear(inp[0]);
    template.setMonth(inp[1] - 1);
    template.setDate(inp[2]);

    template.setHours(complement.getHours());
    template.setMinutes(complement.getMinutes());
  }

  else { 
    const inp = field.value.split(":");
    template.setHours(inp[0]);
    template.setMinutes(inp[1]);

    template.setFullYear(complement.getFullYear());
    template.setMonth(complement.getMonth());
    template.setDate(complement.getDate());
  }

  return template;
}

