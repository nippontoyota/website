"use client";

import { motion } from 'framer-motion';
import { Calendar, CreditCard, Shield, Gift, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const principals = [
  { name: 'MR. M. A. M. BABU MOOPAN', role: 'DEALER PRINCIPAL', image: '/babu-moopan.jpeg' },
  { name: 'MR. NAEEM SHAHUL', role: 'DIRECTOR', image: '/naeem-shahul.jpg' },
];

const moreItems = [
  { title: 'EVENTS', image: '/driving-school.jpg', icon: Calendar },
  { title: 'APPLY FOR LOAN', image: '/whats-new.jpg', icon: CreditCard },
  { title: 'APPLY FOR INSURANCE', image: '/q-service.jpg', icon: Shield },
  { title: 'PROMOTIONS', image: '/t-care.webp', icon: Gift },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function AboutContent() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <div className="relative h-[45vh] min-h-[400px] w-full bg-zinc-900">
        <Image 
          src="/nippon-towers.jpg" 
          alt="About Us" 
          fill
          className="object-cover opacity-70 object-center"
          priority
        />
        {/* Subtle gradient for text legibility at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-12">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-druk text-white tracking-tight uppercase"
            >
              About Us
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Mission Section - Editorial Layout */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          <motion.div 
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-4xl md:text-5xl font-druk tracking-tight uppercase text-zinc-900">
              Dealer Mission
            </h2>
          </motion.div>

          <motion.div 
            className="md:col-span-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <p className="text-2xl md:text-4xl lg:text-5xl text-zinc-900 font-medium leading-[1.3] tracking-tight">
              Placing customer satisfaction first, integrating sales with service and service parts in a single convenient location
            </p>
            <p className="text-xl md:text-2xl text-zinc-600 mt-8 leading-relaxed max-w-3xl font-display font-medium">
              We contribute to speedy and efficient service, allowing customers to experience the absolute convenience and pleasure of owning a Toyota automobile
            </p>
          </motion.div>

        </div>
      </section>

      {/* Dealer Principal Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-gray-100">
        <motion.div 
          className="mb-12 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-druk tracking-tight uppercase text-zinc-900 mb-6">
            Leadership
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-3xl font-display font-medium">
            Meet the visionaries driving our commitment to excellence and unparalleled customer satisfaction across Kerala
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {principals.map((person, index) => (
            <motion.div 
              key={index} 
              className="group cursor-default w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-2rem)] max-w-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Minimal Image Container */}
              <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden mb-6">
                <Image 
                  src={person.image} 
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                {/* Subtle hover reveal */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              
              <div>
                <p className="text-[#eb0a1e] text-[10px] font-bold tracking-widest uppercase mb-2">
                  {person.role}
                </p>
                <h3 className="font-medium text-lg md:text-xl text-zinc-900 tracking-tight">
                  {person.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* More Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-white">
        <motion.div 
          className="mb-12 md:mb-20 flex justify-between items-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-druk tracking-tight uppercase text-zinc-900">
              Explore More
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {moreItems.map((item, index) => (
            <motion.a 
              href="#"
              key={index}
              className="group relative flex flex-col h-[400px] bg-[#f8f8f8] overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Image Half */}
              <div className="relative h-[60%] w-full overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Content Half */}
              <div className="relative h-[40%] p-6 md:p-8 flex flex-col justify-between bg-white border-x border-b border-gray-100 group-hover:bg-[#eb0a1e] transition-colors duration-500">
                <div className="flex justify-between items-start">
                  <div className="text-zinc-400 group-hover:text-white transition-colors duration-500">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight size={20} className="text-white opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                </div>
                
                <h3 className="font-display text-[13px] font-bold tracking-widest text-zinc-900 group-hover:text-white transition-colors duration-500">
                  {item.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

    </div>
  );
}
