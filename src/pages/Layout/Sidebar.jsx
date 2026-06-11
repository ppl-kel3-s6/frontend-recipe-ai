import { IkonPantry, IkonKoleksi, IkonKeluar, IkonHome } from '../components/Ikon'

// Layout sidebar
function Sidebar({ halaman, setHalaman, asalHalaman }) {
  return (
    <div className="w-52 bg-[#2C2C2C] border-r border-neutral-800 flex flex-col justify-between pb-6 px-4 flex-none">
      {/* Container menu */}
      <div className="flex flex-col gap-4">

        {/* Container logo dan judul */}
        <div className="h-[52px] flex items-center gap-2 px-0.5 border-b border-neutral-800/30">
          {/* logo */}
          <div className="w-12 h-11 overflow-hidden relative flex items-center justify-center shrink-0 mt-1">
            <img src="/logo.png" alt="Logo Koki" className="w-12 h-14 absolute bottom-[-2px] max-w-none object-contain" />
          </div>

          {/* Judul */}
          <span className="font-extrabold text-lg text-white tracking-wider uppercase leading-none translate-y-[1px]">Recipe AI</span>
        </div>

        {/* Navigasi */}
        <nav className="flex flex-col gap-2 mt-2">
          {/* Menu Dashboard */}
          <button
            onClick={() => setHalaman('dashboard-home')}
            className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl transition-all cursor-pointer text-left text-[15px] ${
              halaman === 'dashboard-home' || (halaman === 'detail-resep' && asalHalaman === 'dashboard-home')
                ? 'bg-[#F2CC8F] text-neutral-950 font-bold shadow-sm'
                : 'text-gray-400 hover:text-neutral-950 hover:bg-[#F2CC8F] font-semibold'
              }`}
          >
            <IkonHome />
            <span>Dashboard</span>
          </button>

          {/* Menu pantry */}
          <button
            onClick={() => setHalaman('dashboard')}
            className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl transition-all cursor-pointer text-left text-[15px] ${
              halaman === 'dashboard' || halaman === 'rekomendasi' || (halaman === 'detail-resep' && (asalHalaman === 'rekomendasi' || asalHalaman === 'dashboard'))
                ? 'bg-[#F2CC8F] text-neutral-950 font-bold shadow-sm'
                : 'text-gray-400 hover:text-neutral-950 hover:bg-[#F2CC8F] font-semibold'
              }`}
          >
            <IkonPantry />
            <span>My Pantry</span>
          </button>

          {/* Menu koleksi */}
          <button
            onClick={() => setHalaman('koleksi')}
            className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl transition-all cursor-pointer text-left text-[15px] ${
              halaman === 'koleksi' || (halaman === 'detail-resep' && asalHalaman === 'koleksi')
                ? 'bg-[#F2CC8F] text-neutral-950 font-bold shadow-sm'
                : 'text-gray-400 hover:text-neutral-950 hover:bg-[#F2CC8F] font-semibold'
              }`}
          >
            <IkonKoleksi />
            <span>Collection</span>
          </button>
        </nav>
      </div>

      {/* Container menu keluar */}
      <div className="flex flex-col gap-4 px-1">
        {/* Garis pembatas */}
        <div className="border-b border-neutral-700 w-full"></div>

        {/* Tombol keluar */}
        <button
          onClick={() => setHalaman('login')}
          className="flex items-center gap-3 w-full py-2.5 px-3 text-red-400 hover:text-red-500 hover:bg-white/5 rounded-xl font-semibold text-sm transition-all cursor-pointer text-left"
        >
          <IkonKeluar />
          <span>Keluar</span>
        </button>
      </div>

    </div>
  )
}

export default Sidebar
