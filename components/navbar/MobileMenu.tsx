import { usePathname } from "next/navigation";

type Props = {
  isOpen: boolean;
};

export default function MobileMenu({ isOpen }: Props) {

  var paths = {
    home: "/",
    presentes: "/presentes",
    presenca: "/confirmar-presenca",
    instrucoes: "/instrucoes",
    localizacao: "/localizacao",
  };

  var currentPath = usePathname();

  return (
    <div
      className={`
        fixed inset-0 z-40 md:hidden
        overflow-hidden
        transition-all duration-700 ease-in-out
        ${isOpen
          ? "pointer-events-auto"
          : "pointer-events-none"
        }
      `}
    >
      {/* Background */}
      <div
        className={`
          absolute inset-0
          bg-black/50 backdrop-blur-md
          origin-top
          transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]

          ${isOpen
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
          text-white 
          
          uppercase tracking-[0.2em]
          transition-all duration-500 delay-200

          ${isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
          }
        `}
      >
        <a href={paths.home}
          className={`
                ${currentPath === paths.home ?
              "font-cormorant-700 italic text-4xl lowercase py-0" :
              "regular pt-2"}

              `}
        >Início</a>

        <a href={paths.presentes}
          className={`
                ${currentPath === paths.presentes ?
              "font-cormorant-700 italic text-4xl lowercase" :
              "regular pt-2"}
              `}
        >Presentes</a>

        <a href={paths.presenca}
          className={`
                ${currentPath === paths.presenca ?
              "font-cormorant-700 italic text-4xl lowercase" :
              "regular pt-2"}
              `}
        >Confirmação</a>

        <a href={paths.instrucoes}
          className={`
                ${currentPath === paths.instrucoes ?
              "font-cormorant-700 italic text-4xl lowercase" :
              "regular pt-2"}
              `}
        >Instruções</a>

        <a href={paths.localizacao}
          className={`
                ${currentPath === paths.localizacao ?
              "font-cormorant-700 italic text-4xl lowercase" :
              "regular pt-2"}
              `}
        >Localização</a>
      </div>
    </div>
  );
}