import React from 'react';
import type { PageId } from '../types';

interface StoriesProps {
  onNavigate: (page: PageId) => void;
}

const STORIES_DATA = [
  {
    title: "The Login Loop Nightmare",
    quote: "I built the whole app in Bubble. Everything worked until deployment. Login kept looping and I had no idea how to debug it.",
    solution: "We rewired the auth flow, fixed token persistence, and deployed a stable version in under 48 hours."
  },
  {
    title: "Stripe Refused To Connect",
    quote: "Stripe kept rejecting my integration. Docs were useless and the plugin didn't match Stripe's API anymore.",
    solution: "We rebuilt the payment flow, updated API calls, and pushed a working checkout to production."
  },
  {
    title: "Everything Broke In Production",
    quote: "My app ran perfectly in the editor. Then I deployed and half the pages stopped loading with no errors.",
    solution: "We diagnosed environment differences, fixed state hydration, and deployed a stable build."
  },
  {
    title: "AI Builders Gave Me 80%... Then Quit",
    quote: "I used an AI builder and got far, fast. But once I added auth and syncing, everything broke.",
    solution: "We rebuilt the broken components, stabilized the data model, and shipped the app in 2 days."
  },
  {
    title: "My Developer Vanished Mid-Project",
    quote: "Dev got it 70% done then disappeared. No docs. No version control. I was stuck.",
    solution: "We recovered the code, rebuilt broken pieces, set up Git, and shipped the final app."
  },
  {
    title: "The Bubble → Production Disaster",
    quote: "Bubble gave me silent failures every time I tried deploying. No logs, no guidance.",
    solution: "We rebuilt workflows, reduced API load, fixed conditionals, and stabilized the app."
  },
  {
    title: "I Couldn't Tell What Was Broken",
    quote: "I didn't need new features. I needed someone to finish it.",
    solution: "We diagnosed the issues, fixed the root cause, and provided a full summary of what was repaired."
  }
];

const Stories: React.FC<StoriesProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 pb-24 bg-[#fafafa]">
      <section className="px-6 max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-[44px] font-extrabold text-[#1e293b] mb-6 tracking-tight">
          Founder Stories
        </h1>
        <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
          Real problems founders faced — and how FINISH shipped their apps.
        </p>
      </section>

      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {STORIES_DATA.map((story, i) => (
            <div 
              key={i} 
              className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col"
            >
              <h3 className="text-[22px] font-bold text-slate-900 mb-6">{story.title}</h3>
              
              <div className="pl-6 border-l-[3px] border-[#22c55e] mb-8">
                <p className="text-[#475569] italic text-lg leading-relaxed">
                  “{story.quote}”
                </p>
              </div>
              
              <div className="mt-auto">
                <p className="text-[#1e293b] text-[15px] leading-relaxed">
                  <span className="font-extrabold uppercase text-xs tracking-wider mr-2">FINISH solution:</span>
                  <span className="text-[#64748b]">{story.solution}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section matching site tone */}
      <section className="mt-24 px-6 max-w-7xl mx-auto text-center">
        <button 
          onClick={() => onNavigate('diagnostic')}
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-green-100"
        >
          Fix My App
        </button>
      </section>
    </div>
  );
};

export default Stories;