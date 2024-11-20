export default function Notice({ children }) {
  return (
    <div className="border-l-4 border-l-blue-400 px-3 py-1 my-6 bg-blue-50">
      <p className="text-lg font-bold mb-1 text-blue-400">Note</p>
      <div>{children}</div>
    </div>
  );
}
