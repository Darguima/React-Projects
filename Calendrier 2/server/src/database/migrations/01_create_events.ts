import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('events', table => {
    table.increments('event_id').primary()

    table.string('name').notNullable()
    table.integer('month').notNullable()
    table.integer('day').notNullable()
    table.integer('year').notNullable()
    table.integer('hour').notNullable()
    table.text('description').notNullable()
    table.boolean('completed').notNullable()
    table.boolean('auto-completed').notNullable()

    table.integer('user_id')
      .notNullable()
      .references('user_id').inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('events')
}
