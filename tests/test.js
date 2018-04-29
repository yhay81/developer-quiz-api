const PORT = process.env.PORT || 3000;

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../app");

chai.should();
chai.use(chaiHttp);

const server = app.listen(PORT, () => {
  console.log("API TEST STARTING");
});

describe("GET /api/users", () => {
  let response;

  before(done => {
    chai
      .request(app)
      .get("/api/users")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        response = res;
        done();
      });
  });

  it("should return status 200.", done => {
    response.status.should.equal(200);
    done();
  });

  it("should provide JSON object.", done => {
    expect(JSON.parse(response.text)[0].id).to.equal(1);
    done();
  });
});

describe("GET /api/users/:username", () => {
  let response;

  before(done => {
    chai
      .request(app)
      .get("/api/users/Anonymous")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        response = res;
        done();
      });
  });

  it("should return status 200.", done => {
    response.status.should.equal(200);
    done();
  });

  it("should provide Anonymous user.", done => {
    const json = JSON.parse(response.text);
    expect(json.id).to.equal(2);
    expect(json.username).to.equal("Anonymous");
    done();
  });
});

describe("GET /api/genres/", () => {
  let response;

  before(done => {
    chai
      .request(app)
      .get("/api/genres/")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        response = res;
        done();
      });
  });

  it("should return status 200.", done => {
    response.status.should.equal(200);
    done();
  });

  it("should provide all genres.", done => {
    const json = JSON.parse(response.text);
    expect(json.length).to.equal(15);
    done();
  });
});

describe("GET /api/quizzes/", () => {
  let response;

  before(done => {
    chai
      .request(app)
      .get("/api/quizzes/")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        response = res;
        done();
      });
  });

  it("should return status 200.", done => {
    response.status.should.equal(200);
    done();
  });
});

describe("GET /api/quizzes/random", () => {
  let response;

  before(done => {
    chai
      .request(app)
      .get("/api/quizzes/random")
      .set("Content-Type", "application/json")
      .end((_, res) => {
        response = res;
        done();
      });
  });

  it("should return status 200.", done => {
    response.status.should.equal(200);
    done();
  });
});
