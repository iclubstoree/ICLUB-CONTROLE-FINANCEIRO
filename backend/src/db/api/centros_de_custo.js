
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Centros_de_custoDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const centros_de_custo = await db.centros_de_custo.create(
            {
                id: data.id || undefined,

        nome: data.nome
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return centros_de_custo;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const centros_de_custoData = data.map((item, index) => ({
                id: item.id || undefined,

                nome: item.nome
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const centros_de_custo = await db.centros_de_custo.bulkCreate(centros_de_custoData, { transaction });

        return centros_de_custo;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const centros_de_custo = await db.centros_de_custo.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.nome !== undefined) updatePayload.nome = data.nome;

        updatePayload.updatedById = currentUser.id;

        await centros_de_custo.update(updatePayload, {transaction});

        return centros_de_custo;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const centros_de_custo = await db.centros_de_custo.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of centros_de_custo) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of centros_de_custo) {
                await record.destroy({transaction});
            }
        });

        return centros_de_custo;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const centros_de_custo = await db.centros_de_custo.findByPk(id, options);

        await centros_de_custo.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await centros_de_custo.destroy({
            transaction
        });

        return centros_de_custo;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const centros_de_custo = await db.centros_de_custo.findOne(
            { where },
            { transaction },
        );

        if (!centros_de_custo) {
            return centros_de_custo;
        }

        const output = centros_de_custo.get({plain: true});

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
                            'centros_de_custo',
                            'nome',
                            filter.nome,
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
            const { rows, count } = await db.centros_de_custo.findAndCountAll(queryOptions);

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
                        'centros_de_custo',
                        'nome',
                        query,
                    ),
                ],
            };
        }

        const records = await db.centros_de_custo.findAll({
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

