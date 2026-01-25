import fs from 'fs/promises';
import path from 'path';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category?: string;
    compatibility?: string;
    condition?: 'Eccellente' | 'Buono' | 'Discreto';
    inStock: boolean;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
}

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

/**
 * Legge tutti i prodotti dal file JSON
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products:', error);
        return [];
    }
}

/**
 * Ottiene un singolo prodotto per ID
 */
export async function getProductById(id: number): Promise<Product | null> {
    const products = await getProducts();
    return products.find(p => p.id === id) || null;
}

/**
 * Crea un nuovo prodotto
 */
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const products = await getProducts();

    // Genera nuovo ID
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct: Product = {
        ...productData,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);
    await saveProducts(products);

    return newProduct;
}

/**
 * Aggiorna un prodotto esistente
 */
export async function updateProduct(id: number, productData: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product | null> {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...productData,
        id, // Assicura che l'ID non cambi
        updatedAt: new Date().toISOString(),
    };

    await saveProducts(products);
    return products[index];
}

/**
 * Elimina un prodotto
 */
export async function deleteProduct(id: number): Promise<boolean> {
    const products = await getProducts();
    const filteredProducts = products.filter(p => p.id !== id);

    if (filteredProducts.length === products.length) {
        return false; // Prodotto non trovato
    }

    await saveProducts(filteredProducts);
    return true;
}

/**
 * Salva i prodotti nel file JSON
 */
async function saveProducts(products: Product[]): Promise<void> {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

/**
 * Valida i dati del prodotto
 */
export function validateProduct(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
        errors.push('Il titolo è obbligatorio');
    }

    if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
        errors.push('La descrizione è obbligatoria');
    }

    if (typeof data.price !== 'number' || data.price <= 0) {
        errors.push('Il prezzo deve essere un numero positivo');
    }

    if (data.condition && !['Eccellente', 'Buono', 'Discreto'].includes(data.condition)) {
        errors.push('Condizione non valida');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
