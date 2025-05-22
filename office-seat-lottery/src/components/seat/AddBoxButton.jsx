export default function AddBoxButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        absolute top-2 right-2
        w-8 h-8 leading-none
        bg-[#1AA7FF] text-white
        rounded-full flex items-center justify-center
        text-xl shadow-md hover:bg-blue-500
      "
    >
      +
    </button>
  )
}
