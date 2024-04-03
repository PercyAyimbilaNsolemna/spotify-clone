export const connection: Connection = {
  CONNECTION_STRING: 'The SQL connection string will be inserted here',
  DB: 'MYSQL',
  DBNAME: 'TEST',
};

export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string;
};
