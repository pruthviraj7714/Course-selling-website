import  { z } from "zod";

export const CourseSchema = z.object({
    title: z.string().min(5, { message: "Title must be of at least 5 characters" }),
    description: z.string().min(20, { message: "Description must be of at least 20 characters" }),
    price: z.number().min(0, {message :  "Number Should be Positive"}),
    duration: z.string(),
    instructor: z.string(),
    category: z.string(),
    thumbnail: z.string().url({message : "Thumbnail should be valid url"}),
  });