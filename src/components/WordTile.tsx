type Prop = {
   content?: string
   id: string
}
export default function ({ content, id }: Prop) {
   return (
      <div
         className=""
         id={id}
      >
         <div id={`${id}-item`} className="box-border inline-flex w-full items-center justify-center border border-gray-600 align-middle leading-4 font-bold text-3xl uppercase select-none before:inline-block before:pb-[100%] before:content-['']">
            {content}
         </div>
      </div>
   )
}
