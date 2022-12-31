

class Collection {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    let requestOptions = {};
    try {
      let results;
      if (id) {
        requestOptions["where"] = { id };
        results = await this.model.findOne(requestOptions);
      } else {
        results = await this.model.findAll(requestOptions);
      }
      return results;
    } catch (error) {
      return error;
    }
  }

  async create(json) {
    let response = await this.model.create(json)
    return response
  }

  async update(json, id){
    await this.model.update(json, {where:{id}})
    let res = await this.model.findOne({ where: {id} })
    return res;
  }

async delete(id){
  await this.model.destroy({ where: {id} })
  return "this has been deleted", id
}

}
// creating an instance/ structure of our table.

module.exports = { Collection };
