
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AnalisesDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const analises = await db.analises.create(
            {
                id: data.id || undefined,

        total_saidas: data.total_saidas
        ||
        null
            ,

        quantidade_lancamentos: data.quantidade_lancamentos
        ||
        null
            ,

        ticket_medio: data.ticket_medio
        ||
        null
            ,

        percentual_recorrentes: data.percentual_recorrentes
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return analises;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const analisesData = data.map((item, index) => ({
                id: item.id || undefined,

                total_saidas: item.total_saidas
            ||
            null
            ,

                quantidade_lancamentos: item.quantidade_lancamentos
            ||
            null
            ,

                ticket_medio: item.ticket_medio
            ||
            null
            ,

                percentual_recorrentes: item.percentual_recorrentes
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const analises = await db.analises.bulkCreate(analisesData, { transaction });

        return analises;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const analises = await db.analises.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.total_saidas !== undefined) updatePayload.total_saidas = data.total_saidas;

        if (data.quantidade_lancamentos !== undefined) updatePayload.quantidade_lancamentos = data.quantidade_lancamentos;

        if (data.ticket_medio !== undefined) updatePayload.ticket_medio = data.ticket_medio;

        if (data.percentual_recorrentes !== undefined) updatePayload.percentual_recorrentes = data.percentual_recorrentes;

        updatePayload.updatedById = currentUser.id;

        await analises.update(updatePayload, {transaction});

        return analises;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const analises = await db.analises.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of analises) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of analises) {
                await record.destroy({transaction});
            }
        });

        return analises;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const analises = await db.analises.findByPk(id, options);

        await analises.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await analises.destroy({
            transaction
        });

        return analises;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const analises = await db.analises.findOne(
            { where },
            { transaction },
        );

        if (!analises) {
            return analises;
        }

        const output = analises.get({plain: true});

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

            if (filter.total_saidasRange) {
                const [start, end] = filter.total_saidasRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    total_saidas: {
                    ...where.total_saidas,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    total_saidas: {
                    ...where.total_saidas,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.quantidade_lancamentosRange) {
                const [start, end] = filter.quantidade_lancamentosRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    quantidade_lancamentos: {
                    ...where.quantidade_lancamentos,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    quantidade_lancamentos: {
                    ...where.quantidade_lancamentos,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.ticket_medioRange) {
                const [start, end] = filter.ticket_medioRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    ticket_medio: {
                    ...where.ticket_medio,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    ticket_medio: {
                    ...where.ticket_medio,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.percentual_recorrentesRange) {
                const [start, end] = filter.percentual_recorrentesRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    percentual_recorrentes: {
                    ...where.percentual_recorrentes,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    percentual_recorrentes: {
                    ...where.percentual_recorrentes,
                            [Op.lte]: end,
                    },
                };
                }
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
            const { rows, count } = await db.analises.findAndCountAll(queryOptions);

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
                        'analises',
                        'total_saidas',
                        query,
                    ),
                ],
            };
        }

        const records = await db.analises.findAll({
            attributes: [ 'id', 'total_saidas' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['total_saidas', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.total_saidas,
        }));
    }

};

