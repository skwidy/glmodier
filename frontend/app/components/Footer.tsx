import Image from "next/image";
import { Icon } from "./icons/Icon";

export default function Footer() {
  return (
    <footer className="bg-gray-50 relative">
      <div className="absolute inset-0 bg-[url(/images/tile-grid-black.png)] bg-size-[17px] opacity-20 bg-position-[0_1]" />
      <div className="container relative">
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3 className="mb-10 text-center text-4xl font-mono leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-2xl">
            🇫🇷 French. ✈️ Nomad. 💻 Entrepreneur.
          </h3>
          <div className="flex flex-col gap-3 items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
            <button
              data-tally-open="nrrkgN"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              className="rounded-full flex gap-2 whitespace-nowrap items-center bg-black hover:bg-blue focus:bg-blue py-3 px-6 text-white transition-colors duration-200"
            >
              Contact Me
            </button>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/guillaumeodier"
                className="flex items-center gap-2 hover:underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="linkedin" className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href="https://instagram.com/glmodier"
                className="flex items-center gap-2 hover:underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="instagram" className="w-5 h-5" />
                Instagram
              </a>
              <a
                href="https://github.com/skwidy"
                className="flex items-center gap-2 hover:underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Image
          src="/images/footer-bg.jpeg"
          width={1920}
          height={1080}
          alt="Footer background"
          className="w-full h-auto"
        />
      </div>
    </footer>
  );
}
