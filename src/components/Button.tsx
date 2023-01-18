// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   // children: React.ReactNode;
// }

export default function Button({
  onClick,
  children,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className="m-2 p-2 w-32 flex justify-center items-center bg-white text-black border-red-600 border-4 rounded-md font-semibold text-2xl"
    >
      {children}
    </button>
  );
}
