import { useSiswa } from '../lib/siswaContext'

// DESIGN.md §4: maksimal 3 pilihan di beranda. Modul dibuat di Sprint 1–2,
// jadi pilihan di bawah ini masih tertutup ("Segera hadir").
const MENU = [
  { id: 'belajar', judul: 'Mulai belajar', ket: 'Modul 1: perkalian bilangan berpangkat' },
  { id: 'diagnostik', judul: 'Cek dasar', ket: '5 soal singkat sebelum mulai' },
  { id: 'hasil', judul: 'Hasil saya', ket: 'Lihat kemajuanmu' },
]

export default function Beranda() {
  const { siswa, keluar } = useSiswa()

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-teks">Halo!</h1>
          <p className="text-teks-pelan">
            Kode: <strong className="text-teks">{siswa.kode}</strong>
            {siswa.pratinjau && ' (pratinjau)'}
          </p>
        </div>
        <button
          type="button"
          onClick={keluar}
          aria-label="Keluar dari aplikasi"
          className="min-h-11 rounded-lg border-2 border-garis px-4 font-semibold text-teks"
        >
          Keluar
        </button>
      </header>

      <ul className="space-y-3">
        {MENU.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              disabled
              aria-label={`${m.judul} (segera hadir)`}
              className="flex min-h-16 w-full items-center justify-between rounded-2xl border border-garis bg-kartu px-4 py-3 text-left disabled:opacity-60"
            >
              <span>
                <span className="block text-lg font-bold text-teks">{m.judul}</span>
                <span className="block text-sm text-teks-pelan">{m.ket}</span>
              </span>
              <span className="ml-3 rounded-full bg-basis-lembut px-3 py-1 text-xs font-semibold text-basis">
                Segera hadir
              </span>
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
