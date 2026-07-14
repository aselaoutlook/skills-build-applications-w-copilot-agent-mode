import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Seed the octofit_db database with test data
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const users = await User.insertMany([
      { name: 'Alex Chen', email: 'alex@example.com', age: 29, fitnessGoal: 'Build endurance' },
      { name: 'Maya Patel', email: 'maya@example.com', age: 31, fitnessGoal: 'Improve strength' },
      { name: 'Jordan Brooks', email: 'jordan@example.com', age: 27, fitnessGoal: 'Lose weight' }
    ]);

    await Team.insertMany([
      { name: 'Momentum Squad', sport: 'Running', members: ['Alex Chen', 'Maya Patel'], city: 'Seattle' },
      { name: 'Peak Performers', sport: 'Cycling', members: ['Jordan Brooks'], city: 'Denver' }
    ]);

    await Activity.insertMany([
      { name: 'Morning Run', type: 'cardio', duration: 30, calories: 280 },
      { name: 'Strength Session', type: 'strength', duration: 45, calories: 320 },
      { name: 'Cycling Interval', type: 'cardio', duration: 40, calories: 310 }
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), username: 'Alex Chen', score: 980, rank: 1 },
      { userId: users[1]._id.toString(), username: 'Maya Patel', score: 945, rank: 2 },
      { userId: users[2]._id.toString(), username: 'Jordan Brooks', score: 900, rank: 3 }
    ]);

    await Workout.insertMany([
      { name: 'HIIT Circuit', type: 'interval', duration: 45, difficulty: 'intermediate', coach: 'Nina' },
      { name: 'Core Builder', type: 'mobility', duration: 25, difficulty: 'beginner', coach: 'Leo' }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
