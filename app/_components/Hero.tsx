"use client"
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LazyMotion, motion, domAnimation } from "framer-motion";

function Hero() {
    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            className="space-y-8 text-center lg:text-left"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h1 
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                <span className="text-teal-600">Craft Magical</span> Stories 
                                <br />
                                <span className="text-amber-500">in Moments</span>
                            </motion.h1>
                            
                            <motion.p 
                                className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                Transform your ideas into captivating children's tales with our AI-powered story generator. Perfect for parents, teachers, and young readers.
                            </motion.p>
                            
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <Link href="/create-story" passHref>
                                    <Button 
                                        color="primary" 
                                        size="lg"
                                        className="px-8 py-6 text-lg font-semibold bg-teal-600 hover:bg-teal-700 transition-all duration-300 transform hover:-translate-y-1 text-white"
                                    >
                                        Start Creating
                                    </Button>
                                </Link>
                                <Link href="/explore" passHref>
                                    <Button 
                                        variant="flat" 
                                        size="lg"
                                        className="px-8 py-6 text-lg font-semibold border-2 border-teal-200 hover:bg-teal-50 transition-colors duration-300 text-teal-700"
                                    >
                                        Explore Stories
                                    </Button>
                                </Link>
                            </motion.div>
                            
                            <motion.div 
                                className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 text-sm mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <span>No credit card required</span>
                                <span>•</span>
                                <span>Start with 3 free stories</span>
                            </motion.div>
                        </motion.div>
                        
                        <motion.div 
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                                <Image 
                                    src={"/hero.png"} 
                                    alt="Children reading stories" 
                                    width={600} 
                                    height={500}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="absolute -top-6 -left-6 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-8 left-20 w-36 h-36 bg-coral-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                        </motion.div>
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                    <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" opacity="0.2"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,141.56,72.19,6.35,10.93,3.81,23.23-3.08,34.14-7.12,11.31-19.15,18.12-31.23,21.4-43.08,11.72-88.5,6.07-128.54-10.8-31.6-13.4-57.16-35.8-76.39-62.8-23.11-32.16-25.74-69.57-15.03-103.89C939.77,12.5,1021.14,0,1098.19,0H1200V120H0Z" fill="currentColor" opacity="0.3"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z" fill="currentColor" opacity="0.4"></path>
                    </svg>
                </div>
            </div>
            
            {/* Add custom animation keyframes */}
            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </LazyMotion>
    );
}

export default Hero;