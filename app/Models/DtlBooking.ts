import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DtlBooking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public kode_booking: string

  @column()
  public booking_id: number

  @column()
  public paket_id: number

  @column()
  public jumlah_kamar: number

  @column()
  public harga: number

  @column()
  public total_harga: number

  @column()
  public status_dtl_booking: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
