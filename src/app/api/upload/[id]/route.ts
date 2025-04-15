// Next.js API Route kullanarak dosya yükleme işlemi yapacağımız kod

import { NextResponse } from 'next/server'; // Next.js'in yanıtları için
import formidable, { type File } from 'formidable'; // formidable ile dosya yükleme
import { IncomingMessage } from 'http'; // Node.js HTTP istek nesnesi
import { Readable } from 'stream'; // Buffer'dan stream oluşturmak için
import fs from 'fs'; // Dosya işlemleri için
import path from 'path'; // Yol işlemleri için

// Bu ayar, Next.js'in varsayılan body parser'ını devre dışı bırakır,
// çünkü dosya yüklemeleri için özel işleme yapmamız gerekiyor.
export const config = {
  api: {
    bodyParser: false, // Dosya yüklemeleri için body parser'ı kapatıyoruz.
  },
};

// Buffer'dan Readable stream oluşturmak için yardımcı fonksiyon
const bufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable();
  stream.push(buffer); // Buffer'ı streame ekliyoruz
  stream.push(null); // Stream'in sonunu belirtiyoruz
  return stream; // Stream döndürüyoruz
};

// POST isteği için ana işlev
export async function POST(req: Request) {
  try {
    // 1. Adım: Gelen isteği arrayBuffer olarak okuyup Buffer'a dönüştürüyoruz
    const buf = Buffer.from(await req.arrayBuffer()); // Buffer’a dönüştürme işlemi

    // 2. Adım: İsteğin headers'ını alıyoruz ve 'content-length' başlığının olup olmadığını kontrol ediyoruz
    const headers = Object.fromEntries(req.headers.entries()); // Headers'ı alıyoruz
    if (!headers['content-length']) { // Eğer 'content-length' başlığı yoksa
      headers['content-length'] = buf.length.toString(); // Buffer uzunluğunu ekliyoruz
    }

    // 3. Adım: Buffer'dan stream oluşturuyoruz
    const stream = bufferToStream(buf);

    // 4. Adım: Node.js IncomingMessage benzeri bir nesne oluşturuyoruz
    const nodeReq = Object.assign(stream, { headers }) as unknown as IncomingMessage;

    // 5. Adım: Dosyaların saklanacağı dizini kontrol ediyoruz
    const uploadDir = path.join(process.cwd(), 'public/profile'); // Profil resimleri için dizin
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true }); // Eğer dizin yoksa, oluşturuyoruz

    // 6. Adım: formidable'ı ayarlıyoruz, dosyaların nerede kaydedileceğini ve dosya ismini nasıl belirleyeceğimizi belirliyoruz
    const form = formidable({
      uploadDir, // Dosyaların yükleneceği dizin
      keepExtensions: true, // Dosya uzantısını koruyoruz
      filename: (name, ext, part) => {
        return `profile_${Date.now()}${ext}`; // Dosya adını tarih ile benzersiz yapıyoruz
      },
    });

    // 7. Adım: Formidable'ı Promise ile sarmalıyoruz
    return new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => { // form.parse ile verileri işliyoruz
        if (err) { // Eğer bir hata oluşursa
          console.error("Formidable hatası:", err); // Hata mesajını yazdırıyoruz
          return resolve(
            NextResponse.json({ success: false, error: err.message }, { status: 500 }) // Hata yanıtı
          );
        }

        // 8. Adım: Yüklenen dosyayı kontrol ediyoruz
        const fileEntry = files.image; // 'image' alanındaki dosyayı alıyoruz
        if (!fileEntry) { // Eğer dosya yoksa
          console.error("Dosya bulunamadı"); // Hata mesajı
          return resolve(
            NextResponse.json({ success: false, error: "Dosya bulunamadı" }, { status: 400 }) // Hata yanıtı
          );
        }

        // 9. Adım: Eğer birden fazla dosya gönderildiyse, ilkini alıyoruz
        const file: File = Array.isArray(fileEntry) ? fileEntry[0] : fileEntry;
        const filePath = `/profile/${path.basename(file.filepath)}`; // Yüklenen dosyanın yolu
        console.log("Dosya başarıyla yüklendi:", filePath); // Başarılı yükleme mesajı

        // 10. Adım: Başarı durumu ve dosya yolunu döndürüyoruz
        return resolve(
          NextResponse.json({ success: true, imgUrl: filePath }, { status: 200 }) // Başarı yanıtı
        );
      });
    });
  } catch (error) {
    console.error("Sunucu hatası:", error); // Genel hata mesajı
    return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 }); // Hata yanıtı
  }
}
/* yordu :) */