export const DAFTAR_RESEP = [
  {
    id: 'telur-dadar-tomat',
    nama: 'Telur Dadar Tomat',
    deskripsi: 'Telur dadar gurih dengan campuran tomat segar dan daun bawang yang harum. Sangat lezat disajikan sebagai sarapan pagi yang praktis dan penuh gizi untuk memulai hari Anda.',
    waktu: '15 Menit',
    kesulitan: 'Mudah',
    porsi: '2 Orang',
    gambar: '/telur_dadar.png',
    jenis: 'Lauk',
    negara: 'Indonesia',
    wilayah: 'Asia Tenggara',
    waktuMenit: 15,
    bahan: [
      { nama: 'Telur', wajib: true },
      { nama: 'Tomat', wajib: true },
      { nama: 'Daun Bawang', wajib: true },
      { nama: 'Bawang Merah', wajib: false },
      { nama: 'Garam', wajib: false },
      { nama: 'Minyak Goreng', wajib: false }
    ],
    langkah: [
      'Kocok telur bersama dengan sedikit garam dan irisan bawang merah.',
      'Masukkan potongan tomat segar and daun bawang ke dalam kocokan telur.',
      'Panaskan minyak goreng di atas wajan dengan api sedang.',
      'Tuang adonan telur dan masak hingga kedua sisinya matang kecokelatan.',
      'Sajikan selagi hangat bersama nasi putih.'
    ]
  },
  {
    id: 'sambal-tomat',
    nama: 'Sambal Tomat',
    deskripsi: 'Sambal tomat segar dengan perpaduan rasa pedas manis yang pas. Nikmat dimakan sebagai pelengkap aneka lauk gorengan, ayam bakar, atau tahu dan tempe hangat.',
    waktu: '10 Menit',
    kesulitan: 'Mudah',
    porsi: '4 Orang',
    gambar: '/sambal_tomat.png',
    jenis: 'Sambal',
    negara: 'Indonesia',
    wilayah: 'Asia Tenggara',
    waktuMenit: 10,
    bahan: [
      { nama: 'Tomat', wajib: true },
      { nama: 'Cabai Merah', wajib: true },
      { nama: 'Bawang Merah', wajib: true },
      { nama: 'Garam', wajib: false },
      { nama: 'Gula Pasir', strokeWidth: 2, wajib: false },
      { nama: 'Minyak Goreng', wajib: false }
    ],
    langkah: [
      'Goreng bawang merah, cabai merah, dan tomat hingga sedikit layu.',
      'Ulek bahan-bahan tersebut hingga halus atau sesuai selera.',
      'Tambahkan garam and gula pasir secukupnya.',
      'Tumis kembali sebentar sambal yang sudah diulek agar lebih tahan lama.',
      'Sambal siap disajikan sebagai cocolan.'
    ]
  },
  {
    id: 'nasi-goreng',
    nama: 'Nasi Goreng Telur',
    deskripsi: 'Nasi goreng praktis menggunakan bawang merah, telur, dan irisan cabai merah. Diracik dengan bumbu tradisional sederhana yang menghasilkan rasa gurih khas nusantara.',
    waktu: '20 Menit',
    kesulitan: 'Mudah',
    porsi: '2 Orang',
    gambar: '/nasi_goreng.png',
    jenis: 'Makanan Utama',
    negara: 'Indonesia',
    wilayah: 'Asia Tenggara',
    waktuMenit: 20,
    bahan: [
      { nama: 'Telur', wajib: true },
      { nama: 'Bawang Merah', wajib: true },
      { nama: 'Cabai Merah', wajib: true },
      { nama: 'Nasi Putih', wajib: true },
      { nama: 'Daun Bawang', wajib: false },
      { nama: 'Kecap Manis', wajib: false },
      { nama: 'Minyak Goreng', wajib: false }
    ],
    langkah: [
      'Panaskan minyak, lalu buat telur orak-arik hingga matang, tiriskan.',
      'Tumis irisan bawang merah and cabai merah hingga harum di wajan.',
      'Masukkan nasi putih beserta telur orak-arik ke dalam wajan.',
      'Beri kecap manis, garam, and irisan daun bawang, lalu aduk hingga rata.',
      'Sajikan nasi goreng hangat di piring saji.'
    ]
  },
  {
    id: 'sup-tomat-telur',
    nama: 'Sup Tomat Telur',
    deskripsi: 'Sup hangat yang segar dan menyehatkan, dibuat dari perpaduan tomat dan telur. Sangat cocok disajikan saat cuaca dingin untuk menghangatkan tubuh keluarga tercinta.',
    waktu: '15 Menit',
    kesulitan: 'Mudah',
    porsi: '3 Orang',
    gambar: '/sup_tomat.png',
    jenis: 'Sup',
    negara: 'Tiongkok',
    wilayah: 'Asia Timur',
    waktuMenit: 15,
    bahan: [
      { nama: 'Tomat', wajib: true },
      { nama: 'Telur', wajib: true },
      { nama: 'Daun Bawang', wajib: true },
      { nama: 'Bawang Merah', wajib: true },
      { nama: 'Garam', wajib: false },
      { nama: 'Air', wajib: false }
    ],
    langkah: [
      'Tumis irisan bawang merah hingga harum, lalu masukkan potongan tomat segar.',
      'Tambahkan air secukupnya and biarkan hingga mendidih.',
      'Masukkan kocokan telur secara perlahan sambil diaduk melingkar.',
      'Tambahkan garam, kaldu bubuk, and irisan daun bawang, lalu aduk rata.',
      'Sajikan sup tomat telur hangat di mangkuk saji.'
    ]
  }
]
