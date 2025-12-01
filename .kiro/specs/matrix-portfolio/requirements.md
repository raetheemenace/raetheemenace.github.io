# Requirements Document

## Introduction

This document specifies the requirements for B4Y0N3TTA - a personal portfolio website for John Raven Unera (Rae). The website features a Matrix-inspired cyberpunk aesthetic with digital rain animations, neon green color palette, and high-level visual effects. The portfolio showcases Rae's cybersecurity expertise, programming projects, competition achievements, and professional skills through an immersive storytelling experience.

## Glossary

- **Digital Rain**: Animated background effect featuring binary numbers (0s and 1s) falling vertically, inspired by The Matrix film
- **Portfolio_Website**: The complete web application serving as Rae's personal portfolio
- **Hero_Section**: The main landing area displaying the title, name, and profile photo
- **Navigation_Bar**: The fixed header component containing navigation links and branding
- **Contact_Form**: The interactive form component for visitor inquiries
- **Glitch_Effect**: A visual animation that simulates digital distortion on text or images
- **Typewriter_Effect**: An animation that reveals text character by character
- **Neon_Glow**: A CSS effect creating luminous borders and shadows in neon green color
- **Responsive_Layout**: A design that adapts to different screen sizes (mobile, tablet, desktop)

## Requirements

### Requirement 1: Hero Section with Digital Rain Background

**User Story:** As a visitor, I want to see an immersive Matrix-themed landing page, so that I immediately understand Rae's cybersecurity identity and brand.

#### Acceptance Criteria

1. WHEN the Portfolio_Website loads THEN the Hero_Section SHALL display the title "B4Y0N3TTA" with a Glitch_Effect animation
2. WHEN the Hero_Section renders THEN the Portfolio_Website SHALL display "John Raven Unera" as the primary name with Typewriter_Effect
3. WHEN the page background renders THEN the Portfolio_Website SHALL display Digital_Rain animation with binary numbers falling vertically at varying speeds
4. WHEN the Hero_Section loads THEN the Portfolio_Website SHALL display Rae's profile photo with a Neon_Glow border effect
5. WHEN the Digital_Rain animation runs THEN the Portfolio_Website SHALL maintain a minimum frame rate of 30 FPS on desktop devices

### Requirement 2: Navigation and Branding

**User Story:** As a visitor, I want a clear navigation system with branding, so that I can easily explore different sections of the portfolio.

#### Acceptance Criteria

1. WHEN the page loads THEN the Navigation_Bar SHALL display a custom Matrix-themed logo that redirects to the hero section on click
2. WHEN the Navigation_Bar renders THEN the Portfolio_Website SHALL display links for About, Experiences, Projects, Awards, Skills, and Contact Form sections
3. WHEN a user scrolls down the page THEN the Navigation_Bar SHALL remain fixed at the top with a semi-transparent dark background
4. WHEN a user clicks a navigation link THEN the Portfolio_Website SHALL smooth-scroll to the corresponding section
5. WHEN the viewport width is less than 768 pixels THEN the Navigation_Bar SHALL collapse into a hamburger menu
6. WHEN the Navigation_Bar renders THEN the Portfolio_Website SHALL display social media icons linking to GitHub, LinkedIn, and Instagram profiles

### Requirement 3: About Section

**User Story:** As a visitor, I want to learn about Rae's background and aspirations, so that I can understand who they are professionally.

#### Acceptance Criteria

1. WHEN the About section renders THEN the Portfolio_Website SHALL display the introduction text with Typewriter_Effect on scroll
2. WHEN the About section becomes visible THEN the Portfolio_Website SHALL animate content elements with a fade-in effect
3. WHEN the About section renders THEN the Portfolio_Website SHALL display Rae's cybersecurity and blue-teaming aspirations
4. WHEN the About section renders THEN the Portfolio_Website SHALL apply Neon_Glow styling to section headings

### Requirement 4: Experiences Section

**User Story:** As a visitor, I want to see Rae's competition experiences, so that I can understand their practical achievements in cybersecurity.

#### Acceptance Criteria

1. WHEN the Experiences section renders THEN the Portfolio_Website SHALL display experiences in reverse chronological order (most recent first)
2. WHEN the Experiences section renders THEN the Portfolio_Website SHALL display: International Battle Of Hackers 2025 (Rank 17/42), HackForGov 2025 NCR (Rank 7/20), and IT Quiz Bee (2nd Place)
3. WHEN an experience card becomes visible THEN the Portfolio_Website SHALL animate the card with a slide-in effect from the left
4. WHEN a user hovers over an experience card THEN the Portfolio_Website SHALL apply a Neon_Glow highlight effect

