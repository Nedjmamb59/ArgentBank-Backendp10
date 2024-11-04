import React from 'react'
import Banner from '../../components/banner'
import features from '../../assets/data/features'
import FeaturesSection from '../../components/features'

function Home() {
  return (
    
    <main>
      <Banner />
      <section className='features'>
        <h2 className='sr-only'>Features</h2>
        {
          features.map((feature, index ) => (
            <FeaturesSection
            key={index}
            image={feature.image}
            alt={feature.alt}
            titre={feature.title}
            description={feature.content}
            />
          ))
        }

      </section>
    </main>
  )
}

export default Home