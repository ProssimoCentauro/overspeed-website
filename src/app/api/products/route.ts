import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct, validateProduct } from '@/lib/products';

/**
 * GET /api/products
 * Restituisce tutti i prodotti
 */
export async function GET() {
    try {
        const products = await getProducts();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Errore nel recupero dei prodotti' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/products
 * Crea un nuovo prodotto (richiede autenticazione)
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

        // Verifica token (implementazione semplice)
        // In produzione, usa JWT o NextAuth.js
        if (token !== process.env.JWT_SECRET) {
            return NextResponse.json(
                { error: 'Token non valido' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Valida i dati
        const validation = validateProduct(body);
        if (!validation.valid) {
            return NextResponse.json(
                { error: 'Dati non validi', details: validation.errors },
                { status: 400 }
            );
        }

        // Crea il prodotto
        const newProduct = await createProduct({
            title: body.title,
            description: body.description,
            price: body.price,
            category: body.category || '',
            compatibility: body.compatibility || '',
            condition: body.condition || 'Buono',
            inStock: body.inStock !== false,
            image: body.image || null,
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Errore nella creazione del prodotto' },
            { status: 500 }
        );
    }
}
