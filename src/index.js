const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/Person');

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

// Function to create and save a person
const createAndSavePerson = async () => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"]
  });

  try {
    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);
  } catch (err) {
    console.error('Error saving person:', err);
  }
};

// Function to create multiple people
const createManyPeople = async (arrayOfPeople) => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log('People created:', people);
  } catch (err) {
    console.error('Error creating people:', err);
  }
};

// Function to find people by name
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name: name });
    console.log('People found:', people);
  } catch (err) {
    console.error('Error finding people:', err);
  }
};

// Function to find one person by favorite food
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log('Person found:', person);
  } catch (err) {
    console.error('Error finding person:', err);
  }
};

// Function to find person by ID
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log('Person found:', person);
  } catch (err) {
    console.error('Error finding person:', err);
  }
};

// Function to update person's favorite foods
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push("hamburger");

    const updatedPerson = await person.save();
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error('Error updating person:', err);
  }
};

// Function to find and update person's age by name
const findAndUpdate = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error('Error updating person:', err);
  }
};

// Function to remove a person by ID
const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    console.log('Person removed:', removedPerson);
  } catch (err) {
    console.error('Error removing person:', err);
  }
};

// Function to remove multiple people by name
const removeManyPeople = async () => {
  try {
    const result = await Person.remove({ name: 'Mary' });
    console.log('People removed:', result);
  } catch (err) {
    console.error('Error removing people:', err);
  }
};

// Function to find people who like burritos, sort, limit, and select fields
const queryChain = async () => {
  try {
    const people = await Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    console.log('People found:', people);
  } catch (err) {
    console.error('Error querying people:', err);
  }
};

// Connect to the database and run some test functions
connectToDatabase().then(() => {
  createAndSavePerson();
  createManyPeople([
    { name: 'Jane Doe', age: 28, favoriteFoods: ['Pasta'] },
    { name: 'Mike Smith', age: 35, favoriteFoods: ['Steak', 'Salad'] },
    { name: 'Sara Lee', age: 22, favoriteFoods: ['Sushi'] }
  ]);
  findPeopleByName('John Doe');
  findOneByFood('Pizza');
  findPersonById('some-valid-mongodb-id');
  findEditThenSave('some-valid-mongodb-id');
  findAndUpdate('Jane Doe');
  removeById('some-valid-mongodb-id');
  removeManyPeople();
  queryChain();
});
