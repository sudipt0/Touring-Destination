class APIFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 1A) Filtering
  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1B) Advance Filtering
    /* user filer with operator */
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    /* If env is development then console log */
    if (process.env.NODE_ENV === 'development') {
      console.log(JSON.parse(queryStr));
    }

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // 2) Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  // 3) Field Limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      // console.log(fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // exclude __v field by using -
    }

    return this;
  }

  // 4) Pagination
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    /* if(this.queryString.page){
        const numTours = await Tour.countDocuments();
        if(skip >= numTours) throw new Error('This page does not exist');
      } */

    return this;
  }
}

module.exports = APIFeature;
