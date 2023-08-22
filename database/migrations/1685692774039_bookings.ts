import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('kode_booking').notNullable()
      table.string('token').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.dateTime('check_in', { useTz: true }).notNullable()
      table.dateTime('check_out', { useTz: true }).notNullable()
      table.integer('durasi_menginap').unsigned().notNullable()
      table.integer('total_harga').unsigned().notNullable()
      table.enum('status_booking', ['active', 'inactive']).notNullable()
      table
        .enum('status_pembayaran', [
          'active',
          'inactive',
          'pending',
          'settlement',
          'cancel',
          'process',
          'deny',
          'refund',
          'capture',
          'expire',
          'authorize',
          'failure',
        ])
        .notNullable()
      table.enum('status_check_in', ['active', 'inactive']).notNullable()
      table.enum('status_check_out', ['active', 'inactive']).notNullable()
      table.text('res_midtrans').nullable()
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
