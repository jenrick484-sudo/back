CREATE TABLE daily_sales (
    id SERIAL PRIMARY KEY,
    product TEXT NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_DATE
);