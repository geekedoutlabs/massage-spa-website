// File: src/pages/index.tsx
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Modern animated navbar with gradient effect
const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg py-2 text-gray-900' 
        : 'bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm py-4 text-white'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mr-10"
            >
              <h1 className="font-serif text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Serenity Spa</h1>
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`font-medium hover:text-purple-400 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-purple-400 after:transition-all after:duration-300 ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Book Now
            </motion.button>
            
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4"
            >
              <div className="flex flex-col space-y-4 pb-4">
                {['Home', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`font-medium py-2 hover:text-purple-400 transition ${
                      isScrolled ? 'text-gray-800' : 'text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Enhanced Service Card with 3D hover effect
const ServiceCard = ({ title, description, image, price }) => {
  return (
    <motion.div 
      whileHover={{ 
        y: -15, 
        rotateY: 5,
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="relative h-72">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <span className="bg-purple-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
            ${price}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-5">{description}</p>
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book Now
          </motion.button>
          <a href="#details" className="text-indigo-600 hover:text-indigo-800 font-medium transition">View Details</a>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced testimonial card with subtle animations
const Testimonial = ({ quote, author, position, image }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true, margin: "-100px" }}
    className="bg-white p-8 rounded-2xl shadow-xl relative"
  >
    <div className="absolute -top-6 left-8">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      </div>
    </div>
    <div className="mb-6 text-yellow-400 flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-xl">★</span>
      ))}
    </div>
    <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{quote}"</p>
    <div className="flex items-center">
      <div className="w-12 h-12 relative rounded-full overflow-hidden mr-4">
        <Image
          src={image || "/images/Couples-massage-woman-face.jpg"}
          alt={author}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-gray-500 text-sm">{position}</p>
      </div>
    </div>
  </motion.div>
);

// Animated feature highlight
const FeatureHighlight = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
  >
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-14 h-14 rounded-full flex items-center justify-center mb-5 shadow-md">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// Gallery image component with magnification
const GalleryImage = ({ src, alt, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative overflow-hidden rounded-xl aspect-square cursor-pointer group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/30 flex items-center justify-center"
      >
        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Parallax section component
const ParallaxSection = ({ image, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  
  return (
    <motion.section 
      ref={ref}
      className="relative py-24 overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={image}
          alt="Background image"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 to-indigo-900/60" />
      </motion.div>
      <div className="container mx-auto px-6 relative z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default function HomePage() {
  return (
    <>
      <NavBar />
      
      {/* Hero Section with video background option */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Poolside-Massage-night-table-setup.jpg"
            alt="Poolside Massage"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-indigo-900/60 to-blue-900/50" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
                <span className="block">Experience True</span> 
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Tranquility</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
                Indulge in premium massage services designed to rejuvenate your body, mind, and spirit.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Your Session
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/30 transition-all duration-300"
                >
                  Explore Services
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-10 h-10 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>
      
      {/* Feature highlights section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-bold text-gray-900 mb-4"
            >
              Why Choose <span className="text-purple-600">Serenity Spa</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We combine luxurious surroundings with expert therapists to create an unforgettable experience
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureHighlight 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>}
              title="Certified Therapists"
              description="Our team consists of highly trained professionals with years of experience in various massage techniques."
            />
            <FeatureHighlight 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>}
              title="Tranquil Environment"
              description="Our spa is designed to create a serene atmosphere that promotes relaxation from the moment you walk in."
            />
            <FeatureHighlight 
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>}
              title="Custom Treatments"
              description="We tailor each massage to your specific needs, ensuring you receive the perfect therapeutic experience."
            />
          </div>
        </div>
      </section>
      
      {/* Services Section with enhanced cards */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-purple-600 font-semibold text-lg uppercase tracking-wider"
            >
              Our Services
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4"
            >
              Premium Massage Experiences
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Discover the perfect massage therapy tailored to your unique needs
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Couples Retreat"
              description="Share a relaxing experience with your partner in our luxurious couple's suite with private amenities."
              image="/images/Couples-massage-woman-face.jpg"
              price="249"
            />
            <ServiceCard
              title="Poolside Serenity"
              description="Experience the ultimate relaxation with a massage under the stars beside our tranquil pool setting."
              image="/images/Poolside-Massage-night-table-setup.jpg"
              price="299"
            />
            <ServiceCard
              title="Aromatherapy Journey"
              description="Enhance your massage with our curated selection of essential oils to stimulate your senses."
              image="/images/Massage-oil-setup-basic-reference.jpg"
              price="199"
            />
          </div>
          
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              View All Services
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Parallax quote section */}
      <ParallaxSection image="/images/Poolside-Massage-night-table-setup.jpg">
        <div className="max-w-3xl mx-auto text-center text-white">
          <svg className="w-12 h-12 mx-auto mb-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif italic font-medium mb-8 leading-relaxed"
          >
            "The greatest gift you can give yourself is the gift of health and wellness. Take time to relax, rejuvenate, and reconnect with your inner self."
          </motion.h3>
          <div className="w-20 h-1 bg-white/50 mx-auto mb-4"></div>
          <p className="text-xl text-white/90">Serenity Spa Philosophy</p>
        </div>
      </ParallaxSection>
      
      {/* Gallery Section with enhanced animations */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-purple-600 font-semibold text-lg uppercase tracking-wider"
            >
              Gallery
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4"
            >
              Experience Our Spa Visually
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Take a visual journey through our serene spa environment
            </motion.p>
          </div>
          
          {/* Enhanced gallery grid with masonry-like layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: "/images/Couples-massage-woman-face.jpg", alt: "Couples massage" },
              { src: "/images/Poolside-Massage-night-table-setup.jpg", alt: "Poolside massage" },
              { src: "/images/Massage-oil-setup-basic-reference.jpg", alt: "Massage oils" },
              { src: "/images/Massage-table-setup-basic-single.jpg", alt: "Massage table" },
              { src: "/images/Couples-massage-woman-face.jpg", alt: "Spa treatment" },
              { src: "/images/Poolside-Massage-night-table-setup.jpg", alt: "Evening massage" },
              { src: "/images/Massage-oil-setup-basic-reference.jpg", alt: "Essential oils" },
              { src: "/images/Massage-table-setup-basic-single.jpg", alt: "Treatment room" }
            ].map((img, index) => (
              <GalleryImage 
                key={index}
                src={img.src}
                alt={img.alt}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-purple-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-purple-600 font-semibold text-lg uppercase tracking-wider"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Hear from those who have experienced our transformative treatments
            </motion.p>
          </div>
          
          {/* Enhanced testimonial cards with animated appearance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial 
              quote="The poolside massage under the stars was an unforgettable experience. The ambiance was magical, and my therapist knew exactly how to release all my tension points. Truly therapeutic and rejuvenating."
              author="Sarah Johnson"
              position="Regular Client"
              image="/images/Couples-massage-woman-face.jpg"
            />
            <Testimonial 
              quote="My husband and I enjoyed the couples massage immensely. The private suite was luxurious, and the therapists were skilled and attentive to our individual needs. The perfect anniversary gift!"
              author="Michael & Lisa Chen"
              position="First-time Visitors"
              image="/images/Poolside-Massage-night-table-setup.jpg"
            />
            <Testimonial 
              quote="The aromatherapy add-on transformed my regular massage into a sensory journey. The essential oils were perfectly matched to my preferences, and I've never felt so relaxed and balanced afterward."
              author="David Miller"
              position="Monthly Member"
              image="/images/Massage-oil-setup-basic-reference.jpg"
            />
          </div>
        </div>
      </section>
      
      {/* Enhanced pricing section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-purple-600 font-semibold text-lg uppercase tracking-wider"
            >
              Pricing
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4"
            >
              Transparent Pricing Options
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Choose from our range of premium services at competitive prices
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
            >
              <div className="p-8 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Essential Package</h3>
                <div className="text-purple-600 font-bold text-5xl my-6">$99</div>
                <p className="text-gray-500 mb-6">Perfect for first-time visitors seeking relaxation</p>
                <ul className="text-left space-y-4 mb-8">
                  {[
                    "60-minute Swedish massage",
                    "Aromatherapy enhancement",
                    "Warm towel treatment",
                    "Herbal tea service"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
            
            {/* Premium Package - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-gradient-to-b from-purple-600 to-indigo-700 rounded-2xl overflow-hidden shadow-xl transform scale-105 z-10"
            >
              <div className="p-1">
                <div className="bg-white rounded-2xl p-7 text-center">
                  <div className="bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider py-1 px-4 rounded-full inline-block mb-2">Most Popular</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Premium Package</h3>
                  <div className="text-purple-600 font-bold text-5xl my-6">$179</div>
                  <p className="text-gray-500 mb-6">Our signature experience for deep relaxation</p>
                  <ul className="text-left space-y-4 mb-8">
                    {[
                      "90-minute Deep Tissue massage",
                      "Hot stone enhancement",
                      "Aromatherapy selection",
                      "Foot scrub treatment",
                      "Scalp massage",
                      "Complimentary refreshments"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
            
            {/* Luxury Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
            >
              <div className="p-8 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Luxury Package</h3>
                <div className="text-purple-600 font-bold text-5xl my-6">$299</div>
                <p className="text-gray-500 mb-6">The ultimate spa experience for total rejuvenation</p>
                <ul className="text-left space-y-4 mb-8">
                  {[
                    "2-hour custom massage",
                    "Poolside or private suite setting",
                    "Full body exfoliation",
                    "Hot stone enhancement",
                    "Aromatherapy journey",
                    "Hand & foot treatment",
                    "Champagne service"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact section with form and map */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-purple-600 font-semibold text-lg uppercase tracking-wider"
            >
              Contact Us
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-bold text-gray-900 mt-2 mb-4"
            >
              Book Your Experience
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Reach out to schedule your appointment or ask any questions
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    placeholder="Your phone"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="couples">Couples Massage</option>
                    <option value="poolside">Poolside Massage</option>
                    <option value="aromatherapy">Aromatherapy Massage</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                    placeholder="Tell us about your preferences or ask questions..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Submit Inquiry
                </motion.button>
              </form>
            </motion.div>
            
            {/* Contact information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-md text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Location</h4>
                      <p className="text-gray-600 mt-1">123 Relaxation Boulevard</p>
                      <p className="text-gray-600">Serenity City, SC 12345</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-md text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                      <p className="text-gray-600 mt-1">(555) 123-4567</p>
                      <p className="text-gray-500 text-sm">Mon-Fri from 9am to 9pm</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-md text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600 mt-1">info@serenityspa.com</p>
                      <p className="text-gray-500 text-sm">We'll respond as soon as possible</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Hours of Operation</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Monday - Friday</span>
                    <span className="text-gray-600">9:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Saturday</span>
                    <span className="text-gray-600">10:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Sunday</span>
                    <span className="text-gray-600">10:00 AM - 6:00 PM</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Enhanced CTA section with parallax and animation */}
      <section className="py-20 relative">
        <div className="absolute inset-0">
          <Image
            src="/images/Massage-table-setup-basic-single.jpg"
            alt="Massage table"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-indigo-900/70" />
        </div>
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Ready to Experience True Relaxation?
            </h2>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Book your appointment today and take the first step toward wellness and tranquility.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-900 px-10 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 text-lg shadow-xl"
            >
              Book Your Session Now
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Enhanced Footer with animation and improved layout */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Serenity Spa</h3>
              <p className="text-gray-400 mb-6">
                Providing premium massage and wellness services to help you relax, rejuvenate, and restore your body and mind.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'pinterest'].map((social) => (
                  <a 
                    key={social}
                    href={`#${social}`}
                    className="bg-gray-800 hover:bg-purple-600 text-white p-2 rounded-full transition-all duration-300"
                    aria-label={social}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
              </h4>
              <ul className="space-y-3">
                {['Home', 'Services', 'Gallery', 'Testimonials', 'Contact', 'Pricing', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-white transition-all duration-300 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
              </h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Relaxation Boulevard<br/>Serenity City, SC 12345</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Phone: (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email: info@serenityspa.com</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 relative inline-block">
                Newsletter
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
              </h4>
              <p className="text-gray-400 mb-6">Subscribe to receive special offers and updates.</p>
              <form className="space-y-3">
                <div>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© 2025 Serenity Spa. All rights reserved.</p>
            <div className="mt-4 md:mt-0 text-gray-500">
              <ul className="flex space-x-6">
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating booking button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed right-6 bottom-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.button>
      </motion.div>
    </>
  );
}