import ExploreBtn from '@/components/ExploreBtn'
import React from 'react'

const Home = () => {
  return (
    <section>
      <h1 className='text-center'> This is the Home page </h1>
      <p> Welcome to the Home page. </p>
      <ExploreBtn />
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {[1, 2, 3, 4, 5].map((event) => (
            <li key={event}>Event {event}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Home