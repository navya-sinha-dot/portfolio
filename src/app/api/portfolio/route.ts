import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src/data/data.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const filePath = path.join(process.cwd(), 'src/data/data.json');
        const newData = await req.json();

        // In a real production environment like Vercel, this won't persist
        // But for local development and requested static file logic:
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
