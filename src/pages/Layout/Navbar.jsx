// Komponen Navbar
function Navbar({ halaman, tahap }) {
  const dapatkanJudul = () => {
    switch (halaman) {
      case 'dashboard':
        return tahap === 'hasil' ? 'LIST BAHAN TERDETEKSI' : 'UPLOAD FOTO'
      case 'rekomendasi':
        return 'REKOMENDASI RESEP'
      case 'koleksi':
        return 'KOLEKSI RESEP'
      case 'detail-resep':
        return 'DETAIL RESEP'
      default:
        return ''
    }
  }

  // Layout Navbar
  return (
    <div className="w-full h-[52px] bg-[#2C2C2C] border-b border-neutral-800 px-8 flex items-center flex-none">

      {/* Judul */}
      <div className="flex-1 flex justify-center">
        <h1 className="text-xl font-extrabold text-white tracking-normal">{dapatkanJudul()}</h1>
      </div>

      {/* Nama Akun */}
      <div className="bg-[#F2CC8F] px-5 py-1.5 rounded-xl shadow-sm shrink-0">
        <p className="font-bold text-sm text-neutral-950">Raflhy Nur Ramadhan</p>
      </div>
    </div>
  )
}

export default Navbar
