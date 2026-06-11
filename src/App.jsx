import { useState, useEffect } from 'react'
import Login from './pages/autentikasi/Login'
import Register from './pages/autentikasi/Register'
import LupaPassword from './pages/autentikasi/LupaPassword'
import UploadFoto from './pages/mypantry/UploadFoto'
import DetailResep from './pages/mypantry/DetailResep'
import Koleksi from './pages/Koleksi'
import RekomendasiResep from './pages/mypantry/RekomendasiResep'
import Dashboard from './pages/Dashboard'
import Sidebar from './pages/layout/Sidebar'
import Navbar from './pages/layout/Navbar'
import PilihanAwal from './pages/PilihanAwal'

// Komponen utama aplikasi React yang mengatur rute halaman
function App() {
  const [halaman, setHalaman] = useState(() => {
    return sessionStorage.getItem('halaman') || 'login'
  })
  const [detailResep, setDetailResep] = useState(null)
  const [bahanAktif, setBahanAktif] = useState([])
  const [tahap, setTahap] = useState('unggah')
  const [asalHalaman, setAsalHalaman] = useState('dashboard-home')

  useEffect(() => {
    sessionStorage.setItem('halaman', halaman)
    if (halaman === 'dashboard') {
      setTahap('unggah')
    }
  }, [halaman])

  const navigasiKe = (halamanBaru) => {
    if (halamanBaru === 'detail-resep') {
      setAsalHalaman(halaman)
    }
    setHalaman(halamanBaru)
  }

  // Logika render halaman berdasarkan state yang aktif
  const tampilkanHalaman = () => {
    switch (halaman) {
      case 'register':
        return <Register setHalaman={navigasiKe} />
      case 'lupaPassword':
        return <LupaPassword setHalaman={navigasiKe} />
      case 'login':
        return <Login setHalaman={navigasiKe} />
      case 'pilihan-awal':
        return <PilihanAwal setHalaman={navigasiKe} />
      case 'dashboard-home':
      case 'dashboard':
      case 'rekomendasi':
      case 'koleksi':
      case 'detail-resep':
      default:
        return (
          <div className="flex h-screen w-screen bg-[#F8F9FA] overflow-hidden text-gray-800">
            <Sidebar halaman={halaman} setHalaman={navigasiKe} asalHalaman={asalHalaman} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar halaman={halaman} tahap={tahap} />
              <div className="flex-1 overflow-y-auto">
                {halaman === 'dashboard-home' && <Dashboard setHalaman={navigasiKe} setDetailResep={setDetailResep} />}
                {halaman === 'dashboard' && <UploadFoto setHalaman={navigasiKe} setDetailResep={setDetailResep} setBahanAktif={setBahanAktif} tahap={tahap} setTahap={setTahap} />}
                {halaman === 'rekomendasi' && <RekomendasiResep setHalaman={navigasiKe} bahanAktif={bahanAktif} setDetailResep={setDetailResep} />}
                {halaman === 'koleksi' && <Koleksi setHalaman={navigasiKe} setDetailResep={setDetailResep} />}
                {halaman === 'detail-resep' && <DetailResep setHalaman={navigasiKe} detailResep={detailResep} asalHalaman={asalHalaman} />}
              </div>
            </div>
          </div>
        )
    }
  }

  return <>{tampilkanHalaman()}</>
}

export default App
