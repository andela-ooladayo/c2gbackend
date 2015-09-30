
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE users(
    id VARCHAR PRIMARY KEY DEFAULT 'fgsc_' || LOWER(
            REPLACE(
                CAST(uuid_generate_v1mc() As varchar(50))
                , '-','')
            ),
    facebook_id VARCHAR(50), 
    firstname VARCHAR(200),
    lastname VARCHAR(200),
    occupation VARCHAR,
    state VARCHAR(200),
    residential_address VARCHAR,
    email VARCHAR,
    date_of_birth TIMESTAMP,
    picture_url VARCHAR,
    sex VARCHAR(10),
    added_at TIMESTAMP,
    updated_at TIMESTAMP,
    word_attachment_url VARCHAR,
    pdf_attachment_url VARCHAR

);