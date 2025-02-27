#!/usr/bin/env node
require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function main() {
  console.log('Seeding database...');

  try {
    await client.connect();

    // Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS category (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category_id INT NOT NULL,
        image_url TEXT,
        FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
      );
    `);

    // Insert categories and retrieve their IDs
    const categoryInsertQuery = `
      INSERT INTO category (name, description) 
      VALUES 
        ('Games', 'Immerse yourself in the world of entertainment with video games, board games, puzzles, and gaming accessories. Stay entertained and challenged.'),
        ('Beauty', 'Care for yourself with a selection of health products, skincare solutions, cosmetics, and grooming essentials for both men and women.'),
        ('Home And Garden', 'Enhance your living space with essential home appliances, furniture, decor items, and gardening tools. Create a cozy and functional environment.')
      RETURNING id, name;
    `;

    const categoryResult = await client.query(categoryInsertQuery);
    const categories = categoryResult.rows.reduce((acc, row) => {
      acc[row.name] = row.id;
      return acc;
    }, {});

    console.log('Inserted categories:', categories);

    // Insert items with correct category_id
    const itemInsertQuery = `
      INSERT INTO items (name, description, category_id, image_url) 
      VALUES 
        ('PlayStation 5', 'Next-gen gaming console with stunning graphics and fast load times.', $1, 'https://example.com/images/ps5.jpg'),
        ('Chess Set', 'Classic wooden chess set for strategic gameplay.', $1, 'https://example.com/images/chess.jpg'),

        ('Facial Cleanser', 'Deep cleansing face wash for all skin types.', $2, 'https://example.com/images/cleanser.jpg'),
        ('Perfume Set', 'Luxury fragrance set for men and women.', $2, 'https://example.com/images/perfume.jpg'),

        ('Air Purifier', 'Removes pollutants and improves indoor air quality.', $3, 'https://example.com/images/airpurifier.jpg'),
        ('Garden Hose', 'Durable and flexible water hose for gardening.', $3, 'https://example.com/images/gardenhose.jpg')
    `;

    await client.query(itemInsertQuery, [
      categories.Games,
      categories.Beauty,
      categories['Home And Garden'],
    ]);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

main();
