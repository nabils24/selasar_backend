import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pakets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('nama_paket').notNullable()
      table.string('deskripsi').notNullable()
      table.integer('harga').notNullable()
      table.string('fasilitas').notNullable()
      table.string('jenis_paket').notNullable()
      table.string('jenis').notNullable()
      table.string('kapasitas').notNullable()
      table.string('gambar').notNullable()
      table.enum('status_paket', ['active', 'inactive']).notNullable()
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
