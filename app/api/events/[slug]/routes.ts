import connectDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

type RouteParams = {
    params: Promise<{
        slug: string
    }>
}

export async function GET(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
    try {
        await connectDB()
        const { slug } = await params

        if (!slug || typeof slug !== 'string' || slug.trim() === '')
            return NextResponse.json(
                { message: 'Invalid or missing slyg parameter' },
                { status: 400 },
            )

        const sanitizedSlug = slug.trim().toLocaleLowerCase()

    } catch (error) {

    }

}