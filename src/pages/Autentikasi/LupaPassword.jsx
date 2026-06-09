import { useState } from 'react'
import { IkonEmail } from '../components/Ikon'
import PanelKiri from '../components/PanelKiri'

// Komponen lupa kata sandi
function LupaPassword({ setHalaman }) {
  const [email, setEmail] = useState('')

  // Tangani pengiriman form
  const tanganiSubmit = (e) => {
    e.preventDefault()
  }

  return (
    // Container lupa sandi
    <div className="flex h-screen w-screen overflow-hidden bg-[#F4F1ED] text-gray-800">
      {/* Container kiri logo */}
      <PanelKiri />

      {/* Container kanan Input */}
      <div className="flex-1 flex flex-col justify-center items-center p-12 bg-[#F4F1ED]">
        <div className="w-full max-w-[400px] flex flex-col gap-6">

          {/* Judul dan Deskripsi */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-black uppercase tracking-wide mb-2">LUPA KATA SANDI</h1>
            <p className="text-sm text-gray-500">
              Masukkan alamat email untuk mendapatkan tautan atur ulang kata sandi.
            </p>
          </div>

          {/* Formulir Input */}
          <form onSubmit={tanganiSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">

              {/* Input Email */}
              <div className="relative flex items-center">
                <span className="absolute left-4 flex items-center pointer-events-none">{IkonEmail()}</span>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-transparent shadow-[4px_4px_0px_#F2CC8F] focus:outline-none focus:border-[#F2CC8F] focus:ring-1 focus:ring-[#F2CC8F] text-sm transition-all"
                  placeholder="Alamat Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Tombol kirim tautan */}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#F2CC8F] text-black font-bold text-base shadow-sm hover:bg-[#e5bf80] active:scale-[0.99] transition-all cursor-pointer"
              >
                Kirim Tautan Atur Ulang
              </button>
            </div>
          </form>

          {/* Navigasi ke masuk */}
          <div className="text-center text-sm text-gray-500">
            Kembali ke halaman{' '}
            <span
              className="text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer transition-colors"
              onClick={() => setHalaman('login')}
            >
              Masuk
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LupaPassword
