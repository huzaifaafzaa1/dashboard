//https://uniworthdress.com/uploads/product/FS20254RH.jpg

"use client";
import { useAddProduct } from "@/hooks/useAddProduct";
import { useQueryClient } from "@tanstack/react-query"; 
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

// Zod validation schema
const formSchema = z.object({
  name_5900062343: z.number(),
  name_0092174288: z.string(),
  name_2203518553: z.number().min(0),
  name_9452380852: z.string(),
  name_9203713113: z.string(),
  name_4608014819: z.string().url({ message: "Please enter a valid URL." }),
  name_4147583332: z.number().min(0).max(5),
  name_6159556892: z.number(),
});

// Define the Product interface
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

export default function MyForm() {
  const { mutate } = useAddProduct();  // Use mutation hook
  const queryClient = useQueryClient();  // Initialize queryClient

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_5900062343: 0,
      name_0092174288: "",
      name_2203518553: 0,
      name_9452380852: "",
      name_9203713113: "",
      name_4608014819: "",
      name_4147583332: 0,
      name_6159556892: 0,
    },
  });


  // this function will run we click on the button
// onSubmit function using Product interface
function onSubmit(values: z.infer<typeof formSchema>) {
  const product: Product = {
    id: values.name_5900062343,
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

  mutate(product, {
    onSuccess: () => {
      toast.success("Product successfully added!");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    },
  });
}
  

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        {/* Product ID Field */}
        <FormField
          control={form.control}
          name="name_5900062343"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input
                  placeholder="Id"
                  type="number"
                  {...field}
                  value={field.value || ""} // Ensure the value is treated as a string for display
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>This is your product ID.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Title Field */}
        <FormField
          control={form.control}
          name="name_0092174288"
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

        {/* Product Price Field */}
        <FormField
          control={form.control}
          name="name_2203518553"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price"
                  type="number"
                  {...field}
                  value={field.value || ""} // Ensure the value is treated as a string for display
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>This is your Product Price.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Fields */}
        <FormField
          control={form.control}
          name="name_9452380852"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" type="text" {...field} />
              </FormControl>
              <FormDescription>This is your product Description.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name_9203713113"
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
          name="name_4608014819"
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
          name="name_4147583332"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input
                  placeholder="Rating"
                  type="number"
                  {...field}
                  value={field.value || ""} // Ensure the value is treated as a string for display
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
          name="name_6159556892"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating Count</FormLabel>
              <FormControl>
                <Input
                  placeholder="Rating Count"
                  type="number"
                  {...field}
                  value={field.value || ""} // Ensure the value is treated as a string for display
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>This is your Rating Count.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  );
}
