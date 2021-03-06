const xss = require('xss')
const Treeize = require('treeize')

const BabiesService = {
    getAllBabies(knex) {
        return knex.select('*').from('user_babies')
    },
    getByBabyId (knex, id) {
        return knex
            .from('user_babies')
            .select('*')
            .where('id', id)
            .first()
    },
    getById (knex, id) {
        return knex
            .from('user_babies')
            .select('*')
            .where('id', id)
            .first()
    },
    getByParentId (knex, parent_id) {
        return knex
            .select('*')
            .from('user_babies')
            .where('parent_id', parent_id)
    },
    insertBaby(db, newBaby) {
        return db
            .insert(newBaby)
            .into('user_babies')
            .returning('*')
            .then(([baby]) => baby)
    },
    updateBaby(knex, id, newBabyFields) {
        return knex('user_babies')
            .where({ id })
            .update(newBabyFields)
    },
    deleteBaby(knex, id) {
        return knex('user_babies')
        .where ({ id })
        .delete()
    },
    serializeBabies(babies) {
        return babies.map(this.serializeBaby)
    },
    serializeBaby(baby) {
        const babyTree = new Treeize()
        const babyData = babyTree.grow([baby]).getData()[0]

        return {
            id: babyData.id,
            baby_name: xss(babyData.baby_name),
            age: xss(babyData.age),
            age_format: xss(babyData.age_format),
            country: xss(babyData.country),
            about: xss(babyData.about),
            image_url: xss(babyData.image_url),
            total_score: Number(babyData.total_score),
            total_votes: Number(babyData.total_votes),
            parent_id: babyData.parent_id,
        }
    }
}

module.exports = BabiesService 