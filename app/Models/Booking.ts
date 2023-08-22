import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public kode_booking: string

  @column()
  public token: string

  @column()
  public user_id: number

  @column.dateTime()
  public check_in: DateTime

  @column.dateTime()
  public check_out: DateTime

  @column()
  public durasi_menginap: number

  @column()
  public total_harga: number

  @column()
  public status_booking: string

  @column()
  public status_pembayaran: string

  @column()
  public status_check_in: string

  @column()
  public status_check_out: string

  @column()
  public res_midtrans: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
