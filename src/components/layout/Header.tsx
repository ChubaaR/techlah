import {useState,FormEvent} from 'react';
import {Link,NavLink,useNavigate} from 'react-router-dom';
import {Search,Menu,X} from 'lucide-react';
import {navItems} from '../../app/routeConfig';

export default function Header(){
const[open,setOpen]=useState(false);const[q,setQ]=useState<string|null>(null);const go=useNavigate();
const submit=(e:FormEvent)=>{e.preventDefault();if(q?.trim())go('/search?q='+encodeURIComponent(q));setOpen(false)};
return(<header className="bg-ink text-white"><div className="flex items-center gap-6 px-4 py-3 sm:px-8">
<Link to="/" className="text-lg font-bold">Coding News</Link>
<nav aria-label="Main" className="hidden flex-1 gap-4 text-[11px] text-neutral-300 lg:flex">{navItems.map(n=><NavLink key={n.to} to={n.to} end className={({isActive})=>isActive?'text-white border-b border-coral':'hover:text-white'}>{n.l}</NavLink>)}</nav>
<div className="ml-auto flex items-center gap-3">{q!==null&&<form onSubmit={submit}><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" aria-label="Search" className="w-32 rounded bg-neutral-800 px-2 py-1 text-xs sm:w-48"/></form>}
<button aria-label="Search" onClick={()=>setQ(q===null?'':null)}><Search size={16}/></button>
<button aria-label="Menu" className="lg:hidden" onClick={()=>setOpen(!open)}>{open?<X size={18}/>:<Menu size={18}/>}</button></div></div>
{open&&<nav className="flex flex-col gap-3 border-t border-neutral-700 px-4 py-3 text-sm lg:hidden">{navItems.map(n=><Link key={n.to} to={n.to} onClick={()=>setOpen(false)}>{n.l}</Link>)}</nav>}</header>)}
