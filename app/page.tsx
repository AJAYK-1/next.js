import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { IEvent } from '@/database/event.model'

const BASE_URL = process.env.NEXT_PUBLIC_HOST_URL

const Home = async () => {
  const response = await fetch(`${BASE_URL}/api/events`)
  const { events } = await response.json()

  return (
    <section>
      <h1 className='text-center'> This is the Home page </h1>
      <p> Welcome to the Home page. </p>
      <ExploreBtn />
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {events.map((event: IEvent) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Home