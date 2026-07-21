interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-16">
      {subtitle && (
        <p className="text-violet-400 uppercase tracking-[0.3em] text-sm mb-4">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl md:text-5xl font-bold">
        {title}
      </h2>
    </div>
  );
}