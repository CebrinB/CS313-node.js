INSERT INTO ecommerce.address (address, city, state, zip) 
VALUES ('321 Wallaby Ln.', 'Sydney', 'AU', '11111');

INSERT INTO ecommerce.user (user_name, password, billing_address, billing_phone, display_name) 
  VALUES ('tester1', 'test127&', '1', '555-555-5555', 'John Doe');

INSERT INTO ecommerce.location (location_name, location_address, location_city, location_state, location_zip, location_phone)
  VALUES ('Corner Location', '121 N. Central Expwy', 'Richardson', 'TX', '11111', '555-555-5554');

INSERT INTO ecommerce.item (item_name, item_price, item_description, item_type) 
  VALUES ('Dressage Saddle', 899.95, 'Excellent Quality dark brown leather dressage saddle', 'Saddles'),
         ('Dressage Bridle', 299.95, 'Brown leather dressage bridle with double bit', 'Bridles'),
         ('Blue Quilted Blanket', 199.95, 'Blue quilted winter horse blanket', 'Blankets'),
         ('Blue Halter', 19.95, 'Bright blue nylon horse halter', 'other'),
         ('Cotton Lead Rope', 10.95, '12 foot long white cotton lead rope', 'other')
         ('Dressage Saddle', 749.95, 'Superior Quality black leather dressage saddle', 'Saddles');

INSERT INTO ecommerce.review (user_id, rating, title, content, item_id)
  VALUES (1, 5,'Love it!','Fits my horse perfectly.', 7);