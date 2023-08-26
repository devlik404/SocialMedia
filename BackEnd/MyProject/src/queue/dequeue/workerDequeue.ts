import * as amqp from "amqplib";
import { Threads } from "../../entities/Threads";
import { AppDataSource } from "../../data-source";
const cloudinary = require("cloudinary").v2;
import "dotenv/config";

async function processQueue() {
  const queueName = "thread-queue";
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  try {
    const connection = await amqp.connect("amqp://localhost");

    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    await channel.consume(queueName, async (message) => {
      if (message !== null) {
        try {
          const payload = JSON.parse(message.content.toString());
          console.log("data payload:", payload);
          // Upload file ke Cloudinary

          const cloudinaryResponse = await cloudinary.uploader.upload(
            "./uploads/" + payload.picture
          );
          console.log("data cloudinary:", cloudinaryResponse);

          AppDataSource.initialize()
            .then(async () => {
              const dataCloud = AppDataSource.getRepository(Threads).create({
                articel: payload.articel,
                picture: cloudinaryResponse.secure_url,
                users: payload.users,
              });
              const createThreads = await AppDataSource.getRepository(
                Threads
              ).save(dataCloud);
              console.info(
                "File berhasil diunggah ke Cloudinary:",
                createThreads
              );
            })
            .catch((error) => console.log(error));

          channel.ack(message);
        } catch (error) {
          console.error("Terjadi kesalahan:", error);
          // Jangan ack pesan agar dapat diulangi nanti jika ada kesalahan
        }
      }
    });
  } catch (error) {
    console.log("Error processing queue", error);
  }
}

processQueue();
