import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('userId').primary()

    table.string('name').notNullable()
    table.string('password').notNullable()
    table.integer('birthdayMonth').notNullable()
    table.integer('birthdayDay').notNullable()
    table.integer('birthdayYear').notNullable()
    table.string('email').notNullable().unique()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('users')
}
