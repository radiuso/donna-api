const { expect } = require('chai');
require('../../database');
const usersDal = require('./usersDAL');

describe('User tests', () => {
    it('Should get admin', async () => {
        const user = await usersDal.findById(1);
        expect(user.firstName).to.equal('admin');
    });

    it('Should create toto', async () => {
        try {
            const user = await usersDal.create({
                firstName: 'toto',
                lastName: 'none',
                email: 'toto.none@donna.com',
                passwd: 'toto',
            });

            expect(user.firstName).to.equal('toto');
            expect(user.lastName).to.equal('none');
            expect(user.email).to.equal('toto.none@donna.com');
            expect(user.createdAt).to.not.be.null;
        } catch (ex) {
            expect().fail(ex);
        }
    });

    it('Should delete toto', async () => {
        try {
            const totoUser = await usersDal.findOne({
                where: {
                    email: 'toto.none@donna.com',
                },
            });
            const res = await usersDal.delete(totoUser.id);
            expect(res).to.be.equals(1);
        } catch (ex) {
            expect().fail(ex);
        }
    })
});
