
export interface PixsyData{
  id: string; 
  description: string; 
  url: string;
  link: string; 
  topics: string[];
  user: string; 
}

export interface Topic {
  [key:string] : TopicData;
}
export interface TopicData {
  count:number;
  links: string[]
}