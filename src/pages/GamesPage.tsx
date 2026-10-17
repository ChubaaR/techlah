import {useState} from 'react';
const Q=[['Subject: Your parcel is held. Pay RM2.50 at pos-my-redelivery.co/pay to release it.',true,'Unexpected small fees via unfamiliar domains are a classic scam.'],
['An email from your bank’s address, asking you to read your OTP aloud over the phone.',true,'Banks never ask for your OTP.'],
['A GitHub notification for a pull request on your repo, linking to github.com.',false,'Matches a real account activity and the official domain.'],
['“You won a laptop! Reply with your IC number to claim.”',true,'Prizes you never entered for are bait for personal data.'],
['Your employer’s IT team announces a scheduled password policy update on the intranet you already use.',false,'Expected, on a known channel, no urgent link.']] as const;
export function GamesPage(){const[i,setI]=useState(0);const[s,setS]=useState(0);const[fb,setFb]=useState<null|boolean>(null);
const done=i>=Q.length;const ans=(g:boolean)=>{const ok=g===Q[i][1];setFb(ok);if(ok)setS(s+1)};
return<div className="mx-auto max-w-xl"><h1 className="text-2xl font-semibold">Scam or Legit?</h1><p className="mb-4 text-sm text-neutral-500">Fictional scenarios. Spot the scam.</p>
{done?<div><p className="text-lg">Score: {s}/{Q.length}</p><button className="mt-3 bg-coral px-4 py-2 text-white" onClick={()=>{setI(0);setS(0);setFb(null)}}>Play Again</button></div>:
<div className="rounded-lg bg-neutral-100 p-4"><p className="text-xs text-neutral-500">Round {i+1} of {Q.length} • Score {s}</p><p className="my-3 text-sm">{Q[i][0]}</p>
{fb===null?<div className="flex gap-3"><button className="bg-ink px-4 py-3 text-white" onClick={()=>ans(true)}>Scam</button><button className="bg-white px-4 py-3 border" onClick={()=>ans(false)}>Legit</button></div>:
<div role="status"><p className="font-semibold">{fb?'Correct.':'Not quite.'} <span className="font-normal">{Q[i][2]}</span></p><button className="mt-3 bg-coral px-4 py-2 text-white" onClick={()=>{setI(i+1);setFb(null)}}>Next</button></div>}</div>}</div>}
