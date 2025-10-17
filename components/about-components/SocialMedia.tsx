import { TypographyP } from "../typography/TypoGraphyP";

export default function SocialMedia() {
  return (
    <div className="border-l-2 border-foreground/20 pl-6">
      <TypographyP className="max-w-2xl text-balance font-sans text-l font-normal leading-tight tracking-tight text-white sm:text-lg md:text-lg lg:text-xl">
        You can connect with me on{" "}
        <a
          href="https://www.facebook.com/carlo.espina.7906"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0866ff] font-bold relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
        >
          Facebook
        </a>{" "}
        to see more of my journey.
      </TypographyP>
    </div>
  );
}

// Whether you have a project in mind, want to collaborate, or just want to say hello, feel free to get in touch. I’m always open to new ideas and opportunities to create something impactful together.
