type Props = {
  isOpen: boolean;
};

export default function MobileMenu({ isOpen }: Props) {
  return (
    <div
      className={`
        fixed inset-0 z-40 md:hidden
        overflow-hidden
        transition-all duration-700 ease-in-out
        
        ${
          isOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }
      `}
    >
      {/* Background */}
      <div
        className={`
          absolute inset-0
          bg-black/90 backdrop-blur-md
          origin-top
          transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isOpen
              ? "scale-y-100"
              : "scale-y-0"
          }
        `}
      />

      {/* Menu Content */}
      <div
        className={`
          relative z-10
          flex h-full flex-col items-center justify-center gap-10
          text-white uppercase tracking-[0.2em]

          transition-all duration-500 delay-200

          ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }
        `}
      >
        <a href="#">Início</a>
        <a href="#">Confirme presença</a>
        <a href="#">Presentes</a>
        <a href="#">Álbum</a>
      </div>
    </div>
  );
}