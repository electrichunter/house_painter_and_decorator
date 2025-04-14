import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/app/api/info/db";

// Kullanıcı profilini güncelleme
export async function PUT(req: NextRequest) {
    try {
        const { id, name, email, img } = await req.json();

        if (!id || !name || !email) {
            return NextResponse.json({ error: "Gerekli alanlar eksik" }, { status: 400 });
        }

        const db = await getDBConnection();

        const [result] = await db.execute(
            "UPDATE users SET name = ?, email = ?, img = ? WHERE id = ?",
            [name, email, img || null, id]
        );

        return NextResponse.json({ success: true, message: "Kullanıcı güncellendi" });
    } catch (error) {
        console.error("Profil güncelleme hatası:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
    