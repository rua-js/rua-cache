import RuaCache from '../RuaCache'

// import { Any } from 'rua-core/lib/Types'

interface RuaCacheInterface {
  get(key: string, defaultValue: any): any
  set(key: string, value: string, time: number): boolean
  remove(key: string): boolean
  clear(): boolean
  length(): number
  keys(): string[]
  all(): any
  restore(): Promise<void>
}

export default RuaCacheInterface
