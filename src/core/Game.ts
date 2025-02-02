import Konva from 'konva';
import { dataBackground, dataAnimals } from '../sources';


export default class Game {
  constructor(images) {
    // Создается сцена (stage) с заданными размерами.
    var stage:Stage = new Konva.Stage({
      container: 'app',
      width: dataBackground.width,
      height: dataBackground.height,
    });
    // Создаются два слоя: background для
    //  фона и animalLayer для животных и их контуров.
    var background = new Konva.Layer();
    var animalLayer = new Konva.Layer();
    var animalShapes = [];
    var score = 3;

    // image positions
    // Определяются позиции животных 
    // (animals) и их контуров (outlines).
    var animals = {
      snake: {
        x: 10,  
        y: 70,
      },
      giraffe: {
        x: 90,
        y: 70,
      },
      monkey: {
        x: 275,
        y: 70,
      },
      lion: {
        x:400,
        y: 70,
      },
    };

    var outlines = {
      snake_black: {
        x: 275,
        y: 350,
      },
      giraffe_black: {
        x: 390,
        y: 250,
      },
      monkey_black: {
        x: 300,
        y: 420,
      },
      lion_black: {
        x:  dataAnimals.ant.drop.x,
        y: dataAnimals.ant.drop.y,
      },
    };

    // create draggable animals
    for (var key in animals) {
      // anonymous function to induce scope
      (function (that) {
        var privKey = key;
        var anim = animals[key];

        var animal = new Konva.Image({
          image: images[key],
          x: anim.x,
          y: anim.y,
          draggable: true,
          width: dataAnimals.ant.width,
          height: dataAnimals.ant.height,
        });

        animal.on('dragstart', function () {
          this.moveToTop();
        });
        /*
         * check if animal is in the right spot and
         * snap into place if it is
         */
        animal.on('dragend', function () {
          var outline = outlines[privKey + '_black'];
          if (!animal.inRightPlace && that.isNearOutline(animal, outline)) {
            animal.position({
              x: outline.x,
              y: outline.y,
            });
            animal.inRightPlace = true;

            if (++score >= 4) {
              var text = 'You win! Enjoy your booty!';
              that.drawBackground(background, images.beach, text);
            }

            // disable drag and drop
            setTimeout(function () {
              animal.draggable(false);
            }, 50);
          }
        });
        // make animal glow on mouseover
        animal.on('mouseover', function () {
          animal.image(images[privKey + '_glow']);
          document.body.style.cursor = 'pointer';
        });
        // return animal on mouseout
        animal.on('mouseout', function () {
          animal.image(images[privKey]);
          document.body.style.cursor = 'default';
        });

        animal.on('dragmove', function () {
          document.body.style.cursor = 'pointer';
        });

        animalLayer.add(animal);
        animalShapes.push(animal);
      })(this);
    }

    // create animal outlines
    for (var key in outlines) {
      // anonymous function to induce scope
      (function () {
        var imageObj = images[key];
        var out = outlines[key];

        var outline = new Konva.Image({
          image: imageObj,

          x: out.x,
          y: out.y,
          width: dataAnimals.ant.width,
          height: dataAnimals.ant.height,
        }); 

        animalLayer.add(outline);
      })();
    }

    stage.add(background);
    stage.add(animalLayer);

  this.drawBackground(
      background,
      images.beach,
      'Ahoy! Put the animals on the beach!'
    );
  }

   isNearOutline(animal, outline) {
    var a = animal;
    var o = outline;
    var ax = a.x();
    var ay = a.y();

    if (ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
      return true;
    } else {
      return false;
    }
  }
   drawBackground(background, beachImg, text) {
    var context = background.getContext();
    context.drawImage(beachImg, 0, 0);
    context.setAttr('font', '20pt Calibri');
    context.setAttr('textAlign', 'center');
    context.setAttr('fillStyle', 'white');
    context.fillText(text, background.getStage().width() / 2, 40);
  }
}