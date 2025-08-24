
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LojasDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const lojas = await db.lojas.create(
            {
                id: data.id || undefined,

        nome: data.nome
        ||
        null
            ,

        endereco: data.endereco
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return lojas;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const lojasData = data.map((item, index) => ({
                id: item.id || undefined,

                nome: item.nome
            ||
            null
            ,

                endereco: item.endereco
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const lojas = await db.lojas.bulkCreate(lojasData, { transaction });

        return lojas;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const lojas = await db.lojas.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.nome !== undefined) updatePayload.nome = data.nome;

        if (data.endereco !== undefined) updatePayload.endereco = data.endereco;

        updatePayload.updatedById = currentUser.id;

        await lojas.update(updatePayload, {transaction});

        return lojas;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const lojas = await db.lojas.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of lojas) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of lojas) {
                await record.destroy({transaction});
            }
        });

        return lojas;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const lojas = await db.lojas.findByPk(id, options);

        await lojas.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await lojas.destroy({
            transaction
        });

        return lojas;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const lojas = await db.lojas.findOne(
            { where },
            { transaction },
        );

        if (!lojas) {
            return lojas;
        }

        const output = lojas.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.nome) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'lojas',
                            'nome',
                            filter.nome,
                        ),
                    };
                }

                if (filter.endereco) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'lojas',
                            'endereco',
                            filter.endereco,
                        ),
                    };
                }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.lojas.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'lojas',
                        'nome',
                        query,
                    ),
                ],
            };
        }

        const records = await db.lojas.findAll({
            attributes: [ 'id', 'nome' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['nome', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.nome,
        }));
    }

};

