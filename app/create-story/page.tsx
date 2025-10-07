"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";
import { chatSession } from "@/config/GeminiAi";
import uuid4 from "uuid4";
import { db } from "@/config/db";
import { storyData, Users } from "@/config/schema";
import CustomLoader from "./_components/CustomLoader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import "react-toastify/dist/ReactToastify.css";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";

export interface fieldData {
  fieldValue: string;
  fieldName: string;
}
export interface FormDataType {
  storySubject: string;
  Type: string;
  AgeGroup: string;
  ImageStyle: string;
}

function CreateStory() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>();
  const router = useRouter();
  const notify = (message: string) => toast.success(message);
  const errorNotify = (message: string) => toast.error(message);
  const { user } = useUser();
  const {userDetails, setUserDetails} = useContext(UserDetailContext)

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prevData: any) => {
      return {
        ...prevData,
        [data.fieldName]: data.fieldValue,
      };
    });
  };
  
  // generate ai story
  const GenerateStory = async () => {
    console.log("Generate story", formData);
    const coins = userDetails?.credits;

    if (coins < 1) {
      errorNotify("Not enough coins. Please purchase");
      router.push("/add-coins");
      return;
    }

    const Final_Prompt = `write a kid story on description for ${formData?.AgeGroup} years kids, ${formData?.Type} ,and all images on ${formData?.ImageStyle} style: ${formData?.storySubject}. give me 5 chapters. With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in json fields formats`;

    try {
      setLoading(true);

      // Generate story from AI
      const result = await chatSession.sendMessage(Final_Prompt);
      const responseText = await result?.response.text();
      

      // Image generation process
      const story = JSON.parse(responseText);
      console.log("story", story);

      const imageResp = await axios.post("/api/generate-image", {
        prompt: `Design a book cover set in an African environment. Use bold text for the title: "${story?.story_title}". Incorporate elements like African landscapes, traditional patterns, colors inspired by African culture, and any specific details from the prompt: "${story?.cover_image_prompt}".`,
      });

      const AIimage = imageResp.data.imageUrl;
      

      const imageResult = await axios.post("/api/save-image", {
        url: AIimage,
      });
      const firebaseImageUrl = imageResult?.data.imageUrl;

      const resp: any = await SaveInDB(responseText, firebaseImageUrl);

      // Subtract coins and update context
      await subtractCoins(coins - 1); // Ensure coins are updated before continuing

      notify("Story generated successfully!");

      // Redirect to view the new story
      router?.replace(`/view-story/${resp[0]?.storyId}`);
    } catch (e) {
      console.error(e);
      errorNotify("Failed to generate story, please try again");
    } finally {
      setLoading(false);
    }
  };

  const subtractCoins = async (coins: number) => {
    try {
      const res = await db
        .update(Users)
        .set({
          credits: coins,
        })
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress ?? ""))
        .returning({ id: Users.id, credits: Users.credits });

      // Update the context with new user details (new coin balance)
      if (res.length > 0) {
        const updatedUserDetails = {
          ...userDetails,
          credits: coins, // update the credits in the context
        };
        setUserDetails(updatedUserDetails); // update the userDetails context
      }

      return res;
    } catch (error) {
      console.error("Failed to update coins:", error);
      throw error; // propagate the error if needed
    }
  };

  const SaveInDB = async (result: any, imageUrl: string) => {
    const recordID = uuid4();

    try {
      let parsedResult = JSON.parse(result);
      

      const final_result = await db
        .insert(storyData)
        .values({
          storySubject: formData?.storySubject,
          storyType: formData?.Type,
          ageGroup: formData?.AgeGroup,
          imageStyle: formData?.ImageStyle,
          output: parsedResult,
          storyId: recordID,
          coverimage: imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          userImage: user?.imageUrl,
        })
        .returning({ storyId: storyData?.storyId });
      
      return final_result;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-amber-50 py-16 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-teal-600">Create Your</span>{' '}
            <span className="text-amber-500">Story</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Unleash Your Imagination with AI: Weave Captivating Stories Like Never
            Before! One story at a time, let's create a world of our own.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-10 lg:p-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <StorySubjectInput userSelection={onHandleUserSelection} />
            <StoryType userSelection={onHandleUserSelection} />
            <AgeGroup userSelection={onHandleUserSelection} />
            <ImageStyle userSelection={onHandleUserSelection} />
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white text-lg md:text-xl font-semibold px-10 py-7 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={GenerateStory}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Story'}
          </Button>
        </motion.div>
        <CustomLoader isLoading={loading} />
      </div>
    </div>
  );
}

export default CreateStory;
