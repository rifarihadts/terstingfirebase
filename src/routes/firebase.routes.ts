import {Router} from 'express';
import {FirebaseClient} from '../databases/firebase';
const firebaseClient = new FirebaseClient();

const router = Router();

// @route    POST /fb/antrian
// @desc     Tambah antrian baru
router.post('/antrian/', async (req, res, next) => {
    const antrian = req.body;
    try {
        await firebaseClient.newAntrian(antrian);
    } catch (error) {
        throw error;
    }

    res.json({message: 'success'});
});

// @route    GET /fb/antrian/
// @desc     Get all antrian 
router.get('/antrian/', async (req, res, next) => {
    let accounts;
    try {
        accounts = await firebaseClient.getData();
    } catch (error) {
        return next(error);
    }

    res.json(accounts);
});



// @route    GET /fb/antrian/:loket
// @desc     Get latest antrian in spesific loket
router.get('/antrian/:loket', async (req, res, next) => {
    let accounts;
    try {
        accounts = await firebaseClient.getData();
    } catch (error) {
        return next(error);
    }

    res.json(accounts);
});

// @route    POST /fb/account
// @desc     Add account data
router.post('/account', async (req, res, next) => {
    const account = req.body;
    try {
        await firebaseClient.newAntrian(account);
    } catch (error) {
        throw error;
    }

    res.json({message: 'success'});
});

// @route    GET /fb/account/:id
// @desc     Get account by Id
router.get('/account/:id', async (req, res, next) => {
    const id = req.params.id;
    let account;
    try {
        account = await firebaseClient.getDataById(id)
    } catch (error) {
        return next(error);
    }

    res.json(account);
});

// @route    PUT /fb/account/:id
// @desc     Update account by id
router.put('/account/:id', async (req, res, next) => {
    const id = req.params.id;
    const update = req.body
    let account;
    try {
        account = await firebaseClient.updateData(id, update)
    } catch (error) {
        return next(error);
    }

    res.json(account);
});

// @route    DELETE /fb/account/:id
// @desc     Delete accoubt by id
router.delete('/account/:id', async (req, res, next) => {
    const id = req.params.id;
    let account;
    try {
        await firebaseClient.deleteData(id)
    } catch (error) {
        return next(error);
    }

    res.json({message: 'Data deleted'});
});


export default router;
