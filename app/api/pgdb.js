import {Pool} from 'pg';

const pool = new Pool({
    user: 'abhishekvishwakarma',
    host: 'localhost',
    database: 'abhishekvishwakarma',
    password: '1Life@Developer',
    port: 5432,
   });

   export default async function dbHandler(res, req) {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM colleges');
        res.status(200).json(result.rows);
        client.release();
    }
    catch(err) {
        console.log("Error in fetching data");
        console.error(err);
        res.status(500).json({error: 'Failed Data'});
    }
   }