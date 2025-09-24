import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, project, timeline, reference } = body;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error sending message' }, { status: 500 });
    }
}
