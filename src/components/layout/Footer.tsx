import {Link} from 'react-router-dom';import NewsletterForm from '../forms/NewsletterForm';
export default function Footer(){return(<footer className="bg-neutral-100 px-4 py-8 text-xs text-neutral-600 sm:px-8"><div className="grid gap-8 md:grid-cols-[1.5fr_repeat(4,1fr)]">
<div><b className="text-base text-ink">TechPop</b><p className="mt-2 max-w-[220px]">Technology news, learning and careers.</p>
<NewsletterForm/></div>
{[['Sections',[['AI & Tech','/category/ai-tech'],['Startups','/category/startups'],['Cybersecurity','/category/cybersecurity']]],['Explore',[['Games','/games'],['Learning','/learning'],['Careers','/careers'],['Submit a Story','/submit-story']]],['Company',[['Admin','/admin']]],['Social',[['Not configured','#']]]].map(([h,ls])=>
<div key={h as string}><b className="text-ink">{h as string}</b><ul className="mt-2 space-y-2">{(ls as string[][]).map(([l,t])=><li key={l}><Link to={t}>{l}</Link></li>)}</ul></div>)}</div>
<p className="mt-8 flex flex-wrap gap-4 border-t pt-4"><span>© 2026 TechPop. Demo content is fictional.</span><Link to="/terms">Terms of Service</Link><Link to="/privacy">Privacy Policy</Link><Link to="/cookies">Cookie Policy</Link></p></footer>)}
