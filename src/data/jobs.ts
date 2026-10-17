export const CWC_JOBS_URL:string=import.meta.env.VITE_CWC_JOBS_URL||'';
export interface Job{id:string;title:string;company:string;location:string;type:'Internship'|'Graduate programme'|'Fresh graduate'|'Entry-level'|'Hackathon';url?:string}
export const jobs:Job[]=[];
