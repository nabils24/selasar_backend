import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.enum('role', ['admin', 'kasir', 'user']).notNullable()
      table.enum('status_user', ['active', 'inactive']).notNullable()
      table.string('avatar').nullable()
      table.string('phone').nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('province').nullable()
      table.string('postal_code').nullable()
      table.string('country').nullable()
      table.datetime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
