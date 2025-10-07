import React from 'react';
import Link from 'next/link';
import { Card, CardFooter } from "@nextui-org/card";
import { Button } from '@nextui-org/button';
import Image from 'next/image';

function StoryItemCard({ story }: any) {
  return (
    <Link href={"/view-story/" + story.storyId}>
      <Card
        className="w-full h-[320px] overflow-hidden group relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        isPressable
        isHoverable
      >
        <Image
          alt={story.output.story_title || 'Story cover'}
          className="z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={story.coverimage}
          width={400}
          height={320}
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        <CardFooter className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <div className="w-full">
            <h3 className="text-white font-bold text-lg line-clamp-2 mb-2">
              {story.output.story_title}
            </h3>
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium w-full transition-colors"
              radius="md"
              size="sm"
            >
              Read Story
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
export default StoryItemCard