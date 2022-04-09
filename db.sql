CREATE database notice OWNER postgres;
create table notes (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    title TEXT,
    info TEXT
)