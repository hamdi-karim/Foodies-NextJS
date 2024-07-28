// code that reaches out to the DB and gets data from it
import sql from "better-sqlite3";
import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // throw new Error("Loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  return db.prepare("SELECT * FROM meals where slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Error while saving Image");
    }
  });

  meal.image = `/images/${fileName}`; // save path of the img in DB

  db.prepare(
    `
    INSERT INTO meals 
      (slug, title, image, summary, instructions, creator, creator_email) 
    VALUES (
      @slug,
      @title,
      @image,
      @summary,
      @instructions,
      @creator,
      @creator_email
    )
  `
  ).run(meal);
}
