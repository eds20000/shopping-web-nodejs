import pool from '../configs/connectDB';

const getItems = async () => {
    try {
        const [rows] = await pool.execute(`
            SELECT items.id, brand, name, price, category,items.zaiko, sizes.size, colors.color_nameEng, colors.color_name, color_sizes.size AS color_size, images.img_url
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
const getItemById = async (id) => {
    try {
        const [rows] = await pool.execute(`
            SELECT items.id, brand, name, price, category,zaiko, sizes.size, colors.color_nameEng, colors.color_name, color_sizes.size AS color_size, images.img_url
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

module.exports = { getItems, getItemById }