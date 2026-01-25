import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/auth
 * Autenticazione admin
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password) {
            return NextResponse.json(
                { error: 'Password richiesta' },
                { status: 400 }
            );
        }

        // Recupera la password dai settings di Supabase
        const { data: settings, error: settingsError } = await supabase
            .from('admin_settings')
            .select('value')
            .eq('key', 'admin_password')
            .single();

        let validPassword = process.env.ADMIN_PASSWORD;

        if (!settingsError && settings) {
            validPassword = settings.value;
        }

        // Verifica password
        if (password !== validPassword) {
            return NextResponse.json(
                { error: 'Password non corretta' },
                { status: 401 }
            );
        }

        // In una implementazione reale, qui genereresti un JWT
        // Per semplicità, usiamo il JWT_SECRET come token
        const token = process.env.JWT_SECRET;

        return NextResponse.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        return NextResponse.json(
            { error: 'Errore durante l\'autenticazione' },
            { status: 500 }
        );
    }
}
