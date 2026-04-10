import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

// Restaurant seed data - 25+ popular chains with loyalty programs
const restaurants = [
  // Coffee & Breakfast
  {
    name: 'Starbucks',
    description: 'Specialty coffee, handcrafted beverages, and delicious food items.',
    address: '123 Coffee Lane',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    cuisineTypes: ['Coffee', 'Breakfast', 'Bakery'],
    priceRange: 2,
    rating: 4.3,
    reviewCount: 15420,
    imageUrl: 'https://logo.clearbit.com/starbucks.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 2,
    loyaltyApiProvider: 'starbucks',
    latitude: 47.6062,
    longitude: -122.3321,
  },
  {
    name: 'Dunkin\'',
    description: 'America\'s favorite coffee and baked goods chain.',
    address: '456 Donut Ave',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
    cuisineTypes: ['Coffee', 'Breakfast', 'Bakery'],
    priceRange: 1,
    rating: 4.1,
    reviewCount: 12300,
    imageUrl: 'https://logo.clearbit.com/dunkindonuts.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 5,
    loyaltyApiProvider: 'dunkin',
    latitude: 42.3601,
    longitude: -71.0589,
  },
  // Fast Casual
  {
    name: 'Chipotle Mexican Grill',
    description: 'Fast-casual Mexican food with customizable burritos, bowls, and tacos.',
    address: '789 Burrito Blvd',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202',
    cuisineTypes: ['Mexican', 'Fast Casual'],
    priceRange: 2,
    rating: 4.4,
    reviewCount: 18500,
    imageUrl: 'https://logo.clearbit.com/chipotle.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'chipotle',
    latitude: 39.7392,
    longitude: -104.9903,
  },
  {
    name: 'Panera Bread',
    description: 'Fresh bakery-café serving soups, salads, sandwiches, and pastries.',
    address: '321 Bread St',
    city: 'St. Louis',
    state: 'MO',
    zipCode: '63101',
    cuisineTypes: ['Bakery', 'Sandwiches', 'Soups'],
    priceRange: 2,
    rating: 4.2,
    reviewCount: 14200,
    imageUrl: 'https://logo.clearbit.com/panerabread.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'panera',
    latitude: 38.6270,
    longitude: -90.1994,
  },
  {
    name: 'Sweetgreen',
    description: 'Healthy salads and warm bowls made with locally sourced ingredients.',
    address: '555 Salad Way',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    cuisineTypes: ['Healthy', 'Salads', 'Bowls'],
    priceRange: 3,
    rating: 4.5,
    reviewCount: 8900,
    imageUrl: 'https://logo.clearbit.com/sweetgreen.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'sweetgreen',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  // Fast Food
  {
    name: 'McDonald\'s',
    description: 'World-famous burgers, fries, and breakfast items.',
    address: '1 Golden Arches Dr',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    cuisineTypes: ['Fast Food', 'Burgers', 'Breakfast'],
    priceRange: 1,
    rating: 3.8,
    reviewCount: 45000,
    imageUrl: 'https://logo.clearbit.com/mcdonalds.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 100,
    loyaltyApiProvider: 'mcdonalds',
    latitude: 41.8781,
    longitude: -87.6298,
  },
  {
    name: 'Chick-fil-A',
    description: 'Premium chicken sandwiches and nuggets with signature sauces.',
    address: '200 Chicken Lane',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30301',
    cuisineTypes: ['Fast Food', 'Chicken'],
    priceRange: 2,
    rating: 4.6,
    reviewCount: 28000,
    imageUrl: 'https://logo.clearbit.com/chick-fil-a.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'chickfila',
    latitude: 33.7490,
    longitude: -84.3880,
  },
  {
    name: 'Wendy\'s',
    description: 'Fresh, never frozen beef burgers and signature Frosty.',
    address: '300 Square Patty Rd',
    city: 'Columbus',
    state: 'OH',
    zipCode: '43215',
    cuisineTypes: ['Fast Food', 'Burgers'],
    priceRange: 1,
    rating: 4.0,
    reviewCount: 18900,
    imageUrl: 'https://logo.clearbit.com/wendys.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'wendys',
    latitude: 39.9612,
    longitude: -82.9988,
  },
  {
    name: 'Taco Bell',
    description: 'Innovative Mexican-inspired fast food with creative menu items.',
    address: '400 Taco Terrace',
    city: 'Irvine',
    state: 'CA',
    zipCode: '92618',
    cuisineTypes: ['Fast Food', 'Mexican'],
    priceRange: 1,
    rating: 3.9,
    reviewCount: 22000,
    imageUrl: 'https://logo.clearbit.com/tacobell.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'tacobell',
    latitude: 33.6846,
    longitude: -117.8265,
  },
  {
    name: 'Burger King',
    description: 'Home of the Whopper and flame-grilled burgers.',
    address: '500 Flame Grill Ave',
    city: 'Miami',
    state: 'FL',
    zipCode: '33101',
    cuisineTypes: ['Fast Food', 'Burgers'],
    priceRange: 1,
    rating: 3.7,
    reviewCount: 19500,
    imageUrl: 'https://logo.clearbit.com/bk.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'burgerking',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  // Pizza
  {
    name: 'Domino\'s Pizza',
    description: 'Pizza delivery and carryout with a wide variety of toppings.',
    address: '600 Pizza Place',
    city: 'Ann Arbor',
    state: 'MI',
    zipCode: '48104',
    cuisineTypes: ['Pizza', 'Italian'],
    priceRange: 2,
    rating: 4.0,
    reviewCount: 25000,
    imageUrl: 'https://logo.clearbit.com/dominos.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'dominos',
    latitude: 42.2808,
    longitude: -83.7430,
  },
  {
    name: 'Pizza Hut',
    description: 'Classic pizza restaurant with dine-in, delivery, and carryout.',
    address: '700 Hut Highway',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    cuisineTypes: ['Pizza', 'Italian'],
    priceRange: 2,
    rating: 3.8,
    reviewCount: 21000,
    imageUrl: 'https://logo.clearbit.com/pizzahut.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 2,
    loyaltyApiProvider: 'pizzahut',
    latitude: 32.7767,
    longitude: -96.7970,
  },
  // Subs & Sandwiches
  {
    name: 'Subway',
    description: 'Build your own subs, salads, and wraps with fresh ingredients.',
    address: '800 Sub Street',
    city: 'Milford',
    state: 'CT',
    zipCode: '06460',
    cuisineTypes: ['Sandwiches', 'Subs', 'Healthy'],
    priceRange: 1,
    rating: 3.9,
    reviewCount: 32000,
    imageUrl: 'https://logo.clearbit.com/subway.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 1,
    loyaltyApiProvider: 'subway',
    latitude: 41.2222,
    longitude: -73.0569,
  },
  {
    name: 'Jersey Mike\'s Subs',
    description: 'Authentic East Coast-style subs with premium meats and cheeses.',
    address: '900 Jersey Way',
    city: 'Manasquan',
    state: 'NJ',
    zipCode: '08736',
    cuisineTypes: ['Sandwiches', 'Subs'],
    priceRange: 2,
    rating: 4.4,
    reviewCount: 11500,
    imageUrl: 'https://logo.clearbit.com/jerseymikes.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 1,
    loyaltyApiProvider: 'jerseymikes',
    latitude: 40.1262,
    longitude: -74.0377,
  },
  {
    name: 'Jimmy John\'s',
    description: 'Freaky fast delivery of fresh gourmet sandwiches.',
    address: '1000 Fast Lane',
    city: 'Champaign',
    state: 'IL',
    zipCode: '61820',
    cuisineTypes: ['Sandwiches', 'Subs'],
    priceRange: 2,
    rating: 4.1,
    reviewCount: 9800,
    imageUrl: 'https://logo.clearbit.com/jimmyjohns.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 1,
    loyaltyApiProvider: 'jimmyjohns',
    latitude: 40.1164,
    longitude: -88.2434,
  },
  // Asian
  {
    name: 'Panda Express',
    description: 'American-Chinese cuisine with signature Orange Chicken.',
    address: '1100 Panda Path',
    city: 'Rosemead',
    state: 'CA',
    zipCode: '91770',
    cuisineTypes: ['Chinese', 'Asian', 'Fast Casual'],
    priceRange: 2,
    rating: 4.0,
    reviewCount: 16000,
    imageUrl: 'https://logo.clearbit.com/pandaexpress.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'pandaexpress',
    latitude: 34.0806,
    longitude: -118.0728,
  },
  {
    name: 'Noodles & Company',
    description: 'Global noodle dishes from around the world.',
    address: '1200 Noodle Circle',
    city: 'Broomfield',
    state: 'CO',
    zipCode: '80021',
    cuisineTypes: ['Asian', 'Italian', 'Noodles'],
    priceRange: 2,
    rating: 4.2,
    reviewCount: 7500,
    imageUrl: 'https://logo.clearbit.com/noodles.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'noodles',
    latitude: 39.9205,
    longitude: -105.0867,
  },
  // Casual Dining
  {
    name: 'Olive Garden',
    description: 'Italian-American casual dining with unlimited breadsticks.',
    address: '1300 Garden Grove',
    city: 'Orlando',
    state: 'FL',
    zipCode: '32801',
    cuisineTypes: ['Italian', 'Casual Dining'],
    priceRange: 2,
    rating: 4.1,
    reviewCount: 14000,
    imageUrl: 'https://logo.clearbit.com/olivegarden.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 1,
    loyaltyApiProvider: 'darden',
    latitude: 28.5383,
    longitude: -81.3792,
  },
  {
    name: 'Applebee\'s',
    description: 'Neighborhood grill with American classics and drinks.',
    address: '1400 Neighborhood Way',
    city: 'Kansas City',
    state: 'MO',
    zipCode: '64101',
    cuisineTypes: ['American', 'Casual Dining', 'Bar'],
    priceRange: 2,
    rating: 3.8,
    reviewCount: 12500,
    imageUrl: 'https://logo.clearbit.com/applebees.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 1,
    loyaltyApiProvider: 'applebees',
    latitude: 39.0997,
    longitude: -94.5786,
  },
  {
    name: 'Chili\'s',
    description: 'Tex-Mex and American grill with famous Baby Back Ribs.',
    address: '1500 Pepper Plaza',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75202',
    cuisineTypes: ['American', 'Tex-Mex', 'Casual Dining'],
    priceRange: 2,
    rating: 3.9,
    reviewCount: 13000,
    imageUrl: 'https://logo.clearbit.com/chilis.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'brinker',
    latitude: 32.7811,
    longitude: -96.7950,
  },
  // Ice Cream & Desserts
  {
    name: 'Dairy Queen',
    description: 'Soft serve ice cream, Blizzards, and fast food.',
    address: '1600 Blizzard Blvd',
    city: 'Edina',
    state: 'MN',
    zipCode: '55424',
    cuisineTypes: ['Ice Cream', 'Desserts', 'Fast Food'],
    priceRange: 1,
    rating: 4.2,
    reviewCount: 18000,
    imageUrl: 'https://logo.clearbit.com/dairyqueen.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'dairyqueen',
    latitude: 44.8897,
    longitude: -93.3499,
  },
  {
    name: 'Baskin-Robbins',
    description: '31 flavors of premium ice cream and frozen treats.',
    address: '1700 Flavor Lane',
    city: 'Canton',
    state: 'MA',
    zipCode: '02021',
    cuisineTypes: ['Ice Cream', 'Desserts'],
    priceRange: 2,
    rating: 4.3,
    reviewCount: 9500,
    imageUrl: 'https://logo.clearbit.com/baskinrobbins.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'inspire',
    latitude: 42.1584,
    longitude: -71.1451,
  },
  // Smoothies & Juice
  {
    name: 'Jamba',
    description: 'Smoothies, fresh juices, and healthy snacks.',
    address: '1800 Smoothie Street',
    city: 'Emeryville',
    state: 'CA',
    zipCode: '94608',
    cuisineTypes: ['Smoothies', 'Juice', 'Healthy'],
    priceRange: 2,
    rating: 4.3,
    reviewCount: 8200,
    imageUrl: 'https://logo.clearbit.com/jamba.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 2,
    loyaltyApiProvider: 'focus',
    latitude: 37.8313,
    longitude: -122.2852,
  },
  {
    name: 'Smoothie King',
    description: 'Purpose-driven smoothies for fitness and nutrition.',
    address: '1900 Fitness Way',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75203',
    cuisineTypes: ['Smoothies', 'Healthy'],
    priceRange: 2,
    rating: 4.4,
    reviewCount: 6800,
    imageUrl: 'https://logo.clearbit.com/smoothieking.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 1,
    loyaltyApiProvider: 'smoothieking',
    latitude: 32.7830,
    longitude: -96.7910,
  },
  // Wings
  {
    name: 'Buffalo Wild Wings',
    description: 'Wings, beer, and sports with 26 signature sauces.',
    address: '2000 Wing Way',
    city: 'Minneapolis',
    state: 'MN',
    zipCode: '55401',
    cuisineTypes: ['Wings', 'Sports Bar', 'American'],
    priceRange: 2,
    rating: 4.0,
    reviewCount: 15500,
    imageUrl: 'https://logo.clearbit.com/buffalowildwings.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
    loyaltyApiProvider: 'inspire',
    latitude: 44.9778,
    longitude: -93.2650,
  },
  {
    name: 'Wingstop',
    description: 'Chicken wings with over 10 bold flavors.',
    address: '2100 Flavor Avenue',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75204',
    cuisineTypes: ['Wings', 'Chicken'],
    priceRange: 2,
    rating: 4.2,
    reviewCount: 12000,
    imageUrl: 'https://logo.clearbit.com/wingstop.com',
    loyaltyProgramEnabled: true,
    pointsPerDollar: 1,
    loyaltyApiProvider: 'wingstop',
    latitude: 32.7900,
    longitude: -96.7920,
  },
];

// Mock users with diverse profiles
const users = [
  { name: 'Emma Rodriguez', email: 'emma.r@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Michael Chen', email: 'michael.c@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=13' },
  { name: 'Sarah Johnson', email: 'sarah.j@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=5' },
  { name: 'David Martinez', email: 'david.m@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Jessica Lee', email: 'jessica.l@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=9' },
  { name: 'Ryan Thompson', email: 'ryan.t@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=14' },
  { name: 'Olivia Kim', email: 'olivia.k@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=10' },
  { name: 'Brandon Williams', email: 'brandon.w@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Sophia Patel', email: 'sophia.p@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Alex Turner', email: 'alex.t@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=17' },
  { name: 'Mia Garcia', email: 'mia.g@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=24' },
  { name: 'Noah Davis', email: 'noah.d@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=68' },
  { name: 'Ava Anderson', email: 'ava.a@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Ethan Wilson', email: 'ethan.w@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=51' },
  { name: 'Isabella Moore', email: 'isabella.m@foodie.app', profilePhoto: 'https://i.pravatar.cc/150?img=29' },
];

// Helper to create password hash (simple for seeding - in production use proper bcrypt)
const bcrypt = require('bcrypt');
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Diverse social posts content
const postsContent = [
  { content: 'This crispy fried chicken is absolutely perfect! 🍗 The seasoning is on point!', dishTags: ['friedchicken', 'comfort', 'crispy'], rating: 5 },
  { content: 'Best pizza I\'ve had in months! The crust is perfectly chewy and the sauce is 👌', dishTags: ['pizza', 'italian', 'cheesy'], rating: 5 },
  { content: 'Sushi date night! Fresh salmon and tuna rolls 🍣 Always a great choice!', dishTags: ['sushi', 'seafood', 'fresh', 'datenight'], rating: 5 },
  { content: 'Taco Tuesday never disappoints! These street tacos are loaded with flavor 🌮', dishTags: ['tacos', 'mexican', 'streetfood'], rating: 4 },
  { content: 'Decadent chocolate lava cake for dessert 🍫 Molten center is perfection!', dishTags: ['dessert', 'chocolate', 'decadent'], rating: 5 },
  { content: 'Morning fuel ☕ This cold brew with oat milk is the perfect way to start the day!', dishTags: ['coffee', 'breakfast', 'coldbrew'], rating: 4 },
  { content: 'Fresh and healthy! This Buddha bowl is packed with nutrients and flavor 🥗', dishTags: ['healthy', 'bowl', 'vegan', 'fresh'], rating: 5 },
  { content: 'Pasta perfection! The carbonara sauce is so creamy and rich 🍝', dishTags: ['pasta', 'italian', 'carbonara'], rating: 4 },
  { content: 'BBQ heaven! These ribs are fall-off-the-bone tender with amazing sauce 🍖', dishTags: ['bbq', 'ribs', 'smoky'], rating: 5 },
  { content: 'Authentic pad thai with the perfect balance of sweet and savory 🍜', dishTags: ['thai', 'noodles', 'padthai'], rating: 4 },
  { content: 'Butter chicken and garlic naan - can\'t get enough of this combo! 🍛', dishTags: ['indian', 'curry', 'naan'], rating: 5 },
  { content: 'Loaded breakfast burrito to fuel the day! Scrambled eggs, bacon, cheese 🌯', dishTags: ['breakfast', 'burrito', 'hearty'], rating: 4 },
  { content: 'Fresh poke bowl with ahi tuna and all the fixings! So refreshing 🥙', dishTags: ['poke', 'hawaiian', 'healthy', 'seafood'], rating: 5 },
  { content: 'Classic cheeseburger and fries combo - sometimes simple is best! 🍔', dishTags: ['burger', 'fries', 'classic', 'comfort'], rating: 4 },
  { content: 'Matcha latte art on point! Love this cozy coffee shop vibes ☕', dishTags: ['matcha', 'coffee', 'latte'], rating: 4 },
  { content: 'Spicy chicken wings with blue cheese dip - game day perfect! 🍗', dishTags: ['wings', 'spicy', 'appetizer'], rating: 5 },
  { content: 'Açai bowl loaded with fresh berries and granola 🍓 Perfect post-workout!', dishTags: ['acai', 'healthy', 'breakfast', 'berries'], rating: 5 },
  { content: 'Hand-rolled sushi made right in front of us! Chef\'s special was incredible 🍱', dishTags: ['sushi', 'omakase', 'japanese'], rating: 5 },
];

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data (for clean re-seed)
  console.log('Clearing existing data...');
  await prisma.like.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.socialPost.deleteMany({});
  await prisma.follow.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.restaurant.deleteMany({});

  // Seed restaurants
  console.log('\nSeeding restaurants...');
  const createdRestaurants = [];
  for (const restaurant of restaurants) {
    const created = await prisma.restaurant.create({
      data: restaurant,
    });
    createdRestaurants.push(created);
    console.log(`  ✓ Created: ${restaurant.name}`);
  }

  // Seed users
  console.log('\nSeeding users...');
  const createdUsers = [];
  const defaultPassword = await hashPassword('password123');
  for (const user of users) {
    const created = await prisma.user.create({
      data: {
        ...user,
        passwordHash: defaultPassword,
        isVerified: true,
      },
    });
    createdUsers.push(created);
    console.log(`  ✓ Created: ${user.name}`);
  }

  // Create some follow relationships
  console.log('\nCreating follow relationships...');
  for (let i = 0; i < 20; i++) {
    const follower = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const following = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    if (follower.id !== following.id) {
      try {
        await prisma.follow.create({
          data: {
            followerId: follower.id,
            followingId: following.id,
          },
        });
      } catch (e) {
        // Skip duplicates
      }
    }
  }

  // Seed social posts
  console.log('\nSeeding social posts...');
  const imageSeeds = [44, 48, 52, 56, 60, 64, 70, 77, 83, 89, 95, 101, 107, 113, 119, 125, 131, 137];
  for (let i = 0; i < postsContent.length; i++) {
    const postData = postsContent[i];
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    const randomRestaurant = createdRestaurants[Math.floor(Math.random() * Math.min(15, createdRestaurants.length))];

    // Some posts have multiple images, some have one
    const imageCount = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 2 : 1;
    const mediaUrls = [];
    for (let j = 0; j < imageCount; j++) {
      mediaUrls.push(`https://picsum.photos/800/800?random=${imageSeeds[i] + j}`);
    }

    // Vary timestamps from now to 7 days ago
    const daysAgo = Math.floor(Math.random() * 7);
    const hoursAgo = Math.floor(Math.random() * 24);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    createdAt.setHours(createdAt.getHours() - hoursAgo);

    const post = await prisma.socialPost.create({
      data: {
        userId: randomUser.id,
        restaurantId: randomRestaurant.id,
        content: postData.content,
        mediaUrls,
        rating: postData.rating,
        dishTags: postData.dishTags,
        privacy: 'PUBLIC',
        viewCount: Math.floor(Math.random() * 450) + 50, // 50-500
        createdAt,
      },
    });

    // Add random likes (10-200 likes per post)
    const likeCount = Math.floor(Math.random() * 190) + 10;
    for (let j = 0; j < Math.min(likeCount, createdUsers.length); j++) {
      const randomLiker = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      try {
        await prisma.like.create({
          data: {
            postId: post.id,
            userId: randomLiker.id,
          },
        });
      } catch (e) {
        // Skip duplicates
      }
    }

    // Add random comments (0-30 per post)
    const commentCount = Math.floor(Math.random() * 31);
    const commentTexts = [
      'Looks amazing! 😍',
      'I need to try this!',
      'My favorite spot!',
      'This looks so good!',
      'Adding this to my list 📝',
      'When can we go together?',
      'Best in the city!',
      'Yum! 🤤',
      'I was just there last week!',
      'The presentation is beautiful!',
    ];
    for (let j = 0; j < commentCount; j++) {
      const randomCommenter = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomComment = commentTexts[Math.floor(Math.random() * commentTexts.length)];
      await prisma.comment.create({
        data: {
          postId: post.id,
          userId: randomCommenter.id,
          content: randomComment,
        },
      });
    }

    console.log(`  ✓ Created post by ${randomUser.name} at ${randomRestaurant.name}`);
  }

  console.log(`\n✅ Successfully seeded database!`);
  console.log(`   📍 ${createdRestaurants.length} restaurants`);
  console.log(`   👥 ${createdUsers.length} users`);
  console.log(`   📸 ${postsContent.length} social posts`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
