// src/components/ui/Chip.jsx
export default function Chip({ children, onClick }) {
  return (
    <button className="chip" type="button" onClick={onClick}>
      {children}
    </button>
  );
}