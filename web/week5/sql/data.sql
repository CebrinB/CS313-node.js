INSERT INTO ecommerce.address (address, city, state, zip) 
VALUES ('321 Wallaby Ln.', 'Sydney', 'AU', '11111'),
        ('00120 Citta del Vaticano', 'Vatican City', 'IT','20500'),
        ('931 Thomas Jefferson Parkway', 'Charlottesville', 'NC','12587'),
        ('Prinsengracht 263-267 1016 GV', 'Amsterdam', 'Netherlands','12312');

INSERT INTO ecommerce.user (user_name, password, billing_address, billing_phone, display_name) 
  VALUES ('tester1', 'test127&', '1', '555-555-5555', 'John Doe'),
         ('tester1', 'Howdy176', '2', '543-210-2345', 'Jane Dough');

INSERT INTO ecommerce.location (location_name, location_address, location_phone)
  VALUES ('Corner Location', 1, '555-555-5554'),
         ('Rome Location', 2, 554-556-6678),
         ('Monticello Location', 3, 556-778-9843),
         ('Dutch Location', 4, 543-321-2345);

INSERT INTO ecommerce.item (item_name, item_price, item_description, item_type) 
  VALUES ('Dressage Saddle', 899.95, 'Excellent Quality dark brown leather dressage saddle', 'Saddles'),
         ('Dressage Bridle', 299.95, 'Brown leather dressage bridle with double bit', 'Bridles'),
         ('Blue Quilted Blanket', 199.95, 'Blue quilted winter horse blanket', 'Blankets'),
         ('Blue Halter', 19.95, 'Bright blue nylon horse halter', 'other'),
         ('Cotton Lead Rope', 10.95, '12 foot long white cotton lead rope', 'other')
         ('Ladies Sidesaddle', 749.95, 'Superior Quality black leather sidesaddle', 'Saddles');

INSERT INTO ecommerce.review (user_id, rating, title, content, item_id)
  VALUES (1, 5,'Love it!','Fits my horse perfectly.', 7),
         (2, 1, 'Too big for my pony', 'The description does 
         not specify sizing for this halter. It did not fit 
         my pony at all.', 7);