import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
    console.error('No MONGO_URI found');
    process.exit(1);
}

const parts = uri.split('://');
if (parts.length < 2) {
    console.error('Invalid URI format');
    process.exit(1);
}

const rest = parts[1];
const atIndex = rest.lastIndexOf('@');
if (atIndex === -1) {
    console.error('No @ found in URI');
    process.exit(1);
}

const userpass = rest.substring(0, atIndex);
const host = rest.substring(atIndex + 1);

console.log('Protocol:', parts[0]);
console.log('UserPass:', userpass.split(':')[0] + ':****');
console.log('Host:', host);

import dns from 'dns';
dns.resolveSrv('_mongodb._tcp.' + host.split('/')[0].split('?')[0], (err, addresses) => {
    if (err) {
        console.error('SRV Resolution failed:', err);
    } else {
        console.log('SRV Addresses:', addresses);
    }
});
