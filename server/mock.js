require('dotenv').config();
const faker = require('faker');
const mongoose = require('mongoose');
const {Label, Note} = require('./models');

const randomElement = faker.random.arrayElement;
const labelName = faker.commerce.productMaterial;
const noteTitle = faker.commerce.productName;
const noteContent = faker.lorem.paragraphs;
const getElements = (array, quantity = 3, unique = true) => {
  const element = randomElement(array);
  if (quantity > 1) {
    const rest = !unique ? array : array.filter(el => el !== element);
    const additional = getElements(rest, quantity - 1, unique);
    return [element, ...additional];
  }
  return [element];
};

const mockData = async () => {
  console.log('Creating mock data');
  const labels = await Promise.all([...Array(10)].map(() => Label.create({name: labelName()})));
  console.log(`Labels created: ${labels.length}`);
  const labelIds = labels.map(label => label._id);
  const notes = await Promise.all(
    [...Array(20)].map(() =>
      Note.create({
        title: noteTitle(),
        content: noteContent(),
        labelIds: getElements(labelIds)
      })
    )
  );
  console.log(`Notes created: ${notes.length}`);
  process.exit(0);
};

mongoose
  .connect(
    process.env.MONGODB_URI,
    {useNewUrlParser: true}
  )
  .then(mockData);
