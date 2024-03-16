import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getFixedRandomItems, getRandomBoolean, getRandomItem, getRandomItems } from '../../helpers/index.js';

const PHOTOS_CNT = 6;

const MIN_RATING = 1.0;
const MAX_RATING = 5.0;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const offerPreviews = getRandomItem(this.mockData.offerPreviews);
    const offerImages = getFixedRandomItems<string>(this.mockData.offerImages, PHOTOS_CNT).join(';');
    const premiumFlag = getRandomBoolean();
    const favouriteFlag = getRandomBoolean();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const offerType = getRandomItem(this.mockData.offerType);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const conviniences = getRandomItems<string>(this.mockData.conviniences).join(';');
    const user = getRandomItem(this.mockData.users);
    const userAvatar = getRandomItem(this.mockData.avatars);
    const email = getRandomItem(this.mockData.emails);
    const usersType = getRandomItem(this.mockData.usersType);
    const password = getRandomItem(this.mockData.passwords);
    const commentCnt = generateRandomValue(0, 10);
    const latitudes = getRandomItem(this.mockData.latitudes);


    return [
      title, description, date, city, offerPreviews,
      offerImages, premiumFlag, favouriteFlag, rating,
      offerType, rooms, guests, price, conviniences,
      user, email, userAvatar, password, usersType, commentCnt, latitudes
    ].join('\t');
  }
}
