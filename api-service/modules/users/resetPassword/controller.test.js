const request = require("supertest");
const app = require("../../../app");
const {
  getHeadersObjectWithCorrectJWT,
} = require("../../../test/helpers/generateJwt");
const { resetPasswordUseCase } = require("./useCase");

describe("TEST POST /reset_password", () => {
  it("should return unauthorized, since it has no JWT token", async () => {
    const response = await request(app).post(`/reset_password`);

    expect(response.body).toEqual({
      name: "AuthenticationError",
      message: "JWT token is compulsory",
    });
    expect(response.status).toBe(401);
  });

  it("should call resetPasswordUseCase and return success", async () => {
    const mockUseCase = jest
      .spyOn(resetPasswordUseCase, "execute")
      .mockImplementationOnce(async () => true);

    const headers = await getHeadersObjectWithCorrectJWT();
    const response = await request(app).post(`/reset_password`).set(headers);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
    });
    expect(mockUseCase).toHaveBeenCalledWith(expect.any(Number));
  });
});
