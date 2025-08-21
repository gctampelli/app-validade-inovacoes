export interface ProductInfo {
    code: string;
    status: number;
    status_verbose: string;
    product: {
      product_name: string;
      brands_tags: string[];
    };
}

export interface ProductDetailList {
    code: string;
    name: string;
    brand: string;
    expirationDate: Date;
    quantity: number
}
