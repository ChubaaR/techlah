import {categories} from '../data/categories';
export const navItems=[{to:'/',l:'Home'},...categories.filter(c=>['ai-tech','startups','business','cybersecurity','tech-culture'].includes(c.slug)).map(c=>({to:'/category/'+c.slug,l:c.name})),{to:'/games',l:'Games'},{to:'/learning',l:'Learning'},{to:'/careers',l:'Careers'},{to:'/submit-story',l:'Submit a Story'}];
