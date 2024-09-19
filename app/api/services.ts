import prisma from '@/prisma/client';

class UserClass {
  async checkExisitingUser(id?: string, email?: string) {
    if ((id && email) || (!id && !email)) {
      throw new Error('You must provide either ID or Email, but not both.');
    }
    const existingUser = await prisma.user.findFirst({
      where: id ? { id } : { email },
    });

    return existingUser;
  }
}

export default new UserClass();
