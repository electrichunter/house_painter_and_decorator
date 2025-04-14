import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDBConnection } from "@/app/api/info/db";
import { RowDataPacket } from "mysql2";

// POST ile login ve register işlemleri
export async function POST(req: NextRequest) {
    try {
        const { action, email, password, name } = await req.json();

        // Gerekli alanların olup olmadığını kontrol et
        if (!action || !email || !password) {
            return NextResponse.json({ error: "Gerekli alanlar eksik" }, { status: 400 });
        }

        const db = await getDBConnection();

        // Login işlemi
        if (action === "login") {
            const [rows] = await db.execute<RowDataPacket[]>("SELECT id, name, email, password FROM users WHERE email = ?", [email]);

            // Kullanıcıyı bulamadık
            if (!Array.isArray(rows) || rows.length === 0) {
                return NextResponse.json({ error: "Geçersiz giriş bilgileri" }, { status: 401 });
            }

            const user = rows[0] as { id: number; name: string; email: string; password: string };
            
            // Şifreyi kontrol et
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return NextResponse.json({ error: "Geçersiz giriş bilgileri" }, { status: 401 });
            }

            // Başarılı giriş, kullanıcının bilgilerini döndür
            return NextResponse.json({
                message: "Giriş başarılı",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            }, { status: 200 });
        }

        // Register işlemi
        if (action === "register") {
            const [existingUsers] = await db.execute<RowDataPacket[]>("SELECT id FROM users WHERE email = ?", [email]);

            // Kullanıcı zaten var mı kontrol et
            if (Array.isArray(existingUsers) && existingUsers.length > 0) {
                return NextResponse.json({ error: "Bu e-posta zaten kullanılıyor" }, { status: 400 });
            }

            // Şifreyi hash'le
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Yeni kullanıcıyı veritabanına ekle
            await db.execute("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())", [name, email, hashedPassword]);

            return NextResponse.json({ message: "Kayıt başarılı" }, { status: 201 });
        }

        return NextResponse.json({ error: "Geçersiz işlem" }, { status: 400 });
    } catch (error) {
        console.error("Auth API Hatası:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}

// GET isteği için eklenen yeni fonksiyon
export async function GET(req: NextRequest) {
    return NextResponse.json({ message: "Bu endpoint yalnızca POST metodunu destekler." }, { status: 405 });
}
