import {Article} from '../../types/article';
export const cls='mt-1 w-full border p-2';
export const loc=(iso:string)=>{const d=new Date(iso);return new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,16)};
export const blank=():Article=>({id:'',slug:'',title:'',summary:'',content:'',category:'ai-tech',image:'',alt:'',author:'',publisher:'Tech Lah',date:'',publishedAt:null,status:'draft',featured:false,sponsored:false,minutes:1,url:'',tags:[]});

