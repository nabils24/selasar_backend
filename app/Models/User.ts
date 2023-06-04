import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public role: string

  @column()
  public status_user: string

  @column()
  public avatar?: string

  @column()
  public phone?: string

  @column()
  public address?: string

  @column()
  public city?: string

  @column()
  public province?: string

  @column()
  public postalCode?: string

  @column()
  public country?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
