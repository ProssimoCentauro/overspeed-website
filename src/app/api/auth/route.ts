import { NextRequest, NextResponse } from 'next/server';

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

        // Verifica password
        if (password !== process.env.ADMIN_PASSWORD) {
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
