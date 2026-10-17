import {Link} from 'react-router-dom';import {useAsync} from '../../hooks/useAsync';import {latestPublished} from '../../services/articleService';
export default function BreakingNewsTicker(){
const{data:published=[]}=useAsync(()=>latestPublished(3),[]);
return(<div className="mx-4 mt-3 flex items-center gap-3 overflow-x-auto whitespace-nowrap bg-neutral-100 px-3 py-2 text-[11px] sm:mx-8">
<span className="font-medium text-coral">Trending:</span>{published.slice(0,3).map(a=><span key={a.id} className="flex items-center gap-3"><Link to={'/article/'+a.slug} className="text-neutral-600 hover:underline">{a.title}</Link><span className="text-coral">•</span></span>)}</div>)}
