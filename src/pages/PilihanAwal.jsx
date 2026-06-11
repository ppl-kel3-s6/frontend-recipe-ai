// Komponen Halaman Pilihan Awal setelah Login Sukses
function PilihanAwal({ setHalaman }) {

  // Fungsi penanganan klik pada pilihan kartu
  const tanganiPilihan = (tujuan) => {
    setHalaman(tujuan)
  }

  return (
    <div className="w-screen h-screen bg-[#F4F1ED] flex flex-col justify-center items-center relative p-6 overflow-hidden select-none">

      {/* Bentuk Dekoratif Latar Belakang */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#F2CC8F]/15 rounded-full blur-3xl pointer-events-none -translate-x-10 -translate-y-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4C7C54]/10 rounded-full blur-3xl pointer-events-none translate-x-20 translate-y-20"></div>

      {/* Kontainer Pilihan Awal */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-6 relative z-10 my-auto">

        {/* Judul dan Deskripsi */}
        <div className="text-center flex flex-col gap-1.5 w-full">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Selamat Datang Kembali, Raflhy..
          </h2>
          <p className="text-xs text-gray-500 font-semibold max-w-md mx-auto leading-relaxed tracking-normal">
            Pilih petualangan kulinermu hari ini untuk memulai memasak
          </p>
        </div>

        {/* Kontainer Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">

          {/* Eksplorasi Resep */}
          <div
            onClick={() => tanganiPilihan('dashboard-home')}
            className="group bg-white rounded-xl overflow-hidden border border-[#F2CC8F]/60 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1 h-[365px]"
          >
            {/* Gambar */}
            <div className="w-full h-52 bg-gray-50 overflow-hidden relative shrink-0">
              <img
                src="/explore.png"
                alt="Eksplorasi Resep"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Judul */}
            <div className="bg-[#4C7C54] py-2.5 px-4 text-center w-full shrink-0">
              <h3 className="text-white font-extrabold text-base tracking-normal uppercase">
                Eksplorasi Resep
              </h3>
            </div>

            {/* Deskripsi*/}
            <div className="pt-4 pb-5 px-4">
              <p className="text-xs text-gray-500 font-semibold text-center leading-relaxed">
                Temukan berbagai rekomendari resep masakan dan filter resep berdasarkan jenis, waktu masak, bahan, maupun wilayah asal negara.
              </p>
            </div>

          </div>

          {/* Upload Bahan */}
          <div
            onClick={() => tanganiPilihan('dashboard')}
            className="group bg-white rounded-xl overflow-hidden border border-[#F2CC8F]/60 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col hover:-translate-y-1 h-[365px]"
          >
            {/* Gambar */}
            <div className="w-full h-52 bg-gray-50 overflow-hidden relative shrink-0">
              <img
                src="/upload.jpg"
                alt="Masak dari Bahan Kamu"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Judul */}
            <div className="bg-[#F2CC8F] py-2.5 px-4 text-center w-full shrink-0">
              <h3 className="text-[#3A2A10] font-extrabold text-base tracking-normal uppercase">
                Masak dari Bahan Kamu
              </h3>
            </div>

            {/* Deskripsi */}
            <div className="pt-4 pb-5 px-4">
              <p className="text-xs text-gray-500 font-semibold text-center leading-relaxed">
                Unggah atau ambil foto bahan masakan di dapurmu, dan biarkan AI mendeteksi serta merekomendasikan resep berdasarkan bahan - bahan yang diunggah.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default PilihanAwal
