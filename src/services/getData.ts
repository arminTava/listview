import { PixsyData } from "@/interfaces/PixsyData";


export async function getData(url:string)  {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

let mainData: PixsyData[]
export async function getMainData(isRefetch =false) {
  if (mainData && !isRefetch) return mainData;
  const data = await getData('https://static.pixsy.io/sample/photos.json');
  mainData = data['photos'];
  return mainData;
}

