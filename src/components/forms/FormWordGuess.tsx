"use client"

import { useEffect, useState } from "react"
import WordTile from "../WordTile"

type Prop = {
   word: string
}

export default function ({ word }: Prop) {
   const [currentRow, setCurrentRow] = useState(1)
   const [currentTileInRow, setCurrentTileInRow] = useState(1)

   const [currentGuess, setCurrentGuess] = useState("")
   const [guesses, setGuesses] = useState<{ row: number; value: string }[]>(
      () => [],
   )

   useEffect(() => {
      function keydownListenerHandler(this: Document, event: KeyboardEvent) {
         const regex = /^[a-zA-Z]$/

         if (event.metaKey || event.ctrlKey || event.altKey) {
            return
         }

         if (event.key.length > 1) {
            if (event.key == "Backspace") {
               const tile = document.querySelector(
                  `#tile${currentRow}${currentTileInRow - 1}-item`,
               )
               if (!tile) return
               tile.innerHTML = ""
               setCurrentGuess(
                  (currentGuess) =>
                     (currentGuess.length > 0 &&
                        currentGuess.split("").toSpliced(currentGuess.length-1, 1).join("")) ||
                     "",
               )
               if (currentTileInRow > 1) {
                  setCurrentTileInRow((tile) => tile - 1)
               }
            }
            return
         }

         event.preventDefault()

         if (!regex.test(event.key)) {
            return
         }

         if (currentTileInRow <= 5) {
            const tile = document.querySelector(
               `#tile${currentRow}${currentTileInRow}-item`,
            )
            if (!tile) return
            tile.innerHTML = event.key
            setCurrentGuess((currentGuess) => `${currentGuess}${event.key}`)
            setCurrentTileInRow((tile) => tile + 1)
         }
      }

      document.addEventListener("keydown", keydownListenerHandler)
      return () =>
         document.removeEventListener("keydown", keydownListenerHandler)
   })

   return (
      <div className="flex grow items-center justify-center overflow-hidden">
         <div className="box-border grid h-[480px] w-[360px] grid-rows-6 p-2">
            {renderRows(6)}
         </div>
         {/* <div className="flex flex-col">
            <span>current row: {currentRow}</span>
            <span>current tile in row: {currentTileInRow}</span>
            <span>current guess: {currentGuess}</span>
         </div> */}
      </div>
   )
}

function renderRows(n: number) {
   const lengthArr = [...Array(n)]
   const wordLengthArr = [...Array(5)]

   return (
      <>
         {lengthArr.map((n, i) => (
            <div
               className="grid grid-cols-5 gap-1"
               key={i}
               id={`row${i + 1}`}
            >
               {wordLengthArr.map((wordTile, j) => (
                  <WordTile
                     key={j}
                     id={`tile${i + 1}${j + 1}`}
                  />
               ))}
            </div>
         ))}
      </>
   )
}

function evaluteGuess(guess: string, word: string) {
   if (guess.length !== 5) return "INVALID"
   let result: ("x" | "v" | "-")[] = Array(guess.length).fill("x")
   let used: boolean[] = Array(word.length).fill(false)
   for (let i = 0; i < guess.length; i++) {
      if (word[i] == guess[i]) {
         result[i] = "v"
      }
   }

   for (let i = 0; i < guess.length; i++) {
      if (result[i] !== "v") {
         for (let j = 0; j < word.length; j++) {
            if (!used[j] && guess[i] == word[j]) {
               result[i] = "-"
               used[j] = true
               break
            }
         }
      }
   }

   console.log("🚀 ~ :60 ~ evaluteGuess ~ result:", result)
   return result.join("")
}
