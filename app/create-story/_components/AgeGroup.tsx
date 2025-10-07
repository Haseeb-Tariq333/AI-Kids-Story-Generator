import Image from 'next/image';
import React, { useState } from 'react'
import { optionList } from './StoryType';

function AgeGroup({userSelection}: any) {
  const ageList = [
    {
      label: "0 -2 Years",
      imageUrl: "/02years.jpg",
      isFree: true,
    },
    {
      label: "3 - 5 Years",
      imageUrl: "/35years.jpeg",
      isFree: true,
    },
    {
      label: "6 - 8 Years",
      imageUrl: "/58years.jpg",
      isFree: true,
    },
    {
      label: "9 - 12 Years",
      imageUrl: "/9-12.webp",
      isFree: true,
    },
  ];
  const [selectedStory, setSelectedStory] = useState<string>("");
   const onUserSelect = (story: optionList) => {
     userSelection({
       fieldName: "AgeGroup",
       fieldValue: story.label,
     });
   };
  return (
    <div className="w-full">
      <label className="block text-gray-800 text-xl font-medium mb-3">
        3. What age group is your story for?
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ageList.map((age, index) => (
          <div
            key={index}
            onClick={() => onUserSelect(age)}
            className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
              selectedStory === age.label
                ? 'ring-2 ring-teal-500 ring-offset-2'
                : 'ring-1 ring-gray-200 hover:ring-teal-300'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-xl" />
            <h2 className="absolute bottom-3 left-3 right-3 text-white font-semibold text-lg z-20">
              {age.label}
            </h2>
            <div className="absolute inset-0 bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors duration-300 z-0" />
            <Image
              src={age.imageUrl}
              alt={age.label}
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded-xl"
            />
            {age.isFree && (
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

export default AgeGroup