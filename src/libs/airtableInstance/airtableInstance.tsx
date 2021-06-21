import Airtable from 'airtable';
import info from '../../info.json';

const baseTimes = new Airtable({ apiKey: info.apiKey }).base(info.dataBase);

export default baseTimes;
