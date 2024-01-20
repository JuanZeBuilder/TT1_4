const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Test itinerary endpoints', function () {
    it('Get itinerary by user id', function (done) {
        let userId = 1;

        chai.request(app)
            .get(`/api/itinerary/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array'); // Assuming it returns an array of itineraries
                done();
            });
    });
});
