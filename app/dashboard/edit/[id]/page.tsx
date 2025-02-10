"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "@/services/axiosInstance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Zod schema (same as Add Product)
const formSchema = z.object({
  name_0092174288: z.string(),
  name_2203518553: z.number().min(0),
  name_9452380852: z.string(),
  name_9203713113: z.string(),
  name_4608014819: z.string().url({ message: "Please enter a valid URL." }),
  name_4147583332: z.number().min(0).max(5),
  name_6159556892: z.number(),
});

// Interface for the product
interface Product {
  id: number;
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

export default function EditProduct() {
  const { id } = useParams(); // Get product ID from the URL
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetch the product details by ID
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await API.get(`/products/${id}`);
      return data;
    }
  });

  // Initialize the form with fetched product data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => ({
      name_0092174288: product?.title || "",
      name_2203518553: product?.price || 0,
      name_9452380852: product?.description || "",
      name_9203713113: product?.category || "",
      name_4608014819: product?.image || "",
      name_4147583332: product?.rating.rate || 0,
      name_6159556892: product?.rating.count || 0,
    }),
  });

  // Mutation for updating the product
  const { mutate } = useMutation({
    mutationFn: async (updatedProduct: Product) => {
      return await API.put(`/products/${id}`, updatedProduct);
    },
    onSuccess: () => {
      toast.success("Product successfully updated!");
      queryClient.invalidateQueries({ queryKey: ['products'] });
      router.push("/"); // Redirect to the product list after editing
    },
    onError: () => {
      toast.error("Failed to update product.");
    }
  });

  // Submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedProduct: Product = {
      id: Number(id),
      title: values.name_0092174288,
      price: values.name_2203518553,
      description: values.name_9452380852,
      category: values.name_9203713113,
      image: values.name_4608014819,
      rating: {
        rate: values.name_4147583332,
        count: values.name_6159556892,
      },
    };

    mutate(updatedProduct);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        {/* Product Title */}
        <FormField
          control={form.control}
          name="name_0092174288"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Title" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter the product title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Price */}
        <FormField
          control={form.control}
          name="name_2203518553"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input 
                type="number" 
                {...field} 
                value={field.value || ""} // Ensure the value is treated as a string for display
                onChange={(e) => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormDescription>Enter the product price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Description */}
        <FormField
          control={form.control}
          name="name_9452380852"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter the product description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Category */}
        <FormField
          control={form.control}
          name="name_9203713113"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" type="text" {...field} />
              </FormControl>
              <FormDescription>Enter the product category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL */}
        <FormField
          control={form.control}
          name="name_4608014819"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" type="url" {...field} />
              </FormControl>
              <FormDescription>Enter a valid image URL.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating */}
        <FormField
          control={form.control}
          name="name_4147583332"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input type="number" 
                {...field} 
                value={field.value || ""} // Ensure the value is treated as a string for display
                onChange={(e) => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormDescription>Enter the product rating (0 to 5).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating Count */}
        <FormField
          control={form.control}
          name="name_6159556892"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating Count</FormLabel>
              <FormControl>
                <Input 
                type="number" 
                {...field}
                value={field.value || ""} // Ensure the value is treated as a string for display 
                onChange={(e) => field.onChange(e.target.valueAsNumber)} />
              </FormControl>
              <FormDescription>Enter the number of ratings.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Update Product</Button>
      </form>
    </Form>
  );
}
