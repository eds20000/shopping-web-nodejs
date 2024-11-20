import pool from '../../configs/connectDB';

const getItems = async () => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                items.id, 
                items.brand, 
                items.name, 
                items.price, 
                items.category, 
                items.infor, 
                sizes.size, 
                colors.id AS color_id, 
                colors.color_nameEng, 
                colors.color_name, 
                color_sizes.size AS color_size, 
                images.img_url, 
                color_sizes.zaiko AS zaiko,
                ROUND(AVG(reviews.rating), 1) AS average_rating,
                COUNT(reviews.id) AS count_rating
            FROM 
                items
            LEFT JOIN sizes ON items.id = sizes.item_id
            LEFT JOIN colors ON items.id = colors.item_id
            LEFT JOIN color_sizes ON colors.id = color_sizes.color_id
            LEFT JOIN images ON colors.id = images.color_id
            LEFT JOIN reviews ON items.id = reviews.item_id
            GROUP BY 
                items.id, 
                items.brand, 
                items.name, 
                items.price, 
                items.category, 
                items.infor, 
                sizes.size, 
                colors.id, 
                colors.color_nameEng, 
                colors.color_name, 
                color_sizes.size, 
                images.img_url, 
                color_sizes.zaiko;
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
                    infor: row.infor
                        .replace(/\n/g, '<br>')   // Convert newlines to <br>
                        .replace(/\r/g, '')       // Remove carriage returns
                        .replace(/\t/g, ' '),
                    rating: row.average_rating || 0,  // Default to 0 if no rating
                    ratingCount : row.count_rating
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
                            zaiko: row.zaiko || 0  // Default to 0 if no zaiko
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
        // Convert id to an array if it's not already
        const idArray = Array.isArray(id) ? id : [id];

        // Use placeholders for each id in the array
        const placeholders = idArray.map(() => '?').join(',');

        const [rows] = await pool.execute(`
            SELECT items.id, brand, name, price, category, infor,
            sizes.size,
            colors.id AS color_id, colors.color_nameEng, colors.color_name, color_sizes.size AS color_size, images.img_url, color_sizes.zaiko AS zaiko
            FROM items
            LEFT JOIN sizes ON items.id = sizes.item_id
            LEFT JOIN colors ON items.id = colors.item_id
            LEFT JOIN color_sizes ON colors.id = color_sizes.color_id
            LEFT JOIN images ON colors.id = images.color_id
            WHERE items.id IN (${placeholders})
        `, idArray);

        // Transform the data into the desired format
        const transformedItems = rows.reduce((acc, row) => {
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
                    infor: row.infor
                        .replace(/\n/g, '<br>')   // Convert newlines to <br>
                        .replace(/\r/g, '')       // Remove carriage returns
                        .replace(/\t/g, ' '),
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

        return transformedItems;
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
const updateItemById = async (id, name, brand, category, price, zaiko, infor, size, color_img) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Parse dữ liệu JSON nếu nó là chuỗi
        if (typeof color_img === 'string') {
            color_img = JSON.parse(color_img);
        }

        console.log('Dữ liệu đầu vào sau khi parse:', { id, name, brand, category, price, zaiko, infor, size, color_img });

        // Cập nhật bảng items
        console.log('Cập nhật bảng items:', { id, name, brand, category, price, zaiko, infor });
        await connection.query(
            'UPDATE items SET name = ?, brand = ?, category = ?, price = ?, zaiko = ?, infor = ? WHERE id = ?',
            [name, brand, category, price, zaiko, infor, id]
        );

        // Xử lý size
        if (Array.isArray(size) && size.length > 0) {
            await connection.query('DELETE FROM sizes WHERE item_id = ?;', [id]);
            await connection.query('ALTER TABLE sizes AUTO_INCREMENT = 1; ')
            for (const s of size) {
                await connection.query(
                    'INSERT INTO sizes (item_id, size) VALUES (?, ?)',
                    [id, s]
                );
            }
        } else {
            console.log('Không có size để cập nhật.');
        }

        // Xử lý màu sắc
        if (Array.isArray(color_img) && color_img.length > 0) {
            console.log('Xử lý màu sắc và hình ảnh:', color_img);
        
            // Xóa dữ liệu liên quan trong `cart` và `color_sizes` trước khi xóa trong `colors`
            await connection.query('DELETE FROM cart WHERE item_id = ?', [id]);
            await connection.query('DELETE FROM color_sizes WHERE item_id = ?', [id]);
        
            // Xóa và đặt lại AUTO_INCREMENT cho `colors`
            await connection.query('DELETE FROM colors WHERE item_id = ?;', [id]);
            await connection.query('ALTER TABLE colors AUTO_INCREMENT = 1;');
        
            for (const colorImgs of color_img) {
                await connection.query(
                    'INSERT INTO colors (item_id, color_nameEng, color_name) VALUES (?, ?, ?)',
                    [id, colorImgs.color_nameEng, colorImgs.color_name]
                );
        
                // Lấy `color_id` mới chèn vào
                const [rows] = await connection.query(
                    'SELECT id FROM colors WHERE item_id = ? AND color_name = ?',
                    [id, colorImgs.color_name]
                );
                const colorIdNEW = rows[0].id;
        
                // Thêm dữ liệu vào `color_sizes` và `images`
                for (const colorSize of colorImgs.color_size) {
                    await connection.query(
                        'INSERT INTO color_sizes (color_id, size, item_id, zaiko) VALUES (?, ?, ?, ?);',
                        [colorIdNEW, colorSize.size, id, colorSize.zaiko]
                    );
                }
        
                for (const colorImg of colorImgs.img) {
                    await connection.query(
                        'INSERT INTO images (color_id, img_url) VALUES (?, ?);',
                        [colorIdNEW, colorImg]
                    );
                }
            }
        }
        
        
         else {
            console.log('Không có màu sắc để cập nhật.');
        }

        // Commit transaction sau khi mọi việc hoàn thành
        console.log('Commit transaction');
        await connection.commit();
        console.log('Cập nhật thành công!');
    } catch (err) {
        await connection.rollback();
        console.error('Error during transaction, rolling back:', err.message);
        throw err;
    } finally {
        connection.release();
    }
};

