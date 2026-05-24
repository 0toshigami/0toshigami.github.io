import { content } from "../data/content";

export default function Footer() {
  return (
    <footer className="grain bg-cream px-6 py-16 text-center">
      <div className="ornament mb-6">
        <span className="text-sm text-gold">❀</span>
      </div>
      <p className="font-display text-2xl italic text-wine">{content.footer.line}</p>
      <p className="mt-4 flex items-center justify-center gap-1.5 font-body text-xs tracking-widest text-ink/50 uppercase">
        {content.footer.made} <span className="text-rose not-italic">🤍</span>
      </p>
    </footer>
  );
}
