export function Footer() {
  return (
    <footer className="px-6 py-8 md:px-8">
      <div className="mx-auto flex max-w-[960px] items-center justify-between">
        <span className="text-[12px] text-[var(--gray-5)]">
          {new Date().getFullYear()}
        </span>
        <span className="text-[12px] text-[var(--gray-6)]">
          Luisa Hernandez
        </span>
      </div>
    </footer>
  );
}
