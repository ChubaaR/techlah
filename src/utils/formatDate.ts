export const formatDate=(d:string)=>new Date(d).toLocaleDateString('en-MY',{day:'numeric',month:'short',year:'numeric'});
