      // --- State Aplikasi ---
      let mahasiswaList = [];

      // --- Fungsi Utama dan Event Listener ---
      document.addEventListener("DOMContentLoaded", () => {
        const weightInputs = document.querySelectorAll('input[id^="w"]');
        weightInputs.forEach((input) => {
          input.addEventListener("input", updateTotalWeight);
        });
        updateTotalWeight();
        renderMahasiswaTable();
      });

      function updateTotalWeight() {
        const weights = getWeights();
        const total = Object.values(weights).reduce((sum, w) => sum + w, 0);
        const totalWeightEl = document.getElementById("totalWeight");
        totalWeightEl.textContent = `Total Bobot: ${total.toFixed(2)}`;

        totalWeightEl.classList.remove("text-danger", "text-success");
        if (total.toFixed(2) !== "1.00") {
          totalWeightEl.classList.add("text-danger");
        } else {
          totalWeightEl.classList.add("text-success");
        }
      }

      function renderMahasiswaTable() {
        const tableBody = document.querySelector("#dataMahasiswa tbody");
        tableBody.innerHTML = "";
        if (mahasiswaList.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="10" class="text-center text-muted p-4">Belum ada data mahasiswa yang ditambahkan.</td></tr>`;
          return;
        }

        mahasiswaList.forEach((mhs, index) => {
          const row = `
                    <tr class="text-center">
                        <td>${index + 1}</td>
                        <td class="text-start">
                            <div class="fw-bold">${mhs.nama}</div>
                            <div class="text-muted small">${mhs.nim}</div>
                        </td>
                        <td>${mhs.c1}</td>
                        <td>${(mhs.c2 * 1000000).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}</td>
                        <td>${mhs.c3}</td>
                        <td>${mhs.c4}</td>
                        <td>${mhs.c5}</td>
                        <td>${mhs.c6}</td>
                        <td>${getSKTMStatus(mhs.c7)}</td>
                        <td>
                            <button onclick="hapusMahasiswa(${index})" class="btn btn-sm btn-outline-danger" title="Hapus">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
          tableBody.innerHTML += row;
        });
      }

      function getSKTMStatus(value) {
        return value === 1 ? "Punya SKTM" : "Tidak punya";
      }

      window.tambahMahasiswa = function () {
        const formValues = {
          nama: document.getElementById("nama").value,
          nim: document.getElementById("nim").value,
          c1: parseFloat(document.getElementById("ipk").value),
          c2: parseFloat(document.getElementById("penghasilan").value),
          c3: parseInt(document.getElementById("tanggungan").value),
          c4: parseInt(document.getElementById("prestasi").value),
          c5: parseInt(document.getElementById("organisasi").value),
          c6: parseInt(document.getElementById("semester").value),
          c7: parseInt(document.getElementById("sktm").value),
        };

        for (const key in formValues) {
          if (!formValues[key] && formValues[key] !== 0) {
            const fieldName =
              document.querySelector(`label[for="${key}"]`)?.textContent || key;
            Swal.fire(
              "Peringatan!",
              `Field '${fieldName}' harus diisi.`,
              "warning"
            );
            return;
          }
        }

        mahasiswaList.push(formValues);
        renderMahasiswaTable();
        clearForm();

        Swal.fire({
  title: "Berhasil!",
  text: "Data mahasiswa berhasil ditambahkan.",
  icon: "success",
  confirmButtonText: "OK",
  showConfirmButton: true
});
      };

      window.hapusMahasiswa = function (index) {
        Swal.fire({
          title: "Anda yakin?",
          text: "Data mahasiswa ini akan dihapus secara permanen!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
            mahasiswaList.splice(index, 1);
            renderMahasiswaTable();
            document.getElementById("hasilSection").style.display = "none";
            Swal.fire("Terhapus!", "Data mahasiswa telah dihapus.", "success");
          }
        });
      };

      window.loadContohData = function () {
        // Data contoh yang lebih realistis dan sesuai dengan kriteria beasiswa
        mahasiswaList = [
          {
            nama: "Ahmad Rizki",
            nim: "210101",
            c1: 3.8,  // IPK tinggi
            c2: 1.2,  // Penghasilan rendah (1.2 juta)
            c3: 5,    // Tanggungan keluarga banyak
            c4: 4,    // Prestasi baik
            c5: 3,    // Organisasi cukup
            c6: 6,    // Semester tinggi (butuh bantuan)
            c7: 1,    // Punya SKTM
          },
          {
            nama: "Siti Nurhaliza",
            nim: "210102",
            c1: 3.6,  // IPK cukup baik
            c2: 0.8,  // Penghasilan sangat rendah
            c3: 6,    // Tanggungan sangat banyak
            c4: 3,    // Prestasi cukup
            c5: 2,    // Organisasi rendah
            c6: 7,    // Semester tinggi
            c7: 1,    // Punya SKTM
          },
          {
            nama: "Budi Santoso",
            nim: "210103",
            c1: 3.9,  // IPK sangat baik
            c2: 2.5,  // Penghasilan menengah
            c3: 2,    // Tanggungan sedikit
            c4: 5,    // Prestasi sangat baik
            c5: 5,    // Organisasi aktif
            c6: 4,    // Semester rendah
            c7: 0,    // Tidak punya SKTM
          },
          {
            nama: "Dewi Lestari",
            nim: "210104",
            c1: 3.4,  // IPK cukup
            c2: 1.0,  // Penghasilan rendah
            c3: 4,    // Tanggungan cukup banyak
            c4: 2,    // Prestasi rendah
            c5: 3,    // Organisasi cukup
            c6: 5,    // Semester cukup tinggi
            c7: 1,    // Punya SKTM
          },
          {
            nama: "Eko Prasetyo",
            nim: "210105",
            c1: 3.2,  // IPK rendah
            c2: 0.5,  // Penghasilan sangat rendah
            c3: 7,    // Tanggungan sangat banyak
            c4: 1,    // Prestasi rendah
            c5: 2,    // Organisasi rendah
            c6: 8,    // Semester sangat tinggi
            c7: 1,    // Punya SKTM
          },
          {
            nama: "Fitri Handayani",
            nim: "210106",
            c1: 3.7,  // IPK baik
            c2: 3.0,  // Penghasilan tinggi
            c3: 1,    // Tanggungan sedikit
            c4: 4,    // Prestasi baik
            c5: 4,    // Organisasi baik
            c6: 3,    // Semester rendah
            c7: 0,    // Tidak punya SKTM
          },
          {
            nama: "Galih Permana",
            nim: "210107",
            c1: 3.5,  // IPK cukup baik
            c2: 1.5,  // Penghasilan rendah
            c3: 3,    // Tanggungan cukup
            c4: 3,    // Prestasi cukup
            c5: 3,    // Organisasi cukup
            c6: 6,    // Semester tinggi
            c7: 1,    // Punya SKTM
          },
          {
            nama: "Hana Kusuma",
            nim: "210108",
            c1: 3.1,  // IPK rendah
            c2: 4.0,  // Penghasilan tinggi
            c3: 2,    // Tanggungan sedikit
            c4: 2,    // Prestasi rendah
            c5: 1,    // Organisasi rendah
            c6: 2,    // Semester rendah
            c7: 0,    // Tidak punya SKTM
          }
        ];
        
        renderMahasiswaTable();
  document.getElementById("hasilSection").style.display = "none";
  Swal.fire({
    title: "Berhasil",
    text: "Data Contoh Berhasil Dimuat.",
    icon: "success", // Ganti dengan icon success (centang hijau)
    confirmButtonText: "OK",
    showConfirmButton: true // Pastikan tombol confirm ada
  }).then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

      window.resetData = function () {
        Swal.fire({
          title: "Reset Semua Data?",
          text: "Tindakan ini akan menghapus semua data mahasiswa dan hasil perhitungan.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Ya, reset!",
          cancelButtonText: "Batal",
        }).then((result) => {
          if (result.isConfirmed) {
            mahasiswaList = [];
            renderMahasiswaTable();
            document.getElementById("hasilSection").style.display = "none";
            Swal.fire("Berhasil!", "Semua data telah direset.", "success");
          }
        });
      };

      window.hitungSAW = function () {
  if (mahasiswaList.length < 2) {
    Swal.fire(
      "Peringatan!",
      "Tambahkan minimal 2 data mahasiswa untuk dihitung.",
      "warning"
    );
    return;
  }
  if (
    parseFloat(
      document.getElementById("totalWeight").textContent.split(": ")[1]
    ) !== 1.0
  ) {
    Swal.fire(
      "Peringatan!",
      "Total bobot kriteria harus sama dengan 1.00.",
      "warning"
    );
    return;
  }

  const weights = getWeights();
  const jumlahRekomendasi =
    parseInt(document.getElementById("jumlahRekomendasi").value) || 3;
  const criteriaTypes = {
    c1: "benefit", // IPK (semakin tinggi semakin baik)
    c2: "cost",    // Penghasilan (semakin rendah semakin baik)
    c3: "benefit", // Tanggungan (semakin banyak semakin butuh)
    c4: "benefit", // Prestasi (semakin tinggi semakin baik)
    c5: "benefit", // Organisasi (semakin tinggi semakin baik)
    c6: "benefit", // Semester (semakin tinggi semakin butuh)
    c7: "benefit", // SKTM (semakin tinggi semakin butuh)
  };

  // Periksa apakah SKTM memiliki bobot 100%
  const isSktmFullWeight = weights.w7 === 1;

  const minMax = {};
  Object.keys(criteriaTypes).forEach((c) => {
    const values = mahasiswaList.map((mhs) => mhs[c]);
    minMax[c] =
      criteriaTypes[c] === "benefit"
        ? Math.max(...values)
        : Math.min(...values);
  });

  const normalizedMatrix = mahasiswaList.map((mhs) => {
    const normalized = { nama: mhs.nama };
    Object.keys(criteriaTypes).forEach((c) => {
      const val = mhs[c];
      const maxMinVal = minMax[c];
      if (criteriaTypes[c] === "benefit") {
        normalized[c] = val / maxMinVal || 0;
      } else {
        normalized[c] = maxMinVal / val || 0;
      }
    });
    return normalized;
  });

  const finalScores = mahasiswaList.map((mhs, index) => {
    let score = 0;
    Object.keys(weights).forEach((wKey) => {
      const cKey = "c" + wKey.substring(1);
      score += normalizedMatrix[index][cKey] * weights[wKey];
    });
    return { 
      nama: mhs.nama, 
      nim: mhs.nim, 
      skor: score,
      hasSktm: mhs.c7 === 1 // Tambahkan flag untuk menandai punya SKTM
    };
  });

  // Urutkan berdasarkan skor
  finalScores.sort((a, b) => b.skor - a.skor);
  
  // Filter jika SKTM bobot 100%
  let filteredScores = finalScores;
  if (isSktmFullWeight) {
    filteredScores = finalScores.filter(mhs => mhs.hasSktm);
    
    // Tampilkan peringatan jika jumlah rekomendasi melebihi yang punya SKTM
    if (jumlahRekomendasi > filteredScores.length) {
      Swal.fire({
        icon: 'info',
        title: 'Informasi',
        text: `Hanya ada ${filteredScores.length} mahasiswa yang memiliki SKTM. Jumlah rekomendasi disesuaikan.`,
        
        showConfirmButton: false
      });
    }
  }

  // Beri peringkat setelah filter
  filteredScores.forEach((item, index) => (item.rank = index + 1));

  renderHasil(
    mahasiswaList,
    normalizedMatrix,
    filteredScores,
    Math.min(jumlahRekomendasi, filteredScores.length) // Jangan melebihi jumlah yang tersedia
  );
  
  const hasilSection = document.getElementById("hasilSection");
  hasilSection.style.display = "block";
  hasilSection.scrollIntoView({ behavior: "smooth", block: "start" });
};

      // --- Fungsi Helper ---

      function getWeights() {
        return {
          w1: parseFloat(document.getElementById("w1").value) || 0,
          w2: parseFloat(document.getElementById("w2").value) || 0,
          w3: parseFloat(document.getElementById("w3").value) || 0,
          w4: parseFloat(document.getElementById("w4").value) || 0,
          w5: parseFloat(document.getElementById("w5").value) || 0,
          w6: parseFloat(document.getElementById("w6").value) || 0,
          w7: parseFloat(document.getElementById("w7").value) || 0,
        };
      }

      function clearForm() {
        const fields = [
          "nama",
          "nim",
          "ipk",
          "penghasilan",
          "tanggungan",
          "prestasi",
          "organisasi",
          "semester",
          "sktm",
        ];
        fields.forEach((id) => (document.getElementById(id).value = ""));
        document.getElementById("nama").focus();
      }

      function renderHasil(decision, normalized, ranked, jumlahRekomendasi) {
        const headers = [
          "Alternatif",
          "C1",
          "C2",
          "C3",
          "C4",
          "C5",
          "C6",
          "C7",
        ];
        const theadHtml = `<thead class="table-light"><tr>${headers
          .map((h) => `<th>${h}</th>`)
          .join("")}</tr></thead>`;

        let tableDecisionHTML = `${theadHtml}<tbody>`;
        decision.forEach((mhs) => {
          tableDecisionHTML += `<tr><td class="fw-bold">${
            mhs.nama
          }</td>${Object.keys(mhs)
            .filter((k) => k.startsWith("c"))
            .map(
              (k) => `<td>${k === "c7" ? getSKTMStatus(mhs[k]) : mhs[k]}</td>`
            )
            .join("")}</tr>`;
        });
        tableDecisionHTML += "</tbody>";
        document.getElementById("matriksKeputusan").innerHTML =
          tableDecisionHTML;

        let tableNormalizedHTML = `${theadHtml}<tbody>`;
        normalized.forEach((norm) => {
          tableNormalizedHTML += `<tr><td class="fw-bold">${
            norm.nama
          }</td>${Object.keys(norm)
            .filter((k) => k.startsWith("c"))
            .map((k) => `<td>${norm[k].toFixed(3)}</td>`)
            .join("")}</tr>`;
        });
        tableNormalizedHTML += "</tbody>";
        document.getElementById("matriksNormalisasi").innerHTML =
          tableNormalizedHTML;

        let tableFinalHTML = `<thead class="table-light"><tr><th>Peringkat</th><th>Nama</th><th>NIM</th><th>Skor Akhir</th></tr></thead><tbody>`;
        ranked.forEach((res, index) => {
          const rowClass =
            index < jumlahRekomendasi ? "table-success fw-bold" : "";
          tableFinalHTML += `<tr class="${rowClass}"><td>${res.rank}</td><td>${
            res.nama
          }</td><td>${res.nim}</td><td>${res.skor.toFixed(4)}</td></tr>`;
        });
        tableFinalHTML += "</tbody>";
        document.getElementById("hasilAkhir").innerHTML = tableFinalHTML;

        // Menampilkan rekomendasi sesuai jumlah yang diminta
        const rekomendasi = ranked.slice(0, jumlahRekomendasi);
        let rekomendasiHTML = "";
        rekomendasi.forEach((item, index) => {
          rekomendasiHTML += `<div class="mb-2"><span class="fw-bold">${
            index + 1
          }. ${item.nama}</span> <br> <small>(Skor: ${item.skor.toFixed(
            4
          )})</small></div>`;
          if (index < rekomendasi.length - 1) rekomendasiHTML += "<hr>";
        });
        document.getElementById("rekomendasiText").innerHTML = rekomendasiHTML;
      }