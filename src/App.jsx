import { Navigate, Route, Routes } from 'react-router-dom'
import { useSiswa } from './lib/siswaContext'
import Beranda from './pages/Beranda.jsx'
import Masuk from './pages/Masuk.jsx'
import Tipografi from './pages/Tipografi.jsx'

// Halaman yang hanya boleh dibuka setelah siswa memasukkan kode.
function WajibMasuk({ children }) {
  const { siswa } = useSiswa()
  if (!siswa) return <Navigate to="/masuk" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WajibMasuk>
            <Beranda />
          </WajibMasuk>
        }
      />
      <Route path="/masuk" element={<Masuk />} />
      {/* Halaman uji tipografi (F3), dipakai saat pengembangan. */}
      <Route path="/tipografi" element={<Tipografi />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
