import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('events', table => {
    table.increments('eventId').primary()

    table.string('name').notNullable()
    table.integer('month').notNullable()
    table.integer('day').notNullable()
    table.integer('year').notNullable()
    table.integer('hour').notNullable()
    table.text('description').notNullable()
    table.boolean('completed').notNullable()
    table.boolean('autoComplete').notNullable()

    table.integer('userId')
      .notNullable()
      .references('userId').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('events')
}
