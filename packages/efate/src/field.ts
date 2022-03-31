export default class Field<T> {
  public name: string;
  public value: any;

  constructor(name: string, value: T) {
    this.name = name;
    this.value = value;
  }
}
