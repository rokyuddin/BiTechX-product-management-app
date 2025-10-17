export interface Category {
  id: string;
  name: string;
  description?: string | null;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image?: string;
  images?: string[];
  slug?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  images?: string[];
  stock?: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface ProductsResponse {
  data: Product[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  stock?: number;
}
