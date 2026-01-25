import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/admin/change-password
 * Cambia la password dell'admin
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

        // Verifica token (per semplicità usiamo il JWT_SECRET)
        if (token !== process.env.JWT_SECRET) {
            return NextResponse.json(
                { error: 'Token non valido' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { newPassword } = body;

        if (!newPassword || newPassword.length < 6) {
            return NextResponse.json(
                { error: 'La nuova password deve essere di almeno 6 caratteri' },
                { status: 400 }
            );
        }

        // Upsert nella tabella admin_settings
        const { error } = await supabase
            .from('admin_settings')
            .upsert({
                key: 'admin_password',
                value: newPassword,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Error updating password in Supabase:', error);
            throw error;
        }

        return NextResponse.json({
            success: true,
            message: 'Password aggiornata con successo',
        });
    } catch (error) {
        console.error('Error during password change:', error);
        return NextResponse.json(
            { error: 'Errore durante il cambio password' },
            { status: 500 }
        );
    }
}
