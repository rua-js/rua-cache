import { storage } from 'rua-storage/lib'
import RuaStorage from 'rua-storage/lib/RuaStorage'

import { RuaCacheInterface } from './Interface'
import { AbstractRuaPackage } from 'rua-core/lib/Abstractions'

class RuaCache extends AbstractRuaPackage implements RuaCacheInterface {

  private prefix: string = 'RuaCache-'

  private storage: RuaStorage

  private count: number

  private list: string[] = []

  constructor() {
    super()
    this.storage = storage
  }

  public get(key: string, defaultValue: any): any {
    // defaultValue will be returned if no data with the specific key
    if (!this.list.includes(key)) {
      return defaultValue
    }

    // retrieve data from cache
    return this.store[key]
  }

  public set(key: string, value: string, time: number): boolean {
  }

  public remove(key: string): boolean

  public clear(): boolean {
    this.count = 0
    this.list = []

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
    const listKey: string = `${this.prefix}list`
    const list: string = <string>await storage.get(listKey)
    this.list = JSON.parse(list)
    this.store = await storage.get(this.list)
  }

}

export default RuaCache
