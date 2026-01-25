import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/products';

/**
 * GET /api/products/[id]
 * Restituisce un singolo prodotto
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'ID non valido' },
                { status: 400 }
            );
        }

        const product = await getProductById(id);

        if (!product) {
            return NextResponse.json(
                { error: 'Prodotto non trovato' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Errore nel recupero del prodotto' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/products/[id]
 * Aggiorna un prodotto (richiede autenticazione)
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'ID non valido' },
                { status: 400 }
            );
        }

        const body = await request.json();

        const updatedProduct = await updateProduct(id, body);

        if (!updatedProduct) {
            return NextResponse.json(
                { error: 'Prodotto non trovato' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Errore nell\'aggiornamento del prodotto' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/products/[id]
 * Elimina un prodotto (richiede autenticazione)
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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

        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'ID non valido' },
                { status: 400 }
            );
        }

        const deleted = await deleteProduct(id);

        if (!deleted) {
            return NextResponse.json(
                { error: 'Prodotto non trovato' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Errore nell\'eliminazione del prodotto' },
            { status: 500 }
        );
    }
}
