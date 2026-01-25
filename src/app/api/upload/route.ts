import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/upload
 * Upload immagine prodotto su Supabase Storage (richiede autenticazione)
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

        // Prepara il file per l'upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Genera nome file unico
        const timestamp = Date.now();
        const extension = file.name.split('.').pop() || 'jpg';
        const filename = `product-${timestamp}.${extension}`;

        // Carica su Supabase Storage
        const { data, error } = await supabase.storage
            .from('products')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw new Error(error.message);
        }

        // Ottieni URL pubblico
        const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(filename);

        return NextResponse.json({
            success: true,
            url: publicUrl,
        });
    } catch (error: any) {
        console.error('Error uploading file:', error);
        return NextResponse.json(
            { error: `Errore durante l'upload: ${error.message}` },
            { status: 500 }
        );
    }
}
