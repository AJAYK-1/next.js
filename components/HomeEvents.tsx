import EventCard from '@/components/EventCard'
import { IEvent } from '@/database/event.model'

const BASE_URL = process.env.NEXT_PUBLIC_HOST_URL

const HomeEvents = async () => {

    const response = await fetch(`${BASE_URL}/api/events`, {
        next: { revalidate: 60 }
    })

    const { events } = await response.json()

    return (
        <ul className='events'>
            {events.map((event: IEvent) => (
                <li key={event.title}>
                    <EventCard {...event} />
                </li>
            ))}
        </ul>
    )
}

export default HomeEvents