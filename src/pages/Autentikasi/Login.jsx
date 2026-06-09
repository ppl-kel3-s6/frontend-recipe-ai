import { useState } from 'react'
import { IkonEmail, IkonKataSandi, IkonGoogle, IkonMataBuka, IkonMataTutup } from '../components/Ikon'
import PanelKiri from '../components/PanelKiri'

// Gaya Kolom Input
function KolomInput({ type, placeholder, value, onChange, ikon, tombolSamping }) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-4 flex items-center pointer-events-none">{ikon}</span>
      <input
        type={type}
        className={`w-full pl-12 ${tombolSamping ? 'pr-12' : 'pr-4'} py-3.5 rounded-xl bg-white border border-transparent shadow-[4px_4px_0px_#F2CC8F] focus:outline-none focus:border-[#F2CC8F] focus:ring-1 focus:ring-[#F2CC8F] text-sm transition-all`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {tombolSamping}
    </div>
  )
}

// Komponen Login
function Login({ setHalaman }) {
  const [email, setEmail] = useState('')
  const [kataSandi, setKataSandi] = useState('')
  const [ingatSaya, setIngatSaya] = useState(false)
  const [tampilkanSandi, setTampilkanSandi] = useState(false)

  // Tangani pengiriman form
  const tanganiSubmit = (e) => {
    e.preventDefault()
    setHalaman('dashboard')
  }

  return (
    // Container Login
    <div className="flex h-screen w-screen overflow-hidden bg-[#F4F1ED] text-gray-800">
      {/* Container Kiri Logo */}
      <PanelKiri />

      {/* Container Kanan Input Login */}
      <div className="flex-1 flex flex-col justify-between items-center pt-8 pb-6 px-12 bg-[#F4F1ED] h-full">
        {/* Judul dan Deskripsi */}
        <div className="text-center mt-2 w-full max-w-[400px]">
          <h1 className="text-4xl font-extrabold text-black uppercase tracking-wide">MASUK KE AKUN</h1>
          <p className="text-sm text-gray-500 mt-1.5">Temukan atau Buat Resep Masakan Sendiri</p>
        </div>

        {/* Formulir Login */}
        <form onSubmit={tanganiSubmit} className="w-full max-w-[400px] flex flex-col my-auto py-6">
          {/* Container Input*/}
          <div className="flex flex-col gap-6">

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

              // Tombol Toggle Kata Sandi
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
          </div>

          {/* Container Ingat Saya dan Lupa Kata Sandi */}
          <div className="flex justify-between items-center text-xs px-1 mt-6 mb-8">
            {/* Ingat Saya */}
            <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-[#E07A5F] focus:ring-[#F2CC8F]"
                checked={ingatSaya}
                onChange={(e) => setIngatSaya(e.target.checked)}
              />
              Ingat saya
            </label>

            {/* Lupa Kata Sandi */}
            <span
              className="text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer transition-colors"
              onClick={() => setHalaman('lupaPassword')}
            >
              Lupa Password?
            </span>
          </div>

          {/* Container Button*/}
          <div className="flex flex-col gap-4">
            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#F2CC8F] text-black font-bold text-lg shadow-sm hover:bg-[#e5bf80] active:scale-[0.99] transition-all cursor-pointer"
            >
              Masuk
            </button>

            {/* Pembatas halaman */}
            <div className="flex items-center text-center text-xs font-semibold text-gray-400 before:flex-1 before:border-b before:border-gray-200 before:mr-3 after:flex-1 after:border-b after:border-gray-200 after:ml-3">
              ATAU
            </div>

            {/* Tombol Masuk Melalui Google */}
            <button
              type="button"
              className="w-full py-3.5 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-black font-normal text-base cursor-pointer"
            >
              {IkonGoogle()}
              Lanjutkan dengan Google
            </button>
          </div>

        </form>

        {/* Navigasi ke pendaftaran */}
        <div className="text-center text-sm text-gray-500 mb-2 w-full max-w-[400px]">
          Belum punya akun?{' '}
          <span
            className="text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer transition-colors"
            onClick={() => setHalaman('register')}
          >
            Daftar Sekarang
          </span>
        </div>

      </div>
    </div>
  )
}

export default Login
