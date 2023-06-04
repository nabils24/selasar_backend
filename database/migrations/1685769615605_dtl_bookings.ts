import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dtl_bookings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('kode_booking').notNullable()
      table
        .integer('booking_id')
        .unsigned()
        .references('id')
        .inTable('bookings')
        .onDelete('CASCADE')
      table.integer('paket_id').unsigned().references('id').inTable('pakets').onDelete('CASCADE')
      table.integer('jumlah_kamar').unsigned().notNullable()
      table.integer('harga').unsigned().notNullable()
      table.integer('total_harga').unsigned().notNullable()
      table.enum('status_dtl_booking', ['active', 'inactive']).notNullable()

      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
