
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE vehicle_license(
    id VARCHAR PRIMARY KEY DEFAULT 'veh_' || LOWER(
            REPLACE(
                CAST(uuid_generate_v1mc() As varchar(50))
                , '-','')
            ),
    application_type VARCHAR(100), 
    added_at TIMESTAMP,
    address VARCHAR,
    state VARCHAR,
    driver_test_score INT,
    first_time BOOLEAN,
    Renewal BOOLEAN,
    longt FLOAT,
    latitude FLOAT

);