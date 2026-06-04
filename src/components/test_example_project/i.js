// Keranjang belanja kita saat ini
const keranjangLama = [
  { id: 'A', nama: 'Apel', jumlah: 0 },
  { id: 'B', nama: 'Pisang', jumlah: 3 }
];

// itemBaru tetap sebagai array
const itemBaru = [{ id: 'A', nama: 'Apel' }, { id: 'A', nama: 'pisang'},{ id: 'B', nama: 'Pisang' },];

const keranjangBaru = keranjangLama.map((barangDiKeranjang) => {
  // PERBAIKAN: Gunakan .some() untuk mengecek keberadaan di dalam array
  const apakahIdIniAdaDiItemBaru = itemBaru.some(item => item.id === barangDiKeranjang.id);

  return apakahIdIniAdaDiItemBaru
    ? { ...barangDiKeranjang, jumlah: barangDiKeranjang.jumlah + 1 }
    : barangDiKeranjang;
});

console.log(keranjangBaru);

// Ini adalah "keranjang" kita. Diawali dengan KOSONG.
// Ini adalah "keranjang" kita. Diawali dengan KOSONG.
function tambahTugasCerdas(tugasBaru, daftarSaatIni) {
  // Cek apakah tugas ini sudah ada di daftar
  const tugasSudahAda = daftarSaatIni.find(tugas => tugas === tugasBaru);

  if (tugasSudahAda) {
    console.log(`-> Tugas "${tugasBaru}" sudah ada, tidak perlu ditambah lagi.`);
    return daftarSaatIni; // Kembalikan daftar lama, tidak ada perubahan
  } else {
    // Jika belum ada, tambahkan
    const daftarBaru = [...daftarSaatIni, tugasBaru];
    return daftarBaru;
  }
}

console.log("\n=== USER MENCOBA MENAMBAH TUGAS YANG SAMA ===");

// User menambah "Belajar React" lagi
let daftarTugas = ["Belajar React", "Olahraga"];
daftarTugas = tambahTugasCerdas(daftarTugas[1], daftarTugas);

console.log("Daftar tugas sekarang:", daftarTugas);
// Output:
// -> Tugas "Belajar React" sudah ada, tidak perlu ditambah lagi.
// Daftar tugas sekarang: ["Belajar React", "Olahraga"]