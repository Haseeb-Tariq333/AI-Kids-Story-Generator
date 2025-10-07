"use client";
import { db } from "@/config/db";
import { storyData } from "@/config/schema";
import { desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@nextui-org/button";
import Loading from "../dashboard/_components/Loading";
import { motion } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";

function Explore() {
  const [offset, setOffset] = useState<number>(0);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const notify = (message: string) => toast.done(message);
  const errNotify = (message: string) => toast.error(message);

    useEffect(() => {
    getFirstStory()// Initial load with offset 0
  }, []);
    
    const getFirstStory = async () => {
        setLoading(true)
        try {
            const res = await db
                .select()
                .from(storyData)
                .orderBy(desc(storyData.id))
                .limit(4)
                .offset(0);
            setStories(res);
            setOffset(4);
            notify("Stories fetched");
        } catch (e) {
            console.log(e);
            errNotify("An error occurred");
        } finally {
            setLoading(false);
        }
    };

  const GetAllStories = async () => {
    setLoading(true);
    try {
      const res = await db
        .select()
        .from(storyData)
        .orderBy(desc(storyData.id))
        .limit(4)
        .offset(offset);
      setStories((prev) => [...prev, ...res]);
      setOffset(prev => prev+4); // Update the offset
      notify("Stories fetched");
    } catch (e) {
      console.log(e);
      errNotify("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <Loading isLoading={loading} />
        
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-teal-600">Explore</span>{' '}
              <span className="text-amber-500">Stories</span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover amazing stories created by our community
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <StoryItemCard story={story} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {!loading && stories.length > 0 && (
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold px-8 py-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={GetAllStories}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More Stories"}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </LazyMotion>
  );
}

export default Explore;
