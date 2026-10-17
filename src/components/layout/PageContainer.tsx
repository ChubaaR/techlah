import {Outlet} from 'react-router-dom';import Header from './Header';import Footer from './Footer';import BreakingNewsTicker from '../news/BreakingNewsTicker';
export default function PageContainer(){return<div className="mx-auto my-0 max-w-[1100px] bg-white shadow-sm sm:my-6"><Header/><BreakingNewsTicker/><main className="px-4 pb-10 pt-4 sm:px-8"><Outlet/></main><Footer/></div>}
