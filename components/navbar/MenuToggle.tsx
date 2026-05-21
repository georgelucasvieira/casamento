type Props = {
  isOpen: boolean;
  isTextWhite: boolean;
  toggle: () => void;
};

export default function MenuToggle({
  isOpen,
  isTextWhite,
  toggle,
}: Props) {
  return (
    <button
      onClick={toggle}
      className="relative z-60 flex h-10 w-10 flex-col items-center justify-center gap-1"
    >
      <span
        className={`
          h-0.5 w-7 transition-all duration-300
          ${isTextWhite ? "bg-white " : "bg-black"} 
          ${isOpen ? "translate-y-1.5 rotate-45 bg-white" : ""}
        `}
      />

      <span
        className={`
          h-0.5 w-7 transition-all duration-300
          ${isTextWhite ? "bg-white" : "bg-black"} 
          ${isOpen ? "opacity-0 bg-white" : ""}
        `}
      />

      <span
        className={`
          h-0.5 w-7 transition-all duration-300
          ${isTextWhite ? "bg-white " : "bg-black"} 
          ${isOpen ? "-translate-y-1.5 -rotate-45 bg-white" : ""}
        `}
      />
    </button>
  );
}