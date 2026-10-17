import {Link,useLocation} from 'react-router-dom';
const L:Record<string,string>={'/terms':'Terms of Service','/privacy':'Privacy Policy','/cookies':'Cookie Policy'};
export function LegalPage(){const t=L[useLocation().pathname];return<div className="mx-auto max-w-xl text-sm"><h1 className="text-2xl font-semibold">{t}</h1><p className="mt-3 rounded bg-amber-50 p-3">Placeholder page. Replace with policy text reviewed by a qualified professional before launch.</p><Link to="/" className="mt-4 inline-block text-coral">Back home</Link></div>}
