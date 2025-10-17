import { TechBadge } from "./TechBadge";

interface TechCategoryProps {
  label: string;
  techs: string[];
  isVisible: boolean;
  color: string;
  textColor?: string;
  font?: string;
  fontWeight?: string;
}

export function TechCategory({
  label,
  techs,
  isVisible,
  color,
  textColor = "",
  font = "",
  fontWeight = "",
}: TechCategoryProps) {
  return (
    <div className="group space-y-4">
      <div className={`flex items-center gap-3`}>
        <div className={`h-px w-8 transition-all group-hover:w-12 ${color}`} />
        <p className={`font-mono text-sm font-medium uppercase tracking-widest ${textColor}`}>
          {label}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {techs.map((tech, index) => (
          <TechBadge
            key={tech}
            tech={tech}
            delay={index * 75}
            isVisible={isVisible}
            color={color}
            textColor={textColor}
          />
        ))}
      </div>
    </div>
  );
}
