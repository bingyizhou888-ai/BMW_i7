export default function SectionHeading({
  eyebrow,
  title,
  muted,
  className = "",
}: {
  eyebrow: string;
  title: string;
  muted?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-2 font-mono text-xs text-neutral-400">
        <span className="h-1 w-1 rounded-full bg-neutral-400" />
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-xl text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl">
        {title}
        {muted && <span className="text-neutral-500">{muted}</span>}
      </h2>
    </div>
  );
}
