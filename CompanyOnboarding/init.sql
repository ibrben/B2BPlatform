-- Create table to store companies
CREATE TABLE companies
(
 id UUID PRIMARY KEY,
 name VARCHAR(200),
 address TEXT,
 phone VARCHAR(50)
);

-- Create table to store business units
CREATE TABLE business_units
(
 id UUID PRIMARY KEY,
 company_id UUID,
 name VARCHAR(200)
);

-- Create table to store global staff
CREATE TABLE staff_global_profiles
(
 id UUID PRIMARY KEY,
 company_id UUID,
 first_name VARCHAR(100),
 last_name VARCHAR(100)
);

-- Create table to store business unit staff
CREATE TABLE staff_bu_profiles
(
 id UUID PRIMARY KEY,
 staff_global_id UUID,
 business_unit_id UUID,
 email VARCHAR(255),
 role_id INT,
 password_hash TEXT
);

-- Create a composite index on the staff_global_profiles table
CREATE INDEX idx_company
ON staff_global_profiles(company_id);

-- Create a composite index on the staff_bu_profiles table
CREATE INDEX idx_business_unit
ON staff_bu_profiles(business_unit_id);

-- Enable row level security on the staff_global_profiles table
ALTER TABLE staff_global_profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy to control access to the staff_global_profiles table
CREATE POLICY tenant_isolation
ON staff_global_profiles
USING (company_id = current_setting('app.company_id')::uuid);

INSERT INTO staff_bu_profiles (id, staff_global_id, business_unit_id, email, role_id, password_hash) VALUES ( gen_random_uuid(), gen_random_uuid(), gen_random_uuid(),'admin@example.com',1,'$2a$11$K2qTQgiv20fj8LB45BZhXuNAhGr6V/FcHOGizG4nutXuk0KUPKbIS');