### Requirement 5: Projects Section

**User Story:** As a visitor, I want to explore Rae's projects, so that I can see their technical capabilities and contributions.

#### Acceptance Criteria

1. WHEN the Projects section renders THEN the Portfolio_Website SHALL display project cards for HYDRA, HarvesTrace, and KainTeen
2. WHEN a project card renders THEN the Portfolio_Website SHALL display the project name and description
3. WHEN a user hovers over a project card THEN the Portfolio_Website SHALL apply a 3D tilt effect with Neon_Glow borders
4. WHEN project cards become visible THEN the Portfolio_Website SHALL animate cards with a staggered fade-in effect

### Requirement 6: Awards Section

**User Story:** As a visitor, I want to see Rae's academic and certification achievements, so that I can understand their credentials.

#### Acceptance Criteria

1. WHEN the Awards section renders THEN the Portfolio_Website SHALL display Dean's Lister achievements for 1st and 2nd Semester S.Y. 2024-2025
2. WHEN the Awards section renders THEN the Portfolio_Website SHALL display C2 Proficient EFSET English Certification
3. WHEN award items become visible THEN the Portfolio_Website SHALL animate items with a glowing pulse effect
4. WHEN the Awards section renders THEN the Portfolio_Website SHALL style awards as Matrix-themed achievement badges

### Requirement 7: Skills Section

**User Story:** As a visitor, I want to see Rae's technical and soft skills, so that I can evaluate their competencies.

#### Acceptance Criteria

1. WHEN the Skills section renders THEN the Portfolio_Website SHALL display Technical Skills and Soft Skills in separate categories
2. WHEN the Skills section renders THEN the Portfolio_Website SHALL display Technical Skills: Kali Linux OS, OSINT tools, Cryptography tools, Web Development stack, and MySQL
3. WHEN the Skills section renders THEN the Portfolio_Website SHALL display Soft Skills: English Proficiency, Team Leadership, Adaptability, Hosting/Presenting, Visionary, and Punctuality
4. WHEN skill items become visible THEN the Portfolio_Website SHALL animate skill bars or tags with a loading effect
5. WHEN a user hovers over a skill item THEN the Portfolio_Website SHALL display a Neon_Glow highlight

### Requirement 8: Contact Form Section

**User Story:** As a visitor, I want to contact Rae through a form, so that I can reach out for opportunities or inquiries.

#### Acceptance Criteria

1. WHEN the Contact_Form renders THEN the Portfolio_Website SHALL display input fields for name, email, subject, and message
2. WHEN a user submits the Contact_Form with empty required fields THEN the Portfolio_Website SHALL display validation error messages with red Neon_Glow styling
3. WHEN a user submits the Contact_Form with valid data THEN the Portfolio_Website SHALL display a success message with green Neon_Glow styling
4. WHEN input fields receive focus THEN the Portfolio_Website SHALL apply a Neon_Glow border animation
5. WHEN the Contact_Form renders THEN the Portfolio_Website SHALL display social media links (GitHub, LinkedIn, Instagram) as alternative contact methods

### Requirement 9: Responsive Design

**User Story:** As a visitor using different devices, I want the website to adapt to my screen size, so that I can have a good experience on any device.

#### Acceptance Criteria

1. WHEN the viewport width is 320 pixels or greater THEN the Portfolio_Website SHALL display all content in a readable single-column layout
2. WHEN the viewport width is 768 pixels or greater THEN the Portfolio_Website SHALL display content in a two-column grid where appropriate
3. WHEN the viewport width is 1024 pixels or greater THEN the Portfolio_Website SHALL display the full desktop layout with all animations enabled
4. WHEN the viewport width changes THEN the Portfolio_Website SHALL adjust font sizes proportionally using responsive typography
5. WHEN the device has reduced motion preferences enabled THEN the Portfolio_Website SHALL disable or reduce complex animations

### Requirement 10: Visual Effects and Animations

**User Story:** As a visitor, I want to experience high-quality animations and effects, so that the portfolio feels immersive and memorable.

#### Acceptance Criteria

1. WHEN text elements load THEN the Portfolio_Website SHALL apply Matrix-style green color (#00FF41) with appropriate contrast ratios
2. WHEN the page scrolls THEN the Portfolio_Website SHALL trigger section reveal animations using intersection observers
3. WHEN interactive elements are hovered THEN the Portfolio_Website SHALL apply smooth transition effects within 300 milliseconds
4. WHEN the Portfolio_Website loads THEN the Digital_Rain background SHALL render using HTML5 Canvas for optimal performance
5. WHEN the Portfolio_Website renders THEN the Portfolio_Website SHALL use digital/cyber typography fonts (monospace family)
