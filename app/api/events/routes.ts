import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const formData = await req.formData()
        let event;

        try {
            event = Object.entries(formData.entries())
        } catch (error) {
            return NextResponse.json({ message: "Invalid JSON data format" }, { status: 400 })
        }

        const file = formData.get('image') as File;

        if (!file) return NextResponse.json({ message: 'Image file is required' }, { status: 400 })

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const createdEvent = await Event.create(event)
        return NextResponse.json({ message: "Event created successfully", event: createdEvent }, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Event Creation failed", error: error instanceof Error ? error.message : "Unknown" })
    }
}