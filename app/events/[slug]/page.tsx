import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_HOST_URL

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
  <div className='flex-row-gap-2 items-center'>
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
)

const EventDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const request = await fetch(`${BASE_URL}/api/events/${slug}`)
  const { event: { description, image, overview, date, time, location, mode, agenda, audiance, tags } } = await request.json()

  if (!description) return notFound()

  return (
    <section id='event'>
      <div className='header'>
        <h1> Event Description </h1>
        <p className='mt-2'> {description} </p>
      </div>

      <div className='details'>
        <div className='content'>
          <Image src={image} alt='Event Banner' width={800} className='banner' />

          <section className='flex-col-gap-2'>
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className='flex-col-gap-2'>
            <h2>Event Details</h2>
            <EventDetailItem icon='/icons/calender.svg' alt='calender' label={date} />
          </section>
        </div>

        <aside className='booking'>
          <p className='text-lg'>Book Event</p>
        </aside>
      </div>
    </section>
  )
}

export default EventDetails