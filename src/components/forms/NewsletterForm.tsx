import {useState} from 'react';
export default function NewsletterForm(){
const[mail,setMail]=useState('');const[msg,setMsg]=useState('');
return(<><form className="mt-3 flex" noValidate onSubmit={e=>{e.preventDefault();setMsg(/^\S+@\S+\.\S+$/.test(mail)?'Demo only: no newsletter service is connected, nothing was saved.':'Enter a valid email address.')}}>
<input value={mail} onChange={e=>setMail(e.target.value)} aria-label="Email" placeholder="Your email" className="w-full border bg-white px-2 py-1.5"/><button className="bg-coral px-3 text-white">Subscribe</button></form><p role="status" className="mt-1">{msg}</p></>)}
