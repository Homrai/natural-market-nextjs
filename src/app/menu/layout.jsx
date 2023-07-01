export const metadata = {
  title: 'Vegetarian food',
  description: 'delicious and natural veg food',
}
export default async function MenuLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}