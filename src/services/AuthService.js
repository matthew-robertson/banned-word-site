import { Log, User, UserManager } from 'oidc-client';

const clientRoot = 'http://localhost:3000/'

export class AuthService {
  constructor() {
    const settings = {
      authority: 'https://discordapp.com/api/oauth2/authorize',
      client_id: '357329669063704576',
      redirect_uri: `${clientRoot}user`,
      silent_redirect_uri: `${clientRoot}silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${clientRoot}`,
      response_type: 'code',
      scope: 'identify guilds',
      metadata: {
        authorization_endpoint: 'https://discordapp.com/api/oauth2/authorize',
        token_endpoint: 'https://discordapp.com/api/oauth2/token',
        revocation_endpoint: 'https://OAuthProvider/oauth/revoke',
      },
    }

    this.userManager = new UserManager(settings)

    Log.logger = console
    Log.level = Log.INFO
  }

  getUser() {
    return this.userManager.getUser()
  }

  login() {
    return this.userManager.signinRedirect()
  }

  logout() {
    return this.userManager.signoutRedirect()
  }

  loginCallback() {
    return this.userManager.signinRedirectCallback()
  }
}