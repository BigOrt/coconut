// find ".mkv .mp4"
export const findMedia = (string) => {
    if (string.endsWith('.mkv') || string.endsWith('.mp4')) {
      return string;
    }
  }
  
  //find path name
  export const PathName = (array, index) => {
    if(array.length > 0){
      const out = array[index].filename.find(file => findMedia(file));
      return out;
    }
    
    
  }
  
  //find path
  export const Path = (array, index) => {
  if(array.length > 0){
      const out = array[index].path.find(file => findMedia(file));
      return out;
    }
  }