
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { message: 'Tutti i campi sono obbligatori' },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'overspeed.srls@gmail.com',
            replyTo: email,
            subject: `Nuovo messaggio dal sito web: ${subject}`,
            html: `
                <h3>Hai ricevuto un nuovo messaggio dal sito web</h3>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Oggetto:</strong> ${subject}</p>
                <p><strong>Messaggio:</strong></p>
                <p>${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email inviata con successo' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { message: 'Errore durante l\'invio dell\'email' },
            { status: 500 }
        );
    }
}
