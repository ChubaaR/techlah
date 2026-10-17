export const msg=(e:unknown)=>e instanceof Error?e.message:'Something went wrong.';
export const isHttpUrl=(s:string)=>{try{return/^https?:$/.test(new URL(s).protocol)}catch{return false}};
export const ext={target:'_blank',rel:'noopener noreferrer'};
