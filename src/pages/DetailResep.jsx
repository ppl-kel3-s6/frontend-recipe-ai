// Import komponen
import { useState, useEffect } from 'react'
import GayaCetak from './components/GayaCetak'
import { IkonKembali, IkonWaktu, IkonKesulitan, IkonSimpan } from './components/Ikon'

// Fungsi halaman detail resep
function DetailResep({ setHalaman, detailResep }) {
  const [apakahDisimpan, setApakahDisimpan] = useState(false)

  // Membaca status favorit resep
  useEffect(() => {
    if (!detailResep) return
    const koleksiSaves = JSON.parse(localStorage.getItem('koleksiResep') || '[]')
    const sudahAda = koleksiSaves.some(item => item.id === detailResep.id)
    setApakahDisimpan(sudahAda)
  }, [detailResep])

  // Jika tidak ada resep
  if (!detailResep) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-gray-500 font-semibold">Tidak ada resep yang dipilih.</p>
      </div>
    )
  }

  // Menyimpan atau menghapus resep
  const tanganiSimpanKoleksi = () => {
    const koleksiSaves = JSON.parse(localStorage.getItem('koleksiResep') || '[]')
    if (apakahDisimpan) {
      const updatedSaves = koleksiSaves.filter(item => item.id !== detailResep.id)
      localStorage.setItem('koleksiResep', JSON.stringify(updatedSaves))
      setApakahDisimpan(false)
    } else {
      koleksiSaves.push(detailResep)
      localStorage.setItem('koleksiResep', JSON.stringify(koleksiSaves))
      setApakahDisimpan(true)
    }
  }

  // Membuka dialog pencetakan dokumen browser
  const tanganiCetakPDF = () => {
    window.print()
  }

  return (
    <div className="w-full min-h-full bg-[#F8F9FA] px-6 py-8 flex flex-col relative print:p-0 print:bg-white">

      {/* Gaya cetak */}
      <GayaCetak />

      {/* Container detail resep */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 print-area">
        {/* Tombol kembali */}
        <div className="flex items-center justify-between no-print">
          <button
            onClick={() => setHalaman('rekomendasi')}
            className="text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <IkonKembali className="w-4 h-4" />
            Kembali
          </button>
        </div>

        {/* Kontainer isi detail resep masakan */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6 print:border-none print:shadow-none print:p-0">

          {/* Kontainer gambar dan judul */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Gambar */}
            <div className="w-full md:w-[320px] h-[220px] print:h-[360px] rounded-2xl overflow-hidden bg-gray-100 shrink-0">
              <img src={detailResep.gambar} alt={detailResep.nama} className="w-full h-full print:h-[360px] object-cover" />
            </div>

            {/* Container judul dan deskripsi */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              {/* Judul */}
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{detailResep.nama}</h1>

              {/* Container informasi */}
              <div className="flex items-center gap-4 text-xs text-gray-500 font-bold mt-1">
                {/* waktu */}
                <div className="flex items-center gap-1.5">
                  <IkonWaktu className="w-4 h-4 text-gray-400" />
                  <span>{detailResep.waktu}</span>
                </div>

                {/* kesulitan */}
                <div className="flex items-center gap-1.5">
                  <IkonKesulitan className="w-4 h-4 text-gray-400" />
                  <span>{detailResep.kesulitan}</span>
                </div>
              </div>

              {/* Deskripsi */}
              <p className="text-sm text-gray-500 leading-relaxed mt-3">{detailResep.deskripsi}</p>

            </div>
          </div>

          {/* Container bahan dan langkah pembuatan */}
          <div className="flex flex-col gap-0 border-t border-b border-gray-200 print:w-full">

            {/* Container judul */}
            <div className="flex flex-col md:flex-row print:flex-row border-b border-gray-200 items-stretch">
              {/* Judul bahan */}
              <div className="w-full md:w-[320px] print:w-[240px] shrink-0 md:border-r print:border-r md:border-gray-200 print:border-gray-200 md:pr-6 print:pr-4 h-12 flex items-center">
                <h3 className="text-lg font-bold text-gray-955">Bahan-bahan</h3>
              </div>

              {/* Judul langkah pembuatan */}
              <div className="flex-1 md:pl-6 print:pl-4 h-12 flex items-center mt-4 md:mt-0 print:mt-0">
                <h3 className="text-lg font-bold text-gray-955">Langkah Memasak</h3>
              </div>
            </div>

            {/* Container isi konten bahan dan langkah */}
            <div className="flex flex-col md:flex-row print:flex-row items-stretch">
              {/* Isi konten bahan */}
              <div className="w-full md:w-[320px] print:w-[240px] shrink-0 md:border-r print:border-r md:border-gray-200 print:border-gray-200 pt-4 pb-2 md:pr-6 print:pr-4 flex flex-col gap-3">
                {detailResep.bahan.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 shrink-0"></span>
                    <span className="text-sm text-gray-700">{item.nama}</span>
                  </div>
                ))}
              </div>

              {/* Isi konten langkah pembuatan */}
              <div className="flex-1 pt-4 pb-2 md:pl-6 print:pl-4 flex flex-col gap-4">
                {detailResep.langkah.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#4C7C54] text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed text-justify">{item}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Container tombol */}
          <div className="flex gap-4 w-full no-print">
            {/* Tombol simpan koleksi */}
            <button
              onClick={tanganiSimpanKoleksi}
              className="flex-1 py-3.5 border border-[#4C7C54]/30 hover:bg-green-50/20 text-[#4C7C54] text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer bg-white"
            >
              <IkonSimpan
                className={`w-5 h-5 ${apakahDisimpan ? 'text-red-500' : 'text-[#4C7C54]'}`}
                fill={apakahDisimpan ? 'currentColor' : 'none'}
              />
              {apakahDisimpan ? 'Resep Disimpan' : 'Simpan Resep'}
            </button>

            {/* Tombol ekspor PDF */}
            <button
              onClick={tanganiCetakPDF}
              className="flex-1 py-3.5 bg-[#4C7C54] hover:bg-[#3d6543] text-white text-sm font-bold rounded-xl shadow-sm flex items-center justify-center transition-all cursor-pointer"
            >
              Export PDF
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DetailResep
