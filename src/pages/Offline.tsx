const Offline = () => {
  return (
    <main className="min-h-[100svh] bg-foreground text-primary-foreground flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-primary-foreground/50 mb-6">
        AI Nupes
      </p>
      <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] tracking-tight mb-6">
        THIS STORE IS
        <br />
        NO LONGER AVAILABLE
      </h1>
      <p className="text-sm md:text-base text-primary-foreground/60 max-w-md leading-relaxed mb-10">
        The AI Collection has been taken offline. All orders already placed will still be
        fulfilled · you'll receive tracking by email.
      </p>
      <a
        href="mailto:info@alphaiotamerch.com"
        className="border border-primary-foreground/30 px-9 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-foreground hover:text-foreground transition-colors"
      >
        Contact Us
      </a>
      <p className="mt-16 text-[10px] tracking-[0.2em] uppercase text-primary-foreground/30">
        © 2026 AI Nupes
      </p>
    </main>
  );
};

export default Offline;
