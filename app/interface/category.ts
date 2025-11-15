export interface ISubSubCategory {
  id: string;
  name: string;
  image: string | null;
  oring_image_url: string;
}

export interface ISubCategory {
  id: string;
  name: string;
  subcategories: ISubSubCategory[];
}

export interface ICategory {
  id: string;
  name: string;
  subcategories: ISubCategory[];
}

export interface IGetCategoriesResponse {
  getCategories: {
    success: boolean;
    total: number;
    data: ICategory[];
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface IChildCategory {
  id: string;
  name: string;
  image: string | null;
  oring_image_url: string;
}

export interface IGetChildCategoriesResponse {
  getCategories: {
    success: boolean;
    total: number;
    data: IChildCategory[];
    error?: {
      message: string;
      code: string;
      details: string;
    };
  };
}

export interface IParentData {
  id: string;
  name: string;
  parent_data?: IParentData | null;
}

export interface ICategoryWithParents {
  id: string;
  name: string;
  parent_data?: IParentData | null;
}

export interface IGetCategoryResponse {
  getCategory: {
    success: boolean;
    data: ICategoryWithParents;
    error?: {
      message: string;
      code: string;
      details: string;
    } | null;
  };
}