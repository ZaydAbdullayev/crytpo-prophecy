export const months = [
  { name: "Yanvar", days: 31 },
  { name: "Fevral", days: 28 },
  { name: "Mart", days: 31 },
  { name: "Aprel", days: 30 },
  { name: "May", days: 31 },
  { name: "Iyun", days: 30 },
  { name: "Iyul", days: 31 },
  { name: "Avgust", days: 31 },
  { name: "Sentabr", days: 30 },
  { name: "Oktyabr", days: 31 },
  { name: "Noyabr", days: 30 },
  { name: "Dekabr", days: 31 },
];

export const month_names = [
  "",
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

const day_data = [];
export const getDays = () => {
  if (day_data.length > 15) return day_data;
  const days = Array.from({ length: 15 }, (_, i) => i + 1);
  const formattedDays = ["", "", "", ...days, "", "", ""];
  day_data.push(...formattedDays);
  return formattedDays;
};

export const hours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export const half_hours = [
  "00:30",
  "01:30",
  "02:30",
  "03:30",
  "04:30",
  "05:30",
  "06:30",
  "07:30",
  "08:30",
  "09:30",
  "10:30",
  "11:30",
  "12:30",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "17:30",
  "18:30",
  "19:30",
  "20:30",
  "21:30",
  "22:30",
  "23:30",
]

export const price_list = [
  { hour: "3 soat", duration: 3, price: 0 },
  { hour: "6 soat", duration: 6, price: 0 },
  { hour: "12 soat", duration: 12, price: 0 },
  { hour: "24 soat", duration: 24, price: 0 },
  { hour: "Tungi Tarif(22:00-10:00)", duration: 12, price: 0, nightOnly: true },
];
