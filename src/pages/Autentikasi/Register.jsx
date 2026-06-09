import { useState } from 'react'
import { IkonNama, IkonEmail, IkonKataSandi, IkonGoogle, IkonMataBuka, IkonMataTutup } from '../components/Ikon'
import PanelKiri from '../components/PanelKiri'

// Gaya kolom input
function KolomInput({ type, placeholder, value, onChange, ikon, tombolSamping }) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-4 flex items-center pointer-events-none">{ikon}</span>
      <input
        type={type}
        className={`w-full pl-12 ${tombolSamping ? 'pr-12' : 'pr-4'} py-3 rounded-xl bg-white border border-transparent shadow-[4px_4px_0px_#F2CC8F] focus:outline-none focus:border-[#F2CC8F] focus:ring-1 focus:ring-[#F2CC8F] text-sm transition-all`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {tombolSamping}
    </div>
  )
}

// Komponen buat akun
function Register({ setHalaman }) {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [kataSandi, setKataSandi] = useState('')
  const [konfirmasiSandi, setKonfirmasiSandi] = useState('')
  const [tampilkanSandi, setTampilkanSandi] = useState(false)
  const [tampilkanKonfirmasi, setTampilkanKonfirmasi] = useState(false)

  // Tangani pengiriman form
  const tanganiSubmit = (e) => {
    e.preventDefault()
    setHalaman('login')
  }

  return (
    // Container register
    <div className="flex h-screen w-screen overflow-hidden bg-[#F4F1ED] text-gray-800">
      {/* Container kiri logo */}
      <PanelKiri />

      {/* Container kanan Input */}
      <div className="flex-1 flex flex-col justify-between items-center pt-6 pb-4 px-12 bg-[#F4F1ED] h-full">

        {/* Judul dan Deskripsi */}
        <div className="text-center mt-1 w-full max-w-[400px]">
          <h1 className="text-4xl font-extrabold text-black uppercase tracking-wide">BUAT AKUN</h1>
          <p className="text-sm text-gray-500 mt-1">Temukan atau Buat Resep Masakan Sendiri</p>
        </div>

        {/* Formulir */}
        <form onSubmit={tanganiSubmit} className="w-full max-w-[400px] flex flex-col my-auto py-4">
          {/* Container input */}
          <div className="flex flex-col gap-4">
            {/* Input Nama Lengkap */}
            <KolomInput
              type="text"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              ikon={IkonNama()}
            />

            {/* Input Email */}
            <KolomInput
              type="email"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ikon={IkonEmail()}
            />

            {/* Input Kata Sandi */}
            <KolomInput
              type={tampilkanSandi ? 'text' : 'password'}
              placeholder="Kata Sandi"
              value={kataSandi}
              onChange={(e) => setKataSandi(e.target.value)}
              ikon={IkonKataSandi()}

              // Tombol toggle kata sandi
              tombolSamping={
                <button
                  type="button"
                  className="absolute right-4 flex items-center focus:outline-none"
                  onClick={() => setTampilkanSandi(!tampilkanSandi)}
                >
                  {tampilkanSandi ? IkonMataTutup() : IkonMataBuka()}
                </button>
              }
            />

            {/* Input Konfirmasi Kata Sandi */}
            <KolomInput
              type={tampilkanKonfirmasi ? 'text' : 'password'}
              placeholder="Konfirmasi Kata Sandi"
              value={konfirmasiSandi}
              onChange={(e) => setKonfirmasiSandi(e.target.value)}
              ikon={IkonKataSandi()}

              // Tombol toggle kata sandi
              tombolSamping={
                <button
                  type="button"
                  className="absolute right-4 flex items-center focus:outline-none"
                  onClick={() => setTampilkanKonfirmasi(!tampilkanKonfirmasi)}
                >
                  {tampilkanKonfirmasi ? IkonMataTutup() : IkonMataBuka()}
                </button>
              }
            />
          </div>

          {/* Container tombol */}
          <div className="flex flex-col gap-3 mt-4">
            {/* Tombol daftar */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#F2CC8F] text-black font-bold text-lg shadow-sm hover:bg-[#e5bf80] active:scale-[0.99] transition-all cursor-pointer"
            >
              Daftar
            </button>

            {/* Pembatas halaman */}
            <div className="flex items-center text-center text-xs font-semibold text-gray-400 before:flex-1 before:border-b before:border-gray-200 before:mr-3 after:flex-1 after:border-b after:border-gray-200 after:ml-3">
              ATAU
            </div>

            {/* Tombol pendaftaran melalui Google */}
            <button
              type="button"
              className="w-full py-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-black font-normal text-base cursor-pointer"
            >
              {IkonGoogle()}
              Lanjutkan dengan Google
            </button>
          </div>
        </form>

        {/* Navigasi ke masuk */}
        <div className="text-center text-sm text-gray-500 mb-1 w-full max-w-[400px]">
          Sudah memiliki akun?{' '}
          <span
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors cursor-pointer"
            onClick={() => setHalaman('login')}
          >
            Masuk
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
