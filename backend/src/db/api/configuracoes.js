
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ConfiguracoesDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const configuracoes = await db.configuracoes.create(
            {
                id: data.id || undefined,

        dias_proximas: data.dias_proximas
        ||
        null
            ,

        itens_por_pagina: data.itens_por_pagina
        ||
        null
            ,

        ordenacao_data: data.ordenacao_data
        ||
        null
            ,

        moeda: data.moeda
        ||
        null
            ,

        formato_data: data.formato_data
        ||
        null
            ,

        idioma: data.idioma
        ||
        null
            ,

        fuso: data.fuso
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return configuracoes;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const configuracoesData = data.map((item, index) => ({
                id: item.id || undefined,

                dias_proximas: item.dias_proximas
            ||
            null
            ,

                itens_por_pagina: item.itens_por_pagina
            ||
            null
            ,

                ordenacao_data: item.ordenacao_data
            ||
            null
            ,

                moeda: item.moeda
            ||
            null
            ,

                formato_data: item.formato_data
            ||
            null
            ,

                idioma: item.idioma
            ||
            null
            ,

                fuso: item.fuso
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const configuracoes = await db.configuracoes.bulkCreate(configuracoesData, { transaction });

        return configuracoes;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const configuracoes = await db.configuracoes.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.dias_proximas !== undefined) updatePayload.dias_proximas = data.dias_proximas;

        if (data.itens_por_pagina !== undefined) updatePayload.itens_por_pagina = data.itens_por_pagina;

        if (data.ordenacao_data !== undefined) updatePayload.ordenacao_data = data.ordenacao_data;

        if (data.moeda !== undefined) updatePayload.moeda = data.moeda;

        if (data.formato_data !== undefined) updatePayload.formato_data = data.formato_data;

        if (data.idioma !== undefined) updatePayload.idioma = data.idioma;

        if (data.fuso !== undefined) updatePayload.fuso = data.fuso;

        updatePayload.updatedById = currentUser.id;

        await configuracoes.update(updatePayload, {transaction});

        return configuracoes;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const configuracoes = await db.configuracoes.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of configuracoes) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of configuracoes) {
                await record.destroy({transaction});
            }
        });

        return configuracoes;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const configuracoes = await db.configuracoes.findByPk(id, options);

        await configuracoes.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await configuracoes.destroy({
            transaction
        });

        return configuracoes;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const configuracoes = await db.configuracoes.findOne(
            { where },
            { transaction },
        );

        if (!configuracoes) {
            return configuracoes;
        }

        const output = configuracoes.get({plain: true});

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

            if (filter.dias_proximasRange) {
                const [start, end] = filter.dias_proximasRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    dias_proximas: {
                    ...where.dias_proximas,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    dias_proximas: {
                    ...where.dias_proximas,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.itens_por_paginaRange) {
                const [start, end] = filter.itens_por_paginaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    itens_por_pagina: {
                    ...where.itens_por_pagina,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    itens_por_pagina: {
                    ...where.itens_por_pagina,
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

            if (filter.ordenacao_data) {
                where = {
                    ...where,
                ordenacao_data: filter.ordenacao_data,
            };
            }

            if (filter.moeda) {
                where = {
                    ...where,
                moeda: filter.moeda,
            };
            }

            if (filter.formato_data) {
                where = {
                    ...where,
                formato_data: filter.formato_data,
            };
            }

            if (filter.idioma) {
                where = {
                    ...where,
                idioma: filter.idioma,
            };
            }

            if (filter.fuso) {
                where = {
                    ...where,
                fuso: filter.fuso,
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
            const { rows, count } = await db.configuracoes.findAndCountAll(queryOptions);

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
                        'configuracoes',
                        'idioma',
                        query,
                    ),
                ],
            };
        }

        const records = await db.configuracoes.findAll({
            attributes: [ 'id', 'idioma' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['idioma', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.idioma,
        }));
    }

};

