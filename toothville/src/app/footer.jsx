export default function Footer() {
  return (
    <footer className="bg-zinc-700 py-6 text-center text-white lg:mt-20 mt-10">
      <div className="container mx-auto">
        <p className="text-sm font-bold">Toothville Family Dental Center</p>
        <p className="text-xs mb-1">toothvilledentalclinic@gmail.com</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Branch 1 */}
          <div className="lg:ml-36">
            <p className="text-xs font-semibold">Ground Floor Robinsons Place Lipa, Lipa City</p>
            <p className="text-xs">0917 568 8910</p>
          </div>
          {/* Branch 2 */}
          <div className="lg:mr-36">
            <p className="text-xs font-semibold">Antipolo del Norte</p>
            <p className="text-xs">0917 688 8872</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
