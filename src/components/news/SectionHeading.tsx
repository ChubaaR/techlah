import {Link} from 'react-router-dom';
export const Heading=({t,to}:{t:string;to?:string})=><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-medium">{t}</h2>{to&&<Link to={to} className="text-xs text-coral">See all</Link>}</div>;
