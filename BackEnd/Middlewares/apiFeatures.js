class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};
        this.query.find({ ...keyword });
        return this;
    }


    //     filter() {
    //     const queryStrCopy = { ...this.queryStr };

    //     // Remove fields not used for filtering
    //     const removeFields = ['keyword', 'limit', 'page'];
    //     removeFields.forEach(field => delete queryStrCopy[field]);

    //     // Convert query operators to MongoDB format
    //     let queryStr = JSON.stringify(queryStrCopy);
    //     console.log('Original filter query:', queryStr);
    //     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    // console.log('Parsed filter query:', queryStr);
    //     this.query.find(JSON.parse(queryStr));
    //     return this;
    // }


    // new filter method

    // filter() {
    //     const queryObj = { ...this.queryStr };
    //     const excludeFields = ['keyword', 'limit', 'page'];
    //     excludeFields.forEach(field => delete queryObj[field]);

    //     const filters = {};

    //     for (const key in queryObj) {
    //         const match = key.match(/^(\w+)\[(gte|gt|lte|lt)\]$/);
    //         if (match) {
    //             const [_, field, operator] = match;
    //             if (!filters[field]) filters[field] = {};
    //             filters[field][`$${operator}`] = Number(queryObj[key]);
    //         } else {
    //             filters[key] = queryObj[key];
    //         }
    //     }

    //     console.log('Parsed filter query:', filters);
    //     this.query = this.query.find(filters);
    //     return this;
    // }




    // new


    filter() {
    const queryObj = { ...this.queryStr };
    const excludeFields = ['keyword', 'limit', 'page'];
    excludeFields.forEach(field => delete queryObj[field]);

    const filters = {};

    for (const key in queryObj) {
        const match = key.match(/^(\w+)\[(gte|gt|lte|lt)\]$/);
        if (match) {
            const [_, field, operator] = match;
            const value = Number(queryObj[key]);

            // Only add if it's a valid number
            if (!isNaN(value)) {
                if (!filters[field]) filters[field] = {};
                filters[field][`$${operator}`] = value;
            }
        } else {
            filters[key] = queryObj[key];
        }
    }

    console.log('Parsed filter query:', filters);
    this.query = this.query.find(filters);
    return this;
}




    paginate(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;