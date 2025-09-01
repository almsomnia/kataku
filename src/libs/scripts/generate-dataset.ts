import { readFileSync, writeFileSync } from "fs"
import path from "path"

const data = readFileSync(path.resolve(__dirname, "../datasets/katadasar.original.txt"), "utf-8")
const words = data.split(/\r?\n/)
const filtered = words.filter((word) => word.length === 5)
writeFileSync(path.resolve(__dirname, "../datasets/katadasar.filter.txt"), filtered.join("\n"), "utf-8")

console.log(`Berhasil membuat dataset dengan ${filtered.length} kata.`)
