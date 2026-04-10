# Foodie - Mobile Restaurant Loyalty & Discovery Platform
## Product Requirements Document

---

## Table of Contents
1. [App Overview](#1-app-overview)
2. [Unified Loyalty Wallet](#2-unified-loyalty-wallet)
3. [Fast Points Upload System](#3-fast-points-upload-system)
4. [Restaurant Events Hub](#4-restaurant-events-hub)
5. [For You Discovery Feed](#5-for-you-discovery-feed)
   - [5.5 Restaurant Detail Page & Maps Integration](#55-restaurant-detail-page)
6. [Social Content & Monetization](#6-social-content--monetization)
7. [Payment & Points Marketplace](#7-payment--points-marketplace)
8. [Foodie Rewards System](#8-foodie-rewards-system)
9. [In-App Ordering System](#9-in-app-ordering-system)
10. [Community Impact Section](#10-community-impact-section)
11. [Value Dashboard](#11-value-dashboard)
12. [Technical Architecture](#12-technical-architecture)
13. [Implementation Phases](#13-implementation-phases)

---

## 1. App Overview

### 1.1 Problem Statement
Restaurant diners face a fragmented loyalty landscape with 10+ separate apps, making it difficult to track points, discover new restaurants, and maximize value from dining experiences. Local restaurants struggle to compete with chains that have sophisticated loyalty technology.

### 1.2 Solution
Foodie is a mobile-first platform that unifies restaurant loyalty programs, gamifies food exploration, enables social monetization, and creates community impact through charitable giving—all while driving revenue through ordering and marketplace transactions.

### 1.3 Target Users
- **Primary**: Urban diners (25-45) who eat out 3-5x/week and want simplified loyalty tracking
- **Secondary**: Local restaurant owners seeking customer acquisition and retention tools
- **Tertiary**: Food content creators looking to monetize their posts

### 1.4 Success Metrics
- **70%+ weekly active users**
- **3+ restaurants tracked per user**
- **$500K+ monthly GMV** from ordering
- **30% user discovery rate** of new restaurants via For You feed
- **15% transaction fee** on orders
- **$100K+ annual** community donations

### 1.5 App Theme & Design System

#### 1.5.1 Platform
- **Technology**: React Native
- **Supported Platforms**: iOS 14+ and Android 10+
- **Design Language**: Food-inspired, fresh, approachable

#### 1.5.2 Color Palette

##### Primary Colors (Green Food-Like Tones)
- **Fresh Avocado Green** (`#7CB342`) - Primary brand color
  - Use: Primary buttons, active states, key actions
  - Represents: Freshness, health, natural food

- **Lime Zest** (`#9CCC65`) - Secondary green
  - Use: Secondary buttons, accents, highlights
  - Represents: Energy, vitality, appetite

- **Basil Leaf** (`#558B2F`) - Dark green
  - Use: Text on light backgrounds, icons, borders
  - Represents: Richness, depth, trust

##### Neutral Colors (Warm & Inviting)
- **Cream** (`#FFF8E1`) - Light background
  - Use: Main backgrounds, cards, content areas
  - Represents: Warmth, comfort, neutral canvas

- **Latte** (`#F5F5DC`) - Secondary background
  - Use: Alternate backgrounds, dividers
  - Represents: Soft, inviting, food-adjacent

- **Toasted Wheat** (`#D7CCC8`) - Tertiary neutral
  - Use: Subtle borders, disabled states
  - Represents: Natural, earthy, grounded

##### Accent Colors
- **Tomato Red** (`#E53935`) - Error/urgent actions
  - Use: Alerts, errors, expiring points warnings

- **Golden Honey** (`#FDD835`) - Success/rewards
  - Use: Points earned animations, achievements, stars

- **Eggplant Purple** (`#8E24AA`) - Premium features
  - Use: Verified creator badges, premium options

- **Sky Blue** (`#039BE5`) - Information
  - Use: Info messages, links, navigation highlights

##### Text Colors
- **Charcoal** (`#212121`) - Primary text
  - Use: Headings, body text, important information

- **Slate Gray** (`#616161`) - Secondary text
  - Use: Subtitles, captions, metadata

- **Light Gray** (`#9E9E9E`) - Tertiary text
  - Use: Placeholder text, disabled text, timestamps

#### 1.5.3 Typography

##### Font Family
- **Primary Font**: **Poppins** (Happy, rounded, food-friendly)
  - Rationale: Soft curves evoke comfort and approachability, perfect for food apps
  - Weights: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)

- **Secondary Font**: **Quicksand** (Playful, geometric)
  - Use: Headings, feature titles, call-to-action buttons
  - Rationale: Friendly, inviting, energetic feel

##### Type Scale
- **Display**: Quicksand Bold 32px - Hero headings, feature titles
- **H1**: Poppins SemiBold 28px - Page titles
- **H2**: Poppins SemiBold 24px - Section headers
- **H3**: Poppins Medium 20px - Subsection headers
- **Body Large**: Poppins Regular 18px - Important content
- **Body**: Poppins Regular 16px - Standard text
- **Body Small**: Poppins Regular 14px - Captions, metadata
- **Caption**: Poppins Light 12px - Timestamps, fine print

#### 1.5.4 Visual Style

##### Iconography
- **Style**: Rounded, friendly icons with soft edges
- **Library**: Custom food-themed icons + Material Design Icons (rounded variant)
- **Color**: Primarily Fresh Avocado Green with contextual accent colors
- **Examples**:
  - Receipt scan: Camera icon with receipt outline
  - Points wallet: Wallet icon with star/coin
  - Food post: Camera with fork/knife overlay
  - Challenges: Trophy with food elements

##### Imagery
- **Food Photography**: High-quality, vibrant, well-lit food photos
- **Style**: Natural lighting, appetizing, authentic (not overly styled)
- **Filters**: Warm tones that enhance food colors
- **User Content**: Encouraged to be casual, authentic, real dining experiences

##### UI Components
- **Buttons**:
  - Primary: Fresh Avocado Green background, white text, 8px border radius
  - Secondary: White background, Basil Leaf border, Basil Leaf text
  - Rounded corners evoke food elements (plates, bowls)

- **Cards**:
  - White or Cream backgrounds
  - Subtle shadows for depth
  - 12px border radius (soft, inviting)
  - Fresh Avocado Green accents for active states

- **Input Fields**:
  - Cream backgrounds with Basil Leaf borders
  - 8px border radius
  - Focus state: Fresh Avocado Green border with glow

##### Animations & Micro-interactions
- **Points Earned**: Confetti burst with Golden Honey sparkles
- **Challenge Complete**: Badge scales up with bounce effect
- **Food Post Like**: Heart icon fills with Tomato Red + pulse
- **Navigation**: Smooth slide transitions with subtle fade
- **Loading**: Animated fork/knife or plate spinner in Fresh Avocado Green

#### 1.5.5 Mood & Personality

**Brand Personality**:
- **Friendly**: Approachable, warm, welcoming
- **Fresh**: Clean, healthy, vibrant
- **Playful**: Fun challenges, rewards, gamification
- **Trustworthy**: Reliable points tracking, secure payments
- **Community-Oriented**: Social features, charitable giving

**Visual Mood**:
- Evokes the feeling of a farmers market or fresh kitchen
- Balanced between modern tech and organic food aesthetics
- Inviting, not sterile - feels human and authentic
- Celebrates food diversity and local culture

**User Experience Tone**:
- Encouraging: "You're on a streak!"
- Celebratory: "You earned 250 points!"
- Helpful: "3 of your points expire soon"
- Community-focused: "Your donation helped provide 10 meals"

---

## 2. Unified Loyalty Wallet

### 2.1 Overview
Central dashboard that aggregates loyalty points, rewards, and balances from multiple restaurant programs into one unified interface.

### 2.2 Core Features

#### 2.2.1 Multi-Restaurant Points Aggregation
- **Description**: Connect and sync points from participating restaurants
- **User Flow**:
  1. User navigates to "Wallet" tab
  2. Taps "Add Restaurant"
  3. Selects from list of supported restaurants
  4. Connects via OAuth or manual entry
  5. Points appear in unified wallet view
- **Data Displayed**:
  - Current point balance per restaurant
  - Total points across all restaurants
  - Point expiration dates
  - Redemption value estimate (e.g., "1,000 points = $10")

#### 2.2.2 Real-Time Balance Updates
- **Description**: Automatic synchronization of points every 4 hours
- **Sync Triggers**:
  - Manual refresh by user
  - New transaction detected
  - Points expiration approaching (7-day alert)
  - Background sync every 4 hours
- **Sync Methods**:
  - API integration with restaurant loyalty systems
  - Receipt scan verification
  - Manual entry with validation

#### 2.2.3 Points History & Timeline
- **Description**: Chronological view of all points earned and spent
- **Display Elements**:
  - Date and time of transaction
  - Restaurant name and logo
  - Points earned/spent
  - Transaction type (earned, redeemed, expired, gifted)
  - Running balance
- **Filters**: By restaurant, date range, transaction type

#### 2.2.4 Expiration Alerts
- **Description**: Proactive notifications when points are about to expire
- **Alert Schedule**:
  - 30 days before expiration: Push notification
  - 7 days before: Push + in-app banner
  - 1 day before: Push + email + prominent wallet alert
- **Actions**: "Use Now" button links to restaurant ordering or redemption options

### 2.3 Technical Requirements
- Secure encrypted storage for restaurant account credentials
- OAuth 2.0 integration where available
- Fallback to manual entry for unsupported restaurants
- Points normalization algorithm to display equivalent value

### 2.4 Success Metrics
- **90%+ sync accuracy** across connected accounts
- **<5 second load time** for wallet view
- **80%+ user engagement** with expiration alerts (click-through rate)
- **Average 4+ restaurants** connected per active user

---

## 3. Fast Points Upload System

### 3.1 Overview
Multiple frictionless methods to capture and credit dining transactions without manual data entry.

### 3.2 Upload Methods

#### 3.2.1 Receipt Photo Scan
- **Description**: Camera-based OCR to extract transaction details from paper receipts
- **User Flow**:
  1. User taps "Scan Receipt" button (camera icon in bottom nav)
  2. Camera opens with receipt framing guide
  3. User captures photo of receipt
  4. OCR processes image (2-3 seconds)
  5. App displays extracted data for confirmation
  6. User confirms or edits restaurant, date, amount
  7. Points automatically credited to wallet
- **OCR Extraction**:
  - Restaurant name
  - Transaction date and time
  - Total amount
  - Tax amount
  - Line items (optional, for dish tracking)
- **Edge Cases**:
  - Low-quality image: Prompt to retake
  - Ambiguous restaurant name: Show options to select
  - Duplicate receipt: Alert user and block duplicate credit

#### 3.2.2 Barcode/QR Code Scanner
- **Description**: Instant points credit via scanning at restaurant counter
- **User Flow**:
  1. Restaurant displays QR code at checkout
  2. User taps "Scan Code" in app
  3. Camera scans QR/barcode
  4. App decodes: restaurant ID, transaction amount, timestamp
  5. Points instantly credited with haptic feedback + animation
  6. Confirmation screen shows points earned
- **QR Code Format**: Encoded JSON with restaurant ID, amount, unique transaction ID
- **Security**: Transaction ID validated once to prevent duplicate scans

#### 3.2.3 Digital Receipt Import
- **Description**: Forward email receipts or import from apps (Uber Eats, DoorDash)
- **User Flow**:
  1. User receives email receipt
  2. Forwards to receipts@foodieapp.com
  3. Backend parses email, extracts transaction data
  4. Points credited within 5 minutes
  5. Push notification confirms credit
- **Supported Sources**:
  - Email receipts (Gmail, Outlook)
  - Third-party delivery apps (via API or email forward)
  - Restaurant native apps (manual or API integration)

#### 3.2.4 Manual Entry (Fallback)
- **Description**: Guided form for unsupported restaurants or failed scans
- **User Flow**:
  1. User taps "Add Manually"
  2. Form with fields: Restaurant name (searchable dropdown), Date, Amount
  3. Optional: Upload receipt photo for verification
  4. Submit → Points pending review (24 hours)
  5. Auto-approved if restaurant recognized, manual review otherwise

### 3.3 Points Calculation Logic
- Each restaurant defines points formula (e.g., "$1 = 10 points")
- Foodie retrieves formula from restaurant database
- Calculation: `points = floor(amount * multiplier)`
- Bonus multipliers applied: First visit (2x), challenges (1.5x), promotions (variable)

### 3.4 Success Metrics
- **<3 seconds** average scan time
- **90%+ OCR accuracy** for receipt scanning
- **<2 taps** to complete quick scan flow
- **95%+ duplicate prevention** accuracy

---

## 4. Restaurant Events Hub

### 4.1 Overview
Centralized feed of restaurant events, specials, happy hours, and food competitions to drive engagement and foot traffic.

### 4.2 Event Categories

#### 4.2.1 Happy Hours & Daily Specials
- **Description**: Time-sensitive deals and promotions
- **Display Elements**:
  - Restaurant name and photo
  - Special details (e.g., "50% off appetizers 4-6 PM")
  - Valid dates and times
  - Distance from user
  - "Set Reminder" button
- **Filters**: Time of day, cuisine type, distance, current only vs. upcoming

#### 4.2.2 Pop-Ups & Limited-Time Menus
- **Description**: Temporary food offerings and guest chef events
- **Display Elements**:
  - Event name and description
  - Chef/vendor info
  - Location and dates
  - Ticket price (if applicable)
  - RSVP/Register button
- **Integration**: Links to ticketing or reservation systems

#### 4.2.3 Local Competitions
- **Description**: Community food challenges (eating contests, cook-offs, trivia)
- **Display Elements**:
  - Competition name and rules
  - Registration deadline
  - Prize details
  - Leaderboard (if live)
  - "Register Now" button
- **User Participation**:
  - Register in-app
  - Receive QR code for check-in
  - Automatic points credit for participation

#### 4.2.4 National Competitions
- **Description**: Large-scale events across multiple cities
- **Display Elements**:
  - Event branding and description
  - Participating cities/restaurants
  - Grand prize details
  - Qualification criteria
  - National leaderboard
- **Examples**: "Foodie's Best Burger Hunt," "Taco Challenge 2026"

### 4.3 User Interactions

#### 4.3.1 Event Discovery
- **Main Feed**: Scrollable list sorted by relevance (nearby + soon + popular)
- **Map View**: Pin-based map showing event locations
- **Calendar View**: Monthly calendar with event markers
- **Notifications**: Opt-in alerts for followed restaurants or event types

#### 4.3.2 Event Registration
- **Flow**:
  1. User taps "Register" on event
  2. Confirms details (date, time, location)
  3. Receives confirmation email + calendar invite
  4. In-app QR code generated for check-in
- **Check-In**:
  1. User arrives at event
  2. Opens event in app
  3. Staff scans user's QR code
  4. Points credited for attendance

#### 4.3.3 Event Reminders
- **Schedule**:
  - 1 week before: Push notification
  - 1 day before: Push + email
  - 1 hour before: Push (if location-based triggers enabled)
- **Actions**: "Directions," "Cancel RSVP," "Add to Calendar"

### 4.4 Restaurant Event Creation
- **Restaurant Dashboard**: Web portal for restaurants to create/manage events
- **Event Form Fields**:
  - Title, description
  - Category (happy hour, pop-up, competition)
  - Date range and times
  - Location (auto-filled from restaurant profile)
  - Max attendees (optional)
  - Points reward for attendance
- **Approval**: Auto-approved for verified restaurants, manual review for new ones

### 4.5 Success Metrics
- **30%+ user discovery rate** of events monthly
- **20%+ registration conversion** from event view
- **15%+ attendance rate** for registered events
- **40%+ restaurants creating events** monthly

---

## 5. For You Discovery Feed

### 5.1 Overview
Personalized algorithmic feed that surfaces nearby restaurants, local vendors, and caterers to help users discover new dining options and support small businesses.

### 5.2 Content Types

#### 5.2.1 Restaurant Recommendations
- **Personalization Inputs**:
  - User's dining history
  - Cuisine preferences (set during onboarding + inferred)
  - Location (real-time GPS)
  - Time of day (breakfast, lunch, dinner suggestions)
  - Price range preference
  - Dietary restrictions
- **Display Card Elements**:
  - Restaurant photo (hero image)
  - Name and cuisine type
  - Distance and estimated travel time
  - User rating (from Foodie reviews)
  - Price range ($ to $$$$)
  - Why recommended: "Based on your love of Thai food"
  - Quick actions: "Order Now," "View Menu," "Save"

#### 5.2.2 Local Business Spotlights
- **Description**: Prioritized visibility for small, independent restaurants
- **Eligibility Criteria**:
  - <3 locations
  - Local ownership (not chain)
  - Verified on Foodie platform
- **Spotlight Features**:
  - "Local Gem" badge
  - Featured position in feed (top 20%)
  - Owner story snippet (optional)
  - Special offer for first-time visitors
- **Rotation**: Daily refresh to highlight different businesses

#### 5.2.3 Small Vendors & Caterers
- **Description**: Discover food trucks, pop-up vendors, home chefs, caterers
- **Display Elements**:
  - Vendor photo and logo
  - Operating hours and locations (for mobile vendors)
  - Menu highlights
  - Advance ordering available (yes/no)
  - "Track Location" for food trucks
- **Integration**: Live location tracking for mobile vendors

#### 5.2.4 Trending Dishes
- **Description**: Popular dishes in user's area based on recent posts and orders
- **Display Elements**:
  - Dish photo (from user posts)
  - Dish name and restaurant
  - Trending score (% increase in orders/posts)
  - "Order This" button
- **Trending Algorithm**: `(recent_orders + post_engagement) / time_period * location_weight`

### 5.3 Feed Algorithm

#### 5.3.1 Ranking Factors
- **User Preferences** (40%): Cuisine, price, dietary
- **Proximity** (25%): Distance from current location
- **Recency** (15%): Recently opened or updated menu
- **Engagement** (10%): High ratings, reviews, saved
- **Diversity** (10%): Mix of cuisines, price ranges

#### 5.3.2 Exploration vs. Exploitation
- **80% Exploitation**: Show restaurants similar to user's history
- **20% Exploration**: Introduce new cuisines, price ranges, locations
- **Cold Start**: New users see popular nearby restaurants + onboarding quiz results

#### 5.3.3 Feed Refresh
- **Pull to Refresh**: Manual refresh by user
- **Auto-Refresh**: When user changes location >1 mile
- **Daily Reset**: New content at midnight local time

### 5.4 User Interactions

#### 5.4.1 Save for Later
- **Action**: Tap bookmark icon on restaurant card
- **Effect**: Added to "Saved Restaurants" collection
- **Reminder**: "You saved this last week—want to try it?" (7 days later)

#### 5.4.2 Not Interested
- **Action**: Swipe left or tap "Hide"
- **Effect**: Restaurant removed from feed, algorithm learns preference
- **Feedback**: "Why? [Too far] [Not my taste] [Too expensive] [Other]"

#### 5.4.3 Share Restaurant
- **Action**: Tap share icon
- **Options**: Message, social media, copy link
- **Incentive**: "Share with 3 friends, earn 50 bonus points"

### 5.5 Restaurant Detail Page

#### 5.5.1 Overview
When users tap on a restaurant from the home screen/feed, they navigate to a comprehensive restaurant detail page that provides all essential information including directions, menu, reviews, and quick actions.

#### 5.5.2 Restaurant Header
- **Display Elements**:
  - Hero image (restaurant photo or featured dish)
  - Restaurant name and cuisine type
  - Rating (stars + review count)
  - Price range ($ to $$$$)
  - Open/Closed status with hours
  - Distance from user's current location
  - "Local Gem" or "Verified" badges (if applicable)

#### 5.5.3 Quick Action Buttons
- **Primary Actions Row**:
  - **Directions**: Opens maps integration (see 5.5.4)
  - **Call**: Direct phone call to restaurant
  - **Order Now**: Jump to ordering flow (if available)
  - **Save**: Add to saved restaurants collection
  - **Share**: Share restaurant with friends

#### 5.5.4 Maps Integration & Directions
- **Description**: Users can get turn-by-turn directions to the restaurant directly from the app
- **User Flow**:
  1. User taps "Directions" button on restaurant detail page
  2. App displays options modal:
     - **Open in Apple Maps** (iOS)
     - **Open in Google Maps** (iOS/Android)
     - **Open in Waze** (if installed)
     - **View on Map** (in-app map preview)
  3. User selects preferred navigation app
  4. Selected app opens with destination pre-filled
  5. Navigation begins with turn-by-turn directions
- **In-App Map Preview**:
  - Embedded map showing restaurant location pin
  - User's current location (blue dot)
  - Estimated travel time (driving, walking, transit)
  - Address displayed below map
  - "Get Directions" button to open external maps
- **Deep Link Format**:
  - Apple Maps: `maps://maps.apple.com/?daddr={lat},{lng}`
  - Google Maps: `comgooglemaps://?daddr={lat},{lng}&directionsmode=driving`
  - Waze: `waze://?ll={lat},{lng}&navigate=yes`
  - Fallback: Open web-based Google Maps if native apps not available

#### 5.5.5 Restaurant Information Tabs
- **Tab Structure**:
  1. **Overview Tab**:
     - About section (restaurant description)
     - Cuisine specialties
     - Dietary options available (vegan, gluten-free, etc.)
     - Amenities (parking, wifi, outdoor seating)
     - Business hours (daily schedule)
     - Contact information (phone, email, website)
  2. **Menu Tab**:
     - Full menu categorized by meal type
     - Prices and photos for each item
     - Dietary icons and allergen info
     - "Order" button for each item
  3. **Reviews Tab**:
     - User reviews from Foodie community
     - Ratings breakdown (food, service, ambiance)
     - Review photos
     - Sort by: Most recent, Highest rated, Most helpful
  4. **Events Tab**:
     - Upcoming events at this restaurant
     - Happy hours and specials
     - "Register" or "Set Reminder" buttons

#### 5.5.6 Location & Address Section
- **Display Elements**:
  - Full street address (tappable to copy)
  - Neighborhood/area name
  - Embedded map view (static or interactive)
  - "Copy Address" button
  - "Open in Maps" button
  - Nearby landmarks or cross-streets
  - Parking information (if available)
- **Accessibility**: Address formatted for screen readers

#### 5.5.7 Points & Loyalty Info
- **Display Elements**:
  - User's current points balance at this restaurant
  - Points earning rate (e.g., "$1 = 10 points")
  - Active promotions or bonus multipliers
  - Points expiring soon (if any)
  - Available rewards to redeem
  - "Connect Loyalty Account" (if not connected)

#### 5.5.8 Social Proof Section
- **Display Elements**:
  - Recent posts from Foodie users at this restaurant
  - "X friends have been here" (if applicable)
  - Trending dishes at this location
  - Creator highlights and featured reviews

### 5.6 Success Metrics
- **30%+ discovery rate**: Users visit a new restaurant from feed monthly
- **5+ feed sessions**: Per user per week
- **25%+ click-through**: From feed card to restaurant detail page
- **40%+ local business impressions**: Share of total feed views
- **60%+ directions usage**: Users who view details tap "Directions"
- **<2 taps** to get directions from home screen

---

## 6. Social Content & Monetization

### 6.1 Overview
Users create and share food content (photos, reviews, ratings) and optionally earn money through views, engagement, and restaurant promotions.

### 6.2 Content Creation

#### 6.2.1 Food Post Creation
- **User Flow**:
  1. User taps "Post" button (+ icon in bottom nav)
  2. Selects photos from camera roll or takes new photos
  3. Adds caption (optional)
  4. Tags restaurant (searchable dropdown)
  5. Rates experience (1-5 stars)
  6. Adds dish tags (optional, for trending tracking)
  7. Privacy settings: Public, Friends Only, Private
  8. Taps "Post"
- **Post Elements**:
  - 1-5 photos (swipeable carousel)
  - Caption (max 500 characters)
  - Restaurant tag (clickable → restaurant page)
  - User rating (stars)
  - Dish tags (e.g., "#BurgerMonday")
  - Timestamp and location
  - Like count, comment count, share count

#### 6.2.2 Photo Filters & Editing
- **Built-In Editor**:
  - Brightness, contrast, saturation adjustments
  - Food-optimized filters (e.g., "Vibrant," "Warm," "Crispy")
  - Crop and rotate
  - Text overlays (optional)
- **Integration**: Basic editing, not replacing full photo editors

#### 6.2.3 Restaurant Tagging
- **Automatic Suggestions**: Based on GPS location when photo taken
- **Manual Search**: Type restaurant name, see dropdown results
- **Verification**: Restaurant receives notification of tag, can respond/repost

### 6.3 Social Feed

#### 6.3.1 User Feed
- **Content Sources**:
  - Posts from followed users (70%)
  - Recommended posts from similar users (20%)
  - Trending posts nearby (10%)
- **Sorting**: Reverse chronological with algorithmic boosts
- **Engagement Actions**: Like, comment, share, save

#### 6.3.2 Following System
- **Follow Users**: Tap "Follow" on profile or post
- **Discover Users**: "Suggested for You" section based on similar tastes
- **Following Indicators**: "Following" badge on followed users' posts

#### 6.3.3 Comments & Replies
- **Comment Thread**: Nested replies (max 2 levels)
- **Moderation**: Auto-hide flagged comments, manual review
- **Reactions**: Like comments with emoji reactions

### 6.4 Content Monetization

#### 6.4.1 Earnings Model
- **View-Based Earnings**: $0.01 per 100 views (for promoted content)
- **Engagement Bonus**: +$0.005 per like, +$0.01 per comment, +$0.02 per share
- **Promotion Matching**: Higher rates if post matches active restaurant campaign
- **Earnings Cap**: Max $500/month for standard users, unlimited for verified creators

#### 6.4.2 Promotion Campaigns
- **How It Works**:
  1. Restaurant creates promotion campaign (e.g., "Promote our new burger")
  2. Sets budget, target payout per view, duration
  3. Foodie matches existing posts or incentivizes new posts
  4. Users who post tagged content automatically enrolled
  5. Earnings calculated based on views + engagement
- **Campaign Types**:
  - **Dish Promotion**: Specific menu item
  - **Brand Awareness**: Restaurant name/location
  - **Event Promotion**: Specific event or special
- **Transparency**: Users see "Sponsored" badge if post is in a campaign

#### 6.4.3 Payout System
- **Payout Schedule**: Weekly (every Monday)
- **Minimum Threshold**: $10 (earnings roll over if below threshold)
- **Payment Methods**: Direct deposit, PayPal, gift card redemption
- **Earnings Dashboard**: In-app view of lifetime earnings, pending balance, payout history

#### 6.4.4 Verified Creator Program
- **Eligibility**:
  - 1,000+ followers
  - 10,000+ post views in last 30 days
  - 90%+ engagement rate
  - No violations of community guidelines
- **Benefits**:
  - Verified badge on profile
  - No earnings cap
  - Priority for high-paying campaigns
  - Early access to new features
  - Dedicated creator support

### 6.5 Content Moderation
- **Automated Filters**: Flag inappropriate content (profanity, hate speech, spam)
- **User Reports**: "Report" button on posts/comments
- **Manual Review**: Flagged content reviewed within 24 hours
- **Penalties**: Warning → temporary suspension → permanent ban

### 6.6 Success Metrics
- **10%+ creators earning monthly**: Users making at least $10/month
- **$50K+ monthly creator payouts**
- **30% average engagement rate**: Likes + comments per post
- **25%+ viral rate**: Posts shared beyond original followers

---

### 6.7 Enhanced Instagram-Style Feed Experience

#### 6.7.1 Overview
Transform the Feed tab into a fully immersive, Instagram-like social experience featuring vertical-scrolling reels, rich media posts, comprehensive engagement features, and integrated restaurant/points information. The feed combines social discovery with practical dining information to help users find their next meal while staying connected with the food community.

#### 6.7.2 Feed Navigation Header

##### Top Navigation Bar
- **Layout**: Fixed header at top of Feed screen with three primary sections
- **Design**: Clean, minimal design with Fresh Avocado Green accents on cream background

**Left Section - Post Now Button (Primary CTA)**:
- **Design**: Prominent button with unique styling to stand out
  - Background: Gradient from Fresh Avocado Green to Lime Zest
  - Icon: Camera + plus symbol (custom design)
  - Text: "Post Now" in bold white text
  - Shape: Rounded rectangle with 12px border radius
  - Shadow: Elevated shadow for prominence
  - Size: 120px width × 44px height
- **Behavior**:
  - Tap to instantly open camera/gallery selector
  - Haptic feedback on press
  - Subtle scale animation (0.95x) on press
- **Quick Actions (Long Press)**:
  - Take Photo: Open camera directly
  - Choose from Gallery: Open photo picker
  - Record Reel: Start video recording (15-60 seconds)
- **User Flow**:
  1. User taps "Post Now"
  2. Modal appears with options: "Photo", "Video Reel", "Gallery"
  3. User selects option
  4. Camera/gallery opens
  5. After capture/selection → Post creation screen (see 6.7.3)

**Center Section - My Posts**:
- **Design**:
  - Icon: Grid icon (3×3 squares) in Basil Leaf color
  - Text: "My Posts" below icon
  - Active state: Fresh Avocado Green with underline indicator
- **Behavior**:
  - Tap to navigate to user's personal post gallery
  - Shows grid view of all user's posts (3 columns)
  - Includes post analytics: views, likes, comments per post
  - Filter options: All Posts, Photos Only, Videos Only, Saved Drafts
- **User Flow**:
  1. User taps "My Posts"
  2. Navigates to personal gallery screen
  3. Grid layout shows all posts with engagement metrics overlay
  4. Tap post to view full detail + comments
  5. Long press for quick actions: Edit, Delete, Share, Analytics

**Right Section - Messages**:
- **Design**:
  - Icon: Message bubble icon in Basil Leaf color
  - Notification badge: Red circle with unread count (if > 0)
  - Text: "Messages" below icon
- **Behavior**:
  - Tap to open direct messages inbox
  - Badge shows unread message count
  - Real-time updates via WebSocket
- **User Flow**:
  1. User taps "Messages"
  2. Navigates to DM inbox screen
  3. Shows conversation list (reverse chronological)
  4. Unread conversations highlighted
  5. Tap conversation to open chat thread

**Visual Hierarchy**:
```
┌─────────────────────────────────────────────────┐
│  [POST NOW]    MY POSTS(●)    MESSAGES (●3)    │
│  (Gradient)    (Icon+Text)    (Icon+Badge)     │
└─────────────────────────────────────────────────┘
```

#### 6.7.3 Post Creation Flow (Enhanced)

##### Step 1: Media Selection
- **User Flow**:
  1. User initiates from "Post Now" button or bottom nav "+" icon
  2. Media selection screen appears with three tabs:
     - **Photo**: Camera or gallery picker (1-10 images)
     - **Video Reel**: Record 15-60 second vertical video
     - **Multi-Select**: Choose multiple photos for carousel
  3. Built-in camera has food-optimized filters applied in real-time:
     - "Appetizing" - Warm tones, enhanced saturation
     - "Fresh" - Bright, crisp, clean look
     - "Golden Hour" - Soft lighting effect
     - "Vibrant" - Boosted colors for colorful dishes
     - "Classic" - No filter

##### Step 2: Editing & Enhancement
- **Photo/Video Editor**:
  - **Crop & Rotate**: Standard editing tools
  - **Filters**: 12 food-optimized filters with preview
  - **Adjustments**: Brightness, contrast, saturation, warmth, sharpness
  - **Text Overlays**: Add text with fonts, colors, positioning
  - **Stickers**: Food emojis, rating stars, location pins
  - **Trim (Video)**: Cut video to desired length (15-60 sec)
  - **Audio (Video)**: Add background music from library or mute

##### Step 3: Post Details & Restaurant Tagging
- **Restaurant Tagging (Required)**:
  - **Auto-Detect**: App suggests restaurants based on:
    - GPS location when photo was taken
    - Recent dining history
    - Check-ins in last 4 hours
  - **Manual Search**:
    - Search bar: "Which restaurant?"
    - Dropdown results with distance
    - Restaurant logo, name, address preview
  - **Tag Display**: Selected restaurant shown as card with:
    - Restaurant logo
    - Name and cuisine type
    - Location with map pin
    - Distance from user
    - **Points Available**: "Earn 150 pts" badge in Fresh Avocado Green
  - **Points Earning Preview**:
    - "Post about [Restaurant] → Earn 50 base points"
    - "If 100+ likes → Bonus 25 points"
    - "Active 2x promotion → Total 150 points possible"

- **Caption & Hashtags**:
  - Text field (500 character limit)
  - Hashtag autocomplete (#burger suggests #burgerlover, #burgertime)
  - @ mentions for tagging friends
  - Emoji picker

- **Rating (Optional but Encouraged)**:
  - 5-star rating system
  - "Rate your experience" prompt
  - Visual: Large star icons with haptic feedback
  - Incentive: "+10 bonus points for rating"

- **Dish Tags**:
  - "What did you eat?" field
  - Autocomplete suggestions from restaurant menu
  - Multiple dish tags allowed
  - Helps with trending dish tracking

- **Privacy Settings**:
  - Public (default) - visible to all users
  - Friends Only - visible to followers only
  - Private - only visible to user (saved as memory)

- **Advanced Options (Collapsible)**:
  - Location: Show/hide exact location
  - Allow comments: Enable/disable commenting
  - Allow sharing: Enable/disable sharing
  - Add to Story: Also post to 24-hour story

##### Step 4: Publish
- **User Flow**:
  1. User reviews all details in preview
  2. Taps "Post" button (Fresh Avocado Green, prominent)
  3. Upload progress indicator appears
  4. Processing: "Creating your post..."
  5. Success: Confetti animation + "Post live!"
  6. Points earned animation: "+50 points" badge with sparkle effect
  7. Auto-navigate back to feed with new post at top

#### 6.7.4 Instagram-Style Feed UI

##### Feed Layout & Scrolling
- **Vertical Scroll**: Continuous infinite scroll (TikTok/Instagram Reels style for videos)
- **Post Types**:
  - **Single Photo Post**: Full-width image with engagement overlay
  - **Carousel Post**: Swipeable multi-photo (dots indicator)
  - **Video Reel Post**: Auto-playing vertical video (tap to mute/unmute)
- **Lazy Loading**: Load 10 posts initially, fetch more on scroll
- **Pull to Refresh**: Fresh content on pull-down gesture
- **Smart Feed Algorithm**: Personalized based on user preferences

##### Individual Post Card Design
Each post displays as a rich card with the following structure:

**Header Section**:
```
┌────────────────────────────────────────────────┐
│ 👤 [User Avatar] @username | [Restaurant Logo] │
│ [Restaurant Name] · [Location Pin] 2.3 mi     │
│ [Points Badge] "150 pts possible" 🌟          │
└────────────────────────────────────────────────┘
```

- **User Info (Left)**:
  - Profile photo (circular, 40px)
  - Username (bold, tappable → user profile)
  - Timestamp: "2h ago" (relative time)
  - Verified badge if creator

- **Restaurant Info (Right)**:
  - Restaurant logo (circular, 36px)
  - Restaurant name (bold, tappable → restaurant page)
  - Location: City or neighborhood + distance
  - Clickable: Taps navigate to restaurant detail page

- **Points Badge**:
  - Prominently displayed in Fresh Avocado Green
  - Text: "[X] pts possible" or "Earn up to [X] pts"
  - Icon: Star or points coin icon
  - Animated shimmer effect for active promotions
  - Tappable: Shows points breakdown modal:
    - Base points for visiting restaurant
    - Bonus points for active challenges
    - Multipliers (2x Tuesdays, first visit, etc.)
    - How to earn: "Order through Foodie to claim points"

**Media Section**:
- **Photo Posts**:
  - Full-width, 4:5 aspect ratio (Instagram-standard)
  - High-quality images with progressive loading (blur → sharp)
  - Double-tap to like (heart animation)
  - Pinch to zoom
  - Swipe left/right for carousel (indicator dots at bottom)

- **Video Reel Posts**:
  - Full-width, 9:16 aspect ratio (vertical)
  - Auto-play when 50%+ visible (muted by default)
  - Tap once: Pause/play
  - Tap twice: Like (heart animation)
  - Volume icon (top-right): Tap to mute/unmute
  - Progress bar (bottom): Shows video playback position
  - Loop: Repeats automatically

**Engagement Bar (Below Media)**:
```
┌────────────────────────────────────────────────┐
│ ❤️ 324    💬 45    ↗️ Share    🔖 Save         │
└────────────────────────────────────────────────┘
```

- **Like Button**:
  - Icon: Heart (outline when not liked, filled when liked)
  - Color: Tomato Red (#E53935) when liked
  - Count: Number of likes (324)
  - Tap: Like/unlike with animation
  - Animation: Heart scales + particles burst (lottie animation)
  - Long press: Show list of users who liked

- **Comment Button**:
  - Icon: Speech bubble
  - Count: Number of comments (45)
  - Tap: Opens comment sheet from bottom
  - Badge: Shows if friends commented

- **Share Button**:
  - Icon: Arrow pointing up-right
  - Text: "Share"
  - Tap: Opens share sheet with options:
    - Send via DM (to Foodie friends)
    - Copy link
    - Share to Instagram Story
    - Share to Facebook
    - Share to Twitter
    - More options (device share sheet)
  - Track shares for engagement metrics

- **Save/Bookmark Button**:
  - Icon: Bookmark (outline when not saved, filled when saved)
  - Tap: Save post to "Saved Posts" collection
  - Saved posts accessible from profile
  - Categories: Can create collections (e.g., "Want to Try", "Favorites")

**Caption & Info Section**:
- **User Rating**: 5 stars (if provided)
- **Caption**:
  - First 2 lines visible
  - "... more" link to expand full caption
  - Hashtags styled in Fresh Avocado Green, tappable
  - @mentions styled in Sky Blue, tappable → user profile
  - Restaurant name appears as link in caption

- **Dish Tags**: Pill-shaped badges (e.g., "Spicy Ramen", "Truffle Fries")
  - Tappable: Shows all posts with same dish tag

- **Comment Preview**:
  - Shows 2 most recent comments
  - Format: "@username: comment text"
  - "View all 45 comments" link (taps → open comment sheet)

**Footer Section**:
- **Timestamp**: "2 hours ago"
- **Location**: "📍 Downtown Seattle" (if enabled, tappable → map view)

##### Video Reel Specific Features
- **Sound/Audio**:
  - Original audio from video or added music
  - Audio attribution: "Original sound" or "🎵 Song Name - Artist"
  - Tap audio: See other reels using same audio

- **Reel Controls** (Overlay):
  - Pause/play (tap center)
  - Volume (top-right corner)
  - Skip forward 10s (double-tap right side)
  - Skip back 10s (double-tap left side)
  - Speed control: 0.5x, 1x, 1.5x, 2x

- **Engagement Sidebar** (Right side, TikTok-style):
  - User avatar (tap → profile)
  - Like button with count (stacked vertically)
  - Comment button with count
  - Share button
  - Save button
  - More options (⋯)

- **Auto-Advance** (Optional setting):
  - After video ends, automatically scroll to next reel
  - User can enable/disable in settings

#### 6.7.5 Comment System (Enhanced)

##### Comment Sheet UI
- **Slide-Up Modal**: Appears from bottom, covers 80% of screen
- **Header**:
  - Title: "Comments (45)"
  - Close button (X)
  - Sort options: "Top Comments" | "Newest First" | "Friends First"

##### Comment Input
- **Input Bar** (Fixed at bottom):
  - User avatar (small, 32px)
  - Text field: "Add a comment..."
  - Emoji picker button
  - @ mention autocomplete
  - Post button (Fresh Avocado Green, appears when text entered)
  - Character limit: 500 characters

##### Comment Display
- **Comment Card**:
  - User avatar (40px, tappable)
  - Username (bold, tappable)
  - Verified badge (if applicable)
  - Comment text with:
    - @mentions highlighted (tappable)
    - Hashtags highlighted (tappable)
    - Links clickable
  - Timestamp: "2h ago"
  - Like button: Heart icon with count (can like comments)
  - Reply button: "Reply" text

**Nested Replies** (Max 2 levels):
- Indented slightly with connecting line
- Same card design as parent comment
- "View more replies (3)" to expand collapsed replies

**Comment Actions** (Long press):
- Report comment
- Delete (if own comment)
- Copy text
- Block user

##### Comment Features
- **Real-Time Updates**: New comments appear instantly (WebSocket)
- **Rich Text**: Support bold, italics (limited markdown)
- **GIF Support**: Tap GIF button to browse and insert GIFs
- **Creator Badge**: Original poster has "Creator" badge on comments
- **Pinned Comments**: Post creator can pin top comment
- **Comment Liking**: Users can like individual comments
- **Comment Reactions**: Beyond likes, emoji reactions (😂, 😍, 🔥)

#### 6.7.6 Enhanced Share Functionality

##### Share Modal Options
When user taps "Share" button:

**Internal Sharing (Foodie)**:
- **Send to Friends**:
  - Shows list of Foodie friends
  - Multi-select to send to multiple
  - Creates DM with post link + preview card
  - Message field: Add optional message

- **Share to Story** (24-hour):
  - Post preview sticker added to user's story
  - Customizable placement, size, rotation
  - Background options: Blur photo, solid color, gradient
  - Story viewers can tap sticker to see full post

- **Add to Collection**:
  - Save to personal collection
  - Create new collection or add to existing
  - Collections: "Want to Try", "Favorites", "Hidden Gems"

**External Sharing**:
- **Instagram Story**:
  - Export post as story-optimized image/video
  - Includes "See full post on Foodie" sticker with deep link
  - Auto-opens Instagram with pre-populated story

- **Copy Link**:
  - Copies shareable deep link to clipboard
  - Link format: `foodie.app/p/[postId]`
  - When opened: Opens app if installed, web viewer otherwise

- **Share to Social Media**:
  - Facebook: Native share dialog
  - Twitter: Pre-populated tweet with image + link
  - WhatsApp: Send to contact or group
  - iMessage/SMS: Send as rich link preview

- **More Options**:
  - Device share sheet with all available apps

**Share Incentives**:
- **Points Reward**: "Share with 3 friends → Earn 50 bonus points"
- **Share Counter**: Track shares on post (public metric)
- **Viral Bonus**: Posts with 100+ shares get featured in "Trending" section

#### 6.7.7 Direct Messaging System

##### Messages Inbox
- **List View**:
  - Conversation cards showing:
    - Other user's profile photo (or group icon)
    - Username/Group name
    - Last message preview (truncated, 50 chars)
    - Timestamp of last message
    - Unread badge (red circle with count)
    - Message status icon: Sent (✓), Delivered (✓✓), Read (✓✓ blue)

- **Search**: Search conversations by username or message content

- **Filters**:
  - All Messages (default)
  - Unread Only
  - Groups
  - Requests (messages from non-followers)

##### Chat Thread UI
- **Header**:
  - Other user's profile photo + username (tap → view profile)
  - Online status indicator (green dot if online)
  - Info button (i) → Conversation settings

- **Message Bubbles**:
  - Sent messages: Right-aligned, Fresh Avocado Green background
  - Received messages: Left-aligned, white background with gray border
  - Timestamp below bubbles (groups by time: "Today", "Yesterday", date)
  - Read receipts below sent messages

- **Message Types**:
  - **Text**: Standard text messages (2,000 char limit)
  - **Post Sharing**: Rich preview card of shared post
    - Shows post image, caption preview, restaurant name
    - Tappable: Opens post in feed
  - **Restaurant Sharing**: Restaurant card preview
    - Shows restaurant logo, name, location
    - "View Restaurant" button
  - **Voice Messages**: Record and send audio (max 2 min)
    - Waveform visualization while playing
  - **Photos/Videos**: Send from gallery or camera
  - **GIFs**: Built-in GIF browser (powered by Giphy)

- **Message Input Bar** (Bottom):
  - Text field with auto-expand (up to 4 lines)
  - Camera button: Quick photo/video capture
  - Gallery button: Choose from photos
  - GIF button: Browse GIFs
  - Voice button: Hold to record voice message
  - Send button: Appears when message typed

##### Message Features
- **Reactions**: Long press message to react with emoji (❤️, 😂, 👍, 🔥, etc.)
- **Reply to Message**: Swipe right on message to reply (quoted reply)
- **Delete Messages**:
  - Delete for me only
  - Delete for everyone (within 1 hour)
- **Forward Messages**: Long press → Forward to another conversation
- **Message Search**: Search within conversation
- **Notifications**:
  - Push notifications for new messages
  - Settings: Mute conversation, custom notification sound

##### Group Messaging
- **Create Group**:
  - Select 2+ friends
  - Set group name + icon
  - Admin permissions: Add/remove members, change name/icon

- **Group Features**:
  - Group info screen: Member list, shared media, settings
  - @mentions: Notify specific member
  - Admin controls: Only admin can add members, change details

#### 6.7.8 Personalized Feed Algorithm

##### Ranking Factors (Content Prioritization)
- **User Preferences** (30%):
  - Cuisine types user frequently engages with
  - Price range preferences
  - Dietary restrictions alignment
  - Locations user visits frequently

- **Social Signals** (25%):
  - Posts from followed users (higher priority)
  - Posts from verified creators
  - Posts with high engagement rate
  - Posts from friends (highest priority)

- **Recency** (20%):
  - Recent posts (last 24 hours) boosted
  - Time decay: Older posts deprioritized
  - Balance: Mix of new and slightly older high-quality posts

- **Engagement History** (15%):
  - Similar to posts user previously liked
  - Restaurants user has saved or visited
  - Dishes user has shown interest in
  - Content types user engages with (photos vs. videos)

- **Location Relevance** (10%):
  - Posts from nearby restaurants (<10 miles)
  - City/neighborhood match
  - Current location context (if user traveling)

##### Content Diversity
- **Cuisine Variety**: Ensure mix of cuisines in feed (avoid repetition)
- **Creator Diversity**: Mix of creators (not just top influencers)
- **Post Type Mix**: 60% photos, 30% carousels, 10% video reels
- **Price Range Balance**: Mix of budget, mid-range, and premium dining

##### Exploration vs. Exploitation
- **80% Personalized**: Content tailored to user's known preferences
- **20% Discovery**: Introduce new:
  - Cuisines user hasn't tried
  - Restaurants outside usual area
  - Creators user doesn't follow
  - Trending content (community-wide)

##### Cold Start (New Users)
- **Onboarding Quiz**:
  - "What cuisines do you love?" (multi-select)
  - "Dietary restrictions?" (vegan, gluten-free, etc.)
  - "Price preference?" ($ to $$$$)
  - "Favorite restaurants?" (search and select)

- **Initial Feed**:
  - Popular posts from selected cuisines
  - Top-rated restaurants in user's city
  - Trending dishes nationwide
  - Suggested creators to follow

##### Real-Time Adjustments
- **Engagement Feedback Loop**:
  - If user likes post: More similar content
  - If user hides post: Less similar content
  - If user follows creator: Prioritize their posts
  - If user saves restaurant: More posts from that restaurant

- **Session Context**:
  - Time of day: Breakfast posts in morning, dinner posts in evening
  - Day of week: Weekend brunch spots on Saturday/Sunday
  - Weather: Comfort food on cold days, refreshing dishes on hot days

#### 6.7.9 Feed Interaction Features

##### Post Detail View
- **Tap Post**: Opens full-screen post detail view
  - Full image/video at top (zoomable)
  - All engagement metrics visible
  - Full caption (no truncation)
  - All comments visible (scrollable)
  - Related posts at bottom: "More from [Restaurant]" or "More like this"

##### Double-Tap to Like
- **Gesture**: Double-tap anywhere on post image/video
- **Animation**:
  - Large heart icon appears at tap location
  - Scales up with bounce effect
  - Fades out with particle effects
  - Post like count increments with animation
  - Haptic feedback (strong impact)

##### Long Press Actions
- **Post Long Press Menu**:
  - Save post
  - Share post
  - Copy link
  - Report post (inappropriate, spam, etc.)
  - Not interested (hide similar posts)
  - Block user
  - Follow/Unfollow user

##### Story Feature (24-Hour)
- **View Stories**:
  - Story circles appear at top of feed (above posts)
  - User's story (if posted) appears first with "+" icon
  - Friends' stories appear next (colored ring if unviewed)
  - Tap story circle to view full-screen vertical stories

- **Create Story**:
  - Tap "Post Now" → Select "Story" option
  - Capture photo/video (or select from gallery)
  - Add text, stickers, GIFs, restaurant tags
  - Visible for 24 hours, then disappears
  - View counter: See who viewed story

#### 6.7.10 Points Integration Display

##### Points Earning Badge (On Every Post)
- **Visual Design**:
  - Pill-shaped badge
  - Background: Fresh Avocado Green with gradient
  - Icon: Star or coin icon
  - Text: "150 pts possible" or "Earn 50-150 pts"
  - Placement: Top-right corner of post header

- **Points Breakdown Modal** (Tap badge):
  ```
  ┌─────────────────────────────────────────┐
  │  Earn Points at [Restaurant Name]      │
  ├─────────────────────────────────────────┤
  │  Base Points:                    50 pts │
  │  • Visit restaurant (scan receipt)      │
  │                                          │
  │  Bonus Opportunities:                   │
  │  • Active 2x Tuesday promo      +50 pts │
  │  • First-time visit bonus       +25 pts │
  │  • Complete challenge           +25 pts │
  │                                          │
  │  Total Possible:               150 pts  │
  │                                          │
  │  [How to Earn] [Order Now]              │
  └─────────────────────────────────────────┘
  ```

##### "How to Earn" Flow
- **Step 1**: Visit [Restaurant Name]
- **Step 2**: Dine in or order through Foodie app
- **Step 3**: Scan receipt or QR code to claim points
- **Step 4**: Points auto-credited to wallet
- **CTA Button**: "Order Now" → Navigate to restaurant ordering page

##### Points Gamification
- **Daily Challenges in Feed**:
  - Banner card every 10 posts: "Today's Challenge: Try a new cuisine (200 pts)"
  - Swipeable carousel of active challenges
  - Progress indicators: "2/3 completed"

- **Milestone Celebrations**:
  - When user earns 1,000th point: Confetti animation in feed
  - Special badge: "1K Point Milestone" displayed on profile
  - Share achievement: Auto-generate shareable graphic

#### 6.7.11 Restaurant Integration in Feed

##### Restaurant Quick View (Post Header Tap)
- **Tap Restaurant Logo/Name** → Bottom sheet modal appears
- **Modal Content**:
  - Restaurant header image
  - Name, cuisine, rating, price range
  - Distance from user + "Get Directions" button
  - Operating hours + open/closed status
  - Quick stats: "450 posts", "4.5★ rating", "$$"
  - Quick actions:
    - **View Full Profile**: Navigate to full restaurant page
    - **Order Now**: If ordering available
    - **Save Restaurant**: Add to saved list
    - **Share**: Share restaurant with friends
  - Recent posts: Horizontal scrollable list of recent posts from this restaurant

##### Restaurant Tag Incentives
- **For Users**:
  - Earn 10 bonus points for tagging restaurant correctly
  - First post at new restaurant: 25 bonus points

- **For Restaurants**:
  - Receive notification when tagged
  - Can respond to post (comment or repost)
  - Analytics dashboard: See all posts mentioning restaurant

#### 6.7.12 Technical Implementation

##### Media Upload & Storage
- **Image Optimization**:
  - Client-side compression before upload (reduce to 2MB max)
  - Multiple resolutions stored: Thumbnail (200x200), Feed (1080x1350), Full (original)
  - Progressive JPEG format for fast loading
  - WebP format for newer devices (smaller file size)

- **Video Processing**:
  - Transcode to H.264 codec for compatibility
  - Generate thumbnail (first frame)
  - Multiple bitrates: 480p, 720p, 1080p (adaptive streaming)
  - Audio normalization

- **CDN Delivery**:
  - CloudFront CDN for global fast delivery
  - Edge caching for frequently accessed posts
  - Lazy loading: Load images as user scrolls

##### Real-Time Features
- **WebSocket Connection**:
  - Persistent connection for real-time updates
  - New posts appear instantly (with slide-in animation)
  - Like count updates in real-time
  - Comment notifications instantly

- **Push Notifications**:
  - Like: "[@username] liked your post"
  - Comment: "[@username] commented: [preview]"
  - Follow: "[@username] started following you"
  - Share: "[@username] shared your post"
  - Message: "New message from [@username]"

##### Performance Optimization
- **Infinite Scroll**:
  - Load 10 posts initially
  - Preload next 10 posts when user reaches 7th post
  - Virtualized list: Recycle off-screen post components

- **Caching Strategy**:
  - Feed cache: 5 minutes (balance freshness and performance)
  - Media cache: Aggressive caching (images rarely change)
  - User profile cache: 10 minutes

- **Offline Support**:
  - Cache recent feed posts for offline viewing
  - Queue actions when offline (like, comment) → sync when online
  - "Offline Mode" indicator

##### Analytics Tracking
- **User Engagement Metrics**:
  - Time spent on each post (view duration)
  - Scroll depth (how far user scrolls)
  - Interaction rate (likes, comments, shares per post viewed)
  - Post completion rate (viewed to end for videos)

- **Content Performance Metrics**:
  - Impressions: How many times post shown
  - Reach: Unique users who saw post
  - Engagement rate: (Likes + Comments + Shares) / Impressions
  - Click-through rate: Restaurant/profile taps / Impressions

#### 6.7.13 Content Discovery Features

##### Explore Tab (Within Feed)
- **Trending Section**:
  - Top posts from last 24 hours (high engagement)
  - Trending dishes: "Everyone's trying Truffle Fries this week"
  - Viral reels: Video posts with 10K+ views

- **Nearby**:
  - Posts from restaurants within 5 miles
  - Sorted by recency and engagement
  - Filter by cuisine type

- **Following**:
  - Posts only from users you follow
  - Pure chronological order (no algorithm)
  - Option to see "Suggested Friends" to follow

- **Saved**:
  - All posts user has saved
  - Organized by collections
  - Searchable and filterable

##### Search Functionality
- **Search Bar** (Top of feed):
  - **Tabs**: All | Users | Restaurants | Dishes | Hashtags
  - **Users**: Search by username or name
  - **Restaurants**: Search by name, location, cuisine
  - **Dishes**: Search by dish name (e.g., "pizza")
  - **Hashtags**: Search posts by hashtag (e.g., #tacotuesday)

- **Search Suggestions**:
  - Trending searches at top
  - Recent searches
  - Autocomplete as user types

- **Search Results**:
  - Previews with images
  - Quick stats (followers, posts, ratings)
  - Tap result to navigate to detail page

##### Hashtag Pages
- **Tap Hashtag** → Navigate to hashtag page
- **Page Content**:
  - Header: Hashtag name + post count (e.g., "#Sushi (12.5K posts)")
  - Follow hashtag option (see posts in feed)
  - Grid view of all posts with this hashtag
  - Sort: Top Posts | Recent | Most Liked

##### Restaurant Location Tags
- **Tap Location** → Navigate to location page
- **Page Content**:
  - Map showing restaurant location
  - All posts from this location
  - Restaurant info card
  - Similar nearby restaurants
  - "Get Directions" CTA

#### 6.7.14 Creator Tools & Analytics

##### Creator Dashboard (In Profile)
- **Overview Stats** (Last 30 days):
  - Total posts
  - Total likes, comments, shares
  - Profile visits
  - Follower growth graph
  - Engagement rate trend

- **Post Analytics** (Per Post):
  - Impressions (how many users saw it)
  - Reach (unique users)
  - Engagement rate (%)
  - Top locations where post was viewed
  - Follower vs. non-follower views
  - Earnings from post (if monetized)

- **Audience Insights**:
  - Follower demographics: Age, gender, location
  - Most active times (when followers are online)
  - Top interests of followers
  - Follower growth sources (search, hashtags, shares)

##### Content Scheduler
- **Schedule Posts**:
  - Create post and set future publish time
  - Queue multiple posts
  - Auto-publish at scheduled time
  - Notifications when post goes live

- **Draft Posts**:
  - Save unfinished posts as drafts
  - Resume editing later
  - Drafts accessible from "My Posts"

##### Collaboration Tools
- **Tag Collaborators**:
  - Tag other users as collaborators on post
  - Post appears on both users' profiles
  - Split engagement metrics

- **Brand Partnerships**:
  - Mark post as "Partnership" (FTC compliance)
  - "Paid partnership with [Restaurant]" disclosure
  - Transparent to audience

#### 6.7.15 Safety & Moderation

##### Content Reporting
- **Report Button**: Available on all posts and comments
- **Report Reasons**:
  - Spam
  - Harassment or bullying
  - Hate speech or symbols
  - Violence or dangerous content
  - Nudity or sexual content
  - False information
  - Intellectual property violation
  - Other

- **Report Flow**:
  1. User selects report reason
  2. Optional: Add details (text field)
  3. Submit report
  4. Confirmation: "Thank you, we'll review this"
  5. Follow-up: Notification of action taken (if any)

##### Automated Moderation
- **AI Content Filters**:
  - Detect inappropriate images (nudity, violence)
  - Profanity filter for captions and comments
  - Spam detection (repetitive posts, suspicious links)
  - Hate speech detection

- **Flagged Content Review**:
  - Automated flags go to moderation queue
  - Manual review by moderators (24-hour SLA)
  - Actions: Approve, Remove, Warn User, Suspend Account

##### User Safety Features
- **Block User**:
  - Blocked user can't see your posts
  - Can't message you
  - Can't find your profile in search

- **Mute User**:
  - Don't see user's posts in feed
  - User doesn't know they're muted

- **Private Account**:
  - Only followers see posts
  - New followers must be approved

- **Comment Controls**:
  - Turn off comments on specific posts
  - Block specific words in comments (custom filter)
  - Require approval before comments appear (moderated comments)

#### 6.7.16 Success Metrics

##### Engagement Metrics
- **70%+ daily active users** engaging with feed (view at least 1 post)
- **5+ minutes average session time** in feed
- **30%+ interaction rate**: Users who like, comment, or share per session
- **50%+ posts receive engagement** within first hour

##### Content Creation Metrics
- **20%+ users posting monthly**: Active content creators
- **3+ posts per creator per month** (average)
- **80%+ posts tagged with restaurant**: Successful restaurant tagging
- **60%+ posts receive 10+ likes**: Quality content threshold

##### Growth Metrics
- **40%+ new users from content sharing**: Viral growth
- **25%+ follower growth monthly** for active creators
- **50K+ total posts** within first 3 months
- **100K+ daily post views** across platform

##### Revenue Metrics
- **$10K+ monthly creator payouts**: Content monetization
- **15%+ click-through to restaurant ordering**: Feed drives orders
- **20%+ users clicking points badges**: Points awareness

##### Retention Metrics
- **80%+ 7-day retention**: Users return within a week
- **60%+ 30-day retention**: Monthly active users
- **40%+ users with saved posts**: Feature utilization

---

## 7. Payment & Points Marketplace

### 7.1 Overview
In-app store where users can purchase loyalty points for specific restaurants or redeem points for dining credits, gift cards, and exclusive offers.

### 7.2 Points Purchasing

#### 7.2.1 Browse Points Catalog
- **User Flow**:
  1. User navigates to "Marketplace" tab
  2. Sees list of participating restaurants
  3. Each restaurant card shows:
     - Logo and name
     - Points available for purchase
     - Pricing tiers (e.g., 1,000 pts for $10, 5,000 pts for $45 [10% bonus])
     - Current wallet balance for that restaurant
  4. User taps restaurant to see details

#### 7.2.2 Purchase Flow
- **User Flow**:
  1. User selects restaurant and points amount
  2. Reviews pricing (with bulk discount highlighted)
  3. Taps "Buy Points"
  4. Payment method screen (credit/debit, Apple Pay, Google Pay, saved methods)
  5. Confirms purchase
  6. Payment processed via Stripe
  7. Points instantly credited to wallet
  8. Confirmation screen with receipt (emailed)
- **Pricing Structure**:
  - Base rate: $0.01 per point (configurable by restaurant)
  - Bulk discounts: 5% off 5K points, 10% off 10K points, 15% off 25K+ points

#### 7.2.3 Payment Processing
- **Provider**: Stripe
- **Supported Methods**:
  - Credit/debit cards (Visa, Mastercard, Amex, Discover)
  - Apple Pay
  - Google Pay
  - ACH bank transfer (for large purchases >$100)
- **Security**:
  - PCI DSS compliant via Stripe
  - Tokenized payment methods (no card storage in Foodie DB)
  - Two-factor authentication for purchases >$100

### 7.3 Points Redemption

#### 7.3.1 Redemption Catalog
- **Available Redemptions**:
  - **Dining Credits**: Convert points to dollar credit at specific restaurant
  - **Gift Cards**: Redeem for restaurant gift cards (digital delivery)
  - **Exclusive Offers**: Special menu items, priority reservations, chef's table
  - **Foodie Gift Cards**: Universal gift cards usable at any participating restaurant
- **Display Elements**:
  - Item name and description
  - Points cost
  - Dollar value (for transparency)
  - Availability (in-stock, limited quantity, sold out)
  - "Redeem Now" button

#### 7.3.2 Redemption Flow
- **User Flow**:
  1. User browses redemption catalog
  2. Selects item (e.g., "$25 gift card for 2,500 points")
  3. Reviews details (terms, expiration, usage instructions)
  4. Taps "Redeem"
  5. Confirms point deduction
  6. Points deducted from wallet
  7. Redemption delivered:
     - **Gift cards**: Digital code via email + in-app
     - **Credits**: Applied to user's account at restaurant
     - **Offers**: Voucher QR code in app
  8. Confirmation screen with details

#### 7.3.3 Gift Card Integration
- **Provider**: Tango Card API (or similar)
- **Supported Brands**: 100+ national restaurant chains
- **Delivery**: Email + in-app wallet
- **Expiration**: Varies by brand (typically 5 years)

### 7.4 Points Gifting

#### 7.4.1 Send Points to Friends
- **User Flow**:
  1. User navigates to wallet
  2. Taps "Gift Points"
  3. Selects restaurant and points amount
  4. Enters recipient (phone number, email, or Foodie username)
  5. Adds optional message
  6. Confirms (points deducted from sender's wallet)
  7. Recipient receives push notification + email
  8. Points credited to recipient's wallet
- **Restrictions**:
  - Minimum gift: 100 points
  - Maximum: 10,000 points per transaction
  - Daily limit: 50,000 points total gifts

#### 7.4.2 Gift Cards
- **User Flow**:
  1. User browses gift card catalog
  2. Selects "Foodie Gift Card" (any restaurant)
  3. Chooses value ($10, $25, $50, $100, custom)
  4. Purchases with payment method (not points)
  5. Receives digital gift card code
  6. Sends to recipient via email, text, or social media
- **Recipient Experience**:
  1. Receives gift card link
  2. Opens link, prompted to download Foodie app
  3. Creates account or logs in
  4. Gift card balance added to wallet
  5. Can use at any participating restaurant

### 7.5 Marketplace Revenue
- **Transaction Fees**:
  - Points purchases: 5% platform fee (split between Foodie and restaurant)
  - Gift card sales: 3% commission (from gift card provider)
  - Points gifting: No fee (encourage social sharing)
- **Restaurant Partnership Model**:
  - Restaurants pay 10% commission on points purchased by users
  - Foodie takes 5%, restaurant keeps 90% (incentive to participate)

### 7.6 Success Metrics
- **20%+ users purchasing points** at least once
- **$100K+ monthly marketplace GMV**
- **40%+ bulk purchase rate** (5K+ points)
- **15% gift conversion rate** (recipients become active users)

---

## 8. Foodie Rewards System

### 8.1 Overview
Gamified loyalty program that rewards users with Foodie Points for exploring new restaurants, trying new dishes, and completing restaurant-created challenges. Earned points redeem for gift cards.

### 8.2 Earning Foodie Points

#### 8.2.1 Unique Restaurant Challenge
- **How It Works**: Earn points for dining at restaurants you haven't visited before
- **Point Structure**:
  - 1st unique restaurant: 10 points
  - 5th unique restaurant: 50 point bonus (total 100 points)
  - 10th unique restaurant: 100 point bonus (total 250 points)
  - 25th unique restaurant: 250 point bonus (total 750 points)
  - 50th unique restaurant: 500 point bonus (total 1,500 points)
  - 100th unique restaurant: 1,000 point bonus (total 3,000 points)
- **Tracking**: App automatically tracks via receipt scans, QR scans, or orders
- **Progress Display**: Progress bar showing "7/10 unique restaurants" with next reward preview

#### 8.2.2 Diverse Dish Challenge
- **How It Works**: Earn points for ordering dishes you haven't tried before
- **Point Structure**:
  - 1st unique dish: 5 points
  - 10th unique dish: 25 point bonus (total 75 points)
  - 25th unique dish: 50 point bonus (total 200 points)
  - 50th unique dish: 100 point bonus (total 400 points)
  - 100th unique dish: 200 point bonus (total 900 points)
- **Dish Tracking**: Based on dish name/category from receipts or manual entry
- **Duplicate Detection**: Same dish at different restaurants counts as unique

#### 8.2.3 Cuisine Exploration Challenge
- **How It Works**: Earn bonus points for trying new types of cuisine
- **Cuisines Tracked**: Italian, Chinese, Mexican, Thai, Indian, Japanese, etc. (50+ categories)
- **Point Structure**:
  - 1st restaurant of new cuisine: 20 points
  - 5th unique cuisine: 100 point bonus
  - 10th unique cuisine: 250 point bonus
  - 15th unique cuisine: 500 point bonus
- **Milestone Badge**: "World Explorer" badge for 15+ cuisines

#### 8.2.4 Restaurant-Sponsored Challenges
- **How It Works**: Restaurants create custom challenges to promote menu items
- **Challenge Types**:
  - **Try 3 New Appetizers**: Order 3 different appetizers, earn 100 points
  - **Brunch Bundle**: Order brunch 3 weekends in a row, earn 150 points
  - **Dish Discovery**: Try the "Chef's Special," earn 50 points
- **Restaurant Setup**:
  1. Restaurant creates challenge in dashboard
  2. Sets challenge type, requirements, point reward
  3. Optional: Adds deadline (e.g., "Valid through March")
  4. Challenge appears in user's app
- **User Participation**:
  1. User sees challenge in "Challenges" tab or restaurant page
  2. Taps "Accept Challenge"
  3. Completes requirements (verified via receipts/orders)
  4. Points auto-credited upon completion
  5. Completion badge displayed on profile

### 8.3 Foodie Points Wallet

#### 8.3.1 Separate from Restaurant Points
- **Why Separate**: Foodie Points are universal, usable across all restaurants for gift cards
- **Display**: Separate wallet section labeled "Foodie Rewards"
- **Balance**: Running total of earned Foodie Points
- **History**: Log of points earned (by challenge type) and redeemed

#### 8.3.2 Points Expiration
- **Policy**: Foodie Points expire after 12 months of inactivity
- **Inactivity Defined**: No points earned or redeemed in 12 months
- **Alerts**: Email + push notification at 11 months, 11.5 months, 3 days before expiration

### 8.4 Gift Card Redemption

#### 8.4.1 Redemption Catalog
- **Available Gift Cards**:
  - Participating restaurant chains (Chipotle, Starbucks, etc.)
  - Popular retailers (Amazon, Target, Walmart)
  - Visa/Mastercard prepaid cards
  - Charity donations (convert points to cash donation)
- **Point Pricing**:
  - 1,000 points = $10 gift card
  - 2,500 points = $25 gift card
  - 5,000 points = $50 gift card
  - 10,000 points = $100 gift card
- **Display**: Grid of gift card options with logos, point costs, and "Redeem" buttons

#### 8.4.2 Redemption Flow
- **User Flow**:
  1. User navigates to "Rewards" tab
  2. Taps "Redeem Points"
  3. Browses gift card catalog
  4. Selects gift card and amount
  5. Reviews details (points cost, delivery method)
  6. Taps "Redeem Now"
  7. Confirms point deduction
  8. Points deducted from Foodie Rewards wallet
  9. Gift card code delivered via email + in-app
  10. Confirmation screen with "View Gift Card" button
- **Delivery Time**: Instant for digital codes, 1-3 business days for physical cards (if offered)

### 8.5 Leaderboards & Achievements

#### 8.5.1 Challenge Leaderboards
- **Types**:
  - **Local Leaderboard**: Top users in 25-mile radius
  - **National Leaderboard**: Top users nationwide
  - **Friends Leaderboard**: Compare with followed users
- **Ranking Criteria**: Total Foodie Points earned (all-time or monthly)
- **Display**:
  - User rank, username, profile photo
  - Points earned
  - Badges/achievements
  - "Challenge" button to beat their score

#### 8.5.2 Achievement Badges
- **Examples**:
  - **First Steps**: 1st unique restaurant
  - **Local Explorer**: 10 unique restaurants
  - **Foodie Fanatic**: 50 unique restaurants
  - **Century Club**: 100 unique restaurants
  - **Dish Detective**: 50 unique dishes
  - **World Traveler**: 10 unique cuisines
  - **Challenge Master**: 10 sponsored challenges completed
- **Display**: Badge showcase on user profile
- **Sharing**: "Share My Achievement" button posts to social media

### 8.6 Success Metrics
- **60%+ users engaging with challenges** monthly
- **40% challenge completion rate**
- **80%+ gift card redemption rate** (points redeemed vs. earned)
- **3,000+ average Foodie Points** per active user

---

## 9. In-App Ordering System

### 9.1 Overview
Users can order food for pickup or delivery directly through Foodie, earning loyalty points automatically and generating revenue for Foodie via transaction fees.

### 9.2 Restaurant Discovery for Ordering

#### 9.2.1 Order-Enabled Restaurants
- **Indicator**: "Order Now" badge on restaurant cards in discovery feed and search
- **Filters**: Toggle "Available for Delivery" or "Available for Pickup"
- **Sorting**: By distance, estimated delivery time, rating, price

#### 9.2.2 Menu Browsing
- **User Flow**:
  1. User taps restaurant card
  2. Restaurant detail page opens
  3. Tabs: Overview, Menu, Reviews, Events
  4. User taps "Menu" tab
  5. Scrollable menu by category (Appetizers, Entrees, Desserts, Drinks)
  6. Each item shows: Name, description, photo, price, dietary icons
- **Menu Categories**: Breakfast, Lunch, Dinner, Drinks, Desserts, Specials
- **Dietary Icons**: Vegetarian, Vegan, Gluten-Free, Spicy, etc.

### 9.3 Ordering Flow

#### 9.3.1 Build Order
- **User Flow**:
  1. User taps menu item
  2. Item detail modal appears
  3. Customization options (size, toppings, substitutions)
  4. Special instructions text field
  5. Quantity selector
  6. Taps "Add to Cart" (price displayed)
  7. Cart icon shows item count
  8. User continues browsing or proceeds to checkout
- **Cart Preview**: Bottom sheet showing current cart items and subtotal

#### 9.3.2 Checkout
- **User Flow**:
  1. User taps "Checkout" (or cart icon)
  2. Checkout screen displays:
     - Order summary (items, quantities, prices)
     - Pickup or Delivery toggle
     - **If Delivery**: Address entry/selection, delivery fee
     - **If Pickup**: Estimated ready time
     - Subtotal, tax, fees, tip (for delivery), total
  3. Payment method selection (saved card, new card, Apple Pay, Google Pay)
  4. **Apply Points**: Toggle to use restaurant loyalty points for discount
  5. Order notes (optional)
  6. Taps "Place Order"
  7. Payment processed (via Stripe)
  8. Order confirmation screen with order number and tracking

#### 9.3.3 Order Confirmation
- **Immediate Feedback**:
  - Confirmation screen with order number
  - Estimated ready/delivery time
  - Restaurant contact info
  - "Track Order" button
- **Notifications**:
  - Push: "Your order has been confirmed"
  - Push: "Your order is being prepared"
  - Push: "Your order is ready for pickup" (or "Out for delivery")
  - Push: "Your order has been delivered"

### 9.4 Order Tracking

#### 9.4.1 Real-Time Status
- **Statuses**: Confirmed → Preparing → Ready/Out for Delivery → Completed
- **User Flow**:
  1. User taps "Track Order" from confirmation or "Orders" tab
  2. Tracking screen shows:
     - Current status with progress bar
     - Estimated time remaining
     - Restaurant name and contact info
     - Order details (items, total)
  3. **If Delivery**: Live map showing driver location (if available)
- **Status Updates**: Push notifications at each stage

#### 9.4.2 Order History
- **User Flow**:
  1. User navigates to "Orders" tab
  2. List of past orders (reverse chronological)
  3. Each order shows: Restaurant, date, items, total, status
  4. Tap order to view details
  5. "Reorder" button (adds same items to cart)
  6. "Review Order" button (for completed orders)

### 9.5 Points Integration

#### 9.5.1 Automatic Points Earning
- **Flow**:
  1. User places order through Foodie
  2. Order total calculated
  3. Restaurant's points formula applied (e.g., "$1 = 10 points")
  4. Bonus multipliers applied (first order, challenges, promotions)
  5. Points credited to wallet immediately after order completion
  6. Push notification: "You earned 250 points from your order!"
- **Bonus Multipliers**:
  - First order at restaurant: 2x points
  - Participating in challenge: 1.5x points
  - Promotional periods (Tuesdays, lunch hours): Variable

#### 9.5.2 Using Points for Discounts
- **Flow**:
  1. During checkout, user sees "Use Points" toggle
  2. App calculates max discount (e.g., 100 points = $1 off)
  3. User toggles on, selects amount of points to use
  4. Discount applied to order total
  5. Remaining payment charged to card
  6. Points deducted from wallet after order completion
- **Restrictions**: Minimum 100 points, max 50% of order total

### 9.6 Delivery Integration

#### 9.6.1 Third-Party Delivery
- **Partners**: DoorDash, Uber Eats (via API integration)
- **How It Works**:
  1. User selects "Delivery" during checkout
  2. Foodie sends order to restaurant POS
  3. Restaurant confirms order
  4. Delivery partner assigned via API
  5. User receives tracking link
  6. Delivery fee + service fee added to total

#### 9.6.2 Restaurant Direct Delivery
- **For restaurants with own drivers**:
  1. Order sent directly to restaurant POS
  2. Restaurant assigns driver
  3. Estimated delivery time provided
  4. Driver calls/texts user when nearby
  5. No third-party fees (lower cost for user)

### 9.7 Revenue Model

#### 9.7.1 Transaction Fees
- **Fee Structure**:
  - **Restaurant Fee**: 15% of subtotal (paid by restaurant)
  - **Service Fee**: 5% of subtotal (paid by user, displayed separately)
  - **Delivery Fee**: $2-5 (varies by distance, paid by user)
- **Example**: $20 order → $3 restaurant fee, $1 service fee, $3 delivery fee
- **Revenue Split**: Foodie keeps 100% of service fee + 50% of restaurant fee

#### 9.7.2 Restaurant Onboarding
- **Partnership Model**:
  - Free to join for restaurants
  - No monthly fees
  - Pay only when orders placed (15% commission)
- **POS Integration**: API integrations with major POS systems (Square, Toast, Clover) or manual order tablet

### 9.8 Success Metrics
- **$500K+ monthly GMV** from ordering
- **30%+ repeat order rate** (users ordering 2+ times/month)
- **4.5+ average rating** for order experience
- **<30 min average delivery time**

---

## 10. Community Impact Section

### 10.1 Overview
Users earn Foodie Points by donating to food pantries, participating in food drives, and making verified food donations, creating social good while building loyalty.

### 10.2 Donation Options

#### 10.2.1 Points-to-Cash Donations
- **User Flow**:
  1. User navigates to "Impact" tab
  2. Sees list of partnered food pantries and charities
  3. Each charity shows: Logo, name, mission, total donations from Foodie users
  4. User selects charity
  5. Enters donation amount (in points or dollars)
  6. **If Points**: Conversion rate displayed (e.g., 100 points = $1)
  7. **If Cash**: Payment method selected
  8. Confirms donation
  9. Points/payment processed
  10. Tax receipt emailed (for cash donations)
  11. User earns bonus Foodie Points (10% of donation value)
- **Point Conversion**: 100 points = $1 donation
- **Bonus Reward**: Donate $10 → earn 100 Foodie Points (creating virtuous cycle)

#### 10.2.2 Food Drive Participation
- **User Flow**:
  1. User sees "Active Food Drives" in Impact tab
  2. Selects drive (location, dates, items needed)
  3. Taps "I'm Participating"
  4. Drops off food at collection point
  5. Staff scans user's QR code to confirm donation
  6. User earns Foodie Points based on donation value
  7. Leaderboard updated with user's contribution
- **Point Structure**: 50 points per $10 worth of food donated (estimated value)

#### 10.2.3 Restaurant Surplus Donations
- **User Flow**:
  1. User dines at participating restaurant
  2. Restaurant has surplus food at end of day
  3. User can "sponsor" donation to nearby pantry (pay $5, restaurant donates $10 worth of food)
  4. User initiates via app: "Donate Surplus Food"
  5. Payment processed
  6. Restaurant coordinates pickup with pantry
  7. User earns 100 Foodie Points + tax receipt
- **Restaurant Benefit**: Tax deduction + goodwill + reduces waste

#### 10.2.4 Verified Food Donations
- **User Flow**:
  1. User donates food independently (not via Foodie food drive)
  2. Takes photo of donation receipt or confirmation
  3. Uploads to app via "Report Donation"
  4. Foodie team reviews (within 24 hours)
  5. If verified, user earns Foodie Points (50 points per $10 donated)
  6. Donation added to user's impact stats
- **Verification**: Manual review of receipt, charity confirmation email, or photo proof

### 10.3 Impact Tracking

#### 10.3.1 Personal Impact Dashboard
- **Display Elements**:
  - Total donations (dollars + points converted)
  - Total meals contributed (estimated: $5 = 1 meal)
  - Food drives participated in
  - Badges earned (Bronze Donor, Silver Donor, Gold Donor, etc.)
  - Timeline of donations
- **Milestones**:
  - 10 meals: Bronze Donor badge + 50 bonus points
  - 50 meals: Silver Donor badge + 200 bonus points
  - 100 meals: Gold Donor badge + 500 bonus points
  - 500 meals: Platinum Donor badge + 2,000 bonus points

#### 10.3.2 Community Impact Stats
- **Display Elements**:
  - Total meals donated by all Foodie users
  - Total dollars donated
  - Number of users participating
  - Featured stories from partnered charities
- **Social Proof**: "The Foodie community has donated 50,000 meals this year!"

### 10.4 Charitable Leaderboards

#### 10.4.1 Donation Leaderboard
- **Ranking Criteria**: Total meals donated (all-time or monthly)
- **Display**:
  - User rank, username, profile photo
  - Meals donated
  - Donor badge level
  - "Donate Now" button
- **Types**: Local (25-mile radius), National, Friends

#### 10.4.2 Recognition
- **Monthly Spotlight**: Featured user story of top donor
- **Social Sharing**: "Share My Impact" button posts stats to social media
- **Restaurant Recognition**: Participating restaurants may offer discounts to top donors

### 10.5 Corporate Matching

#### 10.5.1 Matching Campaigns
- **How It Works**:
  1. Corporate partner (e.g., Coca-Cola, Bank of America) sponsors matching campaign
  2. Campaign details: "We'll match all donations 2x during December"
  3. User makes donation through Foodie
  4. Matching amount calculated and added automatically
  5. User notified: "Your $10 donation became $30 thanks to [Sponsor]!"
  6. User earns bonus Foodie Points for matched amount
- **Benefits**:
  - **Users**: Amplified impact, bonus points
  - **Corporations**: Tax benefits, brand goodwill
  - **Foodie**: Increased engagement, partnership revenue

### 10.6 Charity Partnerships

#### 10.6.1 Partner Criteria
- **Eligible Organizations**:
  - 501(c)(3) registered charities
  - Focus on food security, hunger relief
  - Transparent financials (charity navigator rating)
  - Local food banks, national organizations (Feeding America, etc.)

#### 10.6.2 Onboarding
- **Application**: Charities apply via web form
- **Verification**: Foodie team verifies 501(c)(3) status
- **Agreement**: Revenue share (Foodie keeps 5% of donations for platform maintenance)
- **Profile Setup**: Charity creates profile with logo, mission, impact stories

### 10.7 Success Metrics
- **$100K+ annual donations** facilitated through platform
- **5%+ user participation** in donation features
- **10+ partnered food pantries** per major city
- **80%+ user satisfaction** with impact features (survey)

---

## 11. Value Dashboard

### 11.1 Overview
Personalized dashboard that helps users decide where to eat by highlighting restaurants with the best value: most points earned, lowest cost-per-meal, and highest savings potential.

### 11.2 Dashboard Features

#### 11.2.1 Best Value Restaurants
- **Calculation**: `Value Score = (Points Earned / Cost) + (Available Discounts / Cost) + Quality Rating`
- **Display**:
  - Top 5 restaurants ranked by value score
  - Restaurant logo and name
  - Value score (e.g., "9.2/10 value")
  - Breakdown: "High points (8x), Low cost ($$), Great rating (4.5★)"
  - "Order Now" or "View Menu" button
- **Filters**: Cuisine type, distance, price range

#### 11.2.2 Points Optimization
- **Display Elements**:
  - "Max Points Today": Restaurants offering bonus points (e.g., 2x Tuesdays)
  - "Expiring Soon": Restaurants where your points expire in <30 days
  - "Use Your Points": Restaurants where you have enough points for a discount
- **Notifications**: Push alerts for time-sensitive opportunities

#### 11.2.3 Cost Per Meal Analysis
- **User Flow**:
  1. User taps "Cost Per Meal" card
  2. Chart shows average cost per meal by restaurant
  3. Sorted: Lowest to highest
  4. Includes: Average order value, delivery fees, tips, minus points discounts
  5. Recommendation: "You save $3/meal on average at [Restaurant X]"
- **Factors**:
  - Order subtotal
  - Delivery fees (if applicable)
  - Taxes
  - Points used for discounts
  - Loyalty rewards earned

#### 11.2.4 Savings Summary
- **Display Elements**:
  - "This Month's Savings": Total saved via points, discounts, promotions
  - "Lifetime Savings": All-time total
  - "Top Saver Badge": Recognition for high savings (vs. average user)
  - Graph: Monthly savings trend
- **Goal Setting**: "Set a savings goal for this month: $50"

#### 11.2.5 Personalized Recommendations
- **Smart Suggestions**:
  - "Order from [Restaurant X] today—you'll earn 2x points!"
  - "You haven't used your 500 points at [Restaurant Y]—redeem for $5 off"
  - "New restaurant nearby with high value: [Restaurant Z]"
  - "Your favorite dish is on special at [Restaurant A] today"
- **Trigger Conditions**:
  - Bonus points active
  - Points nearing expiration
  - Nearby restaurants with high value scores
  - Favorite dishes on promotion

### 11.3 Budget Tracking

#### 11.3.1 Monthly Budget Setting
- **User Flow**:
  1. User navigates to "Value" tab
  2. Taps "Set Budget"
  3. Enters monthly dining budget (e.g., $400)
  4. App tracks spending against budget
  5. Progress bar shows: "$150 / $400 spent (38%)"
  6. Alert when 80% reached: "You're close to your budget—consider value picks"
- **Spending Categories**: Breakfast, Lunch, Dinner, Snacks/Coffee

#### 11.3.2 Spending Insights
- **Weekly/Monthly Reports**:
  - Total spent
  - Average cost per meal
  - Most expensive orders
  - Best value orders
  - Breakdown by restaurant
  - Breakdown by cuisine type
- **Comparison**: "You spent 15% less this month than last month"

### 11.4 Decision Helper

#### 11.4.1 "Where Should I Eat?" Tool
- **User Flow**:
  1. User taps "Decide for Me" button
  2. Quick questionnaire:
     - What are you craving? (cuisine dropdown)
     - Price range? ($ to $$$$)
     - Distance? (nearby, 5 miles, 10 miles, any)
     - Priority? (value, speed, quality, new restaurant)
  3. App analyzes options
  4. Top 3 recommendations displayed with reasoning
  5. "Choose [Restaurant X]" buttons
- **Algorithm**: Weighted scoring based on user priorities + value metrics

#### 11.4.2 "Meal Planner" Feature
- **User Flow**:
  1. User plans meals for the week
  2. Adds meals to calendar (Monday lunch: [Restaurant X], Tuesday dinner: [Restaurant Y])
  3. App calculates projected spending + points earned
  4. Suggests optimizations: "Swap Tuesday dinner for [Restaurant Z] to save $8"
  5. User confirms plan
  6. Reminders sent before planned meals: "Time for lunch at [Restaurant X]—Order now"

### 11.5 Value Alerts

#### 11.5.1 Real-Time Notifications
- **Trigger Events**:
  - Bonus points activated at favorite restaurant
  - Points expiring in 7 days
  - Flash sale or limited-time discount
  - High-value restaurant nearby (when user is traveling)
  - Friend ordered from high-value restaurant (social proof)
- **Alert Format**: Push notification with action button ("Order Now," "View Details")

#### 11.5.2 Daily Value Digest
- **Delivery**: Email sent at 10 AM daily (customizable time)
- **Contents**:
  - Today's best value restaurants
  - Active promotions
  - Points expiring soon
  - Meal suggestions based on past orders
  - Weekly spending summary (on Mondays)

### 11.6 Success Metrics
- **50%+ users engaging with value dashboard** weekly
- **20% increase in order frequency** from value-optimized users
- **30% higher satisfaction** with "value for money" (survey)
- **$50+ average monthly savings** per active user

---

## 12. Technical Architecture

### 12.1 Mobile App Stack

#### 12.1.1 Frontend Framework
- **Platform**: React Native
- **Rationale**: Single codebase for iOS and Android, fast iteration, large ecosystem
- **State Management**: Redux Toolkit (global state), React Query (server state)
- **Navigation**: React Navigation (stack + bottom tabs)
- **UI Library**: React Native Paper (Material Design) + custom components

#### 12.1.2 Camera & Scanning
- **Receipt Scan**: React Native Vision Camera + Google Vision API (OCR)
- **Barcode/QR**: ZXing library (fast, offline-capable)
- **Image Processing**: Sharp (compression, optimization before upload)

#### 12.1.3 Maps & Location
- **Maps**: Google Maps SDK (iOS/Android)
- **Location**: React Native Geolocation + background location tracking (for proximity alerts)
- **Geocoding**: Google Geocoding API (convert addresses to coordinates)

### 12.2 Backend Architecture

#### 12.2.1 API Server
- **Framework**: Node.js + Express.js
- **Database**: PostgreSQL 15 (relational data: users, transactions, points)
- **Caching**: Redis 7 (session storage, hot data, leaderboards)
- **ORM**: Prisma (type-safe database access, migrations)
- **Authentication**: JWT tokens (15 min expiry) + refresh tokens (7 day expiry)

#### 12.2.2 Microservices (Optional Future Scale)
- **Monolith First**: Start with single API server, split later if needed
- **Candidate Services**:
  - **Points Service**: Handle all points transactions
  - **Order Service**: Manage ordering + delivery integration
  - **Social Service**: Posts, feeds, monetization calculations
  - **Analytics Service**: Value dashboard calculations, reporting

#### 12.2.3 File Storage
- **Provider**: AWS S3
- **Use Cases**:
  - User profile photos
  - Food post images
  - Receipt scans (stored temporarily for audit)
- **CDN**: CloudFront (fast image delivery globally)

#### 12.2.4 Task Queue
- **Provider**: Bull + Redis
- **Use Cases**:
  - Async OCR processing (receipt scans)
  - Email sending (receipts, notifications)
  - Points sync from restaurant APIs (scheduled jobs)
  - Push notification batching

### 12.3 Payment Processing

#### 12.3.1 Provider
- **Stripe**: Payment processing, tokenization, fraud detection (Stripe Radar)
- **Supported Methods**: Credit/debit cards, Apple Pay, Google Pay, ACH

#### 12.3.2 Security
- **PCI Compliance**: Stripe handles card data (Foodie never stores raw card numbers)
- **Two-Factor Auth**: Required for purchases >$100
- **Fraud Detection**: Stripe Radar (machine learning-based)

### 12.4 External Integrations

#### 12.4.1 Restaurant APIs
- **Loyalty Programs**: OAuth integrations with major chains (Starbucks, Chipotle, etc.)
- **POS Systems**: Square, Toast, Clover APIs for order submission
- **Menu Data**: Scrape or partner API for real-time menu + pricing

#### 12.4.2 Delivery Partners
- **DoorDash**: API integration for delivery logistics
- **Uber Eats**: Secondary partner
- **Fallback**: Direct phone orders + manual driver dispatch

#### 12.4.3 Gift Card Provider
- **Tango Card**: API for digital gift card fulfillment (100+ brands)

#### 12.4.4 Notifications
- **Push**: Firebase Cloud Messaging (FCM) for Android, Apple Push Notification Service (APNS) for iOS
- **Email**: SendGrid (transactional emails, receipts, alerts)
- **SMS**: Twilio (order status, verification codes)

### 12.5 Data Models

#### 12.5.1 Core Entities
```typescript
User {
  id: UUID
  email: string
  phone: string
  name: string
  profilePhoto: string
  preferences: { cuisines: string[], dietaryRestrictions: string[] }
  createdAt: timestamp
}

Restaurant {
  id: UUID
  name: string
  location: { lat: number, lng: number }
  address: string
  cuisineTypes: string[]
  priceRange: number  // 1-4 ($-$$$$)
  isLocalBusiness: boolean
  menu: MenuItem[]
  loyaltyProgram: { apiProvider: string, pointsFormula: string }
}

PointsTransaction {
  id: UUID
  userId: UUID
  restaurantId: UUID
  amount: number
  source: 'receipt_scan' | 'qr_scan' | 'order' | 'challenge' | 'manual'
  transactionType: 'earn' | 'redeem' | 'expire' | 'gift'
  metadata: { receiptUrl?: string, orderId?: UUID, challengeId?: UUID }
  createdAt: timestamp
}

FoodiePoints {
  id: UUID
  userId: UUID
  balance: number
  totalEarned: number
  totalRedeemed: number
  lastActivity: timestamp
}

Order {
  id: UUID
  userId: UUID
  restaurantId: UUID
  items: { menuItemId: UUID, quantity: number, customizations: string }[]
  subtotal: number
  tax: number
  deliveryFee: number
  serviceFee: number
  tip: number
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled'
  fulfillmentType: 'pickup' | 'delivery'
  deliveryAddress?: string
  createdAt: timestamp
}

SocialPost {
  id: UUID
  userId: UUID
  restaurantId: UUID
  photos: string[]  // URLs
  caption: string
  rating: number  // 1-5
  dishTags: string[]
  likes: UUID[]  // array of user IDs
  comments: Comment[]
  views: number
  earnings: number  // dollars earned from views/engagement
  createdAt: timestamp
}

Challenge {
  id: UUID
  type: 'unique_restaurant' | 'diverse_dish' | 'cuisine_exploration' | 'restaurant_sponsored'
  sponsorRestaurantId?: UUID
  title: string
  description: string
  requirements: { count?: number, specificItems?: UUID[], deadline?: timestamp }
  reward: { foodiePoints: number, giftCard?: { provider: string, value: number } }
  participants: { userId: UUID, progress: number, completed: boolean }[]
}

Event {
  id: UUID
  restaurantId: UUID
  title: string
  description: string
  type: 'happy_hour' | 'special' | 'pop_up' | 'local_competition' | 'national_competition'
  startTime: timestamp
  endTime: timestamp
  location: { lat: number, lng: number }
  registrations: UUID[]  // array of user IDs
  checkIns: UUID[]  // array of user IDs
  maxAttendees?: number
  prizeDetails?: string
}

Donation {
  id: UUID
  userId: UUID
  charityId: UUID
  amount: number  // dollars or points
  donationType: 'cash' | 'points' | 'food_drive' | 'surplus'
  mealsContributed: number  // estimated
  taxReceiptUrl?: string
  createdAt: timestamp
}
```

### 12.6 API Design

#### 12.6.1 RESTful Endpoints
- **Authentication**:
  - `POST /api/v1/auth/signup` - Create account
  - `POST /api/v1/auth/login` - Login
  - `POST /api/v1/auth/refresh` - Refresh JWT token
  - `POST /api/v1/auth/logout` - Logout

- **Wallet**:
  - `GET /api/v1/wallet` - Get unified wallet
  - `POST /api/v1/wallet/sync` - Sync points from restaurant API
  - `GET /api/v1/wallet/history` - Points history

- **Points Upload**:
  - `POST /api/v1/receipts/scan` - Upload receipt photo (multipart)
  - `POST /api/v1/receipts/qr` - Process QR code scan
  - `POST /api/v1/receipts/manual` - Manual entry

- **Discovery Feed**:
  - `GET /api/v1/feed/restaurants` - Get personalized restaurant feed
  - `GET /api/v1/feed/trending-dishes` - Get trending dishes
  - `GET /api/v1/restaurants/:id` - Get restaurant details

- **Social**:
  - `POST /api/v1/posts` - Create post (multipart)
  - `GET /api/v1/posts/feed` - Get social feed
  - `POST /api/v1/posts/:id/like` - Like post
  - `POST /api/v1/posts/:id/comment` - Comment on post

- **Ordering**:
  - `GET /api/v1/restaurants/:id/menu` - Get restaurant menu
  - `POST /api/v1/orders` - Place order
  - `GET /api/v1/orders/:id` - Get order details
  - `GET /api/v1/orders/history` - Order history

- **Challenges**:
  - `GET /api/v1/challenges` - Get active challenges
  - `POST /api/v1/challenges/:id/accept` - Accept challenge
  - `GET /api/v1/challenges/:id/progress` - Get challenge progress

- **Marketplace**:
  - `GET /api/v1/marketplace/points` - Browse points for purchase
  - `POST /api/v1/marketplace/purchase` - Buy points
  - `GET /api/v1/marketplace/gift-cards` - Browse gift cards
  - `POST /api/v1/marketplace/redeem` - Redeem gift card

- **Value Dashboard**:
  - `GET /api/v1/value/best-value` - Get best value restaurants
  - `GET /api/v1/value/savings` - Get savings summary
  - `GET /api/v1/value/budget` - Get budget tracking

- **Community Impact**:
  - `GET /api/v1/charities` - List partnered charities
  - `POST /api/v1/donations` - Make donation
  - `GET /api/v1/donations/history` - Donation history
  - `GET /api/v1/impact/leaderboard` - Get donation leaderboard

### 12.7 Security & Privacy

#### 12.7.1 Data Protection
- **Encryption**: AES-256 for sensitive data at rest, TLS 1.3 for data in transit
- **PII Storage**: Minimal personal data stored, encrypted in database
- **Right to Delete**: Users can request account deletion (GDPR/CCPA compliance)
- **Data Export**: Users can export all data in machine-readable format

#### 12.7.2 Authentication Security
- **Password**: Bcrypt hashing (cost factor 12)
- **JWT**: Short-lived access tokens (15 min), refresh tokens in HTTP-only cookies
- **Rate Limiting**: 5 login attempts per 15 minutes, IP-based throttling

#### 12.7.3 API Security
- **Rate Limiting**: 100 requests/min per user, 1000 requests/min per IP
- **Input Validation**: Schema validation on all endpoints (Joi library)
- **SQL Injection Prevention**: Parameterized queries via Prisma ORM
- **XSS Prevention**: HTML escaping on user-generated content

### 12.8 Monitoring & Analytics

#### 12.8.1 Application Monitoring
- **Error Tracking**: Sentry (real-time error alerts)
- **Performance**: New Relic (API response times, throughput)
- **Uptime**: Pingdom (99.9% SLA monitoring)

#### 12.8.2 User Analytics
- **Product Analytics**: Mixpanel (user behavior, funnels, retention)
- **A/B Testing**: Optimizely (feature flagging, experiments)
- **Crash Reporting**: Firebase Crashlytics (mobile app crashes)

### 12.9 Scalability

#### 12.9.1 Horizontal Scaling
- **API Servers**: Auto-scaling EC2 instances behind load balancer (AWS ELB)
- **Database**: PostgreSQL read replicas for read-heavy queries
- **Redis**: Redis Cluster for distributed caching

#### 12.9.2 Performance Optimization
- **Caching Strategy**:
  - User wallet: 5 min cache
  - Restaurant menus: 1 hour cache
  - Discovery feed: 10 min cache
  - Leaderboards: 1 hour cache (refreshed by background job)
- **Database Indexing**: Indexes on userId, restaurantId, createdAt for fast queries
- **CDN**: CloudFront for static assets (images, JS bundles)

---

## 13. Implementation Phases

### 13.1 Phase 0: Foundation (Weeks 1-4)

#### 13.1.1 Project Setup
- **Tasks**:
  - Initialize React Native project (iOS + Android)
  - Setup Node.js backend with Express
  - Configure PostgreSQL database + Prisma ORM
  - Setup Redis for caching
  - Configure AWS S3 for file storage
  - Setup CI/CD pipeline (GitHub Actions)
- **Deliverables**: Empty app shells (mobile + backend) with basic infrastructure

#### 13.1.2 Authentication System
- **Tasks**:
  - Implement user registration (email + password)
  - Implement login flow with JWT tokens
  - Add password reset via email
  - Build profile management screens
  - Role-based access control (user, restaurant, admin)
- **Deliverables**: Users can sign up, log in, and manage profiles

#### 13.1.3 Core Database Models
- **Tasks**:
  - Define Prisma schema for all core entities
  - Create database migrations
  - Seed development data (test restaurants, users)
  - Write API endpoints for CRUD operations
- **Deliverables**: Database ready for feature development

---

### 13.2 Phase 1: Wallet & Points Upload (Weeks 5-8)

#### 13.2.1 Unified Loyalty Wallet
- **Tasks**:
  - Build wallet UI (points dashboard, balance cards)
  - Implement restaurant connection flow (OAuth + manual entry)
  - Build points sync service (polling restaurant APIs)
  - Display points history timeline
  - Add expiration alerts (push notifications)
- **Deliverables**: Users can connect restaurants and see unified wallet

#### 13.2.2 Receipt Scanning
- **Tasks**:
  - Integrate React Native Vision Camera
  - Connect Google Vision API for OCR
  - Build receipt extraction pipeline
  - Implement restaurant matching algorithm (fuzzy search + geolocation)
  - Build confirmation/editing UI for scanned receipts
- **Deliverables**: Users can scan receipts and earn points

#### 13.2.3 QR/Barcode Scanner
- **Tasks**:
  - Integrate ZXing barcode scanner
  - Build QR code generation for restaurants
  - Implement instant points credit flow
  - Add haptic feedback + animations
- **Deliverables**: Users can scan codes at restaurants for instant points

#### 13.2.4 Digital Receipt Import
- **Tasks**:
  - Setup email forwarding (receipts@foodieapp.com)
  - Build email parsing service (extract transaction data)
  - Integrate with delivery app APIs (Uber Eats, DoorDash)
  - Auto-credit points from parsed receipts
- **Deliverables**: Users can forward receipts or sync delivery apps

---

### 13.3 Phase 2: Discovery & Social (Weeks 9-12)

#### 13.3.1 For You Discovery Feed
- **Tasks**:
  - Build discovery feed UI (scrollable restaurant cards)
  - Implement recommendation algorithm (collaborative filtering)
  - Add local business spotlight (prioritize small businesses)
  - Integrate Google Maps for restaurant locations
  - Add filters (cuisine, price, distance)
- **Deliverables**: Users see personalized restaurant recommendations

#### 13.3.2 Restaurant Events Hub
- **Tasks**:
  - Build events feed UI (list + map + calendar views)
  - Implement event registration + RSVP flow
  - Add event check-in (QR code scanning)
  - Build restaurant dashboard for creating events
  - Add event reminders (push notifications)
- **Deliverables**: Users can discover and register for events

#### 13.3.3 Social Content Creation
- **Tasks**:
  - Build post creation flow (photo upload, caption, restaurant tag)
  - Implement image filters + editing
  - Build social feed (follower posts + algorithmic recommendations)
  - Add like, comment, share functionality
  - Display user profiles with post history
- **Deliverables**: Users can create and share food posts

#### 13.3.4 Content Monetization
- **Tasks**:
  - Build earnings calculation engine (views + engagement)
  - Implement restaurant promotion campaigns
  - Match posts to active campaigns
  - Build creator earnings dashboard
  - Setup weekly payout system (Stripe Connect)
- **Deliverables**: Users earn money from posts

---

### 13.4 Phase 3: Ordering & Marketplace (Weeks 13-16)

#### 13.4.1 In-App Ordering
- **Tasks**:
  - Build menu browsing UI
  - Implement cart + checkout flow
  - Integrate Stripe for payment processing
  - Connect to restaurant POS systems (Square, Toast, Clover)
  - Build order tracking (real-time status updates)
  - Integrate delivery partners (DoorDash API)
- **Deliverables**: Users can order food through app

#### 13.4.2 Points Marketplace
- **Tasks**:
  - Build points purchasing UI (browse restaurants, select amount)
  - Implement payment flow (Stripe integration)
  - Add bulk purchase discounts
  - Build points gifting flow
  - Integrate Tango Card API for gift card redemption
- **Deliverables**: Users can buy/redeem points and gift cards

#### 13.4.3 Automatic Points Application
- **Tasks**:
  - Calculate points earned per order (restaurant formula + multipliers)
  - Auto-credit points after order completion
  - Allow points usage for discounts during checkout
  - Display points earned in order confirmation
- **Deliverables**: Seamless points integration with ordering

---

### 13.5 Phase 4: Gamification & Impact (Weeks 17-20)

#### 13.5.1 Foodie Rewards System
- **Tasks**:
  - Build unique restaurant challenge tracker
  - Build diverse dish challenge tracker
  - Implement restaurant-sponsored challenges
  - Build leaderboards (local, national, friends)
  - Add achievement badges + milestone alerts
  - Build Foodie Points wallet (separate from restaurant points)
- **Deliverables**: Users earn Foodie Points through exploration

#### 13.5.2 Gift Card Redemption
- **Tasks**:
  - Build redemption catalog UI (gift cards, restaurant credits)
  - Implement redemption flow (point deduction, digital delivery)
  - Integrate Tango Card API
  - Add redemption history
- **Deliverables**: Users redeem Foodie Points for gift cards

#### 13.5.3 Community Impact
- **Tasks**:
  - Build donation flow (points-to-cash, cash donations)
  - Partner with local food pantries + charities
  - Implement food drive participation (QR check-in)
  - Build impact dashboard (personal + community stats)
  - Add donation leaderboards
  - Implement corporate matching campaigns
- **Deliverables**: Users donate and earn points for social good

---

### 13.6 Phase 5: Value Dashboard & Polish (Weeks 21-24)

#### 13.6.1 Value Dashboard
- **Tasks**:
  - Calculate value scores for restaurants
  - Build best value recommendations UI
  - Display cost-per-meal analysis
  - Add savings summary (monthly + lifetime)
  - Build budget tracking + alerts
  - Implement "Where Should I Eat?" decision tool
  - Add meal planner feature
- **Deliverables**: Users make informed dining decisions

#### 13.6.2 Notifications & Alerts
- **Tasks**:
  - Setup Firebase Cloud Messaging (push notifications)
  - Implement expiration alerts (points, offers)
  - Add value alerts (bonus points, flash sales)
  - Build daily value digest email
  - Add in-app notification center
- **Deliverables**: Users stay informed with timely alerts

#### 13.6.3 Admin Dashboard (Web)
- **Tasks**:
  - Build web dashboard for Foodie admins
  - User management (view, suspend, delete accounts)
  - Restaurant management (approve, verify, edit profiles)
  - Event moderation (approve events, view registrations)
  - Content moderation (review flagged posts/comments)
  - Analytics dashboards (user growth, GMV, engagement)
- **Deliverables**: Internal tools for managing platform

#### 13.6.4 Testing & Launch Prep
- **Tasks**:
  - Write unit tests (80%+ coverage for critical paths)
  - Write integration tests (API endpoints)
  - Write E2E tests (Detox for mobile)
  - Load testing (simulate 10K concurrent users)
  - Security audit (penetration testing)
  - Beta launch (invite-only, 100 users)
  - App Store + Google Play submissions
- **Deliverables**: Production-ready app

---

### 13.7 Post-Launch (Weeks 25+)

#### 13.7.1 User Feedback & Iteration
- **Tasks**:
  - Monitor analytics (Mixpanel, Sentry)
  - Collect user feedback (in-app surveys, app reviews)
  - Prioritize bug fixes + UX improvements
  - A/B test key features (feed algorithm, challenge rewards)
  - Iterate based on data

#### 13.7.2 Restaurant Onboarding
- **Tasks**:
  - Build self-service restaurant onboarding portal
  - Conduct outreach to local restaurants
  - Partner with restaurant associations
  - Offer launch incentives (3 months free, no commission)
  - Provide onboarding support (setup assistance)

#### 13.7.3 Growth & Marketing
- **Tasks**:
  - App Store Optimization (ASO)
  - Social media marketing (Instagram, TikTok, Twitter)
  - Influencer partnerships (food bloggers, local influencers)
  - Referral program (invite friends, earn points)
  - PR outreach (local news, food publications)

#### 13.7.4 Feature Expansion
- **Future Features**:
  - Table reservations (integrate OpenTable)
  - Split bill with friends (group ordering)
  - Meal subscriptions (unlimited coffee, monthly pass)
  - Corporate accounts (expense tracking for businesses)
  - International expansion (localization, currency support)

---

## 13.8 Success Metrics by Phase

### Phase 1 Metrics
- **90%+ OCR accuracy** on receipt scans
- **5+ restaurants connected** per active user
- **80%+ sync success rate** for restaurant APIs

### Phase 2 Metrics
- **30%+ discovery rate** of new restaurants via feed
- **10%+ creators earning money** monthly
- **20% average engagement rate** on social posts

### Phase 3 Metrics
- **$100K+ monthly GMV** from ordering
- **30%+ repeat order rate**
- **20%+ users purchasing points**

### Phase 4 Metrics
- **60%+ users engaging with challenges**
- **40% challenge completion rate**
- **$20K+ monthly donations** facilitated

### Phase 5 Metrics
- **50%+ users engaging with value dashboard** weekly
- **70%+ weekly active users**
- **4.5+ app store rating**

---

## END OF PRD
