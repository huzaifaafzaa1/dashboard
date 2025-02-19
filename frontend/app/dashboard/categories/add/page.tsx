"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCategories } from '@/hooks/useCategory'; // Import the custom hook

const formSchema = z.object({
  categoryname: z.string()
    .min(1, "Category name is required")
    .refine((val) => isNaN(Number(val)), {
      message: "Category name must be a string, not a number",
    }),
});

export default function AddCategoryForm() {
  const { createCategory } = useCategories(); // Use the createCategory mutation

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryname: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Call the createCategory mutation
      createCategory({ name: values.categoryname, products: [] }, {
        onSuccess: () => {
          toast.success("Category added successfully!");
          form.reset(); // Reset the form after successful submission
        },
        onError: (error) => {
          toast.error("Failed to add category. Please try again.");
          console.error("Error adding category:", error);
        },
      });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-2">
        <FormField
          control={form.control}
          name="categoryname"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              {/* <FormDescription>Add Category here</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Category</Button>
      </form>
    </Form>
  );
}