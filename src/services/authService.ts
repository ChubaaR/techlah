import {db} from '../lib/supabase';
export type AccessRole='admin'|'editor';
export const signIn=async(email:string,password:string)=>{const{error}=await db().auth.signInWithPassword({email,password});if(error)throw new Error(error.message)};
export const signOut=async()=>{await db().auth.signOut()};
export const getSession=async()=>{const{data,error}=await db().auth.getSession();if(error)throw new Error(error.message);return data.session};
/** Database allowlists grant access; a valid login alone grants no dashboard role. */
export const getRole=async():Promise<AccessRole|null>=>{
  const{data:admin,error:adminError}=await db().rpc('is_admin');
  if(adminError)throw new Error(adminError.message);
  if(admin===true)return'admin';
  const{data:editor,error:editorError}=await db().rpc('is_editor');
  if(editorError)throw new Error(editorError.message);
  return editor===true?'editor':null;
};
export const onChange=(cb:()=>void)=>{const{data}=db().auth.onAuthStateChange(()=>cb());return()=>data.subscription.unsubscribe()};
