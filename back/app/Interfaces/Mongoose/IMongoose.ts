export interface IMongooseUpdate {
    nModified: Number;
    ok: Number;
    n: Number;
}

export interface IMongooseSelect { // aggregate & find
    length: Number;
}