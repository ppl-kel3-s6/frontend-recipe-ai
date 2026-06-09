import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/Autentikasi/Login'
import Register from './pages/Autentikasi/Register'
import LupaPassword from './pages/Autentikasi/LupaPassword'
import UploadFoto from './pages/UploadFoto'
import DetailResep from './pages/DetailResep'
import Koleksi from './pages/Koleksi'
import RekomendasiResep from './pages/RekomendasiResep'
import Sidebar from './pages/Layout/Sidebar'
import Navbar from './pages/Layout/Navbar'

// Komponen utama aplikasi React yang mengatur rute halaman
function App() {
  const [halaman, setHalaman] = useState(() => {
    return sessionStorage.getItem('halaman') || 'login'
  })
  const [detailResep, setDetailResep] = useState(null)
  const [bahanAktif, setBahanAktif] = useState([])
  const [tahap, setTahap] = useState('unggah')

  useEffect(() => {
    sessionStorage.setItem('halaman', halaman)
    if (halaman === 'dashboard') {
      setTahap('unggah')
    }
  }, [halaman])

  // Logika render halaman berdasarkan state yang aktif
  const tampilkanHalaman = () => {
    switch (halaman) {
      case 'register':
        return <Register setHalaman={setHalaman} />
      case 'lupaPassword':
        return <LupaPassword setHalaman={setHalaman} />
      case 'login':
        return <Login setHalaman={setHalaman} />
      case 'dashboard':
      case 'rekomendasi':
      case 'koleksi':
      case 'detail-resep':
      default:
        return (
          <div className="flex h-screen w-screen bg-[#F8F9FA] overflow-hidden text-gray-800">
            <Sidebar halaman={halaman} setHalaman={setHalaman} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar halaman={halaman} tahap={tahap} />
              <div className="flex-1 overflow-y-auto">
                {halaman === 'dashboard' && <UploadFoto setHalaman={setHalaman} setDetailResep={setDetailResep} setBahanAktif={setBahanAktif} tahap={tahap} setTahap={setTahap} />}
                {halaman === 'rekomendasi' && <RekomendasiResep setHalaman={setHalaman} bahanAktif={bahanAktif} setDetailResep={setDetailResep} />}
                {halaman === 'koleksi' && <Koleksi setHalaman={setHalaman} setDetailResep={setDetailResep} />}
                {halaman === 'detail-resep' && <DetailResep setHalaman={setHalaman} detailResep={detailResep} />}
              </div>
            </div>
          </div>
        )
    }
  }

  return <>{tampilkanHalaman()}</>
}

export default App
