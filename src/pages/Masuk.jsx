import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Pangkat from '../components/Pangkat.jsx'
import { POLA_KODE } from '../lib/auth'
import { useSiswa } from '../lib/siswaContext'
import { supabaseSiap } from '../lib/supabase'

function pesanKesalahan(err) {
  const teks = String(err?.message ?? err)
  if (teks.includes('kode_tidak_dikenal')) {
    return 'Kode tidak ditemukan. Tanyakan kodemu kepada guru atau kakak peneliti.'
  }
  if (teks.includes('Failed to fetch') || teks.includes('NetworkError')) {
    return 'Belum bisa terhubung. Periksa internetmu, lalu coba lagi.'
  }
  return 'Ada masalah saat masuk. Coba lagi sebentar lagi.'
}

export default function Masuk() {
  const { siswa, masuk, masukPratinjau } = useSiswa()
  const navigate = useNavigate()
  const [kode, setKode] = useState('')
  const [pesan, setPesan] = useState('')
  const [memuat, setMemuat] = useState(false)

  if (siswa) return <Navigate to="/" replace />

  async function kirim(e) {
    e.preventDefault()
    const bersih = kode.trim().toUpperCase()
    if (!POLA_KODE.test(bersih)) {
      setPesan('Tulis kodenya seperti ini: P01')
      return
    }
    setMemuat(true)
    setPesan('')
    try {
      await masuk(bersih)
      navigate('/', { replace: true })
    } catch (err) {
      setPesan(pesanKesalahan(err))
    } finally {
      setMemuat(false)
    }
  }

  function coba() {
    const bersih = kode.trim().toUpperCase()
    masukPratinjau(POLA_KODE.test(bersih) ? bersih : 'P00')
    navigate('/', { replace: true })
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-8">
      <div className="mb-6 text-center">
        <Pangkat basis="a" pangkat="n" ukuran="lg" />
        <h1 className="mt-4 text-2xl font-bold text-teks">Belajar Eksponen</h1>
        <p className="mt-1 text-teks-pelan">Masukkan kodemu untuk mulai.</p>
      </div>

      <form
        onSubmit={kirim}
        className="rounded-2xl border border-garis bg-kartu p-5"
      >
        <label htmlFor="kode" className="block font-semibold text-teks">
          Kode kamu
        </label>
        <input
          id="kode"
          value={kode}
          onChange={(e) => setKode(e.target.value.toUpperCase())}
          maxLength={4}
          placeholder="P01"
          autoCapitalize="characters"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-describedby={pesan ? 'pesan-masuk' : undefined}
          className="mt-2 min-h-12 w-full rounded-xl border-2 border-garis px-4 text-xl tracking-widest uppercase focus:border-basis"
        />

        {pesan && (
          <p
            id="pesan-masuk"
            role="alert"
            className="mt-3 rounded-lg bg-perhatian-lembut px-3 py-2 text-perhatian"
          >
            {pesan}
          </p>
        )}

        <button
          type="submit"
          disabled={memuat || !supabaseSiap}
          aria-label="Masuk dengan kode"
          className="mt-4 min-h-12 w-full rounded-xl bg-basis px-4 text-lg font-bold text-white disabled:opacity-50"
        >
          {memuat ? 'Memeriksa…' : 'Masuk'}
        </button>
      </form>

      {!supabaseSiap && (
        <div className="mt-4 rounded-xl border border-perhatian bg-perhatian-lembut p-4 text-sm text-perhatian">
          <p>
            Database belum diatur (isi <code>.env</code>, lihat{' '}
            <code>.env.example</code>). Kamu tetap bisa mencoba tampilan tanpa
            database; datanya hanya tersimpan di perangkat ini.
          </p>
          <button
            type="button"
            onClick={coba}
            aria-label="Coba aplikasi tanpa database"
            className="mt-3 min-h-11 rounded-lg border-2 border-perhatian px-4 font-semibold"
          >
            Coba tanpa database
          </button>
        </div>
      )}
    </main>
  )
}
