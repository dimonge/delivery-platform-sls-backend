CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(10) NOT NULL,
  postal_code VARCHAR(50) NOT NULL,
  country VARCHAR(40) NOT NULL,
  latitude VARCHAR(10) NULL,
  longitude VARCHAR(10) NULL,
  type VARCHAR(50) NOT NULL,
  business_domain VARCHAR(255) NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE NOT NULL,

  created_by VARCHAR(255) NOT NULL,
  modified_by VARCHAR(255) NOT NULL,
  deleted_by VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY ,
  full_name VARCHAR(255) NOT NULL,
  apartment_no VARCHAR(50) NULL,
  email VARCHAR(255) NULL,
  phone_number VARCHAR(255) NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  modified_by VARCHAR(255) NOT NULL,
  deleted_by VARCHAR(255) NULL,
  latitude VARCHAR(50) NULL,
  longitude VARCHAR(30) NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(10) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  country VARCHAR(50) NOT NULL,

  company_id INTEGER NOT NULL,

  FOREIGN KEY (company_id)
    REFERENCES companies (id)
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY,
  type text NOT NULL,
  tracking_code VARCHAR(10) UNIQUE NOT NULL,
  status text NOT NULL,
  currency VARCHAR(3) NOT NULL,
  amount DOUBLE PRECISION NULL,
  email VARCHAR(255) NULL,
  vat_in_percent VARCHAR(7) NULL,
  customer_id INTEGER NOT NULL,
  distance_in_meter INTEGER NULL, 
  company_id INTEGER NOT NULL,
  pickup_location VARCHAR(250) NOT NULL,
  dropoff_location VARCHAR(250) NOT NULL,
  custom_dropoff_address VARCHAR(250) NULL,

  created_by VARCHAR(255) NOT NULL,
  modified_by VARCHAR(255) NOT NULL,
  deleted_by VARCHAR(255) NULL,

  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE NOT NULL,

  pickup_time TIMESTAMP WITH TIME ZONE NOT NULL,
  actual_pickup_time TIMESTAMP WITH TIME ZONE NOT NULL,
  
  returned_at TIMESTAMP WITH TIME ZONE NOT NULL,
  
  dropoff_time TIMESTAMP WITH TIME ZONE NOT NULL,
  actual_dropoff_time TIMESTAMP WITH TIME ZONE NOT NULL,
  
  customer_signature_type VARCHAR(255) NULL,
  pickup_comments_for_courier VARCHAR(255) NULL,
  dropoff_comments_for_courier VARCHAR(255) NULL,

  courier_id VARCHAR(255) NULL,
  order_id VARCHAR(255) NULL,
  fleet_id INTEGER NULL,
  FOREIGN KEY (customer_id)
    REFERENCES customers (id),
  FOREIGN KEY (company_id)
    REFERENCES companies (id),

  FOREIGN KEY (fleet_id)
    REFERENCES companies (id)
);

CREATE TABLE IF NOT EXISTS pickup_addresses (
  id INTEGER PRIMARY KEY,  
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(10) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  country VARCHAR(50) NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT True,
  company_id INTEGER NOT NULL,

  FOREIGN KEY (company_id)
    REFERENCES companies (id)
);

/*
users has one role
roles belong to one user
task_region 
task_price
fleet_price
addresses
orders
*/