import { readFileSync } from "fs"
import path from "path"

export function getDataset() {
   const data = readFileSync(path.resolve("src/libs/datasets/katadasar.filter.txt"), "utf-8")
   return data.split(/\r?\n/)
}

export function getRandomWord() {
   const dataset = getDataset()
   return dataset[Math.floor(Math.random() * dataset.length)]
}
