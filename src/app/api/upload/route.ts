import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

/**
 * POST /api/upload
 * Upload immagine prodotto (richiede autenticazione)
 */
export async function POST(request: NextRequest) {
    try {
        // Verifica autenticazione
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Non autorizzato' },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        if (token !== process.env.JWT_SECRET) {
            return NextResponse.json(
                { error: 'Token non valido' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Nessun file caricato' },
                { status: 400 }
            );
        }

        // Verifica tipo file
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'Il file deve essere un\'immagine' },
                { status: 400 }
            );
        }

        // Crea directory uploads se non esiste
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory già esistente
        }

        // Genera nome file unico
        const timestamp = Date.now();
        const extension = file.name.split('.').pop();
        const filename = `product-${timestamp}.${extension}`;
        const filepath = path.join(uploadsDir, filename);

        // Salva file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Restituisci URL pubblico
        const publicUrl = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: 'Errore durante l\'upload del file' },
            { status: 500 }
        );
    }
}
