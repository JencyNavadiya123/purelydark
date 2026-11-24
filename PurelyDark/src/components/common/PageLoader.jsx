export default function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-28">
      <div className="flex flex-col items-center gap-5">
        <span className="relative grid h-14 w-14 place-items-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
          <span className="font-serif text-lg font-black text-gold">P</span>
        </span>
        <span className="text-xs uppercase tracking-luxe text-cream/50">Loading</span>
      </div>
    </div>
  );
}
