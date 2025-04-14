import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { getDBConnection } from "@/app/api/info/db"; // DB bağlantısı
import { OkPacket } from "mysql2";

// Multer'ı yapılandırma
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/profile'); // Resimleri 'public/profile' klasörüne kaydet
    },
    filename: (req, file, cb) => {
      const userId = req.url?.split("/").pop(); // URL'den kullanıcı ID'sini almak
      cb(null, `${userId}_${file.originalname}`); // Dosya ismini kullanıcı ID'siyle birleştiriyoruz
    }
  }),
});

export async function POST(req: NextRequest) {
  return new Promise((resolve, reject) => {
    upload.single('image')(req as any, {} as any, async (err: any) => {
      if (err) {
        console.error('Multer error:', err);  // Hata mesajını konsola yazdır
        return reject(NextResponse.json({ error: "Resim yüklenirken bir hata oluştu" }, { status: 500 }));
      }

      const userId = req.url?.split("/").pop(); // Kullanıcı ID'sini URL'den almak
      const multerReq = req as any; // Multer'ın request nesnesini kullanmak
      const imagePath = `/profile/${userId}_${multerReq.file?.originalname}`; // Yüklenen resmin yolunu oluşturmak

      // Veritabanına img yolunu kaydetmek
      const db = await getDBConnection();
      const [result] = await db.execute<OkPacket>(
        "UPDATE users SET img = ? WHERE id = ?",
        [imagePath, userId]
      );

      if (result.affectedRows > 0) {
        return resolve(NextResponse.json({ success: true, imgUrl: imagePath }, { status: 200 }));
      } else {
        return reject(NextResponse.json({ error: "Kullanıcı güncellenemedi" }, { status: 500 }));
      }
    });
  });
}
