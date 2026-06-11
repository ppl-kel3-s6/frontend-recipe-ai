// Import komponen
import { useState } from 'react'
import { IkonWaktu, IkonKesulitan, IkonChevronKanan } from '../components/Ikon'
import { DAFTAR_RESEP } from '../components/dataResep'

// Fungsi rekomendasi resep
function RekomendasiResep({ setHalaman, bahanAktif, setDetailResep }) {
  const dapatkanRekomendasi = () => {
    // Menampilkan daftar resep
    return DAFTAR_RESEP.map(resep => {
      const bahanWajibResep = resep.bahan.filter(b => b.wajib).map(b => b.nama.toLowerCase())
      const bahanSesuai = resep.bahan.filter(b =>
        bahanAktif.some(aktif => aktif.toLowerCase() === b.nama.toLowerCase())
      )

      // Menghitung persentase kecocokan bahan
      const persentaseCocok = Math.round((bahanSesuai.length / resep.bahan.filter(b => b.wajib).length) * 100)

      // Mengembalikan resep dengan jumlah kecocokan bahan
      return {
        ...resep,
        jumlahCocok: bahanSesuai.length,
        persentase: persentaseCocok,
        cocokList: bahanSesuai.map(b => b.nama)
      }
    }).sort((a, b) => b.jumlahCocok - a.jumlahCocok)
  }

  // Mendapatkan daftar resep
  const rekomendasiList = dapatkanRekomendasi()
  return (
    <div className="w-full min-h-full bg-[#F8F9FA] px-6 md:px-12 py-8 flex flex-col relative">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">

        {/* Menampilkan daftar bahan aktif yang dipilih */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-gray-700 mr-2">Bahan Kamu:</span>
          {bahanAktif.length === 0 ? (
            <span className="text-xs text-gray-400">Tidak ada bahan terdeteksi yang aktif</span>
          ) : (
            bahanAktif.map(b => (
              <span key={b} className="px-3 py-1 bg-[#4C7C54]/10 text-[#4C7C54] text-xs font-bold rounded-lg border border-[#4C7C54]/20">
                {b}
              </span>
            ))
          )}
        </div>

        {/* Daftar resep rekomendasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rekomendasiList.map(resep => (
            <div
              key={resep.id}
              onClick={() => {
                setDetailResep(resep)
                setHalaman('detail-resep')
              }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 border border-gray-100/80 flex flex-row gap-4 items-center overflow-hidden cursor-pointer transition-all p-3"
            >

              {/* Gambar resep */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <img
                  src={resep.gambar}
                  alt={resep.nama}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Container judul dan deksripsi */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                {/* Nama resep */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{resep.nama}</h3>

                {/* Container waktu dan kesulitan */}
                <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold mt-0.5">
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

                {/* Deskripsi singkat */}
                <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">{resep.deskripsi}</p>
              </div>


              {/* Ikon panah untuk navigasi ke halaman detail resep */}
              <div className="text-gray-400 shrink-0 pl-2">
                <IkonChevronKanan className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default RekomendasiResep
