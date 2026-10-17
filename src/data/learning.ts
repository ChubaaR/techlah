export interface Resource{title:string;provider:string;desc:string;topic:string;url:string;free:boolean}
export const resources:Resource[]=[
{title:'freeCodeCamp curriculum',provider:'freeCodeCamp',desc:'Project-based lessons in web development and programming.',topic:'Web development',url:'https://www.freecodecamp.org',free:true},
{title:'MDN Learn Web Development',provider:'Mozilla',desc:'Reference-quality tutorials for HTML, CSS and JavaScript.',topic:'Web development',url:'https://developer.mozilla.org/en-US/docs/Learn',free:true},
{title:'CS50x',provider:'Harvard University',desc:'Introduction to computer science and programming.',topic:'Programming',url:'https://cs50.harvard.edu/x',free:true},
{title:'The Odin Project',provider:'The Odin Project',desc:'Open-source full-stack web development path.',topic:'Programming',url:'https://www.theodinproject.com',free:true},
{title:'OverTheWire wargames',provider:'OverTheWire',desc:'Learn security concepts by playing hands-on challenges.',topic:'Cybersecurity',url:'https://overthewire.org/wargames',free:true},
{title:'OWASP Top Ten',provider:'OWASP',desc:'The most critical web application security risks.',topic:'Cybersecurity',url:'https://owasp.org/www-project-top-ten',free:true},
{title:'Practical Deep Learning for Coders',provider:'fast.ai',desc:'A hands-on course on machine learning.',topic:'AI',url:'https://course.fast.ai',free:true},
{title:'TryHackMe',provider:'TryHackMe',desc:'Guided cybersecurity rooms and labs. Check the site for free vs paid content.',topic:'Cybersecurity',url:'https://tryhackme.com',free:false}];
