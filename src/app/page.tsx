import { getRandomWord } from "@/libs/utils/datasets"
import FormWordGuess from "@/components/forms/FormWordGuess"

export default function Home() {
   const word = getRandomWord()

   return (
      <>
         <div className="flex flex-col h-screen">
            <FormWordGuess word={word} />
         </div>
      </>
   )
}
