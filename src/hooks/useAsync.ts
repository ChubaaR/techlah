import {DependencyList,useEffect,useState} from 'react';
import {msg} from '../utils/helpers';
/** Runs an async loader; keeps previous data while reloading; ignores stale responses. */
export function useAsync<T>(fn:()=>Promise<T>,deps:DependencyList){
  const[s,set]=useState<{data:T|undefined;loading:boolean;error:string|null}>({data:undefined,loading:true,error:null});
  useEffect(()=>{let live=true;set(p=>({...p,loading:true,error:null}));
    fn().then(data=>live&&set({data,loading:false,error:null}),e=>live&&set({data:undefined,loading:false,error:msg(e)}));
    return()=>{live=false}},deps);// eslint-disable-line react-hooks/exhaustive-deps
  return s}
