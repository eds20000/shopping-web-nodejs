import pool from '../../configs/connectDB';

const getItems = async () => {
    try {
        const [rows] = await pool.execute(`
            SELECT items.id, brand, name, price, category, sizes.size,colors.id AS color_id, colors.color_nameEng, colors.color_name, color_sizes.size AS color_size, images.img_url, color_sizes.zaiko AS zaiko
            FROM items
            LEFT JOIN sizes ON items.id = sizes.item_id
            LEFT JOIN colors ON items.id = colors.item_id
            LEFT JOIN color_sizes ON colors.id = color_sizes.color_id
            LEFT JOIN images ON colors.id = images.color_id
        `);

        // Transform the data into the desired format
        return rows.reduce((acc, row) => {
            // Find or create the item
            let item = acc.find(item => item.id === row.id);
            if (!item) {
                item = {
                    id: row.id,
                    brand: row.brand,
                    name: row.name,
                    price: row.price,
                    size: [],
                    category: row.category,
                    color_img: [],
                };
                acc.push(item);
            }

            // Add sizes to the item
            if (row.size && !item.size.includes(row.size)) {
                item.size.push(row.size);
            }

            // Add colors and their sizes, images, and zaiko (quantity in stock)
            if (row.color_nameEng) {
                let color = item.color_img.find(color => color.color_nameEng === row.color_nameEng);
                if (!color) {
                    color = {
                        id: row.color_id,
                        color_nameEng: row.color_nameEng,
                        color_name: row.color_name,
                        color_size: [],
                        img: []
                    };
                    item.color_img.push(color);
                }

                // Add sizes and zaiko (quantity) for this color
                if (row.color_size) {
                    let colorSize = color.color_size.find(size => size.size === row.color_size);
                    if (!colorSize) {
                        colorSize = {
                            size: row.color_size,
                            zaiko: row.zaiko
                        };
                        color.color_size.push(colorSize);
                    }
                }

                // Add images for this color
                if (row.img_url && !color.img.includes(row.img_url)) {
                    color.img.push(row.img_url);
                }
            }

            return acc;
        }, []);
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

const getItemById = async (id) => {
    try {
        const [rows] = await pool.execute(`
            SELECT items.id, brand, name, price, category, 
            sizes.size,
            colors.id AS color_id, colors.color_nameEng, colors.color_name, color_sizes.size AS color_size, images.img_url, color_sizes.zaiko AS zaiko
            FROM items
            LEFT JOIN sizes ON items.id = sizes.item_id
            LEFT JOIN colors ON items.id = colors.item_id
            LEFT JOIN color_sizes ON colors.id = color_sizes.color_id
            LEFT JOIN images ON colors.id = images.color_id
            WHERE items.id = ?
        `, [id]);

        console.log(rows);

        // Transform the data into the desired format
        return rows.reduce((acc, row) => {
            // Find or create the item
            let item = acc.find(item => item.id === row.id);
            if (!item) {
                item = {
                    id: row.id,
                    brand: row.brand,
                    name: row.name,
                    price: row.price,
                    size: [],
                    category: row.category,
                    zaiko: row.zaiko,
                    color_img: []
                };
                acc.push(item);
            }

            // Add sizes to the item
            if (row.size && !item.size.includes(row.size)) {
                item.size.push(row.size);
            }

            // Add colors and their sizes and images
            if (row.color_nameEng) {
                let color = item.color_img.find(color => color.color_nameEng === row.color_nameEng);
                if (!color) {
                    color = {
                        id: row.color_id,
                        color_nameEng: row.color_nameEng,
                        color_name: row.color_name,
                        color_size: [],
                        img: []
                    };
                    item.color_img.push(color);
                }

                // Add sizes for this color
                if (row.color_size && !color.color_size.includes(row.color_size)) {
                    color.color_size.push(row.color_size);
                }

                // Add images for this color
                if (row.img_url && !color.img.includes(row.img_url)) {
                    color.img.push(row.img_url);
                }
            }

            return acc;
        }, []);
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};


const deleteItemById = async (id) => {
    try {
        const [rows, fields] = await pool.query(
            'DELETE FROM items WHERE id = ?', id
        );
    } catch (err) {
        console.log(err);
    }
}
const deleteItemByColorsize = async (itemId, colorId, colorSize) => {
    try {
        const [rows, fields] = await pool.query(
            'DELETE FROM color_sizes WHERE color_id = ? AND size = ?', [colorId, colorSize]
        );
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getItems, getItemById, deleteItemById, deleteItemByColorsize }