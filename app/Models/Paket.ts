import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Paket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama_paket: string

  @column()
  public deskripsi: string

  @column()
  public harga: number

  @column()
  public fasilitas: string

  @column()
  public jenis_paket: string

  @column()
  public jenis: string

  @column()
  public kapasitas: string

  @column()
  public gambar: string

  @column()
  public status_paket: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
