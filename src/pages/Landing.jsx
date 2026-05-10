import React, { use } from 'react'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import PricingSection from '../components/landing/PricingSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CTASection from '../components/landing/CTASection'
import FooterSection from '../components/landing/FooterSection'
import { featureList, testimonials } from '../assets/data.js'
import { pricingPlans } from '../assets/data.js' 


// Import other sections as needed
import { Features } from 'tailwindcss'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

const Landing = () => {
  const {openSignIn,openSignUp} = useClerk();
  const {isSignedIn} = useUser();
  const  navigate = useNavigate();
  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);  
  return (
    <div className="landing-page bg-linear-to-b from-gray-50 to-gray-100 ">
        {/*Hero Section*/}
        <HeroSection  openSignIn={openSignIn} openSignUp={openSignUp} /> 

        {/*Features Section*/}
        <FeaturesSection featureList={featureList}/> 

        {/*Pricing Section*/}
        <PricingSection  pricingPlans={pricingPlans} openSignUp={openSignUp}/>

        {/*Testimonials Section*/}
        <TestimonialsSection  testimonials={testimonials}/>

        {/*CTA(Call to action) Section*/}
        <CTASection  openSignUp={openSignUp}/>

        {/*Footer Section*/}
        <FooterSection />

    </div>
  )
}

export default Landing
