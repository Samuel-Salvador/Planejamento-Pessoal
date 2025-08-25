CREATE TABLE users(
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(100) NOT NULL,
        birthday DATE NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        income DECIMAL(15,2) NOT NULL,
        balance DECIMAL(15,2) NOT NULL,
        invoice_closing_date INT NOT NULL

);

CREATE TABLE user_transaction_groups (
        user_id BIGSERIAL NOT NULL,
        transaction_group VARCHAR(255),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        price DECIMAL(15,2) NOT NULL,
        installments INT NOT NULL,
        category VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        group_name VARCHAR(255) NOT NULL,
        current_installment INT NOT NULL,

        user_id BIGINT NOT NULL,
        CONSTRAINT fk_transaction_user FOREIGN KEY (user_id) REFERENCES users(id)
);