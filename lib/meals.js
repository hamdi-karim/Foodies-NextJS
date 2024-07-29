import { S3 } from "@aws-sdk/client-s3";
// code that reaches out to the DB and gets data from it
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: "eu-west-3",
});
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

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "karim-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

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
