import { Suspense } from 'react'
import ExploreBtn from '@/components/ExploreBtn'
import HomeEvents from '@/components/HomeEvents'

const Home = () => {
  return (
    <section>
      <h1 className='text-center'> This is the Home page </h1>
      <p> Welcome to the Home page. </p>
      <ExploreBtn />
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <Suspense fallback={<p>Loading...</p>}>
          <HomeEvents />
        </Suspense>
      </div>
    </section>
  )
}

export default Home