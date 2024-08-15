// Menangani event saat formulir dikirimkan
document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman formulir agar dapat memproses data terlebih dahulu

    let gender = document.getElementById('gender').value; // Mendapatkan nilai dari dropdown jenis kelamin
    let heightInput = document.getElementById('height'); // Mendapatkan elemen input tinggi badan
    let weightInput = document.getElementById('weight'); // Mendapatkan elemen input berat badan

    // Reset error styles dan value sebelum melakukan validasi
    resetErrors(heightInput, weightInput);

    let hasError = false; // Variabel untuk melacak apakah ada kesalahan validasi

    // Validasi input kosong
    if (gender === "" || heightInput.value.trim() === "" || weightInput.value.trim() === "") {
        if (gender === "") {
            document.getElementById('genderError').textContent = "Jenis kelamin harus dipilih!"; // Pesan error untuk jenis kelamin
        }
        if (heightInput.value.trim() === "") {
            heightInput.classList.add('error'); // Menambahkan kelas error untuk input tinggi badan
            heightInput.value = ""; // Menghapus nilai input
            heightInput.placeholder = "Tinggi badan tidak boleh kosong!"; // Pesan kesalahan
        }
        if (weightInput.value.trim() === "") {
            weightInput.classList.add('error'); // Menambahkan kelas error untuk input berat badan
            weightInput.value = ""; // Menghapus nilai input
            weightInput.placeholder = "Berat badan tidak boleh kosong!"; // Pesan kesalahan
        }
        hasError = true; // Menandai bahwa ada kesalahan
    }

    // Validasi input harus angka
    if (!isValidNumber(heightInput.value) && heightInput.value.trim() !== "") {
        heightInput.classList.add('error'); // Menambahkan kelas error untuk input tinggi badan
        heightInput.value = ""; // Menghapus nilai input
        heightInput.placeholder = "Harap masukkan angka!"; // Pesan kesalahan
        hasError = true; // Menandai bahwa ada kesalahan
    }
    if (!isValidNumber(weightInput.value) && weightInput.value.trim() !== "") {
        weightInput.classList.add('error'); // Menambahkan kelas error untuk input berat badan
        weightInput.value = ""; // Menghapus nilai input
        weightInput.placeholder = "Harap masukkan angka!"; // Pesan kesalahan
        hasError = true; // Menandai bahwa ada kesalahan
    }

    if (hasError) return; // Jika ada kesalahan, hentikan proses lebih lanjut

    // Hitung BMI
    let height = parseFloat(heightInput.value) / 100; // Konversi tinggi badan dari cm ke meter
    let weight = parseFloat(weightInput.value); // Konversi berat badan ke angka
    let bmi = (weight / (height * height)).toFixed(2); // Hitung BMI dan format dengan dua desimal

    // Tampilkan hasil BMI dan deskripsi
    document.getElementById('bmiValue').textContent = `BMI: ${bmi}`; // Tampilkan nilai BMI
    let bmiResult = getBMIResult(bmi); // Ambil deskripsi dan saran berdasarkan nilai BMI
    document.getElementById('bmiDescription').innerHTML = bmiResult.description + '<br>' + bmiResult.advice; // Tampilkan deskripsi dan saran
});

// Fungsi untuk mereset gaya dan pesan error
function resetErrors(heightInput, weightInput) {
    heightInput.classList.remove('error'); // Hapus kelas error dari input tinggi badan
    weightInput.classList.remove('error'); // Hapus kelas error dari input berat badan
    document.getElementById('genderError').textContent = ""; // Reset pesan error untuk jenis kelamin
    heightInput.placeholder = "Tinggi badan (cm)"; // Reset placeholder untuk input tinggi badan
    weightInput.placeholder = "Berat badan (kg)"; // Reset placeholder untuk input berat badan
}

// Fungsi untuk memeriksa apakah nilai adalah angka yang valid
function isValidNumber(value) {
    return !isNaN(value) && value.trim() !== "" && /^[0-9]+(\.[0-9]+)?$/.test(value);
}

// Fungsi untuk mendapatkan hasil BMI dan saran berdasarkan nilai BMI
function getBMIResult(bmi) {
    let result = {
        description: "",
        advice: ""
    };

    if (bmi < 18.5) {
        result.description = "Anda berada dalam kategori kekurangan berat badan.";
        result.advice = "Disarankan untuk mengonsumsi lebih banyak kalori dengan nutrisi seimbang.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        result.description = "Anda berada dalam kategori berat badan normal.";
        result.advice = "Pertahankan gaya hidup sehat dengan diet seimbang dan olahraga teratur.";
    } else if (bmi >= 25 && bmi <= 29.9) {
        result.description = "Anda berada dalam kategori kelebihan berat badan.";
        result.advice = "Disarankan untuk meningkatkan aktivitas fisik dan mengontrol asupan kalori.";
    } else {
        result.description = "Anda berada dalam kategori obesitas.";
        result.advice = "Disarankan untuk konsultasi dengan dokter untuk penanganan lebih lanjut.";
    }

    return result; // Kembalikan objek hasil
}
