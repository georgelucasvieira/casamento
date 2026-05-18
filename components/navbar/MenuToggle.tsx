type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function MenuToggle({
  isOpen,
  toggle,
}: Props) {
  return (
    <button
      onClick={toggle}
      className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1"
    >
      <span
        className={`
          h-[2px] w-7 bg-white transition-all duration-300
          ${isOpen ? "translate-y-[6px] rotate-45" : ""}
        `}
      />

      <span
        className={`
          h-[2px] w-7 bg-white transition-all duration-300
          ${isOpen ? "opacity-0" : ""}
        `}
      />

      <span
        className={`
          h-[2px] w-7 bg-white transition-all duration-300
          ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}
        `}
      />
    </button>
  );
}