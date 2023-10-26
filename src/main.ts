import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AbilitiesGuard } from './ability/abilities.guard';
import { AbilityFactory } from './ability/ability.factory';
import { AppModule } from './app.module';
import CustomLogger from './log/custom-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //    cors: true,
    bufferLogs: true,
  });
  app.enableCors({
    credentials: true,
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://127.0.0.1:3001',
      'http://localhost:3001',
    ],
  });
  app.useLogger(app.get(CustomLogger));

  // app.useGlobalGuards(
  //   new AbilitiesGuard(new Reflector(), new AbilityFactory()),
  // );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