const addItem = async (name, brand, category, price, zaiko, infor, size, color_img) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        if (typeof color_img === 'string') {
            color_img = JSON.parse(color_img);
        }
        await connection.query(
            'INSERT INTO items(name,brand,category,price,zaiko,infor) VALUES (?,?,?,?,?,?)',
            [name, brand, category, price, zaiko, infor]
        );
        // Lấy `item_id` mới chèn vào
        const [itemIdNEW] = await connection.query(
            'SELECT id FROM items WHERE name = ? AND brand = ? AND category = ? AND price = ? AND zaiko = ? AND infor = ?',
            [name, brand, category, price, zaiko, infor]
        );
        const itemId = itemIdNEW[0].id;

        // Xử lý size
        if (Array.isArray(size) && size.length > 0) {
            for (const s of size) {
                await connection.query(
                    'INSERT INTO sizes (item_id, size) VALUES (?, ?)',
                    [itemId, s]
                );
            }
        } else {
            console.log('Không có size để cập nhật.');
        }

        // Xử lý màu sắc
        if (Array.isArray(color_img) && color_img.length > 0) {
        
            for (const colorImgs of color_img) {
                await connection.query(
                    'INSERT INTO colors (item_id, color_nameEng, color_name) VALUES (?, ?, ?)',
                    [itemId, colorImgs.color_nameEng, colorImgs.color_name]
                );
        
                // Lấy `color_id` mới chèn vào
                const [rows] = await connection.query(
                    'SELECT id FROM colors WHERE item_id = ? AND color_name = ?',
                    [itemId, colorImgs.color_name]
                );
                const colorIdNEW = rows[0].id;
        
                // Thêm dữ liệu vào `color_sizes` và `images`
                for (const colorSize of colorImgs.color_size) {
                    await connection.query(
                        'INSERT INTO color_sizes (color_id, size, item_id, zaiko) VALUES (?, ?, ?, ?);',
                        [colorIdNEW, colorSize.size, itemId, colorSize.zaiko]
                    );
                }
        
                for (const colorImg of colorImgs.img) {
                    await connection.query(
                        'INSERT INTO images (color_id, img_url) VALUES (?, ?);',
                        [colorIdNEW, colorImg]
                    );
                }
            }
        }
        
        
         else {
            console.log('Không có màu sắc để cập nhật.');
        }

        // Commit transaction sau khi mọi việc hoàn thành
        console.log('Commit transaction');
        await connection.commit();
        console.log('Cập nhật thành công!');
    } catch (err) {
        await connection.rollback();
        console.error('Error during transaction, rolling back:', err.message);
        throw err;
    } finally {
        connection.release();
    }
};









module.exports = { getItems, getItemById, deleteItemById, deleteItemByColorsize, updateItemById,addItem }