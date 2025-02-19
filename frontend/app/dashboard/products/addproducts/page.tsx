"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategory";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the Zod schema
const RatingSchema = z.object({
  rate: z.number(),
  count: z.number(),
});
const formSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  image: z.string(),
  rating: RatingSchema,
});

export default function AddProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { categories, loading } = useCategories();

  const { useProductQuery, addProductMutation, updateProductMutation } = useProduct();
  const { data: product, isLoading } = useProductQuery(id);

  const mode = id ? "edit" : "add";
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: { _id: "", name: "" }, // Initialize as an object
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    },
  });

  useEffect(() => {
    if (product && mode === "edit") {
      form.reset({
        title: product.title,
        price: product.price,
        description: product.description,
        category: { _id: product.category._id, name: product.category.name }, // Ensure category is an object
        image: product.image,
        rating: {
          rate: product.rating.rate,
          count: product.rating.count,
        },
      });
    }
  }, [product, mode, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedCategory = categories.find(
      (cat) => cat._id === values.category._id
    );

    if (!selectedCategory) {
      toast.error("Invalid category selected.");
      return;
    }

    const productData = {
      title: values.title,
      price: values.price,
      description: values.description,
      category: selectedCategory,
      image: values.image,
      rating: {
        rate: values.rating.rate,
        count: values.rating.count,
      },
    };

    if (mode === "add") {
      addProductMutation.mutate(productData);
    } else if (mode === "edit" && product?._id) {
      updateProductMutation.mutate({
        id: product._id,
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
        {/* Title Field */}
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

        {/* Price Field */}
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

        {/* Description Field */}
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

        {/* Category Field */}
        <Form {...form}>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {     //value will have the value that we select from form i.e-(electronics mens etc)
                    const selectedCategory = categories.find(        //categories will have the value stored in categories as it storeda as object it will also have id of object means whole object (mens,womens,jewelry,electronics)
                      (cat) => cat._id === value                     // compare the category id with the value id 
                    );
                    if (selectedCategory) {
                      field.onChange(selectedCategory);             // this line will select the category object and update the form state
                    }
                  }}
                  value={field.value?._id || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      //"When a user selects a category from the dropdown, the selected category's _id is passed as the value. This helps us identify which category was chosen."
                      <SelectItem key={category._id} value={category._id}>  
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is your product Category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        {/* Image URL Field */}
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

        {/* Rating Fields */}
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
