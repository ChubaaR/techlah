import {useState} from 'react';import {Link} from 'react-router-dom';import {ChevronLeft,ChevronRight} from 'lucide-react';import {useAsync} from '../hooks/useAsync';import {featuredPublished,latestPublished} from '../services/articleService';import {Card,Img,Meta,Tag} from '../components/news/NewsCard';import {Compact} from '../components/news/CompactNewsItem';import {Heading} from '../components/news/SectionHeading';import {Msg} from '../components/ui/LoadingState';import {formatDate} from '../utils/formatDate';
const creators=[['Mira Tan'],['Aiman Yusof'],['Sam Ortiz'],['Lena Wu']];
export default function HomePage(){
const{data,loading,error}=useAsync(async()=>{const[f,l]=await Promise.all([featuredPublished(5),latestPublished(30)]);return{f,l}},[]);const p=data?.l??[];const feat=data?.f??[];const hero=feat.length?feat:p;const[i,setI]=useState(0);
if(error)return<Msg error={error}/>;if(loading&&!data)return<Msg loading/>;if(!p.length)return<p className="py-20 text-center text-sm text-neutral-500">No published articles yet. Publish one from the admin dashboard.</p>;
const h=hero[i%hero.length];const rest=p.filter(a=>a.id!==h.id);
const step=(d:number)=>setI((i+d+hero.length)%hero.length);
return<>
<section className="grid gap-4 lg:grid-cols-[1fr_230px]"><div className="relative">
<img src={h.image} alt={h.alt} className="h-64 w-full rounded-lg sm:h-[340px] sm:pl-0"/>
<div className="relative -mt-8 mx-3 rounded-lg bg-white/95 p-4 shadow sm:absolute sm:left-0 sm:top-12 sm:m-0 sm:w-[300px] sm:-translate-x-4 sm:bg-neutral-50/95">
<p className="text-xs"><b>{h.publisher}</b> • {h.author}</p><h1 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl">{h.title}</h1>
<p className="mt-2 text-[11px] text-neutral-500">{h.summary} <Link className="font-semibold text-ink" to={'/article/'+h.slug}>Read More</Link></p>
<div className="mt-3 flex items-center justify-between text-[10px] text-neutral-500"><span>{formatDate(h.date)}</span><span className="flex gap-2"><button aria-label="Previous story" onClick={()=>step(-1)}><ChevronLeft size={14}/></button><button aria-label="Next story" onClick={()=>step(1)}><ChevronRight size={14}/></button></span></div></div></div>
<div className="space-y-3">{rest.slice(0,4).map(a=><Compact key={a.id} a={a}/>)}</div></section>
<section className="mt-12"><Heading t="Latest News" to="/search"/><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{rest.slice(4,7).map(a=><Card key={a.id} a={a}/>)}</div></section>
<section className="mt-12"><Heading t="Must Read" to="/search"/>{rest[7]&&<div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]"><div><Img a={rest[7]} cls="aspect-[2/1]"/><div className="mt-2 space-y-1"><Meta a={rest[7]}/><Link to={'/article/'+rest[7].slug} className="block text-lg font-semibold">{rest[7].title}</Link><p className="text-xs text-neutral-500">{rest[7].summary}</p><Tag a={rest[7]}/></div></div>
<div className="space-y-4">{rest.slice(8,11).map(a=><Compact key={a.id} a={a}/>)}</div></div>}</section>
<section className="mt-12"><Heading t="Weekly Highlight" to="/search"/><div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{rest.slice(11,15).map(a=><Card key={a.id} a={a} ratio="aspect-[4/5]"/>)}</div></section>
<section className="mt-12"><Heading t="Top Creator"/><div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{creators.map(([n])=><Link key={n} to={'/search?q='+encodeURIComponent(n)} className="flex items-center gap-3"><img alt="" src={'https://i.pravatar.cc/80?u='+n} className="h-10 w-10 rounded-full"/><span className="text-xs"><b className="block">{n}</b><span className="text-coral">Tech Lah</span></span></Link>)}</div></section></>}
