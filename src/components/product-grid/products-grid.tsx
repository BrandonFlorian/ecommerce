"use client";

import React from "react";

import products from "./mock-products";

import ProductListItem from "./product-list-item";
import { cn } from "@/lib/utils";
import { Switch } from "@nextui-org/react";

export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
  itemClassName?: string;
};

const ProductsGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ itemClassName, className, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true);

    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          className
        )}
        {...props}
      >
        {/* <Switch isSelected={isLoading} onValueChange={setIsLoading}>
          Is loading
        </Switch> */}
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            removeWrapper
            {...product}
            className={cn("w-full snap-start", itemClassName)}
          />
        ))}
      </div>
    );
  }
);

ProductsGrid.displayName = "ProductsGrid";

export default ProductsGrid;
