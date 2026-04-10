export function firstUpperChar(name: string): string {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function sayHello(name?: string): string {
  if (name && name.trim() !== "") return `Welcome back, ${name}!`;
  return `Welcome back`;
}

export function welcomeHeader(name?: string): string {
  if (name && name.trim() !== "") return `Welcome back, ${name}!`;
  return `Please log in to access your dashboard`;
}

export function todayDate(isSigned?: boolean) {
  if(!isSigned)
    return `Sign in to access your personal dashboard`;
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const currentWeekDay = days[date.getDay()];
  const currentMonth = month[date.getMonth()];

  return `Today is ${currentWeekDay}, ${currentMonth} ${date.getUTCDate()}, ${date.getFullYear()}`;
}
