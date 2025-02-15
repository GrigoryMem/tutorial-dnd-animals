import './style.css';
import { dataAnimals, dataBackground } from './sources';
import ImageLoaderService from './services/imageLoaderService';
import GameBuilder from './core/GameBuilder';
import AudioService from './services/AudioService';

const gameBuilder:GameBuilder = new GameBuilder(
  new ImageLoaderService(),
  new AudioService('sound'), 
  dataAnimals);
  
const game = await  gameBuilder
  .loadBackground(dataBackground)
  .loadImageAnimals()
  .build()




  


  

    

    


      
   
