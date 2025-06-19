import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Looking for advisory? Or my secret pasta recipe? Get in touch with me.",
};

export default function ContactPage() {
  return (
    <div className="my-12 lg:my-24">
      <div className="container">
        <div className="pb-6 border-b border-gray-100">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
              Contact Me
            </h1>
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                Looking for advisory? Or my secret pasta recipe? Get in touch with me.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <iframe 
              data-tally-src="https://tally.so/embed/nrrkgN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
              loading="lazy" 
              width="100%" 
              height={1213} 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0} 
              title="Guillaume Odier - Advisory"
            />
            <script 
              dangerouslySetInnerHTML={{
                __html: `
                  var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
                `
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 