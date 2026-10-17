import {db} from '../lib/supabase';
export const signIn=async(email:string,password:string)=>{const{error}=await db().auth.signInWithPassword({email,password});if(error)throw new Error(error.message)};
export const signOut=async()=>{await db().auth.signOut()};
export const getSession=async()=>{const{data,error}=await db().auth.getSession();if(error)throw new Error(error.message);return data.session};
/** Asks the database (is_admin() checks the admin_users allowlist). Login alone grants nothing. */
export const isAdmin=async()=>{const{data,error}=await db().rpc('is_admin');if(error)throw new Error(error.message);return data===true};
export const onChange=(cb:()=>void)=>{const{data}=db().auth.onAuthStateChange(()=>cb());return()=>data.subscription.unsubscribe()};
