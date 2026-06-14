<?php
// Konfigurasi respons sebagai JSON
header('Content-Type: application/json');

// Pastikan request yang masuk adalah POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // 1. Tangkap data teks dari form
    $topik = $_POST['topik'] ?? '';
    $deskripsi = $_POST['deskripsi'] ?? '';
    $metode = $_POST['metode'] ?? '';
    
    // 2. Tangkap file yang diunggah
    if (isset($_FILES['dokumen']) && $_FILES['dokumen']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['dokumen']['tmp_name'];
        $fileName = $_FILES['dokumen']['name'];
        
        // Buat nama file unik agar tidak tertimpa
        $newFileName = time() . '_' . preg_replace("/[^a-zA-Z0-9.]/", "_", $fileName);
        
        // Tentukan direktori tujuan (folder uploads yang baru kita buat)
        $destPath = 'uploads/' . $newFileName;
        
        // Pindahkan file dari memori sementara ke folder tujuan
        if(move_uploaded_file($fileTmpPath, $destPath)) {
            
            // TODO: Nanti di sini kita tambahkan kode untuk menyimpan data ke MySQL
            
            echo json_encode([
                "status" => "success",
                "pesan" => "Pengajuan berhasil dan file $newFileName tersimpan!"
            ]);
        } else {
            echo json_encode(["status" => "error", "pesan" => "Gagal memindahkan file ke server."]);
        }
    } else {
        echo json_encode(["status" => "error", "pesan" => "Tidak ada file yang diunggah atau terjadi kesalahan."]);
    }
} else {
    echo json_encode(["status" => "error", "pesan" => "Metode tidak diizinkan."]);
}
?>