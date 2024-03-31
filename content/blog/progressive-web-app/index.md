---
title: "Aplikasi Web Progresif"
date: "2024-04-01T03:00:00-07:00"
description: "Mengimplementasikan PWA pada website menggunakan metode Service Worker."
summary: "Mengimplementasikan PWA pada website menggunakan metode Service Worker."
showRelatedContent: false
tags: [ "pengembangan", "pwa" ]
authors:
    - fauziralpiandi
---

{{< lead >}}
**PWA (Progressive Web App)**
{{</ lead >}}

---

Jenis aplikasi web yang dirancang buat pengalaman pengguna yang mirip seperti aplikasi, lebih baik dan lebih responsif daripada web tradisional terutama diperangkat mobile, termasuk juga kemampuan akses ke perangkat keras, instalasi juga notifikasi push. Seringkali menawarkan solusi yang lebih terjangkau dan mudah dikelola developer daripada pengembangan aplikasi native pada umumnya.

Ada banyak metode dalam pengembangan **PWA**, contohnya *App Shell Architecture, Web App Manifest, IndexedDB, App Bundling, dan lainnya*. Dan disini saya membahas salah satu dari sekian metode diatas, seperti **Service Worker** karena kebetulan saya juga menerapkan metode ini.

**Service Worker**, sebuah skrip JavaScript yang berjalan di latar belakang browser, terpisah dari halaman web utama, dan bisa digunakan untuk melakukan tugas-tugas seperti caching, sinkronisasi data, dan memberikan dukungan untuk pengalaman offline dalam aplikasi web. Ini memungkinkan aplikasi web berfungsi lebih baik di kondisi jaringan yang buruk atau bahkan offline.

{{< lead >}}
**Mari kita mulai bagaimana saya mengimplementasikan Service Worker**
{{</ lead >}}

Saya membuat file `registration.js` terlebih dahulu yang didaftarkan dengan metode seperti ini:

```js
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if ('serviceWorker' in navigator && navigator.onLine) {
        navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
            console.log('Service worker registration successful', reg);
        }, (err) => {
            console.error('Service worker registration failed', err);
        });
    }
}
```
Dan juga `service-worker.js` berikut:

```js
const CACHE_NAME = 'SW-001';
const toCache = [
        '/',
        'static/site.webmanifest',
        'static/js/register.js',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match(event.request)
            })
        })
    )
})

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Delete old cache', key)
                    return caches.delete(key)
                }
            }))
        })
        .then(() => self.clients.claim())
    )
})
```

Biasanya, logika diatur buat mengelola cache dan memproses permintaan jaringan dengan menyimpan respon dalam cache buat penggunaan saat offline.

Nah, disini saya hanya membangun **PWA** agar situs web saya bisa diinstal di perangkat, yang itu berarti tetap memerlukan koneksi internet karena saya tidak mengatur load cache buat isi konten situs web secara keseluruhan. Kenapa?

Perlu diingat ini mungkin gak selalu memungkinkan atau disarankan buat semua situs web, lebih spesifik yaitu situs web yang cukup besar. Ya, bisa aja sih kalo saya nambahin alamat URL situs web ke dalam variabel biar seluruh isi kontennya tersedia secara offline. Tapi kita juga harus memahami ukuran cache yang memuat seluruh isi konten situs web ke dalam cache bisa menjadi masalah kalo ukurannya besar. Cache browser punya batasan ukuran, dan menyimpan terlalu banyak data di dalamnya bisa mengakibatkan penghapusan konten yang lebih lama atau bahkan cache gak berhasil dimuat.

Terutama kalo situs web punya konten dinamis yang diperbarui secara teratur atau bahkan rutin, contohnya aja situs web ini. Menyimpan seluruh situs web secara offline mungkin kurang praktis, gak efisien. Karena konten dinamis gak akan diperbarui secara otomatis di cache, dan dampaknya pengguna cuma bisa mengakses versi lama dari konten tersebut saat offline.

Ukuran maksimal cache **Service Worker** bisa bervariasi tergantung browser dan perangkat yang digunakan. Umumnya, browser ngasih batasan ukuran cache yang cukup besar buat kebutuhan umum, tapi jumlahnya bisa berbeda-beda. Sebagai panduan umum

Chrome pada desktop, ukuran cache maksimal buat satu domain adalah sekitar 6% dari ruang penyimpanan yang tersedia atau 50 MB. Sedangkan perangkat seluler, batasan bisa lebih rendah, sekitar 10% dari ruang penyimpanan yang tersedia dan ini cuma perkiraan umum, dan ukuran cache maksimal sebenarnya bisa bervariasi tergantung pada banyak faktor, termasuk pengaturan browser, penggunaan memori perangkat, dan kebijakan cache situs tertentu.

{{< lead >}}
**Itu yang saya tahu**
{{</ lead >}}

Setelah **Service Worker** diterapkan, ini akan bekerja dilatar belakang buat mengelola cache dan permintaan jaringan aplikasi web sesuai dengan logika yang udah ditentukan.

![ Screenshot 1 ]( ss1.jpg "Opsi (Install App)" )
![ Screenshot 2 ]( ss2.jpg "Install" )
![ Screenshot 2 ]( ss3.jpg "Proses instalasi selesai" )

Dan bisa kamu lihat, tersedia opsi **Install App** dan bisa langsung diunduh agar diterapkan ke perangkat seperti layaknya Native App, yang membedakannya adalah Web App diakses melalui browser web dengan keunggulan bisa diinstal ke perangkat pengguna agar bekerja diberbagai platform dan perangkat dengan performa yang baik, akses yang cepat dan nyaman, tanpa perlu mengunduh dan menginstal dari toko aplikasi.

{{< lead >}}
**Sekian, saya harap ini bermanfaat dan bisa menambah wawasan, terimakasih**
{{</ lead >}}
