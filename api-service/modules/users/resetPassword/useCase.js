const { v4: uuidv4 } = require("uuid");
const { prisma } = require("../../../libs/prisma");
const { hash } = require("bcrypt");
const { sgMail } = require("../../../libs/mailer");

class ResetPasswordUseCase {
  async execute(userId) {
    const newPassword = uuidv4();
    const hashedPassword = await hash(newPassword, 10);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    const success = await this.sendEmailForTheUser(user.email, newPassword);

    if (success) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
        },
      });
    }

    return success;
  }

  async sendEmailForTheUser(email, newPassword) {
    const subject = `Password Reset`;
    const text = `Your new password is: ${newPassword}`;
    const msg = {
      to: email,
      from: process.env.SEND_GRID_SENDER_EMAIL,
      subject,
      text,
    };

    try {
      await sgMail.send(msg);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const resetPasswordUseCase = new ResetPasswordUseCase();

module.exports = { resetPasswordUseCase };
