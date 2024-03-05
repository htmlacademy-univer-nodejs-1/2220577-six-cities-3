import got from 'got';
import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';


export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    await got.get(url).then((res) => {
      if (res.statusCode === 404) {
        throw new Error(`${url} doesn't exist`);
      } else if (res.statusCode !== 200) {
        throw new Error(`Unable fetch from ${url}`);
      }

      try {
        this.initialData = JSON.parse(res.body);
      } catch (err) {
        throw new Error(`Unable to parse the json: ${res.body}`);
      }

    });
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
