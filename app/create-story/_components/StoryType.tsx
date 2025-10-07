"use client";
import Image from 'next/image';
import React, { useState } from 'react'

export interface optionList { 
  label: string;
  imageUrl: string;
  isFree: boolean;
}
function StoryType({userSelection}: any) {
    const storyList = [
      {
        label: "Story Book",
        imageUrl: "/storybook.jpg",
        isFree: true,
      },
      {
        label: "Bed Story",
        imageUrl: "/bedtime.jpg",
        isFree: true,
      },
      {
        label: "Educational Story",
        imageUrl: "/school.jpg",
        isFree: true,
      },
      
    ];
  const [selectedStory, setSelectedStory] = useState<string>('');
  const onUserSelect = (story: optionList) => { 
    setSelectedStory(story.label);
    userSelection({
      fieldName: "Type",
      fieldValue: story.label,
    })
  }
  return (
    <div className="w-full">
      <label className="block text-gray-800 text-xl font-medium mb-3">
        2. What type of story are you creating?
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {storyList.map((story: optionList, index) => (
          <div
            key={index}
            onClick={() => onUserSelect(story)}
            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
              selectedStory === story.label 
                ? 'ring-2 ring-teal-500 ring-offset-2' 
                : 'ring-1 ring-gray-200 hover:ring-teal-300'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-xl" />
            <h2 className="absolute bottom-3 left-3 right-3 text-white font-semibold text-lg z-20">
              {story.label}
            </h2>
            <Image
              src={story.imageUrl}
              alt={story.label}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-xl"
            />
            {story.isFree && (
              <span className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded-full z-20">
                Free
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryType