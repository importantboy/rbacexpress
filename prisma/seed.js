import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
  
   const data = await prisma.employee.findMany({});
   console.log(data);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => console.log(err.message))
  .finally(prisma.$disconnect());
