
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DreDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const dre = await db.dre.create(
            {
                id: data.id || undefined,

        receita_bruta: data.receita_bruta
        ||
        null
            ,

        cmv_cpv: data.cmv_cpv
        ||
        null
            ,

        lucro_bruto: data.lucro_bruto
        ||
        null
            ,

        despesas_operacionais: data.despesas_operacionais
        ||
        null
            ,

        resultado_operacional: data.resultado_operacional
        ||
        null
            ,

        outras_receitas: data.outras_receitas
        ||
        null
            ,

        resultado_liquido: data.resultado_liquido
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return dre;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const dreData = data.map((item, index) => ({
                id: item.id || undefined,

                receita_bruta: item.receita_bruta
            ||
            null
            ,

                cmv_cpv: item.cmv_cpv
            ||
            null
            ,

                lucro_bruto: item.lucro_bruto
            ||
            null
            ,

                despesas_operacionais: item.despesas_operacionais
            ||
            null
            ,

                resultado_operacional: item.resultado_operacional
            ||
            null
            ,

                outras_receitas: item.outras_receitas
            ||
            null
            ,

                resultado_liquido: item.resultado_liquido
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const dre = await db.dre.bulkCreate(dreData, { transaction });

        return dre;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const dre = await db.dre.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.receita_bruta !== undefined) updatePayload.receita_bruta = data.receita_bruta;

        if (data.cmv_cpv !== undefined) updatePayload.cmv_cpv = data.cmv_cpv;

        if (data.lucro_bruto !== undefined) updatePayload.lucro_bruto = data.lucro_bruto;

        if (data.despesas_operacionais !== undefined) updatePayload.despesas_operacionais = data.despesas_operacionais;

        if (data.resultado_operacional !== undefined) updatePayload.resultado_operacional = data.resultado_operacional;

        if (data.outras_receitas !== undefined) updatePayload.outras_receitas = data.outras_receitas;

        if (data.resultado_liquido !== undefined) updatePayload.resultado_liquido = data.resultado_liquido;

        updatePayload.updatedById = currentUser.id;

        await dre.update(updatePayload, {transaction});

        return dre;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const dre = await db.dre.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of dre) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of dre) {
                await record.destroy({transaction});
            }
        });

        return dre;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const dre = await db.dre.findByPk(id, options);

        await dre.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await dre.destroy({
            transaction
        });

        return dre;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const dre = await db.dre.findOne(
            { where },
            { transaction },
        );

        if (!dre) {
            return dre;
        }

        const output = dre.get({plain: true});

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

            if (filter.receita_brutaRange) {
                const [start, end] = filter.receita_brutaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    receita_bruta: {
                    ...where.receita_bruta,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    receita_bruta: {
                    ...where.receita_bruta,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.cmv_cpvRange) {
                const [start, end] = filter.cmv_cpvRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    cmv_cpv: {
                    ...where.cmv_cpv,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    cmv_cpv: {
                    ...where.cmv_cpv,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.lucro_brutoRange) {
                const [start, end] = filter.lucro_brutoRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    lucro_bruto: {
                    ...where.lucro_bruto,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    lucro_bruto: {
                    ...where.lucro_bruto,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.despesas_operacionaisRange) {
                const [start, end] = filter.despesas_operacionaisRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    despesas_operacionais: {
                    ...where.despesas_operacionais,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    despesas_operacionais: {
                    ...where.despesas_operacionais,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.resultado_operacionalRange) {
                const [start, end] = filter.resultado_operacionalRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    resultado_operacional: {
                    ...where.resultado_operacional,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    resultado_operacional: {
                    ...where.resultado_operacional,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.outras_receitasRange) {
                const [start, end] = filter.outras_receitasRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    outras_receitas: {
                    ...where.outras_receitas,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    outras_receitas: {
                    ...where.outras_receitas,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.resultado_liquidoRange) {
                const [start, end] = filter.resultado_liquidoRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    resultado_liquido: {
                    ...where.resultado_liquido,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    resultado_liquido: {
                    ...where.resultado_liquido,
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
            const { rows, count } = await db.dre.findAndCountAll(queryOptions);

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
                        'dre',
                        'receita_bruta',
                        query,
                    ),
                ],
            };
        }

        const records = await db.dre.findAll({
            attributes: [ 'id', 'receita_bruta' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['receita_bruta', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.receita_bruta,
        }));
    }

};

