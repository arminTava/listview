import { forbiddenUrls } from "@/constant/urls";

export function checkPermission(str: string) {
  for (const i of forbiddenUrls) {
    if (str.includes(i)) return false;
  }
  return true;
}