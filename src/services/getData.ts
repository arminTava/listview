import { PixsyData } from "@/interfaces/PixsyData";

let mainData: PixsyData[]

export async function getData(url:string)  {
  console.log("Call getData");
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

