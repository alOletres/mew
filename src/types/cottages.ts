/**
 * 
 * Static cottage types
 */
export type TCottageType = "Floating" | "Non-Floating"

/**
 * 
 * Object model for database cottage table
 */
export interface ICottage<T> {
  id?: number;
  readonly type: T extends TCottageType ? T : never;
  description: string;
  price: number;
  is_available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * 
 * Payload type for adding a cottage
 */
export interface ICottagePayload<T = TCottageType> {
  type: T;
  cottages: T extends TCottageType ? ICottage<T>[] : never;
}
