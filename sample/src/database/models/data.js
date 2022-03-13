const {dbQuery} = require("../index");

const getPaginatedData = async(page, limit, orderType) => {
    if (!page || page < 1) {
        page = 1
    }
    if (!limit) {
        limit = 2
    }
    let orderByColumn = 'project_creation'
    let order = 'DESC'

    switch (orderType) {
        case '2':
            orderByColumn = 'category_name'
            order = 'ASC'
            break
        case '3':
            orderByColumn = 'user_name'
            order = 'ASC'
            break
        case '4':
            orderByColumn = 'project_name'
            order = 'ASC'
    }

    const countSql = `
            SELECT count(p.pid) AS total
            FROM projects p
            JOIN users u ON p.uid = u.user_id`
    const countData = await dbQuery(countSql)
    if (!countData.length) {
        return null
    }
    const total = countData[0].total
    const totalPages = Math.ceil(total/limit)

    const offset = (page - 1) * limit
    const sql = `
        SELECT
            p.name AS project_name,
            u.name AS user_name,
            c.name AS category_name,
            p.created_at AS project_creation
        FROM projects p
        JOIN users u ON p.uid = u.user_id
        LEFT JOIN categories c ON p.cid = c.cid 
        ORDER BY ${orderByColumn} ${order} 
        LIMIT ${offset}, ${limit}`
    const result = await dbQuery(sql)
    const formattedData = result.map((r) => {
        return {
            projectName: r.project_name,
            userName: r.user_name,
            categoryName: r.category_name
        }
    })
    return {
        currentPage: page,
        perPage: limit,
        hasPreviousPage: offset > 0,
        hasNextPage: offset < totalPages,
        data: formattedData
    }
}

module.exports = {
    getPaginatedData
}