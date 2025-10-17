import { TypographyH1 } from "../typography/TypoGraphyH1";
import { TypographyP } from "../typography/TypoGraphyP";

export default function Introduction({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`
              space-y-6 transition-all duration-1000
              ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
            `}
    >
      <div className="space-y-2">
        <div className="h-1 w-12 bg-foreground" />
        <TypographyH1 className="text-balance font-sans text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          About Me
        </TypographyH1>
      </div>
      <TypographyP className="max-w-3xl text-balance font-sans text-2xl font-medium leading-tight tracking-tight text-white sm:text-xl md:text-xl lg:text-2xl">
        I'm a student passionate about technology and software development, currently exploring web
        development to build meaningful and creative projects.
      </TypographyP>
    </div>
  );
}
