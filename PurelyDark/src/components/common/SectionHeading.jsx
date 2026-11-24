import Reveal from "./Reveal";
import { classNames } from "../../utils/format";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  light = false,
}) {
  const alignCls =
    align === "center"
      ? "items-center text-center mx-auto"
      : align === "right"
      ? "items-end text-right ml-auto"
      : "items-start text-left";
  return (
    <Reveal
      className={classNames(
        "flex flex-col gap-4 max-w-2xl",
        alignCls,
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="gold-rule" />
          {eyebrow}
        </span>
      )}
      <h2 className={light ? "heading-lg" : "heading-lg"}>{title}</h2>
      {subtitle && <p className="lede">{subtitle}</p>}
    </Reveal>
  );
}
