import {FormEvent,useState} from 'react';import {categories as CATS} from '../../data/categories';
export function StorySubmissionForm(){const[f,setF]=useState({title:'',category:'ai-tech',content:'',name:'',anon:false,email:'',own:false});const[err,setErr]=useState<string[]>([]);const[ok,setOk]=useState(false);
const set=(k:string,v:string|boolean)=>setF({...f,[k]:v});
const go=(e:FormEvent)=>{e.preventDefault();const m=[];if(!f.title.trim())m.push('Story title is required.');if(f.content.trim().length<50)m.push('Story content needs at least 50 characters.');if(!f.anon&&!f.name.trim())m.push('Enter a display name or choose anonymous.');if(!/^\S+@\S+\.\S+$/.test(f.email))m.push('Enter a valid contact email.');if(!f.own)m.push('Confirm you own or have permission to submit this content.');setErr(m);setOk(!m.length)};
const cls='mt-1 w-full border p-2';
if(ok)return<div className="mx-auto max-w-xl text-sm" role="status"><h1 className="text-xl font-semibold">Form checked</h1><p className="mt-2">Demo only: submissions aren't stored or sent until a backend is connected. Nothing was saved.</p></div>;
return<form noValidate onSubmit={go} className="mx-auto max-w-xl space-y-3 text-sm"><h1 className="text-2xl font-semibold">Submit a story</h1>
<p className="text-neutral-500">Submitting does not guarantee publication or payment. Your email is never shown publicly. This form is a demo: nothing is stored or sent yet.</p>
{err.length>0&&<ul role="alert" className="rounded bg-red-50 p-2 text-red-700">{err.map(x=><li key={x}>{x}</li>)}</ul>}
<label className="block">Story title<input className={cls} value={f.title} onChange={e=>set('title',e.target.value)}/></label>
<label className="block">Category<select className={cls} value={f.category} onChange={e=>set('category',e.target.value)}>{CATS.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
<label className="block">Story<textarea rows={8} className={cls} value={f.content} onChange={e=>set('content',e.target.value)}/></label>
<label className="block">Display name<input className={cls} disabled={f.anon} value={f.name} onChange={e=>set('name',e.target.value)}/></label>
<label className="block"><input type="checkbox" checked={f.anon} onChange={e=>set('anon',e.target.checked)}/> Publish anonymously</label>
<label className="block">Contact email (private)<input type="email" className={cls} value={f.email} onChange={e=>set('email',e.target.value)}/></label>
<label className="block"><input type="checkbox" checked={f.own} onChange={e=>set('own',e.target.checked)}/> I own this content or have permission to submit it.</label>
<button className="bg-coral px-4 py-2 text-white">Check submission</button></form>}
