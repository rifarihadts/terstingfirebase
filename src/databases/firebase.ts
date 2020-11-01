import admin, {firestore} from 'firebase-admin';
import {serviceAccountCredentials} from '../serviceAccountKey';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Antrian = {
    nomor: Number;
    kode: string;
    loket_id : string
    status : string
};

export type Loket = {
    name: string;
    type: string;
};

admin.initializeApp({credential: admin.credential.cert(serviceAccount), databaseURL: 'https://antrian-16a37.firebaseio.com'});

const db = admin.firestore();
const antrianRef = db.collection('antrian');

export class FirebaseClient {
    private db: FirebaseFirestore.Firestore;
    private antrianRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

    constructor() {
        this.db = db;
        this.antrianRef = antrianRef;
    }

    async newAntrian(antrian : Antrian) {

        const kode = antrian.loket_id == '1' ? 'TEL' : 'CSR'
        
        const newAntrian = {
            nomor : 1,
            kode : kode,
            loket_id : antrian.loket_id,
            status:'waiting'
        } 

        try {
            await antrianRef.add(newAntrian);
        } catch (error) {
            throw error
        }

        return;
    }

    async getData() {
        let snapshot;
        try {
            snapshot = await this.antrianRef.get();
        } catch (error) {
            throw error;
        }

        console.log(snapshot);
        return snapshot.docs.map(doc => doc.data());
    }

    async getDataById(id : string) {
        let snapshot;
        try {
            snapshot = await antrianRef.doc(id).get();
        } catch (error) {
            throw error;
        }

        return snapshot.data();
    }

    async updateData(id : string, update : Object) {
        let snapshot;
        try {
            await antrianRef.doc(id).update({
                ...update
            });
            snapshot = await antrianRef.doc(id).get();
        } catch (error) {
            throw error;
        }

        return snapshot.data();
    }

    async deleteData(id : string) {
        try {
            await antrianRef.doc(id).delete();
        } catch (error) {
            throw error;
        }

        return;
    }

    async getDataByState(state : string) {
        let snapshot;
        try {
            snapshot = await antrianRef.where('state', '==', state).get();
        } catch (error) {
            throw error;
        }

        return snapshot.docs.map(doc => doc.data());
    }
}
