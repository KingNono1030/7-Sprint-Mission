export default function ProductSectionHeader({ children, text }) {
  return (
    <div className='flex flex-wrap gap-2 justify-between items-center'>
      <h2 className='flex-grow font-bold text-xl text-gray-900'>{text}</h2>
      {children}
    </div>
  );
}
