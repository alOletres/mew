export interface IError {
  error: boolean;
  message?: string;
  code?: number;
}

export interface IQueryOk {
  fieldCount: number;
  affectedRows: number
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}