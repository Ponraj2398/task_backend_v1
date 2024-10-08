const Product = require("../Model/ProductModel")
const multer = require("multer");
const path = require("path");

// Define storage for the images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/data/uploads/')); // Corrected path
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

// // Initialize multer with storage
const upload = multer({ storage: storage });


exports.insert = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        // Check if file is uploaded
        // if (!req.file) {
        //     console.error('No file uploaded');
        //     return res.status(400).json({ message: 'No file uploaded' });
        // }
        // const image = req.file.path;
        // const image = req.file ? req.file.path : null;
        const image = `/data/uploads/${req.file.filename}`; // Store the relative path

        const newProduct = new Product({
            name,
            description,
            price,
            image
            // image: req.file.filename 
        });

        await newProduct.save();
        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.list = [(req, res) => {
    Product.find()
        .then((products) => {
            return res.status(200).send(products);
        })
        .catch((err) => {
            return res.status(200).send(err.message);
        })
}];

// exports.like = [(req, res) => {
//     Product.updateOne(
//         { _id: req.params.id },
//         {
//             $inc: {
//                 likes: 1
//             }
//         }
//     )
//         .then(() => {
//             return res.status(200).send("Liked")
//         })
//         .catch((err) => {
//             return res.status(200).send(err.message)
//         })
// }]

exports.findByPriceGreater = [(req, res) => {
    Product.find({ price: { $gt: req.params.price } })
        .then((product) => {
            return res.status(200).send(product)
        })
        .catch((err) => {
            return res.status(200).send(err.message)
        })
}]

exports.findByPriceLesser = [(req, res) => {
    Product.find({ price: { $lt: req.params.price } })
        .then((product) => {
            return res.status(200).send(product)
        })
        .catch((err) => {
            return res.status(200).send(err.message)
        })
}]

exports.findByPriceBetween = [(req, res) => {
    Product.find({
        $and: [
            {
                price: {
                    $gte: req.body.gte
                }
            },
            {
                price: {
                    $lte: req.body.lte
                }
            }
        ]
    })
        .then((product) => {
            return res.status(200).send(product)
        })
        .catch((err) => {
            return res.status(200).send(err.message)
        })
}]

exports.delete = [(req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => {
            return res.status(200).send("Deleted Successfully")
        })
        .catch((err) => {
            return res.status(200).send(err.message)
        })
}]
// exports.update = [
//     upload.single('file'), // Use multer to handle the image upload if any
//     (req, res) => {
//         const updateFields = {
//             name: req.body.name,
//             price: req.body.price,
//             description: req.body.description,
//         };

//         if (req.file) {
//             updateFields.image = req.file.filename; // Update the image if a new one is uploaded
//         }

//         Product.updateOne(
//             { _id: req.params.id },
//             { $set: updateFields }
//         )
//             .then(() => {
//                 return res.status(200).send("Update Successful");
//             })
//             .catch((err) => {
//                 return res.status(500).send(err.message);
//             });
//     }
// ];
exports.update = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file.path;
        // Check if file is uploaded
        // if (!req.file) {
        //     console.error('No file uploaded');
        //     return res.status(400).json({ message: 'No file uploaded' });
        // }
        // const image = req.file ? req.file.path : null;
        // const image = `/data/uploads/${req.file.filename}`; // Store the relative path

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            // image
            image: req.file.filename
        }, { new: true });

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
