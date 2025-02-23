import {AnimalImageElements} from './image'

export type SoundsData = {
  [trackName:string]:string
}

export type ImageData = {
  src:string,
  width:number,
  height:number
}


// типизация тени животного
type DropData = {
  src:string,
  x:number,
  y:number
}

// типизация одного животного
type AnimalData = ImageData & {
  x:number,
  y:number,
  glow:string,
  drop:DropData
}

// типизация набора животных
export type AnimalsData = {
  [key: string]: Readonly<AnimalData>
}


export type AnimalWithImages = AnimalData & AnimalImageElements 

export type AnimalsWithImages = {
  [key:string]: AnimalWithImages

}