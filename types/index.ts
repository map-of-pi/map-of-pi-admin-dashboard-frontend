export interface IAdmin  {
  email: string;  
  username: string;
  password: string;       
  role: string;          
  createdAt: Date;      
  updatedAt: Date;    
  isActive: boolean;   
}

  export interface IUser {
    pi_uid: string;
    pi_username: string;
    user_name: string;
    createdAt: Date;
    updatedAt: Date;
  }
  export interface ExtendedUser {
    pi_uid: string;
    pi_username: string;
    user_name: string;
    createdAt: Date;
    updatedAt: Date;
    count:number
  }

  export interface UserGrowth {
    name: string;
    total:number
  }
  export interface UserPercentage {
    name: string;
    percentage:number
  }
  
  export interface Pagination {
    currentPage: number;
    totalUsers: number;
    totalReviews:number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }

  export interface SellerCompleteResponse {
    sellers: ISeller[];
    totalSellers: number;
    activeSellers: number;
    inactiveSellers: number;
    testSellers: number;
    percentageGrowthThisMonth: number;
    newSellersThisMonth: number;
    sellerGrowth: { month: string; count: number }[];
    sellerGrowthByTypeThisMonth: { [key: string]: number };
    pagination: Pagination;
  }
  
  export interface CompleteResponse {
    totalUsers: number;
    activeUsers: number;
    usersLast7Days: number;
    sevenDayPercentageChange: number;
    monthOverMonthPercentageChange:number,
    users: IUser[];
    pagination: Pagination;
  }

   export interface ISeller {
    seller_id: string;
    _id:string;
    id:string;
    name: string;
    seller_type: "activeSeller" | "inactiveSeller" | "testSeller";
    description: string;
    image?: string;
    address?: string;
    average_rating: number;
    sell_map_center: {
      type: 'Point';
      coordinates: [number, number];
    };
    order_online_enabled_pref: boolean;
   }
  
   export interface IReviewFeedback  {
    _id: string;
    review_receiver_id: string;
    review_giver_id: string;
    reply_to_review_id: string | null;
    rating: number;
    comment?: string;
    image?: string;
     review_date: Date;
     createdAt: Date;
     updatedAt: Date;
  }

export interface IBannedCountry {
  _id: string;
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: {
    shapeName?: string;
    shapeISO?: string;
    shapeID?: string;
    shapeGroup?: string;
    shapeType?: string;
    // For countries without shape data
    geo_point_2d?: {
      lon: number;
      lat: number;
    };
    iso3?: string;
    status?: string;
    color_code?: string;
    name?: string;
    continent?: string;
    region?: string;
    iso_3166_1_alpha_2_codes?: string;
    french_short?: string;
  };
}

export interface IBannedCountriesState {
  countries: IBannedCountry[];
  loading: boolean;
  error: string | null;
}