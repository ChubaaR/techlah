import {FormEvent,useCallback,useEffect,useState} from 'react';import {msg} from '../../utils/helpers';import * as auth from '../../services/authService';import AdminDashboard from './AdminDashboard';import {cls} from './adminShared';
export default function AdminPage(){
const[st,setSt]=useState<'loading'|'out'|'denied'|'ok'>('loading');const[role,setRole]=useState<auth.AccessRole|null>(null);const[userId,setUserId]=useState('');const[email,setEmail]=useState('');const[pw,setPw]=useState('');const[err,setErr]=useState('');
const check=useCallback(async()=>{try{const s=await auth.getSession();if(!s){setRole(null);setUserId('');setSt(p=>{if(p==='ok')setErr('Your session expired. Sign in again.');return'out'});return}setErr('');setUserId(s.user.id);const r=await auth.getRole();setRole(r);setSt(r?'ok':'denied')}catch(e){setErr(msg(e));setSt('out')}},[]);
useEffect(()=>{check();try{return auth.onChange(check)}catch{return undefined}},[check]);
const login=async(e:FormEvent)=>{e.preventDefault();setErr('');try{await auth.signIn(email,pw);setPw('');await check()}catch(x){setErr(msg(x))}};
if(st==='loading')return<p role="status" className="py-10 text-center text-sm">Checking session…</p>;
if(st==='denied')return<div className="mx-auto max-w-md py-10 text-sm"><p role="alert" className="rounded bg-red-50 p-3 text-red-700">This account does not have editor or admin access.</p><button className="mt-3 border px-4 py-2" onClick={()=>auth.signOut()}>Sign out</button></div>;
if(st==='out')return<form onSubmit={login} className="mx-auto max-w-sm space-y-3 py-10 text-sm"><h1 className="text-xl font-semibold">Editorial sign-in</h1>
{err&&<p role="alert" className="rounded bg-red-50 p-3 text-red-700">{err}</p>}
<label className="block">Email<input type="email" required autoComplete="username" className={cls} value={email} onChange={e=>setEmail(e.target.value)}/></label>
<label className="block">Password<input type="password" required autoComplete="current-password" className={cls} value={pw} onChange={e=>setPw(e.target.value)}/></label><button className="bg-ink px-4 py-2 text-white">Sign in</button></form>;
return<AdminDashboard role={role!} userId={userId}/>}
