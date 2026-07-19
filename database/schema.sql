CREATE DATABASE IF NOT EXISTS stadium_ai DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE stadium_ai;

-- 1. users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('fan', 'organizer', 'admin') NOT NULL DEFAULT 'fan',
    full_name VARCHAR(100),
    phone VARCHAR(20),
    preferred_language VARCHAR(10) DEFAULT 'en',
    accessibility_needs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_role (role),
    INDEX idx_email (email)
) COMMENT='User accounts for fans, organizers, and admins';

-- 2. volunteers
CREATE TABLE volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    skill_set TEXT,
    assigned_zone VARCHAR(50),
    status ENUM('available', 'deployed', 'off_duty') DEFAULT 'available',
    shift_start DATETIME,
    shift_end DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_assigned_zone (assigned_zone)
) COMMENT='Volunteer profiles and shift tracking';

-- 3. gates
CREATE TABLE gates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gate_name VARCHAR(20) NOT NULL UNIQUE,
    zone VARCHAR(20) NOT NULL,
    current_crowd INT DEFAULT 0,
    max_capacity INT NOT NULL,
    status ENUM('open', 'closed', 'restricted') DEFAULT 'open',
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    is_accessible BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_zone (zone)
) COMMENT='Stadium entrance gates and their capacities';

-- 4. crowd_data
CREATE TABLE crowd_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gate_id INT NOT NULL,
    timestamp DATETIME NOT NULL,
    crowd_count INT NOT NULL,
    density_level ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    flow_rate INT,
    prediction_next_30min INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gate_id) REFERENCES gates(id) ON DELETE CASCADE,
    INDEX idx_gate_timestamp (gate_id, timestamp)
) COMMENT='Historical and predicted crowd density data';

-- 5. food_stalls
CREATE TABLE food_stalls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stall_name VARCHAR(100) NOT NULL,
    zone VARCHAR(20) NOT NULL,
    cuisine_type VARCHAR(50),
    is_vegetarian BOOLEAN DEFAULT FALSE,
    is_halal BOOLEAN DEFAULT FALSE,
    is_vegan BOOLEAN DEFAULT FALSE,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    current_wait_time INT DEFAULT 0,
    status ENUM('open', 'closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_zone (zone),
    INDEX idx_cuisine (cuisine_type)
) COMMENT='Food stalls and vendor information';

-- 6. transport
CREATE TABLE transport (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('metro', 'bus', 'shuttle', 'parking') NOT NULL,
    name VARCHAR(100) NOT NULL,
    location_desc VARCHAR(255),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    estimated_wait INT,
    capacity INT,
    status ENUM('active', 'delayed', 'closed') DEFAULT 'active',
    accessibility_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_status (status)
) COMMENT='Public and private transportation options';

-- 7. announcements
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    category ENUM('safety', 'info', 'emergency', 'general') NOT NULL,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'low',
    generated_by ENUM('ai', 'manual') DEFAULT 'manual',
    target_audience ENUM('all', 'fans', 'volunteers', 'staff') DEFAULT 'all',
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_category (category),
    INDEX idx_priority (priority),
    INDEX idx_is_active (is_active)
) COMMENT='System-wide announcements and notifications';

-- 8. incidents
CREATE TABLE incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('medical', 'security', 'lost_item', 'fire', 'crowd_surge', 'other') NOT NULL,
    description TEXT NOT NULL,
    location_zone VARCHAR(50),
    severity ENUM('low', 'medium', 'high', 'critical') NOT NULL,
    status ENUM('reported', 'in_progress', 'resolved') DEFAULT 'reported',
    reported_by INT,
    assigned_to INT,
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME,
    FOREIGN KEY (reported_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES volunteers(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_severity (severity),
    INDEX idx_type (type)
) COMMENT='Incident reporting and tracking';

-- 9. reports
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    report_type ENUM('operational', 'crowd', 'sustainability', 'incident') NOT NULL,
    content LONGTEXT,
    generated_by ENUM('ai', 'manual') DEFAULT 'manual',
    period_start DATETIME,
    period_end DATETIME,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_report_type (report_type)
) COMMENT='Generated analytical reports';
