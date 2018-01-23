export default interface RuaCacheInterface {
  set(key: string, value: string, time: number): boolean
  get(key: string, defaultValue: string | Function): any
  remove(key: string): any
  removeAll(): any
  restore(): Promise
}