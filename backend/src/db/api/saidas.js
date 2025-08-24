
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SaidasDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const saidas = await db.saidas.create(
            {
                id: data.id || undefined,

        data: data.data
        ||
        null
            ,

        loja: data.loja
        ||
        null
            ,

        categoria: data.categoria
        ||
        null
            ,

        centro_de_custo: data.centro_de_custo
        ||
        null
            ,

        tipo: data.tipo
        ||
        null
            ,

        descricao: data.descricao
        ||
        null
            ,

        value: data.value
        ||
        null
            ,

        pago: data.pago
        ||
        null
            ,

        recorrencia: data.recorrencia
        ||
        null
            ,

        observacoes: data.observacoes
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return saidas;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const saidasData = data.map((item, index) => ({
                id: item.id || undefined,

                data: item.data
            ||
            null
            ,

                loja: item.loja
            ||
            null
            ,

                categoria: item.categoria
            ||
            null
            ,

                centro_de_custo: item.centro_de_custo
            ||
            null
            ,

                tipo: item.tipo
            ||
            null
            ,

                descricao: item.descricao
            ||
            null
            ,

                value: item.value
            ||
            null
            ,

                pago: item.pago
            ||
            null
            ,

                recorrencia: item.recorrencia
            ||
            null
            ,

                observacoes: item.observacoes
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const saidas = await db.saidas.bulkCreate(saidasData, { transaction });

        return saidas;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const saidas = await db.saidas.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.data !== undefined) updatePayload.data = data.data;

        if (data.loja !== undefined) updatePayload.loja = data.loja;

        if (data.categoria !== undefined) updatePayload.categoria = data.categoria;

        if (data.centro_de_custo !== undefined) updatePayload.centro_de_custo = data.centro_de_custo;

        if (data.tipo !== undefined) updatePayload.tipo = data.tipo;

        if (data.descricao !== undefined) updatePayload.descricao = data.descricao;

        if (data.value !== undefined) updatePayload.value = data.value;

        if (data.pago !== undefined) updatePayload.pago = data.pago;

        if (data.recorrencia !== undefined) updatePayload.recorrencia = data.recorrencia;

        if (data.observacoes !== undefined) updatePayload.observacoes = data.observacoes;

        updatePayload.updatedById = currentUser.id;

        await saidas.update(updatePayload, {transaction});

        return saidas;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const saidas = await db.saidas.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of saidas) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of saidas) {
                await record.destroy({transaction});
            }
        });

        return saidas;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const saidas = await db.saidas.findByPk(id, options);

        await saidas.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await saidas.destroy({
            transaction
        });

        return saidas;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const saidas = await db.saidas.findOne(
            { where },
            { transaction },
        );

        if (!saidas) {
            return saidas;
        }

        const output = saidas.get({plain: true});

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

                if (filter.loja) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'saidas',
                            'loja',
                            filter.loja,
                        ),
                    };
                }

                if (filter.categoria) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'saidas',
                            'categoria',
                            filter.categoria,
                        ),
                    };
                }

                if (filter.centro_de_custo) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'saidas',
                            'centro_de_custo',
                            filter.centro_de_custo,
                        ),
                    };
                }

                if (filter.tipo) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'saidas',
                            'tipo',
                            filter.tipo,
                        ),
                    };
                }

                if (filter.descricao) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'saidas',
                            'descricao',
                            filter.descricao,
                        ),
                    };
                }

                if (filter.observacoes) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'saidas',
                            'observacoes',
                            filter.observacoes,
                        ),
                    };
                }

            if (filter.dataRange) {
                const [start, end] = filter.dataRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    data: {
                    ...where.data,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    data: {
                    ...where.data,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.valueRange) {
                const [start, end] = filter.valueRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    value: {
                    ...where.value,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    value: {
                    ...where.value,
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

            if (filter.pago) {
                where = {
                    ...where,
                pago: filter.pago,
            };
            }

            if (filter.recorrencia) {
                where = {
                    ...where,
                recorrencia: filter.recorrencia,
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
            const { rows, count } = await db.saidas.findAndCountAll(queryOptions);

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
                        'saidas',
                        'descricao',
                        query,
                    ),
                ],
            };
        }

        const records = await db.saidas.findAll({
            attributes: [ 'id', 'descricao' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['descricao', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.descricao,
        }));
    }

};

