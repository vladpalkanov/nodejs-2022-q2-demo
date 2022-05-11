import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export function initSwaggerForApp(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home video, music and book library service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.NODE_ENV === 'development') {
    saveOasYamlDocument(document);
  }

  SwaggerModule.setup('api', app, document);
}

function saveOasYamlDocument(document: any): void {
  const yamlDocument = yaml.dump(document, { skipInvalid: true });

  fs.writeFileSync('./oas.yaml', yamlDocument);
}
