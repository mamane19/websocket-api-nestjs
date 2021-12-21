// Let's implement the Github strategy for authentication using Passport and Passport-Github and nestjs.

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    const { id, emails, displayName, photos, profileUrl } = profile;
    const user = {
      email: emails[0].value,
      displayName: displayName,
      avatar: photos[0].value,
      githubId: id,
      githubToken: accessToken,
      githubRefreshToken: refreshToken,
    };
    done(null, user);
  }
}
