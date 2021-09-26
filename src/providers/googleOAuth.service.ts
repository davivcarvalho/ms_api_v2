import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OAuth2Client, TokenPayload } from 'google-auth-library'

@Injectable()
export class GoogleOAuthService {
  constructor(private configService: ConfigService) {}

  async checkToken(idToken: string) {
    const GoogleOAuthClient = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'))
    let oAuthResult: TokenPayload

    try {
      oAuthResult = (await GoogleOAuthClient.verifyIdToken({ idToken })).getPayload()
    } catch (error) {
      throw new UnauthorizedException('Error on validate token.')
    }

    if (!oAuthResult) throw new UnauthorizedException('Error on get token.')

    return oAuthResult
  }
}
