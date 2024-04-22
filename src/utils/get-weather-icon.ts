const iconTable = {
  "01": "01d",
  "02": "02d",
  "03": "03d",
  "04": "03d",
  "09": "09d",
  "10": "09d",
  "11": "11d",
  "13": "09d",
  "50": "09d",
};

export default function getWeatherIcon(iconStr: string): string {
  // @ts-ignore
  return iconTable[iconStr.substring(0, 2)];
}
