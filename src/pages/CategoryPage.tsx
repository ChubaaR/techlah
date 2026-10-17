import {useState} from 'react';import {useParams} from 'react-router-dom';import {categories} from '../data/categories';import {useAsync} from '../hooks/useAsync';import {byCategory} from '../services/articleService';import {Card} from '../components/news/NewsCard';import {Msg} from '../components/ui/LoadingState';import {NotFound} from './NotFoundPage';
export function CategoryPage(){const{slug}=useParams();const c=categories.find(x=>x.slug===slug);const[n,setN]=useState(6);const[sort,setSort]=useState<'new'|'old'>('new');
const{data,loading,error}=useAsync(()=>c?byCategory(c.slug,n+1,sort==='old'):Promise.resolve([]),[slug,n,sort]);
if(!c)return<NotFound/>;if(error)return<Msg error={error}/>;if(!data)return<Msg loading/>;const l=data.slice(0,n);
return<><h1 className="text-2xl font-semibold">{c.name}</h1><p className="mb-4 text-sm text-neutral-500">{c.intro}</p>
{!l.length?<p className="py-10 text-sm text-neutral-500">No published stories here yet.</p>:<>
<label className="mb-3 block text-xs">Sort <select value={sort} onChange={e=>{setN(6);setSort(e.target.value as 'new'|'old')}} className="border p-1"><option value="new">Newest first</option><option value="old">Oldest first</option></select></label>
<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{l.map(a=><Card key={a.id} a={a}/>)}</div>
{data.length>n&&<button disabled={loading} onClick={()=>setN(n+6)} className="mt-6 bg-ink px-4 py-2 text-xs text-white">{loading?'Loading…':'Load more'}</button>}</>}</>}
