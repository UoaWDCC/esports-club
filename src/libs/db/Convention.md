[Drizzle schema convention](https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing)

for naming convention we to keep everything consistent only use camelCasing for the column in typescript and snake_casing for column in table.

camelCase for the model name 
snake_casing for table name and db column name

export const tableNameInTypescript = pgTable("table_name_in_db", { columnNameTS : type("db_column_name")})