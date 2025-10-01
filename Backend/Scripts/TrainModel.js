import fs from "fs";
import path from "path";
import csv from "csv-parser";
import natural from "natural";

const classifier = new natural.BayesClassifier();

const DATA_DIR = path.resolve("../Data");
const CSV_PATH = path.join(DATA_DIR, "EmotionDetection.csv");
const MODEL_PATH = path.join(DATA_DIR, "sentiment_model_bayes.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const TRAIN_LIMIT = 100000; // Trains only first 100000 rows
let totalCount = 0;

function saveModel() {
  return new Promise((resolve, reject) => {
    classifier.save(MODEL_PATH, (err) => {
      if (err) return reject(err);
      console.log(`---------Model saved after ${totalCount} rows----------`);
      resolve();
    });
  });
}

async function trainLimitedCSV(csvPath) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(csvPath).pipe(csv());

    stream.on("data", (row) => {
      if (totalCount >= TRAIN_LIMIT) {
        stream.destroy(); 
        return;
      }

      const text = row.text;
      const emotion = row.Emotion;

      if (text && emotion) {
        classifier.addDocument(text, emotion);
        totalCount++;
      }

      if (totalCount % 1000 === 0) {
        console.log(` Processed ${totalCount} rows`);
      }
    });

    stream.on("close", async () => {
      console.log(`\nFinished reading ${totalCount} rows. Training classifier...`);
      classifier.train(); 
      await saveModel();
      console.log("Final model saved successfully!");
      resolve();
    });

    stream.on("error", (err) => reject(err));
  });
}

(async () => {
  try {
    await trainLimitedCSV(CSV_PATH);
  } catch (err) {
    console.error("Training failed:", err);
  }
})();
