// Import komponent
import { useState, useEffect } from 'react'
import { IkonHati, IkonHatiSolid, IkonWaktu, IkonKesulitan } from './components/Ikon'

// Komponen koleksi resep
function Koleksi({ setHalaman, setDetailResep }) {
  const [koleksiList, setKoleksiList] = useState([])

  // Memuat seluruh daftar resep
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('koleksiResep') || '[]')
    setKoleksiList(saved)
  }, [])

  // Fungsi untuk menghapus resep
  const hapusDariKoleksi = (e, id) => {
    e.stopPropagation()
    const updated = koleksiList.filter(item => item.id !== id)
    localStorage.setItem('koleksiResep', JSON.stringify(updated))
    setKoleksiList(updated)
  }

  return (
    // Container koleksi
    <div className={`w-full min-h-full bg-[#F8F9FA] px-6 md:px-12 py-8 flex flex-col relative ${koleksiList.length === 0 ? 'justify-center items-center' : ''}`}>

      {/* Kondisi jika belum ada resep yang disimpan */}
      {koleksiList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 text-center py-12">
          {/* Ikon hati */}
          <div className="w-24 h-24 rounded-full bg-gray-200/50 flex items-center justify-center shadow-inner">
            <IkonHati className="w-12 h-12 text-gray-400" />
          </div>

          {/* Judul dan deksripsi */}
          <div className="max-w-sm">
            <p className="font-extrabold text-gray-900 text-xl tracking-tight">Belum Ada Koleksi</p>
            <p className="text-sm text-gray-500 mt-2 font-medium">Kamu belum menyimpan resep masakan apapun saat ini.</p>
          </div>

          {/* Tombol cari resep */}
          <button
            onClick={() => setHalaman('dashboard')}
            className="py-3.5 px-7 btn-primary text-sm rounded-xl mt-3 shadow-md hover:shadow-lg transition-all"
          >
            Cari Resep Sekarang
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          {/* Container daftar koleksi resep */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {koleksiList.map(resep => (
              <div
                key={resep.id}
                onClick={() => {
                  setDetailResep(resep)
                  setHalaman('detail-resep')
                }}
                className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg hover:-translate-y-1 border border-gray-100 flex flex-col justify-between overflow-hidden group transition-all duration-300 cursor-pointer"
              >
                <div>
                  {/* Container gambar dan hati */}
                  <div className="w-full h-45 rounded-lg overflow-hidden relative mb-2 bg-gray-100">
                    <img
                      src={resep.gambar}
                      alt={resep.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Icon hati untuk hapus */}
                    <button
                      onClick={(e) => hapusDariKoleksi(e, resep.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-red-500 shadow-sm border border-red-100 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Hapus dari Koleksi"
                    >
                      <IkonHatiSolid className="w-4 h-4 text-red-500 fill-current" />
                    </button>
                  </div>

                  {/* Judul resep */}
                  <h3 className="text-base font-extrabold text-gray-900 line-clamp-1 text-center mt-1">{resep.nama}</h3>

                  {/* Container Waktu & Kesulitan info */}
                  <div className="flex items-center justify-center gap-3 mt-1.5 text-[11px] text-gray-400 font-semibold">
                    {/* Waktu */}
                    <div className="flex items-center gap-1">
                      <IkonWaktu className="w-3.5 h-3.5 text-gray-400" />
                      {resep.waktu}
                    </div>

                    {/* Kesulitan */}
                    <div className="flex items-center gap-1">
                      <IkonKesulitan className="w-3.5 h-3.5 text-gray-400" />
                      {resep.kesulitan}
                    </div>

                  </div>
                </div>

                {/* Tombol liat detail resep */}
                <button
                  onClick={() => {
                    setDetailResep(resep)
                    setHalaman('detail-resep')
                  }}
                  className="w-full py-2 btn-primary text-xs font-bold rounded-lg mt-3"
                >
                  Lihat Detail Resep
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Koleksi
