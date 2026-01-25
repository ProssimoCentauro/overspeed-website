import { supabase } from './supabase';

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
    createdAt?: string;
    updatedAt?: string;
}

/*
  SQL Schema per Supabase:
  
  create table products (
    id bigint primary key generated always as identity,
    title text not null,
    description text not null,
    price numeric not null,
    category text,
    compatibility text,
    condition text check (condition in ('Eccellente', 'Buono', 'Discreto')),
    in_stock boolean default true,
    image text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );
*/

/**
 * Legge tutti i prodotti da Supabase
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(p => ({
            ...p,
            inStock: p.in_stock,
            createdAt: p.created_at,
            updatedAt: p.updated_at
        }));
    } catch (error) {
        console.error('Error reading products from Supabase:', error);
        return [];
    }
}

/**
 * Ottiene un singolo prodotto per ID
 */
export async function getProductById(id: number): Promise<Product | null> {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) return null;

        return {
            ...data,
            inStock: data.in_stock,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        };
    } catch (error) {
        console.error('Error fetching product from Supabase:', error);
        return null;
    }
}

/**
 * Crea un nuovo prodotto
 */
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert([{
                title: productData.title,
                description: productData.description,
                price: productData.price,
                category: productData.category,
                compatibility: productData.compatibility,
                condition: productData.condition,
                in_stock: productData.inStock,
                image: productData.image
            }])
            .select()
            .single();

        if (error) throw error;

        return {
            ...data,
            inStock: data.in_stock,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        };
    } catch (error) {
        console.error('Error creating product in Supabase:', error);
        return null;
    }
}

/**
 * Aggiorna un prodotto esistente
 */
export async function updateProduct(id: number, productData: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product | null> {
    try {
        const updatePayload: any = {
            ...productData,
            updated_at: new Date().toISOString()
        };

        if (productData.inStock !== undefined) {
            updatePayload.in_stock = productData.inStock;
            delete updatePayload.inStock;
        }

        const { data, error } = await supabase
            .from('products')
            .update(updatePayload)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return {
            ...data,
            inStock: data.in_stock,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        };
    } catch (error) {
        console.error('Error updating product in Supabase:', error);
        return null;
    }
}

/**
 * Elimina un prodotto
 */
export async function deleteProduct(id: number): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error deleting product from Supabase:', error);
        return false;
    }
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
