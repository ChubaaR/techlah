import {useParams} from 'react-router-dom';import {catName} from '../data/categories';import {useAsync} from '../hooks/useAsync';import {byCategory,bySlug} from '../services/articleService';import {Card,Meta,Tag} from '../components/news/NewsCard';import {Msg} from '../components/ui/LoadingState';import {NotFound} from './NotFoundPage';
export function ArticlePage(){const{slug}=useParams();const{data:a,loading,error}=useAsync(()=>bySlug(slug??''),[slug]);
const{data:rel=[]}=useAsync(()=>a?byCategory(a.category,4).then(l=>l.filter(x=>x.id!==a.id).slice(0,3)):Promise.resolve([]),[a?.id]);
if(error)return<Msg error={error}/>;if(loading&&a===undefined)return<Msg loading/>;if(!a)return<NotFound/>;
return<article className="mx-auto max-w-2xl"><p className="text-xs text-coral">{catName(a.category)}</p><h1 className="my-2 text-3xl font-semibold leading-tight">{a.title}</h1><Meta a={a}/><Tag a={a}/>
{a.image&&<img src={a.image} alt={a.alt} className="my-4 aspect-[3/2] w-full rounded-lg"/>}<p className="mb-4 font-medium">{a.summary}</p>
{a.content.split('\n\n').map((t,i)=><p key={i} className="mb-3 text-sm leading-relaxed text-neutral-700">{t}</p>)}
{a.url&&<a href={a.url} rel="noopener noreferrer" target="_blank" className="text-sm text-coral">Original source</a>}
{!!rel.length&&<><h2 className="mb-3 mt-10 text-lg font-medium">Related</h2><div className="grid gap-4 sm:grid-cols-3">{rel.map(r=><Card key={r.id} a={r}/>)}</div></>}</article>}
