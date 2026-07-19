USE stadium_ai;

-- 1. users
INSERT INTO users (username, email, password_hash, role, full_name, phone) VALUES
('fan_john', 'john@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm5cL1hP.1TG3g2L8mJi', 'fan', 'John Doe', '555-0101'),
('fan_jane', 'jane@example.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm5cL1hP.1TG3g2L8mJi', 'fan', 'Jane Smith', '555-0102'),
('org_mike', 'mike@stadium.org', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm5cL1hP.1TG3g2L8mJi', 'organizer', 'Mike Johnson', '555-0201'),
('org_sarah', 'sarah@stadium.org', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm5cL1hP.1TG3g2L8mJi', 'organizer', 'Sarah Davis', '555-0202'),
('admin_boss', 'admin@stadium.org', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36PQm5cL1hP.1TG3g2L8mJi', 'admin', 'Boss Admin', '555-0301');

-- 2. volunteers
INSERT INTO volunteers (user_id, name, email, phone, skill_set, assigned_zone, status) VALUES
(NULL, 'Tom Volunteer', 'tom.v@example.com', '555-1101', 'medical, first aid', 'A', 'available'),
(NULL, 'Jerry Vol', 'jerry.v@example.com', '555-1102', 'security', 'B', 'deployed'),
(NULL, 'Alice Vol', 'alice.v@example.com', '555-1103', 'translation (Spanish)', 'C', 'available'),
(NULL, 'Bob Vol', 'bob.v@example.com', '555-1104', 'accessibility, crowd management', 'A', 'off_duty'),
(NULL, 'Charlie Vol', 'charlie.v@example.com', '555-1105', 'medical', 'B', 'available'),
(NULL, 'Dave Vol', 'dave.v@example.com', '555-1106', 'security', 'C', 'deployed'),
(NULL, 'Eve Vol', 'eve.v@example.com', '555-1107', 'translation (French)', 'A', 'available'),
(NULL, 'Frank Vol', 'frank.v@example.com', '555-1108', 'crowd management', 'B', 'deployed'),
(NULL, 'Grace Vol', 'grace.v@example.com', '555-1109', 'accessibility', 'C', 'available'),
(NULL, 'Heidi Vol', 'heidi.v@example.com', '555-1110', 'medical, first aid', 'A', 'off_duty'),
(NULL, 'Ivan Vol', 'ivan.v@example.com', '555-1111', 'security', 'B', 'available'),
(NULL, 'Judy Vol', 'judy.v@example.com', '555-1112', 'translation (German)', 'C', 'deployed'),
(NULL, 'Kevin Vol', 'kevin.v@example.com', '555-1113', 'crowd management', 'A', 'available'),
(NULL, 'Larry Vol', 'larry.v@example.com', '555-1114', 'medical', 'B', 'deployed'),
(NULL, 'Mallory Vol', 'mallory.v@example.com', '555-1115', 'security', 'C', 'available');

-- 3. gates (MetLife Stadium, lat ~40.8128, lng ~-74.0742)
INSERT INTO gates (gate_name, zone, current_crowd, max_capacity, lat, lng) VALUES
('A1', 'A', 1200, 50000, 40.8128, -74.0740),
('A2', 'A', 2500, 50000, 40.8129, -74.0741),
('A3', 'A', 500, 50000, 40.8130, -74.0742),
('A4', 'A', 300, 50000, 40.8131, -74.0743),
('B1', 'B', 4000, 50000, 40.8125, -74.0744),
('B2', 'B', 150, 50000, 40.8124, -74.0745),
('B3', 'B', 800, 50000, 40.8123, -74.0746),
('B4', 'B', 2200, 50000, 40.8122, -74.0747),
('C1', 'C', 100, 50000, 40.8126, -74.0739),
('C2', 'C', 600, 50000, 40.8127, -74.0738),
('C3', 'C', 3500, 50000, 40.8128, -74.0737),
('C4', 'C', 1100, 50000, 40.8129, -74.0736);

-- 4. crowd_data
-- Simulate data for the past 6 hours for Gate 1 (A1)
INSERT INTO crowd_data (gate_id, timestamp, crowd_count, density_level, flow_rate, prediction_next_30min) VALUES
(1, DATE_SUB(NOW(), INTERVAL 6 HOUR), 100, 'low', 50, 150),
(1, DATE_SUB(NOW(), INTERVAL 5 HOUR), 300, 'low', 100, 500),
(1, DATE_SUB(NOW(), INTERVAL 4 HOUR), 1000, 'medium', 200, 1500),
(1, DATE_SUB(NOW(), INTERVAL 3 HOUR), 2500, 'high', 400, 3000),
(1, DATE_SUB(NOW(), INTERVAL 2 HOUR), 4000, 'critical', 500, 4500),
(1, DATE_SUB(NOW(), INTERVAL 1 HOUR), 3000, 'high', 300, 2000),
(1, NOW(), 1200, 'medium', 150, 800),
-- Gate 2 (A2)
(2, DATE_SUB(NOW(), INTERVAL 6 HOUR), 200, 'low', 60, 250),
(2, DATE_SUB(NOW(), INTERVAL 5 HOUR), 500, 'low', 150, 800),
(2, DATE_SUB(NOW(), INTERVAL 4 HOUR), 1500, 'medium', 300, 2000),
(2, DATE_SUB(NOW(), INTERVAL 3 HOUR), 3500, 'high', 600, 4000),
(2, DATE_SUB(NOW(), INTERVAL 2 HOUR), 4500, 'critical', 700, 4800),
(2, DATE_SUB(NOW(), INTERVAL 1 HOUR), 3500, 'high', 400, 2500),
(2, NOW(), 2500, 'high', 250, 1500),
-- Gate 5 (B1)
(5, DATE_SUB(NOW(), INTERVAL 2 HOUR), 5000, 'critical', 800, 5500),
(5, DATE_SUB(NOW(), INTERVAL 1 HOUR), 4500, 'critical', 600, 4000),
(5, NOW(), 4000, 'high', 400, 3000),
-- Gate 11 (C3)
(11, DATE_SUB(NOW(), INTERVAL 2 HOUR), 4000, 'critical', 650, 4200),
(11, DATE_SUB(NOW(), INTERVAL 1 HOUR), 3800, 'high', 500, 3500),
(11, NOW(), 3500, 'high', 350, 2800);

-- 5. food_stalls
INSERT INTO food_stalls (stall_name, zone, cuisine_type, is_vegetarian, is_halal, is_vegan, lat, lng, current_wait_time) VALUES
('Burger Hub', 'A', 'Fast Food', FALSE, FALSE, FALSE, 40.8128, -74.0740, 15),
('Vegan Delights', 'A', 'Vegan', TRUE, FALSE, TRUE, 40.8129, -74.0741, 5),
('Halal Guys', 'B', 'Middle Eastern', FALSE, TRUE, FALSE, 40.8125, -74.0744, 25),
('Pizza Corner', 'B', 'Italian', TRUE, FALSE, FALSE, 40.8124, -74.0745, 20),
('Taco Fiesta', 'C', 'Mexican', TRUE, FALSE, FALSE, 40.8128, -74.0737, 10),
('Healthy Bowl', 'C', 'Salads', TRUE, FALSE, TRUE, 40.8129, -74.0736, 5),
('Hot Dog Stand', 'A', 'Fast Food', FALSE, FALSE, FALSE, 40.8130, -74.0742, 8),
('Sushi Stop', 'B', 'Japanese', FALSE, FALSE, FALSE, 40.8123, -74.0746, 12),
('Refreshments', 'C', 'Beverages', TRUE, TRUE, TRUE, 40.8126, -74.0739, 2),
('BBQ Nation', 'A', 'American', FALSE, FALSE, FALSE, 40.8131, -74.0743, 30);

-- 6. transport
INSERT INTO transport (type, name, location_desc, lat, lng, estimated_wait, capacity) VALUES
('metro', 'MetLife Stadium Station', 'North Entrance', 40.8140, -74.0750, 10, 1000),
('metro', 'Secaucus Junction (Transfer)', '3 Miles away', 40.7610, -74.0750, 5, 2000),
('metro', 'Meadowlands Rail', 'South Entrance', 40.8110, -74.0730, 15, 800),
('bus', 'Bus Stop A', 'Gate A1', 40.8128, -74.0740, 5, 50),
('bus', 'Bus Stop B', 'Gate B1', 40.8125, -74.0744, 20, 50),
('shuttle', 'VIP Shuttle 1', 'VIP Gate', 40.8135, -74.0735, 2, 20),
('shuttle', 'Parking Shuttle', 'Lot E', 40.8150, -74.0720, 8, 40),
('parking', 'Lot G', 'General Parking', 40.8160, -74.0710, 0, 5000);

-- 7. announcements
INSERT INTO announcements (title, content, category, priority, generated_by, target_audience) VALUES
('Welcome to FIFA World Cup 2026', 'Enjoy the match! Stay hydrated.', 'general', 'low', 'manual', 'all'),
('Gate B1 Crowded', 'Please use Gate B2 or B3 for faster entry.', 'info', 'medium', 'ai', 'fans'),
('Weather Alert', 'Light rain expected in 30 mins.', 'info', 'low', 'ai', 'all'),
('Medical Incident Zone C', 'Medical team required at Zone C immediately.', 'emergency', 'critical', 'manual', 'volunteers'),
('Lost Child', 'A young boy looking for his parents at Gate A1.', 'safety', 'high', 'manual', 'all'),
('Post-Match Transport', 'Extra trains have been scheduled from MetLife Station.', 'info', 'low', 'manual', 'fans'),
('Security Briefing', 'All security volunteers to report to HQ at 18:00.', 'general', 'medium', 'manual', 'staff'),
('Food Stall Update', 'Halal Guys is currently out of chicken.', 'info', 'low', 'manual', 'fans');

-- 8. incidents
INSERT INTO incidents (type, description, location_zone, severity, status, reported_by) VALUES
('medical', 'Fan fainted near Gate A2', 'A', 'high', 'resolved', 2),
('medical', 'Minor cut needing first aid', 'B', 'low', 'reported', 1),
('lost_item', 'Found a wallet with ID', 'C', 'low', 'resolved', 3),
('crowd_surge', 'Crowd pushing at Gate B1', 'B', 'critical', 'in_progress', 4),
('security', 'Unauthorized access attempt', 'A', 'medium', 'in_progress', 5);

-- 9. reports
INSERT INTO reports (title, report_type, content, generated_by, period_start, period_end) VALUES
('Daily Operational Summary - Jul 18', 'operational', 'All systems normal. 5 incidents reported, 3 resolved.', 'ai', DATE_SUB(NOW(), INTERVAL 1 DAY), NOW()),
('Crowd Analysis - Match 12', 'crowd', 'Peak density at 17:30 at Gate B1. Recommendation to increase staff.', 'ai', DATE_SUB(NOW(), INTERVAL 4 HOUR), DATE_SUB(NOW(), INTERVAL 1 HOUR)),
('Sustainability Report - Week 2', 'sustainability', 'Waste reduced by 15%. Recycling bins well utilized in Zone A.', 'manual', DATE_SUB(NOW(), INTERVAL 7 DAY), NOW());
