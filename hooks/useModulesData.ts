"use client";
import { mockModules, mockProductsByModule } from "@/components/products/all-products/data";
import { ModuleWithProducts } from "@/interfaces/product";
import { useState, useEffect } from "react";


export const useModulesData = () => {
  const [modules, setModules] = useState<ModuleWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const modulesWithProducts: ModuleWithProducts[] = mockModules.map((module) => ({
        ...module,
        products: [],
        productsLoading: true,
      }));
      setModules(modulesWithProducts);

      // Simulate fetching products for each module
      for (const module of modulesWithProducts) {
        try {
          // Simulate product loading delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const products = mockProductsByModule[module.id] || [];
          setModules((prev) =>
            prev.map((m) =>
              m.id === module.id
                ? {
                    ...m,
                    products,
                    productsLoading: false,
                  }
                : m
            )
          );
        } catch (err) {
          console.error(`Failed to fetch products for module ${module.id}:`, err);
          setModules((prev) =>
            prev.map((m) =>
              m.id === module.id
                ? { ...m, products: [], productsLoading: false }
                : m
            )
          );
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch modules"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return {
    modules,
    isLoading,
    error,
    refetchModules: fetchModules,
  };
};