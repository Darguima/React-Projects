import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id').primary()
    table.string('name').notNullable()
    table.string('password').notNullable()
    table.integer('birthday_month').notNullable()
    table.integer('birthday_day').notNullable()
    table.integer('birthday_year').notNullable()
    table.string('email').notNullable().unique()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('users')
}
