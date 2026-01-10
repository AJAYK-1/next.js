import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'

const events = [
  { image: '/images/event1.png', title: 'Event 1' },
  { image: '/images/event2.png', title: 'Event 2' },
]

const Home = () => {
  return (
    <section>
      <h1 className='text-center'> This is the Home page </h1>
      <p> Welcome to the Home page. </p>
      <ExploreBtn />
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {events.map((event) => (
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