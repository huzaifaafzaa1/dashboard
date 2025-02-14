"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct"; // Import the custom hook
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useEffect } from "react";

// Zod validation schema
const formSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number().min(0),
  description: z.string(),
  category: z.string(),
  image: z.string().url({ message: "Please enter a valid URL." }),
  rating: z.object({
    rate: z.number().min(0).max(5),
    count: z.number(),
  }),
});

// Define the Product interface
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function AddProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Use the custom hook
  const { useProductQuery, addProductMutation, updateProductMutation } =
    useProduct();

  // Determine the mode based on the presence of id is there is id in the url then mode is edit if there is no id the mode will be add
  const mode = id ? "edit" : "add";

  // Fetch product data if in "edit" mode using the custom hook
  const { data: product, isLoading } = useProductQuery(id);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    },
  });

  // Reset the form with product data when it's fetched
  useEffect(() => {
    if (product && mode === "edit") {
      form.reset({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {
          rate: product.rating.rate,
          count: product.rating.count,
        },
      });
    }
  }, [product, mode, form]);

  // Submit handler for both add and edit
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const productData: Product = {
      id: values.id,
      title: values.title,
      price: values.price,
      description: values.description,
      category: values.category,
      image: values.image,
      rating: {
        rate: values.rating.rate,
        count: values.rating.count,
      },
    };

    if (mode === "add") {
      addProductMutation.mutate(productData);
    } else if (mode === "edit") {
      updateProductMutation.mutate({
        id: productData.id,
        product: productData,
      });
    }
  };

  if (mode === "edit" && isLoading) return <p>Loading...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {/* Product ID Field */}
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input
                  placeholder="Id"
                  type="text"
                  {...field}
                  disabled={mode === "edit"}
                />
              </FormControl>
              <FormDescription>This is your product ID.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Title" type="text" {...field} />
              </FormControl>
              <FormDescription>This is your Product Title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price"
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>This is your Product Price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your product Description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" type="text" {...field} />
              </FormControl>
              <FormDescription>This is your product Category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter a valid image URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating.rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  placeholder="Rating"
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>This is your product Rating.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating.count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating Count</FormLabel>
              <FormControl>
                <Input
                  placeholder="Rating Count"
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>This is your Rating Count.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">
          {mode === "add" ? "Add Product" : "Update Product"}
        </Button>
      </form>
    </Form>
  );
}
