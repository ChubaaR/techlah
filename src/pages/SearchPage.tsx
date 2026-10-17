import {useSearchParams} from 'react-router-dom';import {useAsync} from '../hooks/useAsync';import {searchPublished} from '../services/articleService';import {Card} from '../components/news/NewsCard';import {Heading} from '../components/news/SectionHeading';import {Msg} from '../components/ui/LoadingState';
export function SearchPage(){const[p]=useSearchParams();const q=p.get('q')??'';const{data,loading,error}=useAsync(()=>searchPublished(q),[q]);
if(error)return<Msg error={error}/>;if(!data)return<Msg loading/>;
return<><Heading t={q?`Results for “${q}”`:'All stories'}/>{!data.length?<p className="text-sm text-neutral-500">No matching stories.</p>:<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{data.map(a=><Card key={a.id} a={a}/>)}</div>}</>}
