import {Category} from '../types/category';
export const categories:Category[]=[
{slug:'ai-tech',name:'AI & Tech',intro:'Models, products and the companies building them.'},
{slug:'startups',name:'Startups',intro:'Funding rounds and founders, with a Malaysian focus.'},
{slug:'business',name:'Business',intro:'Deals, earnings and industry moves.'},
{slug:'cybersecurity',name:'Cybersecurity',intro:'Vulnerabilities, breaches and how to stay safe.'},
{slug:'tech-culture',name:'Tech Culture',intro:'Internet life, controversies and stories worth a read.'},
{slug:'programming',name:'Programming',intro:'Languages, frameworks and developer tools.'},
{slug:'gaming',name:'Gaming',intro:'Games and the industry behind them.'},
{slug:'careers',name:'Careers',intro:'Internships, graduate programmes and entry-level roles.'}];
export const catName=(s:string)=>categories.find(c=>c.slug===s)?.name??s;
