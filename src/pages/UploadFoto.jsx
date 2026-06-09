//  Import komponen
import { useState, useRef, useEffect } from 'react'
import { IkonKamera, IkonPengaturan, IkonHapus, IkonCentang, IkonTambah, IkonPencarian } from './components/Ikon'

// Fungsi upload foto
function UploadFoto({ setHalaman, setDetailResep, setBahanAktif, tahap, setTahap }) {

  // Deklarasi state untuk menyimpan data foto, progres, dan daftar bahan
  const [foto, setFoto] = useState(null)
  const [progresPindai, setProgresPindai] = useState(0)
  const [bahanList, setBahanList] = useState([
    { id: 'telur', nama: 'Telur', aktif: true },
    { id: 'tomat', nama: 'Tomat', aktif: true },
    { id: 'bawang', nama: 'Bawang Merah', aktif: true },
    { id: 'cabai', nama: 'Cabai Merah', aktif: true },
    { id: 'daun', nama: 'Daun Bawang', aktif: true }
  ])

  // State untuk input manual dan status tambah/edit
  const [inputManual, setInputManual] = useState('')
  const [sedangTambah, setSedangTambah] = useState(false)
  const [sedangEditList, setSedangEditList] = useState(false)
  const fileInputRef = useRef(null)

  // Menghapus bahan dari daftar
  const hapusBahan = (id) => {
    setBahanList(prev => prev.filter(item => item.id !== id))
  }

  // Mengupdate nama bahan
  const updateNamaBahan = (id, namaBaru) => {
    setBahanList(prev =>
      prev.map(item => item.id === id ? { ...item, nama: namaBaru } : item)
    )
  }

  // Efek untuk reset scroll ke atas
  useEffect(() => {
    if (tahap === 'hasil') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      const scrollContainers = document.querySelectorAll('.overflow-y-auto')
      scrollContainers.forEach(container => {
        container.scrollTop = 0
      })
    }
  }, [tahap])

  // Handler saat file gambar di hapus
  const tanganiDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      prosesFoto(file)
    }
  }

  // Handler saat file gambar dipilih
  const tanganiPilihFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      prosesFoto(file)
    }
  }

  // Fungsi untuk memproses file foto yang masuk
  const prosesFoto = (file) => {
    setFoto(URL.createObjectURL(file))
    setTahap('unggah')
  }

  // Fungsi untuk menjalankan simulasi deteksi bahan dengan progress bar
  const mulaiDeteksi = () => {
    if (!foto) return
    setTahap('menganalisis')
    setProgresPindai(0)

    const interval = setInterval(() => {
      setProgresPindai((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setTahap('hasil')
          }, 400)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  // Fungsi untuk mengaktifkan atau menonaktifkan centang pada bahan makanan
  const toggleBahan = (id) => {
    setBahanList(prev =>
      prev.map(item => item.id === id ? { ...item, aktif: !item.aktif } : item)
    )
  }

  // Fungsi untuk menambahkan bahan makanan baru secara manual ke dalam list
  const tambahBahanManual = (e) => {
    e.preventDefault()
    if (!inputManual.trim()) return
    const idBaru = Date.now().toString()
    setBahanList(prev => [
      ...prev,
      { id: idBaru, nama: inputManual.trim(), aktif: true }
    ])
    setInputManual('')
    setSedangTambah(false)
  }

  // Fungsi untuk menghapus foto dan meriset kembali seluruh state ke kondisi awal
  const resetFoto = () => {
    setFoto(null)
    setTahap('unggah')
    setSedangEditList(false)
    setBahanList([
      { id: 'telur', nama: 'Telur', aktif: true },
      { id: 'tomat', nama: 'Tomat', aktif: true },
      { id: 'bawang', nama: 'Bawang Merah', aktif: true },
      { id: 'cabai', nama: 'Cabai Merah', aktif: true },
      { id: 'daun', nama: 'Daun Bawang', aktif: true }
    ])
  }

  // Pengecekan posisi layout di tengah layar
  const isCentered = !foto && (tahap === 'unggah' || tahap === 'menganalisis')

  // Rendering tampilan utama dashboard
  return (
    <div className={`w-full min-h-full bg-[#F8F9FA] px-2 ${isCentered ? 'py-8' : 'pt-2 pb-8'} flex flex-col relative`}>
      <div className={`w-full flex flex-col items-center ${isCentered ? 'justify-center py-4' : 'justify-start py-2'} flex-1`}>

        {/* Area Tampilan Unggah Foto */}
        {(tahap === 'unggah' || tahap === 'menganalisis') && (
          <div className="flex flex-col items-center max-w-4xl w-full gap-6">
            {/* Judul dan deskripsi */}
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Foto Bahan Makanan</h2>
              <p className="text-sm text-gray-500 mt-1.5">Ambil foto atau upload gambar bahan-bahan yang kamu punya</p>
            </div>

            {/* Area upload foto */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={tanganiDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#4C7C54] hover:border-[#3d6543] rounded-xl p-8 w-full flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer relative min-h-[200px] bg-white shadow-sm"
            >

              {/* Input foto */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={tanganiPilihFile}
                className="hidden"
              />

              {/* Icon kamera */}
              <div className="w-16 h-16 rounded-full bg-[#4C7C54]/10 flex items-center justify-center transition-transform">
                <IkonKamera className="w-8 h-8" />
              </div>

              {/* Judul area upload foto */}
              <div className="text-center">
                <p className="font-extrabold text-gray-900 text-lg">Klik Untuk Ambil Foto</p>
                <p className="text-sm text-gray-600 font-medium mt-1">atau drag & drop gambar di sini</p>
              </div>

              {/* Tombol pilih gambar */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-8 py-2.5 btn-primary text-sm rounded-xl"
              >
                Pilih Gambar
              </button>
            </div>

            {/* Area hasil upload */}
            {foto && (
              <div className="w-full flex flex-col gap-4">
                {/* Foto yang di upload */}
                <div className="w-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                  <img src={foto} alt="Preview Bahan" className="max-w-full h-auto max-h-[500px] object-contain rounded-xl" />
                </div>

                {/* Container tombol */}
                <div className="flex gap-4">
                  {/* Tombol deteksi bahan */}
                  <button
                    onClick={mulaiDeteksi}
                    className="flex-1 py-3.5 btn-primary text-sm rounded-xl shadow-md"
                  >
                    Deteksi Bahan
                  </button>

                  {/* Tombol hapus foto */}
                  <button
                    onClick={resetFoto}
                    className="flex-1 py-3.5 btn-secondary text-sm rounded-xl"
                  >
                    Hapus Foto
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Area Tampilan Hasil Deteksi Bahan */}
        {tahap === 'hasil' && (
          <div className="flex flex-col max-w-4xl mx-auto w-full gap-6 py-2">
            {/* Container Bahan dan Preview */}
            <div className="flex flex-col md:flex-row gap-8 w-full">

              {/* Container bahan */}
              <div className="flex-1 card-3d-yellow flex flex-col justify-between min-h-[400px]">
                {/* Container bahan */}
                <div className="flex flex-col min-h-0 flex-1">

                  {/* Container judul dan edit */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Judul bahan */}
                    <h3 className="text-lg font-bold text-gray-900">Bahan Terdeteksi</h3>

                    {/* Tombol edit */}
                    <button
                      onClick={() => setSedangEditList(!sedangEditList)}
                      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${sedangEditList
                        ? 'bg-[#4C7C54] text-white border-[#4C7C54]'
                        : 'bg-white text-gray-500 border-gray-200 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                      title={sedangEditList ? "Simpan Perubahan" : "Edit Daftar Bahan"}
                    >
                      <IkonPengaturan className="w-4 h-4" />
                      <span>{sedangEditList ? 'Simpan' : 'Edit'}</span>
                    </button>

                  </div>

                  {/* Container list bahan */}
                  <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 min-h-0 py-1">
                    {bahanList.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => !sedangEditList && toggleBahan(item.id)}
                        className={`flex items-center justify-between p-4 bg-white rounded-xl transition-all shadow-[3px_3px_0px_#4C7C54] border border-gray-200 ${sedangEditList
                          ? 'cursor-default'
                          : 'hover:bg-gray-50 cursor-pointer active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-[1px_1px_0px_#4C7C54]'
                          }`}
                      >
                        {sedangEditList ? (
                          <input
                            type="text"
                            value={item.nama}
                            onChange={(e) => updateNamaBahan(item.id, e.target.value)}
                            className="flex-1 px-2.5 py-1 border border-gray-200 rounded-lg text-sm font-semibold focus:outline-none focus:border-[#4C7C54] focus:ring-1 focus:ring-[#4C7C54] mr-3"
                          />
                        ) : (
                          <span className={`text-sm font-semibold ${item.aktif ? 'text-gray-900' : 'text-gray-400 line-through'}`}>{item.nama}</span>
                        )}

                        {sedangEditList ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              hapusBahan(item.id);
                            }}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Hapus Bahan"
                          >
                            <IkonHapus className="w-5 h-5" />
                          </button>
                        ) : (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${item.aktif ? 'bg-[#4C7C54] text-white' : 'border border-gray-300'}`}>
                            {item.aktif && (
                              <IkonCentang className="w-3.5 h-3.5" />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Container tambah bahan */}
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                  {sedangTambah ? (
                    <form onSubmit={tambahBahanManual} className="flex gap-2 items-center">
                      {/* Input nama bahan */}
                      <input
                        type="text"
                        value={inputManual}
                        onChange={(e) => setInputManual(e.target.value)}
                        placeholder="Tulis nama bahan..."
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#4C7C54] focus:ring-1 focus:ring-[#4C7C54]"
                        autoFocus
                      />

                      {/* Tombol tambah */}
                      <button
                        type="submit"
                        className="w-16 py-2 btn-primary text-xs rounded-lg"
                      >
                        Tambah
                      </button>

                      {/* Tombol batal */}
                      <button
                        type="button"
                        onClick={() => { setSedangTambah(false); setInputManual(''); }}
                        className="w-16 py-2 btn-secondary text-xs rounded-lg"
                      >
                        Batal
                      </button>
                    </form>
                  ) : (

                    // Tombol bahan secara manual
                    <button
                      onClick={() => setSedangTambah(true)}
                      className="w-full py-3 border border-dashed border-[#4C7C54] hover:bg-green-50/20 rounded-xl text-xs font-bold text-[#4C7C54] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <IkonTambah className="w-4.5 h-4.5" />
                      Tambah Bahan Secara Manual
                    </button>
                  )}

                  {/* Tombol cari resep */}
                  <button
                    onClick={() => {
                      const aktifList = bahanList.filter(b => b.aktif).map(b => b.nama)
                      setBahanAktif(aktifList)
                      setHalaman('rekomendasi')
                    }}
                    className="w-full py-3.5 btn-primary text-sm rounded-xl gap-2"
                  >
                    <IkonPencarian className="w-4 h-4" />
                    Cari Resep
                  </button>
                </div>
              </div>

              {/* Container preview foto */}
              <div className="flex-1 card-3d-yellow h-fit">
                {/* Judul */}
                <h3 className="text-lg font-bold text-gray-955 mb-4">Preview Foto</h3>

                {/* Gambar */}
                <div className="rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                  <img src={foto} alt="Preview Bahan Makanan" className="w-full h-auto max-h-[450px] object-contain rounded-xl" />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Modal Animasi Robot AI Sedang Menganalisis Gambar */}
      {tahap === 'menganalisis' && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-6 overflow-hidden">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center justify-center gap-4 border-0">
            <h2 className="text-2xl font-extrabold text-gray-900 text-center">AI Sedang Menganalisis...</h2>
            <p className="text-xs text-gray-500 text-center -mt-3">Mohon tunggu sebentar ya</p>

            {/* Gambar robot */}
            <div className="relative w-44 h-[148px] flex items-center justify-center">
              <img src="/robot.png" alt="Robot AI" className="w-40 h-40 object-contain animate-bounce" />
            </div>

            {/* Progres bar */}
            <div className="w-full max-w-xs flex flex-col gap-1.5 items-center -mt-5">
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#4C7C54] transition-all duration-75"
                  style={{ width: `${progresPindai}%` }}
                ></div>
              </div>

              {/* Persentase */}
              <span className="text-xs font-extrabold text-[#4C7C54]">{progresPindai}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadFoto
