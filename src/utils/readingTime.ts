export const readTime=(t:string)=>Math.max(1,Math.round(t.trim().split(/\s+/).filter(Boolean).length/200));
