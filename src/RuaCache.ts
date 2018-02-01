import { storage } from 'rua-storage/lib'
import RuaStorage from 'rua-storage/lib/RuaStorage'

import { RuaCacheInterface } from './Interface'
import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'
import AnyData from 'rua-core/lib/Types/AnyData'
import AnyObject from 'rua-core/lib/Types/AnyObject'

class RuaCache extends AbstractRuaPackage implements RuaCacheInterface {

  protected prefix: string = 'RuaCache-'

  protected storage: RuaStorage = storage

  protected count: number

  protected list: string[] = []

  public get(key: string, defaultValue: any): any {
    // defaultValue will be returned if no data with the specific key
    if (!this.list.includes(key)) {
      return defaultValue
    }

    // retrieve data from cache
    return this.store[key]
  }

  public set(key: string, value: string, time: number): void {
  }

  public remove(key: string): void {
    delete this.store[key]

  }

  public clear(): void {
    this.count = 0
    this.list = []
    // data removal
    this.storage.remove(this.list)
    // list removal
    this.storage.remove(this.getListKey())
  }

  public length(): number {
    return this.count
  }

  public keys(): string[] {
    return this.list
  }

  public all(): any {
    return this.store
  }

  public async restore(): Promise<void> {
    // Get list key
    const listKey: string = <string>this.getListKey()
    // Get list data
    const list: string = <string>await storage.get(listKey)
    // Parse list data
    this.list = <string[]>JSON.parse(list)
    // Load all saved cache data to store
    this.store = <AnyObject>await storage.get(this.list)
  }

  protected getListKey(): string {
    return `${this.prefix}list`
  }
}

export default RuaCache
