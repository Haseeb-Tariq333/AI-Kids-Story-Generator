'use client'
import React from 'react'
import { Textarea } from "@nextui-org/input";

function StorySubjectInput({ userSelection }: any) {
  return (
    <div className="w-full">
      <label className="block text-gray-800 text-xl font-medium mb-3">
        1. What is your story about?
      </label>
      <Textarea
        size="lg"
        variant="bordered"
        placeholder="Write the subject of your story here..."
        classNames={{
          input: "resize-y min-h-[180px] text-gray-700 text-lg p-4",
          inputWrapper: "bg-white border-2 border-gray-200 hover:border-teal-400 focus:border-teal-500",
        }}
        className="w-full"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          })
        }
      />
    </div>
  );
}

export default StorySubjectInput