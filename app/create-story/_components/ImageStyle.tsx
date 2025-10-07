import Image from 'next/image';
import React, { useState } from 'react'
import { optionList } from './StoryType';

function ImageStyle({userSelection}: any) {
  const ageList = [
    {
      label: "3D cartoon",
      imageUrl: "/3d.png",
      isFree: true,
    },
    {
      label: "Paper cut",
      imageUrl: "/papercut.jpeg",
      isFree: true,
    },
    {
      label: "Water color",
      imageUrl: "/water.webp",
      isFree: true,
    },
    {
      label: "Pixel art style",
      imageUrl: "/pixel.webp",
      isFree: true,
    },
  ];
  const [selectedStory, setSelectedStory] = useState<string>("");

  const onUserSelect = (story: optionList) => {
    setSelectedStory(story.label);
    userSelection({
      fieldName: "ImageStyle",
      fieldValue: story.label,
    });
  };

  return (
    <div className="w-full">
      <label className="block text-gray-800 text-xl font-medium mb-3">
        4. What style of image would you like to use?
      </label>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ageList.map((style, index) => (
          <div
            key={index}
            onClick={() => onUserSelect(style)}
            className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
              selectedStory === style.label
                ? 'ring-2 ring-teal-500 ring-offset-2'
                : 'ring-1 ring-gray-200 hover:ring-teal-300'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-xl" />
            <h2 className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm sm:text-base z-20">
              {style.label}
            </h2>
            <div className="absolute inset-0 bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors duration-300 z-0" />
            <Image
              src={style.imageUrl}
              alt={style.label}
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded-xl"
            />
            {style.isFree && (
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

export default ImageStyle