import chalk from "chalk";

/**
 * Class FunkoPop
 * @param _id: number
 * @param _name: string
 * @param _description: string
 * @param _type: string
 * @param _gender: string
 * @param _franchise: string
 * @param _sid: number
 * @param _exclusive: boolean
 * @param _qualities: string
 * @param _price: number
 */
export class FunkoPop {
  constructor(
    public _id: number,
    public _name: string,
    public _description: string,
    public _type: string,
    public _gender: string,
    public _franchise: string,
    public _sid: number,
    public _exclusive: boolean,
    public _qualities: string,
    public _price: number,
  ) {
    if (this._price < 0) {
      console.log(chalk.red("ERROR: The price cannot be negative"));
      return;
    }
  }
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get type() {
    return this._type;
  }

  get gender() {
    return this._gender;
  }

  get franchise() {
    return this._franchise;
  }

  get sid() {
    return this._sid;
  }

  get exclusive() {
    return this._exclusive;
  }

  get qualities() {
    return this._qualities;
  }

  get price() {
    return this._price;
  }

  set name(name: string) {
    this._name = name;
  }

  set description(description: string) {
    this._description = description;
  }

  set type(type: string) {
    this._type = type;
  }

  set gender(gender: string) {
    this._gender = gender;
  }

  set franchise(franchise: string) {
    this._franchise = franchise;
  }

  set sid(sid: number) {
    this._sid = sid;
  }

  set exclusive(exclusive: boolean) {
    this._exclusive = exclusive;
  }

  set qualities(qualities: string) {
    this._qualities = qualities;
  }

  set price(price: number) {
    this._price = price;
  }
}
