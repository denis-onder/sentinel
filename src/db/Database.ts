class Database {
    public requirement = require('arangojs').Database;
    public database = new this.requirement(process.env.DB_URL);
    public checkDatabase() {
        // tslint:disable-next-line
        console.log('database', this.database);
    }
}

const Arango = new Database();

export default Arango;
