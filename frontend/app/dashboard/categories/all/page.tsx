"use client";

import { useCategories } from '@/hooks/useCategory'; // Adjust the import according to your file structure
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AllCategories = () => {
  // Using the custom hook to fetch categories
  const { categories, loading, error } = useCategories();

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if an error occurs
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Table>
      <TableCaption>A list of your categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead>Products Count</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.length > 0 ? (
          categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.products.length}</TableCell>
              <TableCell>
                <button>Edit</button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No categories available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AllCategories;