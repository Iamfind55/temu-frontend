// "use client"

import { categories } from "@/lib/category-data"
import { notFound } from "next/navigation"
import { CategoryPageClient } from "../../page"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const PRODUCTS_PER_PAGE = 40

export default async function CategoryPage({
   params,
}: {
   params: Promise<{ category: string; subcategory: string }>
}) {
   const { category: categorySlug, subcategory: subcategorySlug } = await params

   const category = categories.find((cat) => cat.id === categorySlug)
   const subcategory = category?.subCategories.find((sub) => sub.id === subcategorySlug)

   if (!category || !subcategory) {
      notFound()
   }

   return (
      <>
         <CategoryPageClient
            categorySlug={categorySlug}
            subcategorySlug={subcategorySlug}
            categoryName={category.name}
            subcategoryName={subcategory.name}
         />
      </>
   )
}
