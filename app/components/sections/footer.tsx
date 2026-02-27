export function Footer() {
  return (
    <footer className="border-t border-gray-800/50 px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="font-mono text-[11px] text-gray-600">
          &copy; {new Date().getFullYear()} David Dominguez
        </span>
      </div>
    </footer>
  );
}
