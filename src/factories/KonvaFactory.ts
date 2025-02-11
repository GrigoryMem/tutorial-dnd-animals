import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { AnimalWithImage, AnimalWithImages, AnimalsWithImages } from '../types/data'; 
import { Image } from 'konva/lib/shapes/Image';
import { randomInterval } from '../helpers/randominterval';
import CanvasSizeService from '../services/canvasSizeService';

export default class KonvaFactory {
  constructor( 
    private readonly sizeService: CanvasSizeService) {
  }
  createStage():Stage {
    return new Konva.Stage({
      container: 'app',
      width: this.sizeService.getWidth(),
      height: this.sizeService.getHeight(),
    });
  } 

  createLayer(): Layer{
    return new Konva.Layer();
  }

  createImage(animal:AnimalWithImages):Image {
    const width: number = animal.width * this.sizeService.getScale();
    const height: number = animal.height * this.sizeService.getScale();

    return new Konva.Image({
      image: animal.images.origin,
      x: randomInterval(0,this.sizeService.getWidth() - animal.width),
      y: randomInterval(0, this.sizeService.getHeight() - animal.height),
      draggable: true,
      width,
      height,
    });
  }

 

  createDropImage(animal:AnimalWithImages):Image {
    const width: number = animal.width * this.sizeService.getScale();
    const height: number = animal.height * this.sizeService.getScale();

    return new Konva.Image({
      image: animal.images.drop,
      x: animal.drop.x * this.sizeService.getScale(),
      y: animal.drop.y * this.sizeService.getScale(),
      draggable: true,
      width,
      height,
    });
  }

  createBackgroundImage(backgroundImage:HTMLImageElement):Image {
    return new Konva.Image({
      image: backgroundImage,
      width: this.sizeService.getWidth(),
      height:this.sizeService.getHeight(),
    });
  }
}