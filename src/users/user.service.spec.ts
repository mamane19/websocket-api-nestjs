import { Test, TestingModule } from '@nestjs/testing';
import { GoogleStrategy } from './user.service';

describe('UserService', () => {
  let service: GoogleStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleStrategy],
    }).compile();

    service = module.get<GoogleStrategy>(GoogleStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
