export default function Footer() {
  return (
    <footer className="relative py-10 px-6 bg-bg border-t border-textSecondary/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-textSecondary text-sm">
          © 2026 Abhishek Kumar Shakya
        </p>
        <p className="text-textSecondary text-xs uppercase tracking-widest2">
          Built with Next.js, TypeScript and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
