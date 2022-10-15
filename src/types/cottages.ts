/**
 * 
 * Static cottage types
 */
export type TCottageType = "floating" | "non-floating"

/**
 * 
 * Object model for database cottage table
 */
export interface ICottage {
  id?: number;
  type: TCottageType;
  description: string;
  price: number;
  is_available?: boolean | number | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TParamFilter = TCottageType & "all"
export interface IFilterBy {
  status?: boolean | string;
}
