import QueryString from 'qs';
import fetch from 'node-fetch';

const OAUTH_ENDPOINT = 'https://github.com/login/oauth';
const API_ENDPOINT = 'https://api.github.com';

type AuthResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};

type GithubUserResponse = {
  login: string;
  avatar_url: string;
};

class GithubThirdParty {
  async authByCode(code: string): Promise<AuthResponse> {
    const querystring = QueryString.stringify({
      client_id: 'd0c1439770278d8073c1',
      client_secret: '18580c89854b783ae43c24ae513b38917e85c6ed',
      code,
    });

    const res = await fetch(`${OAUTH_ENDPOINT}/access_token?${querystring}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    });

    return res.json();
  }

  async fetchGithubUser(accessToken: string): Promise<GithubUserResponse> {
    const res = await fetch(`${API_ENDPOINT}/user`, {
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `Bearer ${accessToken}`,
      },
    });

    return res.json();
  }
}

export default new GithubThirdParty();
