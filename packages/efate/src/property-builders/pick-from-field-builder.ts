import Field from '../field';

const pickFromBuilder = (fieldName: string, options: any[]) =>
    (increment: number) =>{
      if(!options || options.length === 0){
        throw new Error('missing or empty options array')
      }
      console.log('*** pick from builder ***')
      console.log(options)
      return new Field(fieldName, options[Math.floor(Math.random() * options.length)]);
    }



export default pickFromBuilder;
