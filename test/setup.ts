// setup test environment

import { beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

beforeAll(async () => {
  try {
    // Executa as migrações do Prisma
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    // Limpa o banco de dados antes dos testes
    await prisma.user.deleteMany();
  } catch (error) {
    console.error('Erro ao configurar o banco de dados:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Fecha a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error('Erro ao desconectar do banco de dados:', error);
    throw error;
  }
}); 