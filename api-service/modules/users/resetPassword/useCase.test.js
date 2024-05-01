const { userFactory } = require("../../../test/factories/user");
const { resetPasswordUseCase } = require("./useCase");
const { prisma } = require("../../../libs/prisma");
const { sgMail } = require("../../../libs/mailer");

describe("TEST ResetPasswordUseCase.execute", () => {
  it("should not change password and return unsuccessful operation", async () => {
    const mockSendEmailForTheUser = jest
      .spyOn(resetPasswordUseCase, "sendEmailForTheUser")
      .mockImplementationOnce(async () => false);

    const user = await userFactory();

    const success = await resetPasswordUseCase.execute(user.id);

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    const hasChangedPassword =
      new Date(user.updatedAt) < new Date(updatedUser.updatedAt);

    expect(mockSendEmailForTheUser).toHaveBeenCalledWith(
      user.email,
      expect.any(String)
    );
    expect(success).toBe(false);
    expect(hasChangedPassword).toBe(false);
  });

  it("should change password and return successful operation", async () => {
    const mockSendEmailForTheUser = jest
      .spyOn(resetPasswordUseCase, "sendEmailForTheUser")
      .mockImplementationOnce(async () => true);

    const user = await userFactory();

    const success = await resetPasswordUseCase.execute(user.id);

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    const hasChangedPassword =
      new Date(user.updatedAt) < new Date(updatedUser.updatedAt);

    expect(mockSendEmailForTheUser).toHaveBeenCalledWith(
      user.email,
      expect.any(String)
    );
    expect(success).toBe(true);
    expect(hasChangedPassword).toBe(true);
  });
});

describe("TEST ResetPasswordUseCase.sendEmailForTheUser", () => {
  it("should call mailer with correct params", async () => {
    const mockSendEmail = jest
      .spyOn(sgMail, "send")
      .mockImplementationOnce(async () => true);

    const email = "any_email";
    const newPassword = "anything";
    const expectedMessage = {
      to: email,
      from: process.env.SEND_GRID_SENDER_EMAIL,
      subject: `Password Reset`,
      text: `Your new password is: ${newPassword}`,
    };

    const result = await resetPasswordUseCase.sendEmailForTheUser(
      email,
      newPassword
    );

    expect(mockSendEmail).toHaveBeenCalledWith(expectedMessage);
    expect(result).toBe(true);
  });

  it("should call mailer with correct params", async () => {
    const mockSendEmail = jest
      .spyOn(sgMail, "send")
      .mockImplementationOnce(async () => {
        throw new Error("Meu erro");
      });

    const email = "any_email";
    const newPassword = "anything";
    const expectedMessage = {
      to: email,
      from: process.env.SEND_GRID_SENDER_EMAIL,
      subject: `Password Reset`,
      text: `Your new password is: ${newPassword}`,
    };

    const result = await resetPasswordUseCase.sendEmailForTheUser(
      email,
      newPassword
    );

    expect(mockSendEmail).toHaveBeenCalledWith(expectedMessage);
    expect(result).toBe(false);
  });
});
