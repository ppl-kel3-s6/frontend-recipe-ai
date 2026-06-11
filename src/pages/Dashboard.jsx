import { useState } from 'react'
import { IkonWaktu, IkonPencarian, IkonChevronKanan } from './components/Ikon'
import { DAFTAR_RESEP } from './components/dataResep'

function Dashboard({ setHalaman, setDetailResep }) {
  const [kataKunci, setKataKunci] = useState('')
  const [filterJenis, setFilterJenis] = useState([])
  const [maxWaktu, setMaxWaktu] = useState(60)
  const [filterBahan, setFilterBahan] = useState([])
  const [filterNegara, setFilterNegara] = useState([])
  const [filterWilayah, setFilterWilayah] = useState([])
  const [bukaFilterMobile, setBukaFilterMobile] = useState(false)

  const [bukaan, setBukaan] = useState({
    jenis: false,
    waktu: false,
    bahan: false,
    negara: false,
    wilayah: false
  })

  const toggleBukaan = (kategori) => {
    setBukaan(prev => ({ ...prev, [kategori]: !prev[kategori] }))
  }

  // Mengekstrak daftar opsi filter secara dinamis dari database resep
  const semuaJenis = [...new Set(DAFTAR_RESEP.map(resep => resep.jenis).filter(Boolean))]
  const semuaNegara = [...new Set(DAFTAR_RESEP.map(resep => resep.negara).filter(Boolean))]
  const semuaWilayah = [...new Set(DAFTAR_RESEP.map(resep => resep.wilayah).filter(Boolean))]
  const semuaBahan = [...new Set(DAFTAR_RESEP.flatMap(resep => resep.bahan.map(b => b.nama)).filter(Boolean))]

  const tanganiToggleFilter = (kategori, nilai) => {
    const setter = {
      jenis: setFilterJenis,
      bahan: setFilterBahan,
      negara: setFilterNegara,
      wilayah: setFilterWilayah
    }[kategori]

    setter(prev =>
      prev.includes(nilai)
        ? prev.filter(item => item !== nilai)
        : [...prev, nilai]
    )
  }

  const dapatkanDaftarResep = () => {
    return DAFTAR_RESEP.filter(resep => {
      // Pencarian kata kunci nama dan bahan
      const query = kataKunci.toLowerCase().trim()
      if (query) {
        const cocokNama = resep.nama.toLowerCase().includes(query)
        const cocokBahanSearch = resep.bahan.some(b => b.nama.toLowerCase().includes(query))
        if (!cocokNama && !cocokBahanSearch) return false
      }

      // Filter jenis hidangan
      if (filterJenis.length > 0 && !filterJenis.includes(resep.jenis)) {
        return false
      }

      // Filter durasi memasak
      if (resep.waktuMenit > maxWaktu) {
        return false
      }

      // Filter bahan masakan
      if (filterBahan.length > 0) {
        const punyaBahan = resep.bahan.some(b => filterBahan.includes(b.nama))
        if (!punyaBahan) return false
      }

      // Filter negara asal
      if (filterNegara.length > 0 && !filterNegara.includes(resep.negara)) {
        return false
      }

      // Filter wilayah regional
      if (filterWilayah.length > 0 && !filterWilayah.includes(resep.wilayah)) {
        return false
      }

      return true
    })
  }

  const resepTampil = dapatkanDaftarResep()

  return (
    <div className="w-full min-h-full bg-[#F8F9FA] px-6 md:px-12 py-8 flex flex-col relative">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">

        {/* Kontainer Banner Pencarian */}
        <div className="bg-[#FDF6EB] rounded-2xl py-6 px-8 shadow-sm border border-[#F2CC8F]/30 flex flex-col gap-6 relative overflow-hidden">

          {/* Latar belakang dekoratif */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2CC8F]/20 rounded-full blur-2xl -translate-y-8 translate-x-8 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#4C7C54]/5 rounded-full blur-2xl translate-y-8 -translate-x-8 pointer-events-none"></div>

          {/* Judul dan Deskripsi */}
          <div className="relative z-10 flex flex-col gap-1.5">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Cari Inspirasi Resep</h2>
            <p className="text-sm text-gray-650 font-semibold leading-relaxed">
              Temukan berbagai inspirasi resep masakan lezat yang siap diolah hari ini. Tulis masakan atau bahan apa saja di kolom pencarian.
            </p>
          </div>

          {/* Kontainer Input Pencarian */}
          <div className="relative flex items-center w-full z-10">
            {/* Icon */}
            <span className="absolute left-4 text-gray-400">
              <IkonPencarian className="w-5 h-5" />
            </span>

            {/* Input */}
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-850 border border-[#F2CC8F]/40 shadow-sm focus:outline-none focus:border-[#4C7C54] focus:ring-1 focus:ring-[#4C7C54] text-sm transition-all font-semibold"
              placeholder="Cari nama makanan atau bahan masakan (misal: telur, tomat...)"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
            />
          </div>
        </div>

        {/* Tombol filter khusus tampilan mobile */}
        <div className="md:hidden w-full flex justify-end">
          <button
            onClick={() => setBukaFilterMobile(!bukaFilterMobile)}
            className="px-4 py-2.5 bg-[#4C7C54] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
          >
            {bukaFilterMobile ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
          </button>
        </div>

        {/* Layout Konten Utama: Kolom Kembar */}
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* Kontainer Filter*/}
          <div className={`${bukaFilterMobile ? 'flex' : 'hidden'} md:flex flex-col gap-5 w-full md:w-44 shrink-0 bg-[#FDF6EB] rounded-xl p-4 shadow-sm border border-[#F2CC8F]/60`}>

            {/* Bagian Judul Filter dan Tombol Reset */}
            <div className="flex items-center justify-between border-b border-[#F2CC8F]/60 pb-3">
              <h3 className="text-sm font-extrabold text-gray-900">Filter</h3>
              <button
                onClick={() => {
                  setFilterJenis([])
                  setMaxWaktu(60)
                  setFilterBahan([])
                  setFilterNegara([])
                  setFilterWilayah([])
                }}
                className="text-sm font-bold text-red-500 hover:text-red-700 cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Kategori Jenis Hidangan */}
            <div className="flex flex-col gap-2.5 border-b border-[#F2CC8F]/60 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer select-none group"
                onClick={() => toggleBukaan('jenis')}
              >
                <h4 className="text-[12px] font-extrabold text-gray-600 group-hover:text-gray-900 transition-colors">Jenis</h4>
                <IkonChevronKanan className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${bukaan.jenis ? 'rotate-90' : ''}`} />
              </div>
              {bukaan.jenis && (
                <div className={`flex flex-col gap-2 mt-1 ${semuaJenis.length > 10 ? 'max-h-48 overflow-y-auto kustom-scroll pr-1' : ''}`}>
                  {semuaJenis.map(jenis => (
                    <label key={jenis} className="flex items-center gap-2 text-xs text-gray-600 font-semibold cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#4C7C54] focus:ring-[#4C7C54] w-4 h-4 accent-[#4C7C54]"
                        checked={filterJenis.includes(jenis)}
                        onChange={() => tanganiToggleFilter('jenis', jenis)}
                      />
                      {jenis}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Kategori Slider Waktu */}
            <div className="flex flex-col gap-2.5 border-b border-[#F2CC8F]/60 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer select-none group"
                onClick={() => toggleBukaan('waktu')}
              >
                <h4 className="text-[12px] font-extrabold text-gray-600 group-hover:text-gray-900 transition-colors">Maks. Waktu</h4>
                <IkonChevronKanan className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${bukaan.waktu ? 'rotate-90' : ''}`} />
              </div>
              {bukaan.waktu && (
                <div className="flex flex-col gap-3 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#4C7C54]">
                    <span>Durasi</span>
                    <span>{maxWaktu} Menit</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={maxWaktu}
                    onChange={(e) => setMaxWaktu(Number(e.target.value))}
                    className="w-full accent-[#4C7C54] h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Kategori Bahan Makanan */}
            <div className="flex flex-col gap-2.5 border-b border-[#F2CC8F]/60 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer select-none group"
                onClick={() => toggleBukaan('bahan')}
              >
                <h4 className="text-[12px] font-extrabold text-gray-600 group-hover:text-gray-900 transition-colors">Bahan Utama</h4>
                <IkonChevronKanan className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${bukaan.bahan ? 'rotate-90' : ''}`} />
              </div>
              {bukaan.bahan && (
                <div className={`flex flex-col gap-2 mt-1 ${semuaBahan.length > 10 ? 'max-h-48 overflow-y-auto kustom-scroll pr-1' : ''}`}>
                  {semuaBahan.map(bahan => (
                    <label key={bahan} className="flex items-center gap-2 text-xs text-gray-600 font-semibold cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#4C7C54] focus:ring-[#4C7C54] w-4 h-4 accent-[#4C7C54]"
                        checked={filterBahan.includes(bahan)}
                        onChange={() => tanganiToggleFilter('bahan', bahan)}
                      />
                      {bahan}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Kategori Negara Asal */}
            <div className="flex flex-col gap-2.5 border-b border-[#F2CC8F]/60 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer select-none group"
                onClick={() => toggleBukaan('negara')}
              >
                <h4 className="text-[12px] font-extrabold text-gray-600 group-hover:text-gray-900 transition-colors">Negara</h4>
                <IkonChevronKanan className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${bukaan.negara ? 'rotate-90' : ''}`} />
              </div>
              {bukaan.negara && (
                <div className={`flex flex-col gap-2 mt-1 ${semuaNegara.length > 10 ? 'max-h-48 overflow-y-auto kustom-scroll pr-1' : ''}`}>
                  {semuaNegara.map(negara => (
                    <label key={negara} className="flex items-center gap-2 text-xs text-gray-650 font-semibold cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#4C7C54] focus:ring-[#4C7C54] w-4 h-4 accent-[#4C7C54]"
                        checked={filterNegara.includes(negara)}
                        onChange={() => tanganiToggleFilter('negara', negara)}
                      />
                      {negara}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Kategori Wilayah Regional */}
            <div className="flex flex-col gap-2.5">
              <div
                className="flex items-center justify-between cursor-pointer select-none group"
                onClick={() => toggleBukaan('wilayah')}
              >
                <h4 className="text-[12px] font-extrabold text-gray-600 group-hover:text-gray-900 transition-colors">Wilayah</h4>
                <IkonChevronKanan className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${bukaan.wilayah ? 'rotate-90' : ''}`} />
              </div>
              {bukaan.wilayah && (
                <div className={`flex flex-col gap-2 mt-1 ${semuaWilayah.length > 10 ? 'max-h-48 overflow-y-auto kustom-scroll pr-1' : ''}`}>
                  {semuaWilayah.map(wilayah => (
                    <label key={wilayah} className="flex items-center gap-2 text-xs text-gray-650 font-semibold cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#4C7C54] focus:ring-[#4C7C54] w-4 h-4 accent-[#4C7C54]"
                        checked={filterWilayah.includes(wilayah)}
                        onChange={() => tanganiToggleFilter('wilayah', wilayah)}
                      />
                      {wilayah}
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Kontainer Hasil Resep */}
          <div className="flex-1 w-full flex flex-col gap-4">

            {/* Bagian Judul Hasil Resep */}
            <div className="flex items-center justify-between px-1">
              <h3 className="text-base font-extrabold text-gray-900">
                {kataKunci.trim() ? 'Hasil Pencarian Resep' : 'Rekomendasi Resep Populer'}
              </h3>
              <span className="text-xs font-bold text-[#4C7C54] bg-[#4C7C54]/10 px-3 py-1 rounded-full">
                {resepTampil.length} Resep
              </span>
            </div>

            {/* Bagian Hasil Pencarian Resep */}
            {resepTampil.length === 0 ? (
              <div className="w-full bg-white rounded-xl p-12 shadow-sm border border-gray-150 flex flex-col items-center justify-center gap-4 text-center">
                <p className="font-bold text-gray-800 text-base">Resep Tidak Ditemukan</p>
                <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                  Maaf, tidak ada resep masakan yang sesuai dengan kata kunci dan kriteria filter yang Anda pilih saat ini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resepTampil.map(resep => (
                  <div
                    key={resep.id}
                    onClick={() => {
                      setDetailResep(resep)
                      setHalaman('detail-resep')
                    }}
                    className="bg-white rounded-xl p-3 shadow-md border border-gray-100 flex flex-col justify-between overflow-hidden cursor-pointer"
                  >
                    <div>
                      {/* Gambar */}
                      <div className="w-full h-36 rounded-lg bg-gray-50 relative mb-3 p-1.5">
                        <img
                          src={resep.gambar}
                          alt={resep.nama}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      {/* Judul dan Deskripsi */}
                      <div className="flex items-start justify-between gap-2 px-1">
                        {/* Judul */}
                        <h4 className="text-[14px] font-extrabold text-gray-900 line-clamp-2 flex-1">
                          {resep.nama}
                        </h4>

                        {/* Icon */}
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 font-bold shrink-0 mt-0.5">
                          <IkonWaktu className="w-3.5 h-3.5 text-gray-400" />
                          <span>{resep.waktu}</span>
                        </div>
                      </div>

                      {/* Deskripsi */}
                      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 px-1 leading-relaxed">
                        {resep.deskripsi}
                      </p>
                    </div>

                    {/* Lihat Detail */}
                    <div className="w-full mt-2.5 flex items-center justify-between pt-2.5 border-t border-gray-50 text-xs font-bold text-[#4C7C54] group-hover:text-[#3d6543] transition-colors px-1">
                      <span>Lihat Langkah Memasak</span>
                      <IkonChevronKanan className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard
